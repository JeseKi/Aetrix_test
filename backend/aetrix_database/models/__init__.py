from sqlalchemy import create_engine , Column, Integer, String , Boolean , ForeignKey , Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker 
from sqlalchemy.orm import  relationship , declared_attr

# 定义数据库连接URL，这里使用SQLite数据库
SQLALCHEMY_DATABASE_URL = "sqlite:///./aetrix.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# 创建数据库会话工厂，用于与数据库交互
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# 定义用户模型
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)  # 用户ID，主键
    username = Column(String, unique=True, index=True)  # 用户名，唯一且可索引
    email = Column(String, unique=True, index=True)  # 电子邮件地址，唯一且可索引
    password = Column(String)  # 密码字段
    avatar = Column(String)  # 用户头像URL
    avatar_path = Column(String) # 用户头像文件路径
    phone = Column(String, unique=True, index=True)  # 电话号码，唯一且可索引
    bio = Column(Text)  # 用户简介
    # 已有的与志愿者发起人表格的关系
    volunteer_initiates = relationship("VolunteersInitiateModel", back_populates="user")

    # 需要添加的与志愿者报名表格的关系
    volunteers_sign_up = relationship("VolunteersSignUpModel", back_populates="user")

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
    requiredCount = Column(String, default=0)
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
    
class VolunteersSignUpModel(UserRelatedModel):
    __tablename__ = 'volunteers_sign_up'

    id = Column(Integer, primary_key=True, index=True)

    # 个人信息
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

    # 其他信息
    CategorySelect = Column(String, default='')
    executionPlan = Column(String, default='')
    executionPlanPath = Column(String, default='')
    resume = Column(String, default='')
    resumePath = Column(String, default='')
    wechat = Column(String, default='')
    volunteerDescription = Column(String, default='')
    volunteerTasks = Column(String, default='')
    personalExpectations = Column(String, default='')
    interviewAppointment = Column(Boolean, default=False)
    onlineInterviewAcceptance = Column(Boolean, default=False)
    communityWorkForm = Column(String, default='')

    # 定义与User的关系
    user = relationship("User", back_populates="volunteers_sign_up")
    
# 创建所有模型的数据库表
Base.metadata.create_all(bind=engine)
