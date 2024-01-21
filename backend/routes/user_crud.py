###### 第三方库 ######
from fastapi import APIRouter, Depends, HTTPException , File , UploadFile , Form 
from sqlalchemy.orm import Session
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
from request_body_schema.user import UserCreate , EmailUpdate

###### 工具包 ######
from utils import Utils
# 其他路由的实例
from routes.email_routes import email_verification_service

# 常用工具
utils = Utils()

router = APIRouter()

# 创建用户
@router.post("/users/crud/create")
async def create_user(user: UserCreate, db: Session = Depends(utils.get_db)):
    # 测试阶段
    utils.on_test("注册功能")
    # 日志
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
async def update_email(email_update: EmailUpdate, db: Session = Depends(utils.get_db)):
    # 验证邮箱和验证码
    if not email_verification_service.verify_code(email_update.email, email_update.code):
        raise HTTPException(status_code=400, detail="验证码错误或已过期")

    updated_user = user_crud.update_user_email(db, email_update.id, email_update.email)
    if updated_user:
        return {"message": "邮箱更新成功"}
    else:
        raise HTTPException(status_code=404, detail="用户不存在")
