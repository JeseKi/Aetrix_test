import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row , InputGroup, Button } from "react-bootstrap";

import "./changeMail.css";
export default function ChangeMail() {
    const oldEmail = localStorage.getItem("email");
    const [newEmail, setNewEmail] = useState("");
    const [timer, setTimer] = useState(60);  // 倒计时计数器
    const [sending, setSending] = useState(false);  // 是否正在发送验证码
    const [code, setCode] = useState("");  // 验证码
    const navigate = useNavigate();

    // 获取token
    const token = localStorage.getItem("token");

    // 发送验证码的函数
    const sendVerificationCode = () => {
        if (sending) return;
    
        // 开始发送验证码
        setSending(true);
        fetch('http://127.0.0.1:8000/send-code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: newEmail })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Verification code sent:', data);
            // 开始倒计时
            let countdown = 60;
            const intervalId = setInterval(() => {
                countdown -= 1;
                setTimer(countdown);
                if (countdown <= 0) {
                    clearInterval(intervalId);
                    setSending(false);
                    setTimer(60);
                }
            }, 1000);
            alert(`已向邮件地址 ${newEmail} 发送验证码，请注意查收。`)
        })
        .catch((error) => {
            console.error('Error:', error);
            setSending(false);
        });
    };
    
    const clickChangeEmail = () => {
        if (code === "") {
            alert("请输入验证码");
            return;
        }
        if (newEmail === "") {
            alert("请输入新电子邮箱地址");
            return;
        }
        fetch('http://127.0.0.1:8000/users/update/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token: token , email: newEmail, code: code.toString() })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success"){
            console.log('Email changed:', data);
            alert("电子邮箱地址已更改。");
            localStorage.setItem("email", newEmail);
            navigate(-1);
            }else{
            console.log('Error:', data);
            alert("验证码错误或已过期，请重新获取验证码。");
            }
         })
        .catch((error) => {
            console.error('Error:', error);
            alert("验证码错误或已过期，请重新获取验证码。");
         });
    };

    return (
        <Container className="changeMailContainer">
        <h1>更改电子邮箱地址</h1>
            <Container className="changeMailForm">
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>旧电子邮箱地址:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="email" value={oldEmail} disabled />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <Form.Label>新电子邮箱地址:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="email" placeholder="请输入新电子邮箱地址" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                        </Col>
                    </Row>
                    {/* 输入验证码 */}
                    <Row style={{ marginTop: "20px" }}>
                            <Col>
                                <Form.Label>获取新邮件地址验证码:</Form.Label>
                            </Col>
                            <Col>
                                <InputGroup>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="验证码"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        />
                                    <InputGroup.Text className="verificationCode">
                                        <Button 
                                            onClick={sendVerificationCode} 
                                            disabled={sending}
                                            style={{background:"none" , border:"none"}}>
                                            {sending ? `${timer}秒后重发` : "获取验证码"}
                                        </Button>
                                    </InputGroup.Text>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
                <div style={{marginTop: "20px"}}>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        关闭
                    </Button>
                    <Button variant="primary" className="buttonMargin" onClick={clickChangeEmail}>
                        保存
                    </Button>
                </div>
            </Container>
        </Container>
    )
}