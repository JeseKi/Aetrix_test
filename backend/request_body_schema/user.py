from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: str
    password: Optional[str] = None
    avatar: Optional[str] = None
    avatar_path: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    
class UserLogin(BaseModel):
    email: str
    password: str