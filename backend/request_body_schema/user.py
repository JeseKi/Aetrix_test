from pydantic import BaseModel , EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    code: Optional[str] = None
    password: Optional[str] = None
    avatar: Optional[str] = None
    avatar_path: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class EmailRequest(BaseModel):
    email: EmailStr

class EmailUpdate(BaseModel):
    email: EmailStr
    code: str
    
class PasswordUpdate(BaseModel):
    old_password: str
    new_password: str
    
class ForgotPassword(BaseModel):
    email: EmailStr
    code: str
    new_password : str