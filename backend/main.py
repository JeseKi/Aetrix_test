from fastapi import FastAPI, Depends, HTTPException , File , UploadFile , Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

import database.crud as CRUD
from database.models import SessionLocal , UserCreate , User
from utils.imgSave import save_avatar_file

app = FastAPI()
app.mount("/users/avatars/", StaticFiles(directory="database/imgs/userAvatars"), name="avatars")

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

# 创建用户的POST请求端点
@app.post("/users/crud/create")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="邮件已存在！")
    return CRUD.create_user(db=db, user=user)

# 获取特定用户的GET请求端点
@app.get("/users/crud/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = CRUD.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 更新特定用户的PUT请求端点
@app.put("/users/crud/{user_id}")
def update_user(
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
        avatar_path = save_avatar_file(avatar, user_id, path="database/imgs/userAvatars" , static_path='/users/avatars/')
        query_result = db.query(User).filter(User.id == user_id).first()
        if query_result and os.path.isfile(query_result.avatar_path):
            # 删除文件
            os.remove(query_result.avatar_path)
        else:
            print("文件不存在")

        user.avatar , user.avatar_path= avatar_path[0] , avatar_path[1]
    
    db_user = CRUD.update_user(db, user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 删除特定用户的DELETE请求端点
@app.delete("/users/crud/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    CRUD.delete_user(db, user_id)
    return {"detail": "用户已删除"}  # 返回用户已删除的消息
