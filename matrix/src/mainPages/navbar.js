import React , {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

import "./navbar.css"

export default function AetrixNavBar ({src , textColor , isPublic}) {
    const token = localStorage.getItem('token');
    const [userID , setUserID] = useState("")
    const [userInfor , setUserInfor] = useState("")

    // 重定向
    const navigate = useNavigate();

    const fetchUserData = async () => {
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/verify-token', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const tokenInfo = await response.json();
                    setUserID(tokenInfo.id)
                    // 发送 GET 请求获取用户信息
                    fetch(`http://127.0.0.1:8000/users/crud/${userID}`)
                    .then(response => response.json()) // 解析响应为 JSON
                    .then(data => setUserInfor(data)) // 更新 userInfor 状态
                    .catch(error => console.error('Error', error)); // 处理错误
                } else {
                    navigate("../login");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    return (
        <Navbar className="navbar_top">
                <Nav.Link href="/">
                    <img className="logo" alt="主页" src={src}/>
                </Nav.Link>
                <Container className="text" style={{color:textColor}}>
                    <Nav.Link href="/about">关于ÆTRIX</Nav.Link>
                    <Nav.Link href="/cooperation">联系我们</Nav.Link>
                    <Nav.Link href="/users/login">登录</Nav.Link>
                </Container>
        </Navbar>
    )
}