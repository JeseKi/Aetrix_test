###### 第三方库 ######
from fastapi import FastAPI, Depends, HTTPException , File , UploadFile , Form , status
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

###### 数据库包 ######
# CRUD操作
import aetrix_database.user_crud as user_crud

import aetrix_database.tables.tables_crud.volunteerSignUp as volunteer_crud
volunteer_initiate_crud = volunteer_crud.VolunteersInitiateCRUD()

# 数据库模型
from aetrix_database.models import SessionLocal , User 

###### 请求体包 ######
from request_body_schema.user import UserCreate, UserLogin
from request_body_schema.volunteer_sign_up import VolunteersInitiate

###### 工具包 ######
from utils import Utils
utils = Utils()

###### APP ######
app = FastAPI()
app.mount("/users/avatars/", StaticFiles(directory="aetrix_database/imgs/userAvatars"), name="avatars")
app.mount("/imgs", StaticFiles(directory="build/imgs"), name="imgs")
app.mount("/static",StaticFiles(directory="build/static"), name="static")

# 添加CORS中间件，以允许跨域资源共享
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源（在生产环境中需要更具体的配置）
    allow_credentials=True,  # 允许跨域请求携带凭据（例如，cookie）
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有HTTP头部
)

# 创建一个函数以获取数据库会话
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 创建用户
@app.post("/users/crud/create")
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # 测试阶段
    utils.on_test("注册功能")
    
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

# 获取特定用户的信息
@app.get("/users/crud/{user_id}")
async def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user_crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 更新特定用户
@app.put("/users/crud/{user_id}")
async def update_user(
    user_id: int, 
    username: str = Form(None), 
    email: str = Form(None), 
    password: str = Form(None), 
    phone: str = Form(None), 
    bio: str = Form(None), 
    avatar: UploadFile = File(None),
    db: Session = Depends(get_db)
    ):
    
    user = UserCreate(
        username=username,
        email=email,
        password=password,
        phone=phone,
        bio=bio
    )
    if avatar:
        avatar_path = utils.save_file(file=avatar, user_id=user_id, path="aetrix_database/imgs/userAvatars" , static_path='/users/avatars/')
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
@app.delete("/users/crud/{user_id}")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_crud.delete_user(db, user_id)
    return {"detail": "用户已删除"}  # 返回用户已删除的消息

# 登录
@app.post("/users/login/email")
async def login_user(infor: UserLogin, db: Session = Depends(get_db)):
    # 测试阶段
    utils.on_test("登录功能")
    
    # 根据邮箱从数据库中获取用户
    user = db.query(User).filter(User.email == infor.email).first()

    # 检查用户是否存在
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="用户不存在")

    # 验证密码
    if user.password == infor.password:
        return {
            "id" : user.id,
            "detail" : "登录成功",
        }
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="邮箱或密码错误")

# 提交志愿者发起人表格
@app.put("/tables/volunteersignup/initiate/submit")
async def tables_volunteersignup_initiate_submit(
    # 公司情报
    companyName: str = Form(...),  # 公司名称
    legalRepresentative: str = Form(...),  # 法定代表人姓名
    establishmentDate: str = Form(...),  # 设立日期
    capital: str = Form(...),  # 资本金
    totalEmployees: int = Form(...),  # 从业人员 - 企业全体
    maleEmployees: int = Form(...),  # 从业人员 - 男
    femaleEmployees: int = Form(...),  # 从业人员 - 女
    businessContent: str = Form(...),  # 事业内容
    specialty: str = Form(...),  # 经营特长
    companyProvince: str = Form(...),  # 公司地址 - 省份
    companyCity: str = Form(...),  # 公司地址 - 市
    companyDetailedAddress: str = Form(...),  # 公司地址 - 详细地址
    isCompanyAbroad: bool = Form(...),  # 公司地址 - 是否为国外？
    companyZipcode: str = Form(...),  # 公司地址 - 邮

    # 个人情报
    fullName: str = Form(...),  # 姓名
    gender: str = Form(...),  # 性别
    birthdate: str = Form(...),  # 生日年月
    phone: str = Form(...),  # 电话
    personalPhoto: UploadFile = File(None),  # 个人照片
    personalProvince: str = Form(...),  # 个人地址 - 省份
    personalCity: str = Form(...),  # 个人地址 - 市
    personalDetailedAddress: str = Form(...),  # 个人地址 - 详细地址
    isPersonalAbroad: bool = Form(...),  # 个人地址 - 是否为国外？
    personalZipcode: str = Form(...),  # 个人地址 - 邮编

    # 执行方案
    recruiters: str = Form(...),  # 招募人员
    requiredCount: int = Form(...),  # 需求人数
    taskType: str = Form(...),  # 任务形态
    educationRequirement: str = Form(...),  # 学历要求
    personalIntroduction: str = Form(...),  # 个人内容介绍 (PR)
    skills: str = Form(...),  # 领域必要相关技能
    onlineOffline: bool = Form(...),  # 是否是线上?
    fullTimePartTime: bool = Form(...),  # 全职/兼职 
    probationaryCompensation: bool = Form(...),  # 试用期间报酬 (有/无)

    # 选择自组织种类
    CategorySelect: str = Form(...),  # 是否选择自组织种类
    
    # 数据库
    db = Depends(get_db)
):
    # 测试阶段
    utils.on_test("上传自组织发起人表格")
    
    table = VolunteersInitiate(
        companyName=companyName,
        legalRepresentative=legalRepresentative,
        establishmentDate=establishmentDate,
        capital=capital,
        totalEmployees=totalEmployees,
        maleEmployees=maleEmployees,
        femaleEmployees=femaleEmployees,
        businessContent=businessContent,
        specialty=specialty,
        companyProvince=companyProvince,
        companyCity=companyCity,
        companyDetailedAddress=companyDetailedAddress,
        isCompanyAbroad=isCompanyAbroad,
        companyZipcode=companyZipcode,
        fullName=fullName,
        gender=gender,
        birthdate=birthdate,
        phone=phone,
        # personalPhoto=personalPhoto, 个人图片先不忙着加进去
        personalProvince=personalProvince,
        personalCity=personalCity,
        personalDetailedAddress=personalDetailedAddress,
        isPersonalAbroad=isPersonalAbroad,
        personalZipcode=personalZipcode,
        recruiters=recruiters,
        requiredCount=requiredCount,
        taskType=taskType,
        educationRequirement=educationRequirement,
        personalIntroduction=personalIntroduction,
        skills=skills,
        onlineOffline=onlineOffline,
        fullTimePartTime=fullTimePartTime,
        probationaryCompensation=probationaryCompensation,
        CategorySelect=CategorySelect,
    )
    
    # 在这里加入个人图片的处理
    img_path = utils.save_file(file=personalPhoto, user_id=114514 , path="aetrix_database/imgs/aboutTables/volunteersSignUp/initiate" , static_path='/tables/imgs/')
    static_path , file_path = img_path[0] , img_path[1]
    table.personalPhoto , table.personalPhotoPath= static_path , file_path
    # 测试
    for i in table:
        print(i)
    
    # 保存表单
    try:
        db_user = user_crud.get_user(db, table.user_id)
        volunteer_initiate_crud.create_volunteers_initiate(db, table, user=db_user)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="表单提交失败")
    return {"message": "表格已成功提交"}

# 根据用户ID获取所有志愿者发起人表格
@app.get("/tables/volunteersignup/initiate/user/{user_id}")
async def read_volunteer_initiates_by_user(user_id: int, db: Session = Depends(get_db)):
    return volunteer_initiate_crud.get_volunteer_initiates_by_user_id(db, user_id)

# 根据发起人ID获取特定志愿者发起人表格
@app.get("/table/volunteersignup/initiate/{initiate_id}")
async def read_volunteer_initiate(initiate_id: int, db: Session = Depends(get_db)):
    volunteer_initiate = volunteer_initiate_crud.get_volunteer_initiate_by_id(db, initiate_id)
    if volunteer_initiate is None:
        raise HTTPException(status_code=404, detail="表单未找到")
    return volunteer_initiate

# 删除特定志愿者发起人表格
@app.delete("/table/volunteersignup/initiate/{initiate_id}")
async def delete_volunteers_initiate(initiate_id: int, db: Session = Depends(get_db)):
    try:
        volunteer_initiate_crud.delete_volunteers_initiate(db, initiate_id)
        return {"message": "表单已删除"}
    except:
        return {"message": "表单删除失败"}

# 返回爬虫协议
@app.get("/robot{path}")
async def robot(path: str):
    return FileResponse("build/aboutHTML/robots.txt")

# 返回页面
@app.get("/{catch_all:path}")
async def catch_all(catch_all: str):
    return FileResponse("build/index.html")