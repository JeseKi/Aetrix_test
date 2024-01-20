from fastapi import Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import Optional

from utils import Utils
utils = Utils()

# 用于获取Token的路径
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Auth():
    def __init__(self) -> None:
        # 应用的秘密密钥和算法
        self.SECRET_KEY = "43d14c69e3d0" # 这应该是一个安全的、随机的值
        self.ALGORITHM = "HS256"
    def create_access_token(self, data: dict, expires_delta: timedelta = timedelta(days=3)):
        # 创建JWT Token的方法
        to_encode = data.copy()  # 复制传入的数据，以便修改
        expire = datetime.utcnow() + expires_delta  # 设置Token的过期时间
        to_encode.update({"exp": expire})  # 向数据中添加过期时间
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)  # 生成JWT
        return encoded_jwt  # 返回生成的JWT

    def verify_token(self, response: Response, token: str = Depends(oauth2_scheme)):
        # 验证JWT Token的方法
        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )  # 准备一个401未授权的异常
        # 日志
        # utils.event_time_log(f"获得Token：{token}", True)
        try:
            # 尝试解码JWT Token
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            user_id: int = payload.get("user_id")  # 获取Token中的用户ID
            if user_id is None:  # 如果用户ID为空，则抛出异常
                raise credentials_exception
        except JWTError:
            # 如果解码失败，抛出异常
            raise credentials_exception
        # 检查Token是否即将过期（比如小于48小时）
        new_token = None
        if (datetime.utcfromtimestamp(payload["exp"]) - datetime.utcnow()) < timedelta(hours=48):
            # 如果即将过期，则生成新的Token
            new_token = self.create_access_token(data={"user_id": user_id}, expires_delta=timedelta(days=3))
        return {
            "id" : user_id,
            "detail" : "token验证成功",
            "token" : new_token if new_token else token
        }