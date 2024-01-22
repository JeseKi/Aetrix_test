import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row, Button , InputGroup} from "react-bootstrap";

import "./changeMail.css";
export default function ForgetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword , setConfirmpassword] = useState("");
    const [email , setEmail] = useState("")
    const [timer, setTimer] = useState(60);  // 倒计时计数器
    const [sending, setSending] = useState(false);  // 是否正在发送验证码
    const [code, setCode] = useState("");  // 验证码
    const navigate = useNavigate();

    // 发送验证码的函数
    const sendVerificationCode = () => {
        if (sending) return;
    
        // 开始发送验证码
        setSending(true);
        fetch('/send-code/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
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
            alert(`已向邮件地址 ${email} 发送验证码，请注意查收。`)
        })
        .catch((error) => {
            console.error('Error:', error);
            setSending(false);
        });
    };
    const clickChangePassword = () => {
        if (newPassword === "") {
            alert("请输入新密码");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("新密码与确认密码不一致，请仔细检查！");
            return;
        }

        fetch('/users/crud/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, code: code ,new_password: newPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw { status: response.status, body: response.json() }; // 抛出一个包含状态码的错误
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success"){
                console.log('Password changed:', data);
                alert("密码已更改。");
                navigate(-1);
            }
        })
        .catch(async (error) => {
            console.error('Error:', error);
            const errorBody = await error.body; // 异步获取错误的具体信息
            if (error.status === 400) {
                alert("验证码错误，请重新输入！");
            } else if (error.status === 404) {
                alert("用户不存在，请检查邮箱是否正确！");
            } else {
                // 处理其他类型的错误
                alert("发生错误：" + (errorBody.detail || "未知错误"));
            }
        });        
    };

    return (
        <Container className="changeMailContainer">
        <h1>忘记密码？</h1>
            <Container className="changeMailForm" style={{minHeight: "25vh"}}>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>请输入您的邮件地址:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="email" placeholder="邮件地址" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Col>
                    </Row>
                    {/* 输入验证码 */}
                    <Row style={{ marginTop: "20px" }}>
                            <Col>
                                <Form.Label>获取验证码:</Form.Label>
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
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <Form.Label>新密码:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="请输入新密码" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        <Col>
                            <Form.Label>确认密码:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="请二次输入新密码" value={confirmPassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
                        </Col>
                    </Row>
                </Form>
                <div style={{marginTop: "20px"}}>
                    <Button variant="secondary" onClick={() => navigate(-1)}>
                        取消
                    </Button>
                    <Button variant="danger" className="buttonMargin" onClick={clickChangePassword}>
                        确定
                    </Button>
                </div>
            </Container>
        </Container>
    )
}