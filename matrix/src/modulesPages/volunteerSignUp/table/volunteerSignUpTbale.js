import React , { useState } from "react"
import { Col, Form, InputGroup, Row , Container} from "react-bootstrap";

import Address_Table from "../../tables/compoents/address_selector"
import SelfOrganizedSelect from "../../tables/compoents/category_selector"
import UploadFile from "../../tables/compoents/upload_file"
import "./volunteerInitiateTable.css"

export default function VolunteerSignUpTable() {
    // 个人情报
    const [fullName, setFullName] = useState(''); // 姓名
    const [gender, setGender] = useState(null); // 性别
    const [birthdate, setBirthdate] = useState(''); // 生日年月
    const [phone, setPhone] = useState(''); // 电话
    const [personalPhoto, setPersonalPhoto] = useState(null); // 个人照片
    const [personalProvince, setPersonalProvince] = useState(''); // 个人地址 - 省份
    const [personalCity, setPersonalCity] = useState(''); // 个人地址 - 市
    const [personalDetailedAddress, setPersonalDetailedAddress] = useState(''); // 个人地址 - 详细地址
    const [isPersonalAbroad, setIsPersonalAbroad] = useState(false); // 个人地址 - 是否为国外？
    const [personalZipcode, setPersonalZipcode] = useState(''); // 个人地址 - 邮编
    const [CategorySelect , setCategorySelect] = useState(''); // 选择自组织种类
    const [executionPlan , setExecitonPlan] = useState(null); // 上传执行计划书
    const [resume , setResume] = useState(null); // 上传个人简历]

    const lineSpacing = {
        marginTop: "2vh"
    }

    return (
        <div className="div">
            <h1>自组织志愿者报名</h1>
            <Container className="tableContainer">
                <Form>
                    <Row style={lineSpacing}>
                        <Col>
                            <Form.Group>
                            <Form.Label>姓名</Form.Label>
                            <Form.Control
                                placeholder="张三"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            </Form.Group>
                        </Col>
                        <Col xs={2}>
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
                        <Col xs={3}>
                            <Form.Group >
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
                        <Col>
                            <Form.Group>
                                    <Form.Label>微信号</Form.Label>
                                    <Form.Control placeholder="请输入微信号" />
                                </Form.Group>
                        </Col>
                    </Row>
                    <Row style={lineSpacing}>
                        <Col>
                            <Form.Group>
                                <Form.Label>上传你的个人照片(不超过3mb)</Form.Label>
                                <UploadFile setUploadFile={setPersonalPhoto} size_limit={3} fileTypes={["image/jpeg","image/png"]}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Address_Table title={"个人地址"} setCity={setPersonalCity} setProvince={setPersonalProvince} setDetailedAddress={setPersonalDetailedAddress} setAbroad={setIsPersonalAbroad} setZipcode={setPersonalZipcode}/>
                            <Form.Group style={lineSpacing}>
                                <Form.Label>志愿者简述</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="要成为自组织的志愿者：1.需要公开自己的技能和资源2.详细的填好表格方便分类进入志愿者项目，辅助发起者参与者进行双向筛选，完成项目落地。" 
                                />
                            </Form.Group>
                            <Form.Group style={lineSpacing}>
                                <Form.Label>志愿者任务</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="以项目运营人员辅助自组织搭建的一员，为自组织提供专业技能或者好想法或者更多链接。"
                                />
                            </Form.Group>
                    <Form.Group style={lineSpacing}>
                        <Form.Label>上传执行计划书(不超过50mb)</Form.Label>
                        <UploadFile setUploadFile={setExecitonPlan} size_limit={50} fileTypes={["application/pdf"]}/>
                        <p style={{fontSize:"0.62em"}}>PPT/xmind 创业计划书，或者是以文字描述想法：1.为什么诞生这个想法？2.这个想法的价值体现在？3你实现这个想法的计划步骤是？</p>
                    </Form.Group>
                    <Form.Group style={lineSpacing}>
                        <Form.Label>个人内容介绍(PR)</Form.Label>
                        <Form.Control 
                            as="textarea"
                            placeholder="自我介绍可附上简历，尽可能全面的描述自己的性格，爱好，技能，及所有可能性，结合实际描述自己对自组织能产生的贡献和价值。"
                        />
                    </Form.Group>
                    <Form.Group style={lineSpacing}>
                        <Form.Label>领域必要技能相关资质(不超过50mb)</Form.Label>
                        <UploadFile setUploadFile={setResume} size_limit={50} fileTypes={["application/zip"]}/>
                        <p style={{fontSize:"0.62em"}}>个人简历，证件照，相关证书等资料，证明自己具备相关技能和资质。</p>
                    </Form.Group>
                    <Form.Group style={lineSpacing}>
                        <Form.Label>个人期望发展需求</Form.Label>
                        <Form.Control 
                            as={"textarea"}
                            placeholder="描述自己在自组织的社群中的角色展望。比如按自己未来规划方向来学习行业角色相关经验和流程或对于加入行业的个人理解和技术需求。"
                        />
                    </Form.Group>
                    <Form.Group style={lineSpacing}>
                        <Form.Label>试用期间报酬</Form.Label>
                        <Form.Control 
                            as={"textarea"}
                            placeholder="志愿者以参与项目为开始，项目用合同可视化来保证各方参与者贡献和最终价值分成。"
                        />
                    </Form.Group>
                    <Row style={lineSpacing}>
                        <Col>
                            <Form.Group>
                                <Form.Label>线下面谈期望(需提前预约)</Form.Label>
                                <Form.Check 
                                    type="radio"
                                    label="有"
                                    name="OfflineMeetingExpectations"
                                    id="yes"
                                    checked
                                />
                                <Form.Check 
                                    type="radio"
                                     label="无"
                                     name="OfflineMeetingExpectations"
                                     id="no"
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>是否接受线上面试</Form.Label>
                                <Form.Check 
                                    type="radio"
                                    label="接受"
                                    name="OnlineInterview"
                                    id="yes"
                                    checked
                                />
                                <Form.Check 
                                    type="radio"
                                     label="拒绝"
                                     name="OnlineInterview"
                                     id="no"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={4}>
                            <h2>社区成员工作形态</h2>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>线上/线下</Form.Label>
                                        <Form.Check 
                                            type="radio"
                                            label="线上"
                                            name="isOnline"
                                            id="online"
                                            checked
                                        />
                                        <Form.Check 
                                            type="radio"
                                            label="线下"
                                            name="isOnline"
                                            id="offline"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>全职/兼职</Form.Label>
                                        <Form.Check 
                                            type="radio"
                                            label="全职"
                                            name="isFulltime"
                                            id="fulltime"
                                            checked
                                        />
                                        <Form.Check 
                                            type="radio"
                                            label="兼职"
                                            name="isFulltime"
                                            id="parttime"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={3}>
                            <SelfOrganizedSelect setCategorySelect={setCategorySelect} />
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}