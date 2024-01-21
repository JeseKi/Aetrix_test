###### 第三方库 ######
from fastapi import APIRouter, Depends, HTTPException , File , UploadFile , Form
from sqlalchemy.orm import Session

###### 数据库包 ######
# CRUD操作
## 用户CRUD
import aetrix_database.user_crud as user_crud
## 表格CRUD
import aetrix_database.tables.tables_crud.volunteerSignUp as volunteer_crud
volunteer_initiate_crud = volunteer_crud.VolunteersInitiateCRUD()
volunteer_signup_crud = volunteer_crud.VolunteersSignUpCRUD()

###### 请求体包 ######
from request_body_schema.volunteer_sign_up import VolunteersInitiate , VolunteersSignUp

###### 工具包 ######
from utils import Utils
# 常用工具
utils = Utils()

router = APIRouter()

# 提交志愿者发起人表格
@router.put("/tables/volunteersignup/initiate/submit")
async def tables_volunteersignup_initiate_submit(
    # 公司情报
    companyName: str = Form(...),  # 公司名称
    legalRepresentative: str = Form(...),  # 法定代表人姓名
    establishmentDate: str = Form(...),  # 设立日期
    capital: str = Form(...),  # 资本金
    totalEmployees: int = Form(...),  # 从业人员 - 企业全体
    maleEmployees: int = Form(...),  # 从业人员 - 男
    femaleEmployees: int = Form(...),  # 从业人员 - 女
    businessContent: str = Form(...),  # 事业内容
    specialty: str = Form(...),  # 经营特长
    companyProvince: str = Form(...),  # 公司地址 - 省份
    companyCity: str = Form(...),  # 公司地址 - 市
    companyDetailedAddress: str = Form(...),  # 公司地址 - 详细地址
    isCompanyAbroad: bool = Form(...),  # 公司地址 - 是否为国外？
    companyZipcode: str = Form(...),  # 公司地址 - 邮

    # 个人情报
    fullName: str = Form(...),  # 姓名
    gender: str = Form(...),  # 性别
    birthdate: str = Form(...),  # 生日年月
    phone: str = Form(...),  # 电话
    personalPhoto: UploadFile = File(None),  # 个人照片
    personalProvince: str = Form(...),  # 个人地址 - 省份
    personalCity: str = Form(...),  # 个人地址 - 市
    personalDetailedAddress: str = Form(...),  # 个人地址 - 详细地址
    isPersonalAbroad: bool = Form(...),  # 个人地址 - 是否为国外？
    personalZipcode: str = Form(...),  # 个人地址 - 邮编

    # 执行方案
    recruiters: str = Form(...),  # 招募人员
    requiredCount: int = Form(...),  # 需求人数
    taskType: str = Form(...),  # 任务形态
    educationRequirement: str = Form(...),  # 学历要求
    personalIntroduction: str = Form(...),  # 个人内容介绍 (PR)
    skills: str = Form(...),  # 领域必要相关技能
    onlineOffline: bool = Form(...),  # 是否是线上?
    fullTimePartTime: bool = Form(...),  # 全职/兼职 
    probationaryCompensation: bool = Form(...),  # 试用期间报酬 (有/无)

    # 选择自组织种类
    CategorySelect: str = Form(...),  # 是否选择自组织种类
    
    # 数据库
    db = Depends(utils.get_db)
):
    # 测试阶段
    utils.on_test("上传自组织发起人表格")
    
    table = VolunteersInitiate(
        companyName=companyName,
        legalRepresentative=legalRepresentative,
        establishmentDate=establishmentDate,
        capital=capital,
        totalEmployees=totalEmployees,
        maleEmployees=maleEmployees,
        femaleEmployees=femaleEmployees,
        businessContent=businessContent,
        specialty=specialty,
        companyProvince=companyProvince,
        companyCity=companyCity,
        companyDetailedAddress=companyDetailedAddress,
        isCompanyAbroad=isCompanyAbroad,
        companyZipcode=companyZipcode,
        fullName=fullName,
        gender=gender,
        birthdate=birthdate,
        phone=phone,
        # personalPhoto=personalPhoto, 个人图片先不忙着加进去
        personalProvince=personalProvince,
        personalCity=personalCity,
        personalDetailedAddress=personalDetailedAddress,
        isPersonalAbroad=isPersonalAbroad,
        personalZipcode=personalZipcode,
        recruiters=recruiters,
        requiredCount=requiredCount,
        taskType=taskType,
        educationRequirement=educationRequirement,
        personalIntroduction=personalIntroduction,
        skills=skills,
        onlineOffline=onlineOffline,
        fullTimePartTime=fullTimePartTime,
        probationaryCompensation=probationaryCompensation,
        CategorySelect=CategorySelect,
    )
    
    # 在这里加入个人图片的处理
    img_path = utils.save_file(file=personalPhoto, user_id=114514 , path="aetrix_database/files" , static_path='/files')
    static_path , file_path = img_path[0] , img_path[1]
    table.personalPhoto , table.personalPhotoPath= static_path , file_path
    # 测试
    # for i in table:
    #     print(i)
    
    # 保存表单
    try:
        db_user = await user_crud.get_user(db, table.user_id)
        volunteer_initiate_crud.create_volunteers_initiate(db, table, user=db_user)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="表单提交失败")
    return {"message": "表格已成功提交"}

# 根据用户ID获取所有志愿者发起人表格
@router.get("/tables/volunteersignup/initiate/user/{user_id}")
async def read_volunteer_initiates_by_user(user_id: int, db: Session = Depends(utils.get_db)):
    return await volunteer_initiate_crud.get_volunteer_initiates_by_user_id(db, user_id)

# 根据发起人ID获取特定志愿者发起人表格
@router.get("/table/volunteersignup/initiate/{initiate_id}")
async def read_volunteer_initiate(initiate_id: int, db: Session = Depends(utils.get_db)):
    volunteer_initiate = await volunteer_initiate_crud.get_volunteer_initiate_by_id(db, initiate_id)
    if volunteer_initiate is None:
        raise HTTPException(status_code=404, detail="表单未找到")
    return volunteer_initiate

# 删除特定志愿者发起人表格
@router.delete("/table/volunteersignup/initiate/{initiate_id}")
async def delete_volunteers_initiate(initiate_id: int, db: Session = Depends(utils.get_db)):
    try:
        await volunteer_initiate_crud.delete_volunteers_initiate(db, initiate_id)
        return {"message": "表单已删除"}
    except:
        return {"message": "表单删除失败"}
    
@router.put("/tables/volunteersignup/signup/submit")
async def tables_volunteersignup_signup_submit(
    user_id: int = 1,
    # 个人信息
    fullName: str = Form(...) ,
    gender: str = Form(...) ,
    birthdate: str = Form(...) ,
    phone: str = Form(...),
    personalPhoto: UploadFile = None,
    personalProvince: str = Form(...),
    personalCity: str = Form(...),
    personalDetailedAddress: str = Form(...),
    isPersonalAbroad: bool = False,
    personalZipcode: str = Form(...),

    # 其他信息
    CategorySelect: str = Form(...),
    executionPlan: UploadFile = None,
    resume: UploadFile = None,
    wechat: str = Form(...),
    volunteerDescription: str = Form(...),
    volunteerTasks: str = Form(...),
    personalExpectations: str = Form(...),
    interviewAppointment: bool = Form(...),
    onlineInterviewAcceptance: bool = Form(...),
    communityWorkForm: str = Form(...),
    
    db: Session = Depends(utils.get_db)
):
    # 测试阶段
    utils.on_test("上传志愿者报名表格")
    
    table = VolunteersSignUp(
        user_id=user_id,
        fullName=fullName,
        gender=gender,
        birthdate=birthdate,
        phone=phone,
        # personalPhoto=personalPhoto,
        personalProvince=personalProvince,
        personalCity=personalCity,
        personalDetailedAddress=personalDetailedAddress,
        isPersonalAbroad=isPersonalAbroad,
        personalZipcode=personalZipcode,
        CategorySelect=CategorySelect,
        # executionPlan=executionPlan,
        # resume=resume,
        wechat=wechat,
        volunteerDescription=volunteerDescription,
        volunteerTasks=volunteerTasks,
        personalExpectations=personalExpectations,
        interviewAppointment=interviewAppointment,
        onlineInterviewAcceptance=onlineInterviewAcceptance,
        communityWorkForm=communityWorkForm
    )
    photo = utils.save_file(file=personalPhoto, user_id=user_id, path="aetrix_database/files" , static_path='files')
    execution_plan = utils.save_file(file=executionPlan, user_id=user_id, path="aetrix_database/files" , static_path='files')
    resume_path = utils.save_file(file=resume, user_id=user_id, path="aetrix_database/files" , static_path='files')
    
    table.personalPhoto , table.personalPhotoPath= photo[0] , photo[1]
    table.executionPlan , table.executionPlanPath= execution_plan[0] , execution_plan[1]
    table.resume , table.resumePath= resume_path[0] , resume_path[1]
    
    # 测试
    # for i in table:
    #     print(i)
    
    try:
        user = user_crud.get_user(db, table.user_id)
        await volunteer_signup_crud.create_volunteers_sign_up(db=db, sign_up_data=table, user=user)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="表单提交失败")
    return {"message": "表格已成功提交"}

# 根据用户ID获取所有志愿者报名人表格
@router.get("/tables/volunteersignup/signup/user/{user_id}")
async def read_volunteer_signup_by_user(user_id: int, db: Session = Depends(utils.get_db)):
    table_list = await volunteer_signup_crud.get_volunteers_sign_up_by_user_id(db, user_id)
    if table_list != []:
        return table_list
    else:
        raise HTTPException(status_code=200, detail="该用户未报名任何志愿者")
    
# 根据表格ID获取特定志愿者报名人表格
@router.get("/table/volunteersignup/signup/{signup_id}")
async def read_volunteer_signup(signup_id: int, db: Session = Depends(utils.get_db)):
    volunteer_signup = await volunteer_signup_crud.get_volunteers_sign_up_by_id(db, signup_id)
    if volunteer_signup is None:
        raise HTTPException(status_code=404, detail="表单未找到")
    return volunteer_signup

# 删除特定志愿者报名表格
@router.delete("/table/volunteersignup/signup/{signup_id}")
async def delete_volunteers_sign_up(signup_id: int, db: Session = Depends(utils.get_db)):
    try:
        await volunteer_signup_crud.delete_volunteers_sign_up(db, signup_id)
        return {"message": "表单已删除"}
    except:
        return {"message": "表单删除失败"}