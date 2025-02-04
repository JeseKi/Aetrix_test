from pydantic import BaseModel
from typing import Optional

class VolunteersInitiate(BaseModel):
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
    personalPhotoOriginalName : Optional[str] = None
    personalPhotoPath: Optional[str] = None
    personalProvince: str = ''
    personalCity: str = ''
    personalDetailedAddress: str = ''
    isPersonalAbroad: bool = False
    personalZipcode: str = ''

    # 执行方案
    recruiters: str = ''
    requiredCount: str = 0
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

class VolunteersSignUp(BaseModel):
    # 个人信息
    fullName: str = ''
    gender: str = None
    birthdate: str = ''
    phone: str = ''
    personalPhoto: Optional[str] = None
    personalPhotoOriginalName: Optional[str] = None
    personalPhotoPath: Optional[str] = None
    personalProvince: str = ''
    personalCity: str = ''
    personalDetailedAddress: str = ''
    isPersonalAbroad: bool = False
    personalZipcode: str = ''

    # 其他信息
    CategorySelect: str = ''
    executionPlan: str = ''
    executionPlanOriginalName: str = ''
    executionPlanPath: Optional[str] = None
    resume: str = ''
    resumeOriginalName: str = ''
    resumePath : Optional[str] = None
    wechat: str = ''
    volunteerDescription: str = ''
    volunteerTasks: str = ''
    personalExpectations: str = ''
    interviewAppointment: bool = False
    onlineInterviewAcceptance: bool = False
    communityWorkForm: str = ''

    class Config:
        from_attributes = True