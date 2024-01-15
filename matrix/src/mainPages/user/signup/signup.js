import {React , useState} from "react";
import { Container, Row, Col, FloatingLabel, Form, Button } from 'react-bootstrap';
import {NavLink , useNavigate} from "react-router-dom";

import "./signup.css"
 
export default function SignUp () {
    const [userName , setUserName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassWord] = useState("");

    const navigate = useNavigate();

    function clickSignUp () {
        // 创建要发送的数据对象
        const userData = {
            username: userName,
            email: email,
            password: password,
            avatar: null,
            phone: null,
            bio: null
        };        

        // 发送POST请求到后端
        fetch('http://localhost:8000/users/crud/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
                return response.json()
            })
        .then(data => {
            console.log('Success:', data);
            if (data.id){
                navigate(`../infor/${data.id}`)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <h1 className="signUpTitle">ÆTRIX</h1>
            <Container className="signUpForm">
                <h2>注册Ætrix</h2>
                <p>已有账号?<NavLink to="../login" className="NavLink" >立刻登录!</NavLink></p>
                <Form className="signUpInput">
                    {/* 输入用户名 */}
                    <FloatingLabel controlId="UserName" label="用户名">
                        <Form.Control type="text" placeholder="" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    </FloatingLabel>

                    {/* 输入邮箱地址 */}
                    <FloatingLabel controlId="Email" label="邮箱地址" className="signUpInput">
                        <Form.Control 
                            type="email" 
                            placeholder="name@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </FloatingLabel>
                    
                    {/* 输入密码 */}
                    <FloatingLabel className="signUpInput" controlId="Password" label="密码">
                        <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </FloatingLabel>
                    <FloatingLabel className="signUpInput" controlId="Password" label="确认密码">
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassWord(e.target.value)}/>
                    </FloatingLabel>

                    {/* 输入验证码 */}
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
                    
                    {/* 提交注册信息 */}
                    <Button className="signUpSubmit" variant="primary" type="button" onClick={clickSignUp}>
                        注册
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
