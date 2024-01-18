from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
###### 数据模型 ######
from aetrix_database.models import VolunteersInitiateModel , VolunteersSignUpModel
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

class VolunteersInitiateCRUD():
    async def create_volunteers_initiate(self,db: Session, volunteer_initiate_data: VolunteersInitiateCreate, user: User):
        # 使用 Pydantic 模型的 from_attributes 方法
        volunteer_initiate_dict = volunteer_initiate_data.dict(exclude_unset=True)
        volunteer_initiate = VolunteersInitiateModel(**volunteer_initiate_dict, user=user)
        db.add(volunteer_initiate)
        db.commit()
        db.refresh(volunteer_initiate)
        return volunteer_initiate

    async def delete_volunteers_initiate(self,db: Session, initiate_id: int):
        volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
        if volunteer_initiate is None:
            return None
        db.delete(volunteer_initiate)
        db.commit()
        return volunteer_initiate

    async def update_volunteers_initiate(self,db: Session, initiate_id: int, update_data: VolunteersInitiateModel):
        volunteer_initiate = db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()
        if volunteer_initiate is None:
            return None
        for key, value in update_data.items():
            setattr(volunteer_initiate, key, value)
        db.commit()
        return volunteer_initiate

    async def get_volunteer_initiates_by_user_id(self,db: Session, user_id: int):
        return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.user_id == user_id).all()

    async def get_volunteer_initiate_by_id(self, db: Session, initiate_id: int):
        return db.query(VolunteersInitiateModel).filter(VolunteersInitiateModel.id == initiate_id).first()

class VolunteersSignUpCreate(BaseModel):
    fullName: str = ''
    gender: Optional[str] = None
    birthdate: str = ''
    phone: str = ''
    personalPhoto: Optional[str] = None
    personalProvince: str = ''
    personalCity: str = ''
    personalDetailedAddress: str = ''
    isPersonalAbroad: bool = False
    personalZipcode: str = ''
    CategorySelect: str = ''
    executionPlan: str = ''
    resume: str = ''
    wechat: str = ''
    volunteerDescription: str = ''
    volunteerTasks: str = ''
    personalExpectations: str = ''
    interviewAppointment: bool = False
    onlineInterviewAcceptance: bool = False
    communityWorkForm: str = ''

    class Config:
        from_attributes = True

class VolunteersSignUpCRUD():
    async def create_volunteers_sign_up(self, db: Session, sign_up_data: VolunteersSignUpCreate, user: User):
        sign_up_dict = sign_up_data.dict(exclude_unset=True)
        sign_up = VolunteersSignUpModel(**sign_up_dict, user=user)
        db.add(sign_up)
        db.commit()
        db.refresh(sign_up)
        return sign_up

    async def delete_volunteers_sign_up(self, db: Session, sign_up_id: int):
        sign_up = db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
        if sign_up is None:
            return None
        db.delete(sign_up)
        db.commit()
        return sign_up

    async def update_volunteers_sign_up(self, db: Session, sign_up_id: int, update_data: VolunteersSignUpModel):
        sign_up = db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
        if sign_up is None:
            return None
        for key, value in update_data.items():
            setattr(sign_up, key, value)
        db.commit()
        return sign_up

    async def get_volunteers_sign_up_by_user_id(self, db: Session, user_id: int):
        return db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.user_id == user_id).all()

    async def get_volunteers_sign_up_by_id(self, db: Session, sign_up_id: int):
        return db.query(VolunteersSignUpModel).filter(VolunteersSignUpModel.id == sign_up_id).first()
