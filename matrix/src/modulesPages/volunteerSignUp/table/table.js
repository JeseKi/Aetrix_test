import React , {useState} from "react";
import { Col, Container , Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";

import AddressSelector from "../../tables/compoents/address_selector";
import "./table.css"

export default function VolunteerSignUpTable () {
    // 公司和个人的地址
    // const [companyAddress, setCompanyAddress] = useState('');
    // const [personalAddress, setPersonalAddress] = useState('');

    return (
        <div>
            <h1>报名自组织发起人</h1>
            <Container className="tableContainer">
                <h2>公司情报</h2>
                <CompanyIntelligence />
                <hr />
                <h2>个人情报</h2>
                <PersonalInformation />
                <hr />
                <h2>执行方案</h2>
                <ExecutionPlan />
            </Container>
        </div>
    )
}

function CompanyIntelligence () {

    return (
        <Form>
            <Row style={{paddingTop:"1vh"}}>
                <Col>
                    <Form.Group>
                        <Form.Label>公司名称</Form.Label>
                        <Form.Control placeholder="XXX有限公司"/>
                    </Form.Group>
                </Col>

                <Col>
                    <Form.Group>
                        <Form.Label>法定代表人</Form.Label>
                            <Form.Control placeholder="张三"/>
                    </Form.Group>
                </Col>
                
                <Col>
                        <Form.Label>资本金</Form.Label>
                        <InputGroup>
                            <Form.Control placeholder="100"/>
                            <InputGroup.Text>万元人民币</InputGroup.Text>
                        </InputGroup>
                </Col>
                <Col>
                    <Form.Label>设立日期</Form.Label>
                    <Form.Control type="date" />
                </Col>
            </Row>
            <Row style={{paddingTop:"1vh"}}>
                <Col>
                    <Form.Group>
                        <Form.Label>企业全体人数</Form.Label>
                        <Form.Control type="number" placeholder="10" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>男性人数</Form.Label>
                        <Form.Control type="number" placeholder="5" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>女性人数</Form.Label>
                        <Form.Control type="number" placeholder="5" />
                    </Form.Group>
                </Col>
            </Row>
            <Row style={{paddingTop:"1vh"}}>
                <Form.Group>
                    <Form.Label>事业内容</Form.Label>
                    <Form.Control as="textarea" placeholder="大数据服务；供应链管理服务；区块链技术相关软件和服务 软件开发..."/>
                </Form.Group>
            </Row>
            <Row style={{paddingTop:"1vh"}}>
                <Form.Group>
                    <Form.Label>经营特长</Form.Label>
                    <Form.Control as="textarea" placeholder="实际应用区块链技术，将个人价值产能数字可视化的第三代互联网服务社区平台..." />
                </Form.Group>
            </Row>
                <Container className="littleContainer">
                    <h3>地址信息</h3>
                    <Tabs>
                        <Tab eventKey="Domestic" title="国内">
                            <Row>
                                <Col>
                                    <AddressSelector />
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>详细地址</Form.Label>
                                        <Form.Control placeholder="XX区XX街道..." />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>邮编</Form.Label>
                                        <Form.Control placeholder="123456" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="Foreign" title="国外">
                        <Row>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>详细地址</Form.Label>
                                        <Form.Control placeholder="XX区XX街道..." />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>邮编</Form.Label>
                                        <Form.Control placeholder="123456" />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </Container>
        </Form>
    )
}

function PersonalInformation () {
    return(
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>姓名</Form.Label>
                        <Form.Control placeholder="张三" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>性别</Form.Label>
                        <Form.Select placeholder="">
                            <option>选择性别</option>
                            <option>男</option>
                            <option>女</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>生日年月</Form.Label>
                        <Form.Control type="date" />
                    </Form.Group>
                 </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>电话号码</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>
                                +86
                            </InputGroup.Text>
                            <Form.Control placeholder="" />
                        </InputGroup>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>上传你的个人图片</Form.Label>
                        <Form.Control type="file" placeholder="" />
                    </Form.Group>
                </Col>
            </Row>
            <Container className="littleContainer">
                <h3>所在地</h3>
                <Tabs>
                    <Tab eventKey="Domestic" title="国内">
                        <Row>
                            <Col>
                                <AddressSelector />
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>详细地址</Form.Label>
                                    <Form.Control placeholder="XX区XX街道..." />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>邮编</Form.Label>
                                    <Form.Control placeholder="123456" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Tab>
                    <Tab eventKey="Foreign" title="国外">
                    <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>详细地址</Form.Label>
                                    <Form.Control placeholder="XX区XX街道..." />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>邮编</Form.Label>
                                    <Form.Control placeholder="123456" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Tab>
                </Tabs>
            </Container>
        </Form>
    )
}

function ExecutionPlan () {
    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>招募人员</Form.Label>
                        <Form.Control placeholder="数据分析师、前端架构师..." />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>需求人数</Form.Label>
                        <Form.Control placeholder="请输入需求人数" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>任务形态</Form.Label>
                        <Form.Control placeholder="数据分析、前端开发..." />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>学历要求</Form.Label>
                        <Form.Control placeholder="不限" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>个人内容介绍</Form.Label>
                        <Form.Control as="textarea" />
                    </Form.Group>
                </Col>
                <Col sm={2}>
                    <Form.Group>
                        <Form.Label>试用期间有无报酬?</Form.Label>
                        <Form.Check
                            type="radio"
                            label="有"
                            name="haveCompensation"
                            id="yes"
                        />
                        <Form.Check 
                            type="radio"
                            label="无"
                            name="haveCompensation"
                            id="no"
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>个人展望发展需求</Form.Label>
                        <Form.Control as={"textarea"} />
                    </Form.Group>
                 </Col>
            </Row>
        </Form>
    )
}