import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row , Button } from "react-bootstrap";

import "./changeMail.css";
export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState(""); //旧密码
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword , setConfirmpassword] = useState("");
    const navigate = useNavigate();

    // 获取token
    const token = localStorage.getItem("token");
    
    const clickChangePassword = () => {
        if (oldPassword === "") {
            alert("请输入旧密码");
            return;
        }
        if (newPassword === "") {
            alert("请输入新密码");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("新密码与确认密码不一致，请仔细检查！");
            return;
        }

        fetch('http://127.0.0.1:8000/users/update/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({old_password: oldPassword, new_password: newPassword })
        })
        .then(response => {
            if (!response.ok) {
                throw {body: response.json()}
            }
            return response.json()
        })
        .then(data => {
            if (data.status === "success"){
            console.log('Password changed:', data);
            alert("密码已更改。");
            navigate(-1);
            }
         })
        .catch(async (error) => {
            const errorBody = await error.body;
            alert(errorBody.detail);
        });
    };

    return (
        <Container className="changeMailContainer">
        <h1>更改密码</h1>
            <Container className="changeMailForm">
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>请输入旧密码:</Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" placeholder="请输入旧密码" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
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