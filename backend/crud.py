from sqlalchemy.orm import Session
from models import User

# 通过用户ID获取用户
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# 通过电子邮件地址获取用户
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

# 创建新用户
def create_user(db: Session, username: str, email: str, password: str):
    db_user = User(username=username, email=email, password=password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# 更新用户信息
def update_user(db: Session, user_id: int, username: str, email: str, password: str):
    db_user = get_user(db, user_id)
    if db_user:
        db_user.username = username
        db_user.email = email
        db_user.password = password
        db.commit()
        db.refresh(db_user)
    return db_user

# 删除用户
def delete_user(db: Session, user_id: int):
    db_user = get_user(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user
