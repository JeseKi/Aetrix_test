###### 第三方库 ######
from fastapi import APIRouter, Depends, HTTPException , File , UploadFile , Form 
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import os

###### 数据库包 ######
# CRUD操作
## 用户CRUD
import aetrix_database.user_crud as user_crud
## 表格CRUD
import aetrix_database.tables.tables_crud.volunteerSignUp as volunteer_crud
volunteer_initiate_crud = volunteer_crud.VolunteersInitiateCRUD()
volunteer_signup_crud = volunteer_crud.VolunteersSignUpCRUD()

# 数据库模型
from aetrix_database.models import  User 

###### 请求体包 ######
from request_body_schema.user import UserCreate , EmailUpdate , PasswordUpdate , ForgotPassword

###### 工具包 ######
from server_utils import utils , auth , email_verification_service

# 创建路由
router = APIRouter()

# 其他路由的实例
from routes.email_routes import email_verification_service

# 创建用户
@router.post("/users/crud/create")
async def create_user(user: UserCreate, db: Session = Depends(utils.get_db)):
    # 测试阶段
    utils.on_test("注册功能")
    # 测试日志
    # utils.event_time_log(f"获得验证码：{user.code} 验证码的类型为 {type(user.code)}")
    if email_verification_service.verify_code(user.email, user.code):
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            print("邮件已存在！")
            raise HTTPException(status_code=400, detail="邮件已存在！")
        existing_username = db.query(User).filter(User.username == user.username).first()
        
        if existing_username:
            print("用户名已被占用！")
            raise HTTPException(status_code=400, detail="用户名已被占用！")
        user.avatar = "/users/avatars/default_avatar.png"
        return user_crud.create_user(db=db, user=user)
    else:
        raise HTTPException(status_code=400, detail="验证码错误！")

# 获取特定用户的信息
@router.get("/users/crud/{user_id}")
async def read_user(user_id: int, db: Session = Depends(utils.get_db)):
    db_user = user_crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 更新特定用户
@router.put("/users/crud/{user_id}")
async def update_user(
    user_id: int, 
    username: str = Form(None), 
    phone: str = Form(None), 
    bio: str = Form(None), 
    avatar: UploadFile = File(None),
    db: Session = Depends(utils.get_db)
    ):
    
    user = UserCreate(
        username=username,
        email="update@example.com",
        password=None,
        phone=phone,
        bio=bio
    )
    if avatar:
        avatar_path = utils.save_file(file=avatar, user_id=user_id, path="aetrix_database/files" , static_path='/users/avatars/')
        query_result = db.query(User).filter(User.id == user_id).first()
        try:
            if query_result and os.path.isfile(query_result.avatar_path):
                # 删除文件
                os.remove(query_result.avatar_path)
            else:
                print("文件不存在")
        except:
            print("暂无头像")

        user.avatar , user.avatar_path= avatar_path[0] , avatar_path[1]
    
    db_user = user_crud.update_user(db, user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 删除特定用户
@router.delete("/users/crud/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(utils.get_db)):
    user_crud.delete_user(db, user_id)
    return {"detail": "用户已删除"}  # 返回用户已删除的消息

# 更新用户邮件地址
@router.post("/users/update/email")
async def update_email(email_update: EmailUpdate, db: Session = Depends(utils.get_db), token_info: dict = Depends(auth.verify_token)):
    user_id = token_info.get("user_id")
    
    if not email_verification_service.verify_code(email_update.email, email_update.code):
        raise HTTPException(status_code=400, detail="验证码错误或已过期")

    try:
        updated_user = user_crud.update_user_email(db, user_id, email_update.email)
        if updated_user:
            return {
                    "status": "success",
                    "message": "邮箱更新成功"
                    }
        else:
            raise HTTPException(status_code=404, detail="用户不存在")
    except IntegrityError:
        raise HTTPException(status_code=400, detail="邮箱已被其他用户使用")
    
# 更新用户密码
@router.post("/users/update/password")
async def update_password(password_update: PasswordUpdate, db: Session = Depends(utils.get_db), token_info: dict = Depends(auth.verify_token)):
    user_id = token_info.get("user_id")

    updated_user = user_crud.update_user_password(db, user_id, password_update.old_password, password_update.new_password)
    if updated_user:
        return {
                "status": "success",
                "message": "密码更新成功"
                }
    else:
        raise HTTPException(status_code=400, detail="旧密码错误！")
    
@router.post("/users/crud/forgotpassword")
async def forgot_password(form: ForgotPassword, db: Session = Depends(utils.get_db)):
    if email_verification_service.verify_code(form.email, form.code):
        user = user_crud.get_user_by_email(db, form.email)
        if user:
            user_crud.update_user_password(db, user.id, user.password, form.new_password)
            return {
                    "status": "success",
                    "message": "密码重置成功"
                    }
        else:
            raise HTTPException(status_code=404, detail="用户不存在")
    else:
        raise HTTPException(status_code=400, detail="验证码错误或已过期")