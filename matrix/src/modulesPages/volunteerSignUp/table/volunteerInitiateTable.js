import React , {useState} from "react";
import { Button, Col, Container , Row,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import CompanyIntelligence from "./compoents/company_intelligence";
import PersonalInformation from "./compoents/personal_information";
import ExecutionPlan from "./compoents/execution_plan";
import "./volunteerInitiateTable.css"

export default function VolunteerInitiateTable () {
    const navigate = useNavigate()
    // 公司情报
    const [companyName, setCompanyName] = useState(''); // 公司名称
    const [legalRepresentative, setLegalRepresentative] = useState(''); // 法定代表人姓名
    const [establishmentDate, setEstablishmentDate] = useState(''); // 设立日期
    const [capital, setCapital] = useState(''); // 资本金
    const [totalEmployees, setTotalEmployees] = useState(0); // 从业人员 - 企业全体
    const [maleEmployees, setMaleEmployees] = useState(0); // 从业人员 - 男
    const [femaleEmployees, setFemaleEmployees] = useState(0); // 从业人员 - 女
    const [businessContent, setBusinessContent] = useState(''); // 事业内容
    const [specialty, setSpecialty] = useState(''); // 经营特长
    const [companyProvince, setCompanyProvince] = useState(''); // 公司地址 - 省份
    const [companyCity, setCompanyCity] = useState(''); // 公司地址 - 市
    const [companyDetailedAddress, setCompanyDetailedAddress] = useState(''); // 公司地址 - 详细地址
    const [isCompanyAbroad, setIsCompanyAbroad] = useState(false); // 公司地址 - 是否为国外？
    const [companyZipcode, setCompanyZipcode] = useState(''); // 公司地址 - 邮
    // 个人情报
    const [fullName, setFullName] = useState(''); // 姓名
    const [gender, setGender] = useState(null); // 性别
    const [birthdate, setBirthdate] = useState(''); // 生日年月
    const [phone, setPhone] = useState(''); // 电话
    const [personalPhoto, setPersonalPhoto] = useState(''); // 个人照片
    const [personalProvince, setPersonalProvince] = useState(''); // 个人地址 - 省份
    const [personalCity, setPersonalCity] = useState(''); // 个人地址 - 市
    const [personalDetailedAddress, setPersonalDetailedAddress] = useState(''); // 个人地址 - 详细地址
    const [isPersonalAbroad, setIsPersonalAbroad] = useState(false); // 个人地址 - 是否为国外？
    const [personalZipcode, setPersonalZipcode] = useState(''); // 个人地址 - 邮编
    // 执行方案
    const [recruiters, setRecruiters] = useState(''); // 招募人员
    const [requiredCount, setRequiredCount] = useState(0); // 需求人数
    const [taskType, setTaskType] = useState(''); // 任务形态
    const [educationRequirement, setEducationRequirement] = useState(''); // 学历要求
    const [personalIntroduction, setPersonalIntroduction] = useState(''); // 个人内容介绍 (PR)
    const [skills, setSkills] = useState(''); // 领域必要相关技能
    const [onlineOffline, setOnlineOffline] = useState(false); // 是否是线上?
    const [fullTimePartTime, setFullTimePartTime] = useState(false); // 全职/兼职
    const [probationaryCompensation, setProbationaryCompensation] = useState(false); // 试用期间报酬 (有/无)

    // 选择自组织种类
    const [CategorySelect , setCategorySelect] = useState(''); // 选择自组织种类

    // 表单字典
    const fieldsToCheck = [
        { value: companyName, name: "公司名称" },
        { value: legalRepresentative, name: "法定代表人姓名" },
        { value: establishmentDate, name: "设立日期" },
        { value: capital, name: "资本金" },
        { value: totalEmployees, name: "企业全体人数" },
        { value: maleEmployees, name: "男性人数" },
        { value: femaleEmployees, name: "女性人数" },
        { value: businessContent, name: "事业内容" },
        { value: specialty, name: "经营特长" },
        { value: companyProvince, name: "公司地址 - 省份" },
        { value: companyCity, name: "公司地址 - 市" },
        { value: companyDetailedAddress, name: "公司地址 - 详细地址" },
        { value: companyZipcode, name: "公司地址 - 邮编" },
        { value: fullName, name: "姓名" },
        { value: gender, name: "性别" },
        { value: birthdate, name: "生日年月" },
        { value: phone, name: "电话" },
        { value: personalPhoto, name: "个人照片" },
        { value: personalProvince, name: "个人地址 - 省份" },
        { value: personalCity, name: "个人地址 - 市" },
        { value: personalDetailedAddress, name: "个人地址 - 详细地址" },
        { value: personalZipcode, name: "个人地址 - 邮编" },
        { value: recruiters, name: "招募人员" },
        { value: requiredCount, name: "需求人数" },
        { value: taskType, name: "任务形态" },
        { value: educationRequirement, name: "学历要求" },
        { value: personalIntroduction, name: "个人内容介绍 (PR)" },
        { value: skills, name: "领域必要相关技能" },
        { value: CategorySelect, name: "自组织种类" },
      ];
      
    // 处理表单提交
    const handleFormSubmit = () => {
        let hasEmptyFields = false;
        // 调试
        // console.log("正在提交\n")
        // console.log("公司情报:");
        // console.log("公司名称:", companyName);
        // console.log("法定代表人姓名:", legalRepresentative);
        // console.log("设立日期:", establishmentDate);
        // console.log("资本金:", capital);
        // console.log("从业人员 - 企业全体:", totalEmployees);
        // console.log("从业人员 - 男:", maleEmployees);
        // console.log("从业人员 - 女:", femaleEmployees);
        // console.log("事业内容:", businessContent);
        // console.log("经营特长:", specialty);
        // console.log("公司地址 - 省份:", companyProvince);
        // console.log("公司地址 - 市:", companyCity);
        // console.log("公司地址 - 详细地址:", companyDetailedAddress);
        // console.log("公司地址 - 是否为国外？", isCompanyAbroad);
        // console.log("公司地址 - 邮编:", companyZipcode);
        // 
        // console.log("个人情报:");
        // console.log("姓名:", fullName);
        // console.log("性别:", gender);
        // console.log("生日年月:", birthdate);
        // console.log("电话:", phone);
        // console.log("个人照片:", personalPhoto);
        // console.log("个人地址 - 省份:", personalProvince);
        // console.log("个人地址 - 市:", personalCity);
        // console.log("个人地址 - 详细地址:", personalDetailedAddress);
        // console.log("个人地址 - 是否为国外？", isPersonalAbroad);
        // console.log("个人地址 - 邮编:", personalZipcode);
        // 
        // console.log("执行方案:");
        // console.log("招募人员:", recruiters);
        // console.log("需求人数:", requiredCount);
        // console.log("任务形态:", taskType);
        // console.log("学历要求:", educationRequirement);
        // console.log("个人内容介绍 (PR):", personalIntroduction);
        // console.log("领域必要相关技能:", skills);
        // console.log("是否是线上?", onlineOffline);
        // console.log("全职/兼职:", fullTimePartTime);
        // console.log("试用期间报酬 (有/无):", probationaryCompensation);
        // console.log("自组织种类:", CategorySelect);
        for (const field of fieldsToCheck) {
            if (!field.value) {
                alert(`${field.name}不能为空`);
                hasEmptyFields = true;
                break; // 遇到第一个空字段后终止循环
            }
        };
        
        if (!hasEmptyFields) {
            console.log("提交表单");
            submitVolunteerForm()
        };        
    };
    // 提交表单逻辑
    async function submitVolunteerForm() {
        // token获取
        const token = localStorage.getItem('token');
        // 创建一个空的 FormData 对象
        const formData = new FormData();

        // 添加公司情报
        formData.append('companyName', companyName);
        formData.append('legalRepresentative', legalRepresentative);
        formData.append('establishmentDate', establishmentDate);
        formData.append('capital', capital);
        formData.append('totalEmployees', totalEmployees.toString());
        formData.append('maleEmployees', maleEmployees.toString());
        formData.append('femaleEmployees', femaleEmployees.toString());
        formData.append('businessContent', businessContent);
        formData.append('specialty', specialty);
        formData.append('companyProvince', companyProvince);
        formData.append('companyCity', companyCity);
        formData.append('companyDetailedAddress', companyDetailedAddress);
        formData.append('isCompanyAbroad', isCompanyAbroad.toString());
        formData.append('companyZipcode', companyZipcode);

        // 添加个人情报
        formData.append('fullName', fullName);
        formData.append('gender', gender);
        formData.append('birthdate', birthdate);
        formData.append('phone', phone);
        formData.append('personalPhoto', personalPhoto);
        formData.append('personalProvince', personalProvince);
        formData.append('personalCity', personalCity);
        formData.append('personalDetailedAddress', personalDetailedAddress);
        formData.append('isPersonalAbroad', isPersonalAbroad.toString());
        formData.append('personalZipcode', personalZipcode);

        // 添加执行方案
        formData.append('recruiters', recruiters);
        formData.append('requiredCount', requiredCount.toString());
        formData.append('taskType', taskType);
        formData.append('educationRequirement', educationRequirement);
        formData.append('personalIntroduction', personalIntroduction);
        formData.append('skills', skills);
        formData.append('onlineOffline', onlineOffline.toString());
        formData.append('fullTimePartTime', fullTimePartTime.toString());
        formData.append('probationaryCompensation', probationaryCompensation.toString());

        // 添加选择自组织种类
        formData.append('CategorySelect', CategorySelect);
    
        // 添加图片文件
        if (personalPhoto) {
            formData.append('img', personalPhoto);
        }
    
        try {
            const response = await fetch('/tables/volunteersignup/initiate/submit', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
    
            if (response.ok) {
                console.log("Form submitted successfully");
                alert("提交成功")
                // 处理响应
            } else {
                console.error("Form submission failed");
                alert("提交失败")
                // 处理错误
            }
        } catch (error) {
            console.error("Error submitting form", error);
        }
    }
    
    return (
        <div className="div">
            <h1>报名自组织发起人</h1>
            <Container className="tableContainer">
                <h2>公司情报</h2>
                <CompanyIntelligence 
                    setCompanyName={setCompanyName}
                    setLegalRepresentative={setLegalRepresentative}
                    setEstablishmentDate={setEstablishmentDate}
                    setCapital={setCapital}
                    setTotalEmployees={setTotalEmployees}
                    setMaleEmployees={setMaleEmployees}
                    setFemaleEmployees={setFemaleEmployees}
                    setBusinessContent={setBusinessContent}
                    setSpecialty={setSpecialty}
                    setCompanyProvince={setCompanyProvince}
                    setCompanyCity={setCompanyCity}
                    setCompanyDetailedAddress={setCompanyDetailedAddress}
                    setIsCompanyAbroad={setIsCompanyAbroad}
                    setCompanyZipcode={setCompanyZipcode}
                />
                <hr />
                <h2>个人情报</h2>
                <PersonalInformation 
                  setFullName={setFullName}
                  setGender={setGender}
                  setBirthdate={setBirthdate}
                  setPhone={setPhone}
                  setPersonalPhoto={setPersonalPhoto}
                  setPersonalProvince={setPersonalProvince}
                  setPersonalCity={setPersonalCity}
                  setPersonalDetailedAddress={setPersonalDetailedAddress}
                  setIsPersonalAbroad={setIsPersonalAbroad}
                  setPersonalZipcode={setPersonalZipcode}
                />
                <hr />
                <h2>执行方案</h2>
                <ExecutionPlan 
                  setRecruiters={setRecruiters}
                  setRequiredCount={setRequiredCount}
                  setTaskType={setTaskType}
                  setEducationRequirement={setEducationRequirement}
                  setPersonalIntroduction={setPersonalIntroduction}
                  setSkills={setSkills}
                  setOnlineOffline={setOnlineOffline}
                  setFullTimePartTime={setFullTimePartTime}
                  setProbationaryCompensation={setProbationaryCompensation}
                  setCategorySelect={setCategorySelect}
                />
            </Container>
            <Row>
                <Col>
                    <Button type="button" variant="danger" className="submitButton" onClick={() => navigate(-1)}>取消</Button>
                </Col>
                <Col>
                    <Button type="button" variant="primary" className="submitButton" onClick={handleFormSubmit}>提交</Button>
                </Col>
            </Row>
        </div>
    )
}
