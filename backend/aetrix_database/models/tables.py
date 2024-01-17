from sqlalchemy import Column, Integer, String , Boolean , ForeignKey
from sqlalchemy.orm import  relationship , declared_attr
from sqlalchemy.ext.declarative import declarative_base

# 创建数据库模型的基类
Base = declarative_base()

# 用户相关的全部表格模型都继承自UserRelatedModel
class UserRelatedModel(Base):
    __abstract__ = True

    @declared_attr
    def user_id(cls):
        return Column(Integer, ForeignKey('users.id'))

# 定义志愿者发起人表格模型
class VolunteersInitiateModel(UserRelatedModel):
    __tablename__ = 'volunteers_initiate'

    id = Column(Integer, primary_key=True, index=True)
    
    # 公司情报
    companyName = Column(String, default='')
    legalRepresentative = Column(String, default='')
    establishmentDate = Column(String, default='')
    capital = Column(String, default='')
    totalEmployees = Column(Integer, default=0)
    maleEmployees = Column(Integer, default=0)
    femaleEmployees = Column(Integer, default=0)
    businessContent = Column(String, default='')
    specialty = Column(String, default='')
    companyProvince = Column(String, default='')
    companyCity = Column(String, default='')
    companyDetailedAddress = Column(String, default='')
    isCompanyAbroad = Column(Boolean, default=False)
    companyZipcode = Column(String, default='')

    # 个人情报
    fullName = Column(String, default='')
    gender = Column(String)
    birthdate = Column(String, default='')
    phone = Column(String, default='')
    personalPhoto = Column(String, default='')
    personalPhotoPath = Column(String, default='')
    personalProvince = Column(String, default='')
    personalCity = Column(String, default='')
    personalDetailedAddress = Column(String, default='')
    isPersonalAbroad = Column(Boolean, default=False)
    personalZipcode = Column(String, default='')

    # 执行方案
    recruiters = Column(String, default='')
    requiredCount = Column(Integer, default=0)
    taskType = Column(String, default='')
    educationRequirement = Column(String, default='')
    personalIntroduction = Column(String, default='')
    skills = Column(String, default='')
    onlineOffline = Column(Boolean, default=False)
    fullTimePartTime = Column(Boolean, default=False)
    probationaryCompensation = Column(Boolean, default=False)

    # 选择自组织种类
    CategorySelect = Column(String, default='')
    
    # 定义与User的关系
    user = relationship("User", back_populates="volunteer_initiates")