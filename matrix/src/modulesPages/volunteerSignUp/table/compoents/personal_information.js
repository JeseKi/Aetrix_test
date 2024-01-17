import React  from "react";
import { Col, Container , Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";

import AddressSelector from "../../../tables/compoents/address_selector";
import UplaodImg from "../../../tables/compoents/upload_img";

  // 个人情报
export default function PersonalInformation(props) {
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
              <UplaodImg setImg={setPersonalPhoto} size_limit={"5"}/>
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
