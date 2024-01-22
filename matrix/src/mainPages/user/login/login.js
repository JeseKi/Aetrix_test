import React, { useState , useEffect } from "react";
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button  from "react-bootstrap/Button"
import Container from "react-bootstrap/Container";
import {NavLink, useNavigate} from "react-router-dom"

import "./login.css"

export default function Login () {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const userID = localStorage.getItem('userID');
    const token = localStorage.getItem('token');

    const navigate = useNavigate()

    useEffect(() => {
        if (userID && token) {
            // 如果已登录，重定向到信息页面
            console.log("userID:",userID, "token:", token);
            navigate(`../infor/${userID}`);
        }
    }, [navigate , userID , token]); // 添加navigate作为依赖

    const userData = {
        email: email,
        password: password
    }
    function userLogin() {
        fetch('http://127.0.0.1:8000/users/login/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw { status: response.status, body: response.json() };  // 抛出包含状态码和响应体的错误
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userID', data.user_id);
                console.log("跳转到用户信息界面")
                window.location.reload()
                navigate(`../infor/${data.id}`);
            }
        })
        .catch(async (error) => {
            console.error('Error:', error);
            const errorBody = await error.body;  // 异步获取错误的具体信息
            alert(errorBody.detail)
        });
    }
    
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
                        <Form.Control type="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} style={{height:"5vh"}}/>
                    </FloatingLabel>
                    <FloatingLabel className="loginInput" controlId="Password" label="密码">
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={{height:"5vh"}}/>
                    </FloatingLabel>
                </Form>
                <NavLink to="../forgetpassword" className="NavLink" style={{marginLeft:"40%" }}>忘记密码？</NavLink>
                <Button className="loginSubmit" variant="primary" type="submit" onClick={userLogin}>
                        登录
                </Button>
            </Container>
        </div>
    )
}
