import React from "react";
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button  from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import {NavLink} from "react-router-dom"

import "./login.css"

export default function Login () {
    return (
        <div>
            <h1 className="loginTitle">ÆTRIX</h1>
            <Container className="loginForm">
                <h2>登录Ætrix</h2>
                <p>还没有账号?<NavLink to="../signup" className="NavLink" >立刻注册!</NavLink></p>
                <Form className="loginInput">
                    <FloatingLabel
                        controlId="Email"
                        label="邮箱地址"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>
                    <FloatingLabel className="loginInput" controlId="Password" label="密码">
                        <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>
                    <Button className="loginSubmit" variant="primary" type="submit">
                        登录
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
