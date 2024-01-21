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
    id: int
    email: EmailStr
    code: str