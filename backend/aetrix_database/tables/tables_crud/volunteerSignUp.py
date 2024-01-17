from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
###### 数据模型 ######
from aetrix_database.models import VolunteersInitiateModel
from aetrix_database.models import User

class VolunteersInitiateCreate(BaseModel):
    # 公司情报
    companyName: str = ''
    legalRepresentative: str = ''
    establishmentDate: str = ''
    capital: str = ''
    totalEmployees: int = 0
    maleEmployees: int = 0
    femaleEmployees: int = 0
    businessContent: str = ''
    specialty: str = ''
    companyProvince: str = ''
    companyCity: str = ''
    companyDetailedAddress: str = ''
    isCompanyAbroad: bool = False
    companyZipcode: str = ''

    # 个人情报
    fullName: str = ''
    gender: str = None
    birthdate: str = ''
    phone: str = ''
    personalPhoto: Optional[str] = None
    personalPhotoPath: Optional[str] = None
    personalProvince: str = ''
    personalCity: str = ''
    personalDetailedAddress: str = ''
    isPersonalAbroad: bool = False
    personalZipcode: str = ''

    # 执行方案
    recruiters: str = ''
    requiredCount: int = 0
    taskType: str = ''
    educationRequirement: str = ''
    personalIntroduction: str = ''
    skills: str = ''
    onlineOffline: bool = False
    fullTimePartTime: bool = False
    probationaryCompensation: bool = False

    # 选择自组织种类
    CategorySelect: str = ''


    class Config:
        from_attributes = True

def create_volunteers_initiate(db: Session, volunteer_initiate_data: VolunteersInitiateCreate, user: User):
    # 使用 Pydantic 模型的 from_orm 方法
    volunteer_initiate_dict = volunteer_initiate_data.dict(exclude_unset=True)
    volunteer_initiate = VolunteersInitiateModel(**volunteer_initiate_dict, user=user)
    db.add(volunteer_initiate)
    db.commit()
    db.refresh(volunteer_initiate)
    return volunteer_initiate

def delete_volunteers_initiate(db: Session, initiate_id: int):
    volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
    if volunteer_initiate is None:
        return None
    db.delete(volunteer_initiate)
    db.commit()
    return volunteer_initiate

def update_volunteers_initiate(db: Session, initiate_id: int, update_data: VolunteersInitiateModel):
    volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
    if volunteer_initiate is None:
        return None
    for key, value in update_data.items():
        setattr(volunteer_initiate, key, value)
    db.commit()
    return volunteer_initiate

def get_volunteer_initiates_by_user_id(db: Session, user_id: int):
    return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.user_id == user_id).all()

def get_volunteer_initiate_by_id(db: Session, initiate_id: int):
    return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
