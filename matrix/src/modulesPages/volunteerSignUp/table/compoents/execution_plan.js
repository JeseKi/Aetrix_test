import React  from "react";
import { Col, Form, Row} from "react-bootstrap";

import SelfOrganizedSelect from "../../../tables/compoents/category_selector";
// 执行方案
export default function ExecutionPlan(props) {
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
      setCategorySelect,
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
            <SelfOrganizedSelect setCategorySelect={setCategorySelect} />
          </Col>
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