from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    code: Optional[str] = None
    password: Optional[str] = None
    avatar: Optional[str] = None
    avatar_path: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    
class UserLogin(BaseModel):
    email: str
    password: str
    
class EmailRequest(BaseModel):
    email: str

class EmailUpdate(BaseModel):
    email: str
    code: str
    
class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str
    
class ForgotPassword(BaseModel):
    email: str
    code: str
    new_password : str