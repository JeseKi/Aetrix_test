###### 第三方库 ######
from fastapi import FastAPI, Depends, HTTPException , status
from fastapi.responses import FileResponse , Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

###### 数据库包 ######

# 数据库模型
from aetrix_database.models import User 

###### 请求体包 ######
from request_body_schema.user import UserLogin

###### 工具包 ######
from server_utils import utils , auth

###### APP ######
app = FastAPI()
app.mount("/users/avatars", StaticFiles(directory="aetrix_database/files"), name="avatars")
app.mount("/files", StaticFiles(directory="aetrix_database/files"), name="files")
app.mount("/imgs", StaticFiles(directory="build/imgs"), name="imgs")
app.mount("/static",StaticFiles(directory="build/static"), name="static")

# 子路由
from routes.user_crud import router as user_router
from routes.email_routes import router as email_verification_router
from routes.tables.volunteer_sign_up import router as volunteer_sign_up_router
app.include_router(user_router)
app.include_router(email_verification_router)
app.include_router(volunteer_sign_up_router)


# 添加CORS中间件，以允许跨域资源共享
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源（在生产环境中需要更具体的配置）
    allow_credentials=True,  # 允许跨域请求携带凭据（例如，cookie）
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有HTTP头部
)

# 登录
@app.post("/users/login/email")
async def login_user(infor: UserLogin, db: Session = Depends(utils.get_db)):
    # 测试阶段
    utils.on_test("登录功能")
    
    # 根据邮箱从数据库中获取用户
    user = db.query(User).filter(User.email == infor.email).first()

    # 检查用户是否存在
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="用户不存在!")

    # 验证密码
    if user.password == infor.password:
        token = auth.create_access_token(data={"user_id": user.id})
        # 日志
        # utils.event_time_log(f"生成token:{token}")
        return {
            "id" : user.id,
            "detail" : "登录成功",
            "token" : token
        }
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="密码错误!")

@app.post("/token")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(utils.get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or user.password != form_data.password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="邮箱或密码错误")

    token = auth.create_access_token(data={"user_id": user.id})
    return {"access_token": token, "token_type": "bearer"}

# 根据token获取用户信息    
@app.get("/verify-token")
async def verify_user_token(response: Response, token_info: dict = Depends(auth.verify_token)):
    # 这里token_info已经包含了user_id和新的Token
    return token_info

# 返回爬虫协议
@app.get("/robot{path}")
async def robot(path: str):
    return FileResponse("build/aboutHTML/robots.txt")

# 返回页面
@app.get("/{catch_all:path}")
async def catch_all(catch_all: str):
    return FileResponse("build/index.html")