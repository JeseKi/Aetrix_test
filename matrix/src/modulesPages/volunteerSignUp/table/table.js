import React , {useState} from "react";
import { Button, Col, Container , Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";

import AddressSelector from "../../tables/compoents/address_selector";
import "./table.css"

export default function VolunteerSignUpTable () {
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
        for (const field of fieldsToCheck) {
            if (!field.value) {
                alert(`${field.name}不能为空`);
                hasEmptyFields = true;
                break; // 遇到第一个空字段后终止循环
            }
        };
        
        if (!hasEmptyFields) {
            console.log("提交表单");
            // 这里可以执行实际的表单提交操作
        };        
    };

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
                />
            </Container>
            <Row>
                <Col>
                    <Button type="button" variant="danger" className="submitButton">取消</Button>
                </Col>
                <Col>
                    <Button type="button" variant="primary" className="submitButton" onClick={handleFormSubmit}>提交</Button>
                </Col>
            </Row>
        </div>
    )
}

function CompanyIntelligence(props) {
    const {
      setCompanyName,
      setLegalRepresentative,
      setEstablishmentDate,
      setCapital,
      setTotalEmployees,
      setMaleEmployees,
      setFemaleEmployees,
      setBusinessContent,
      setSpecialty,
      setCompanyProvince,
      setCompanyCity,
      setCompanyDetailedAddress,
      setIsCompanyAbroad,
      setCompanyZipcode,
    } = props;
  
    return (
      <Form>
        <Row style={{ paddingTop: "1vh" }}>
          <Col>
            <Form.Group>
              <Form.Label>公司名称</Form.Label>
              <Form.Control
                placeholder="XXX有限公司"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Form.Group>
          </Col>
  
          <Col>
            <Form.Group>
              <Form.Label>法定代表人</Form.Label>
              <Form.Control
                placeholder="张三"
                onChange={(e) => setLegalRepresentative(e.target.value)}
              />
            </Form.Group>
          </Col>
  
          <Col>
            <Form.Label>资本金</Form.Label>
            <InputGroup>
              <Form.Control
                placeholder="100"
                onChange={(e) => setCapital(e.target.value)}
              />
              <InputGroup.Text>万元人民币</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <Form.Label>设立日期</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => setEstablishmentDate(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: "1vh" }}>
          <Col>
            <Form.Group>
              <Form.Label>企业全体人数</Form.Label>
              <Form.Control
                type="number"
                placeholder="10"
                onChange={(e) => setTotalEmployees(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>男性人数</Form.Label>
              <Form.Control
                type="number"
                placeholder="5"
                onChange={(e) => setMaleEmployees(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>女性人数</Form.Label>
              <Form.Control
                type="number"
                placeholder="5"
                onChange={(e) => setFemaleEmployees(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row style={{ paddingTop: "1vh" }}>
          <Form.Group>
            <Form.Label>事业内容</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="大数据服务；供应链管理服务；区块链技术相关软件和服务 软件开发..."
              onChange={(e) => setBusinessContent(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row style={{ paddingTop: "1vh" }}>
          <Form.Group>
            <Form.Label>经营特长</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="实际应用区块链技术，将个人价值产能数字可视化的第三代互联网服务社区平台..."
              onChange={(e) => setSpecialty(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Container className="littleContainer">
          <h3>地址信息</h3>
          <Tabs>
            <Tab eventKey="Domestic" title="国内">
              <Row>
                <Col>
                  <AddressSelector
                    setProvince={setCompanyProvince}
                    setCity={setCompanyCity}
                  />
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>详细地址</Form.Label>
                    <Form.Control
                      placeholder="XX区XX街道..."
                      onChange={(e) => {
                        setCompanyDetailedAddress(e.target.value)
                        setIsCompanyAbroad(false)
                    }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>邮编</Form.Label>
                    <Form.Control
                      placeholder="123456"
                      onChange={(e) => setCompanyZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="Foreign" title="国外">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>详细地址</Form.Label>
                    <Form.Control
                      placeholder="XX区XX街道..."
                      onChange={(e) => {
                        setCompanyDetailedAddress(e.target.value)
                        setIsCompanyAbroad(true)
                    }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>邮编</Form.Label>
                    <Form.Control
                      placeholder="123456"
                      onChange={(e) => setCompanyZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </Form>
    );
  };

  function PersonalInformation(props) {
    const {
      setFullName,
      setGender,
      setBirthdate,
      setPhone,
      setPersonalPhoto,
      setPersonalProvince,
      setPersonalCity,
      setPersonalDetailedAddress,
      setIsPersonalAbroad,
      setPersonalZipcode,
    } = props;
  
    return (
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>姓名</Form.Label>
              <Form.Control
                placeholder="张三"
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>性别</Form.Label>
              <Form.Select
                placeholder=""
                onChange={(e) => setGender(e.target.value)}
              >
                <option>选择性别</option>
                <option>男</option>
                <option>女</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>生日年月</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>电话号码</Form.Label>
              <InputGroup>
                <InputGroup.Text>+86</InputGroup.Text>
                <Form.Control
                  placeholder=""
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>上传你的个人图片</Form.Label>
              <Form.Control
                type="file"
                placeholder=""
                onChange={(e) => setPersonalPhoto(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Container className="littleContainer">
          <h3>所在地</h3>
          <Tabs>
            <Tab eventKey="Domestic" title="国内">
              <Row>
                <Col>
                  <AddressSelector
                    setProvince={setPersonalProvince}
                    setCity={setPersonalCity}
                  />
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>详细地址</Form.Label>
                    <Form.Control
                      placeholder="XX区XX街道..."
                      onChange={(e) => {
                        setPersonalDetailedAddress(e.target.value)
                        setIsPersonalAbroad(false)
                    }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>邮编</Form.Label>
                    <Form.Control
                      placeholder="123456"
                      onChange={(e) => setPersonalZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="Foreign" title="国外">
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>详细地址</Form.Label>
                    <Form.Control
                      placeholder="XX区XX街道..."
                      onChange={(e) => {
                        setPersonalDetailedAddress(e.target.value)
                        setIsPersonalAbroad(true)
                    }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>邮编</Form.Label>
                    <Form.Control
                      placeholder="123456"
                      onChange={(e) => setPersonalZipcode(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Container>
      </Form>
    );
  };

  function ExecutionPlan(props) {
    const {
      setRecruiters,
      setRequiredCount,
      setTaskType,
      setEducationRequirement,
      setPersonalIntroduction,
      setSkills,
      setOnlineOffline,
      setFullTimePartTime,
      setProbationaryCompensation,
    } = props;
  
    return (
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>招募人员</Form.Label>
              <Form.Control
                placeholder="数据分析师、前端架构师..."
                onChange={(e) => setRecruiters(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>需求人数</Form.Label>
              <Form.Control
                placeholder="请输入需求人数"
                onChange={(e) => setRequiredCount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>任务形态</Form.Label>
              <Form.Control
                placeholder="数据分析、前端开发..."
                onChange={(e) => setTaskType(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>学历要求</Form.Label>
              <Form.Control
                placeholder="不限"
                onChange={(e) => setEducationRequirement(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>个人内容介绍</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setPersonalIntroduction(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>领域必要技能</Form.Label>
              <Form.Control
                as="textarea"
                onChange={(e) => setSkills(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>线上/线下</Form.Label>
              <Form.Check
                type="radio"
                label="线下"
                name="isOnline"
                id="yes"
                checked
                onChange={() => setOnlineOffline(false)}
              />
              <Form.Check
                type="radio"
                label="线上"
                name="isOnline"
                id="no"
                onChange={() => setOnlineOffline(true)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>全职/兼职</Form.Label>
              <Form.Check
                type="radio"
                label="兼职"
                name="isFullTime"
                id="yes"
                checked
                onChange={() => setFullTimePartTime(false)}
              />
              <Form.Check
                type="radio"
                label="全职"
                name="isFullTime"
                id="no"
                onChange={() => setFullTimePartTime(true)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>试用期间有无报酬?</Form.Label>
              <Form.Check
                type="radio"
                label="无"
                name="haveCompensation"
                id="yes"
                checked
                onChange={() => setProbationaryCompensation(false)}
              />
              <Form.Check
                type="radio"
                label="有"
                name="haveCompensation"
                id="no"
                onChange={() => setProbationaryCompensation(true)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>个人展望发展需求</Form.Label>
              <Form.Control
                as={"textarea"}
                onChange={(e) => setPersonalIntroduction(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  }