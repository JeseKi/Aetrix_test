import React from "react";
import { Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import {NavLink} from "react-router-dom"

import AetrixNavBar from "../../navbar";

import "./signup.css"

export default function SignUp () {
    return (
        <div>
            <AetrixNavBar src={"/imgs/mainPageImgs/LogoWithText_black.svg"} textColor={"black"} />
            <h1 className="signUpTitle">ÆTRIX</h1>
            <Container className="signUpForm">
                <h2>注册Ætrix</h2>
                <p>已有账号?<NavLink to="../login" className="NavLink" >立刻登录!</NavLink></p>
                <Form className="signUpInput">
                    <FloatingLabel
                        controlId="UserName"
                        label="用户名"
                    >
                        <Form.Control type="text" placeholder="" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="Email"
                        label="邮箱地址"
                        className="signUpInput"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel className="signUpInput" controlId="Password" label="密码">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <Container className="signUpInput">
                        <Row className="align-items-center">
                            <Col>
                            <FloatingLabel controlId="GetVerificationCode" label="验证码">
                                <Form.Control type="text" placeholder="验证码" />
                            </FloatingLabel>
                            </Col>
                            <Col xs="auto">
                            <Button type="button">
                                获取验证码
                            </Button>
                            </Col>
                        </Row>
                    </Container>
                    <Button className="signUpSubmit" variant="primary" type="submit">
                        注册
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
