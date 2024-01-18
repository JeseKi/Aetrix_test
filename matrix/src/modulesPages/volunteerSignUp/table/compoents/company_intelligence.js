import React from "react";
import { Col, Container , Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";

import Address_Table from "../../../tables/compoents/address_selector";

// 公司情报
export default function CompanyIntelligence(props) {
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
        <Address_Table title={"公司地址"} setProvince={setCompanyProvince} setCity={setCompanyCity} setDetailedAddress={setCompanyDetailedAddress} setIsAbroad={setIsCompanyAbroad} setZipcode={setCompanyZipcode} />
      </Form>
    );
  };