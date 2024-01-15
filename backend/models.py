from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic import BaseModel

# 定义数据库连接URL，这里使用SQLite数据库
SQLALCHEMY_DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 创建数据库会话工厂，用于与数据库交互
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# 创建数据库模型的基类
Base = declarative_base()

# 定义用户模型
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)  # 用户ID，主键
    username = Column(String, unique=True, index=True)  # 用户名，唯一且可索引
    email = Column(String, unique=True, index=True)  # 电子邮件地址，唯一且可索引
    password = Column(String)  # 密码字段

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

# 创建所有模型的数据库表
Base.metadata.create_all(bind=engine)
