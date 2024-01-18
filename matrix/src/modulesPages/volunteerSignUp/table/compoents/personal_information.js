import React  from "react";
import { Col, Form, InputGroup, Row} from "react-bootstrap";

import Address_Table from "../../../tables/compoents/address_selector";
import UploadFile from "../../../tables/compoents/upload_file";

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
              <UploadFile setUploadFile={setPersonalPhoto} size_limit={3} fileTypes={["image/jpeg","image/png"]}/>
            </Form.Group>
          </Col>
        </Row>
      <Address_Table title={"个人地址"} setCity={setPersonalCity} setProvince={setPersonalProvince} setDetailedAddress={setPersonalDetailedAddress} setAbroad={setIsPersonalAbroad} setZipcode={setPersonalZipcode}/>
      </Form>
    );
  };
