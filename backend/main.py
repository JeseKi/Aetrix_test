from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import crud as CRUD
from models import SessionLocal

app = FastAPI()

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
def create_user(username: str, email: str, password: str, db: Session = Depends(get_db)):
    return CRUD.create_user(db=db, username=username, email=email, password=password)

# 获取特定用户的GET请求端点
@app.get("/users/crud/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = CRUD.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 更新特定用户的PUT请求端点
@app.put("/users/crud/{user_id}")
def update_user(user_id: int, username: str, email: str, password: str, db: Session = Depends(get_db)):
    db_user = CRUD.update_user(db, user_id, username, email, password)
    if db_user is None:
        raise HTTPException(status_code=404, detail="用户未找到")  # 用户不存在时抛出HTTP异常
    return db_user

# 删除特定用户的DELETE请求端点
@app.delete("/users/crud/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    CRUD.delete_user(db, user_id)
    return {"detail": "用户已删除"}  # 返回用户已删除的消息
