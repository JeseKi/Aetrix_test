import React, { useEffect, useState } from "react";
import {Routes , Route , useNavigate , useParams } from "react-router-dom"
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

import AetrixNavBar from "../navbar";
import Login from "./login/login";
import SignUp from "./signup/signup";
import "./user.css"
import UplaodFile from "../../modulesPages/tables/compoents/upload_file";

export default function User () {

    return (
        <div>
            <AetrixNavBar src={"/imgs/mainPageImgs/LogoWithText_black.svg"} textColor={"black"} isPublic={true}/>
            <Routes>
                <Route path="infor/:userID" element={<UserInfor />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </div>
    )
}

function UserInfor() {
    // 使用 useState 创建 userInfor 状态，并初始化为 null
    const [userInfor, setUserInfor] = useState(null);
    const localUserID = localStorage.getItem('userID');

    // 使用 useState 创建用户信息的各个状态，并初始化为空字符
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');

    // 处理上传的图片文件
    const [file, setFile] = useState(null);

    // 重定向
    const navigate = useNavigate();

    // 从 URL 参数中提取 userID，用 useParams() 钩子
    const { currentUserID } = useParams();

    // token
    const token = localStorage.getItem('token');

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
                    localStorage.setItem("userID", tokenInfo.id)
                } else {
                    navigate("../login");
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    // 使用 useEffect 发送 HTTP 请求，获取用户信息
    useEffect(() => {
        if (!token) {
            navigate('../login');
        }
        else {
            fetchUserData();
        }
    }, [fetchUserData , navigate , token]);

    // 显示信息
    useEffect(() => {
        if (userInfor) {
            console.log(userInfor)
            setUsername(userInfor.username || '');
            setEmail(userInfor.email || '');
            // 注意：通常不应从API直接获取密码字段
            setPassword(userInfor.password || ''); 
            setPhone(userInfor.phone || '');
            setBio(userInfor.bio || '');
            setAvatar(userInfor.avatar || '')
        }
    }, [userInfor]);

    // 更新用户信息的函数
    function updateInfor() {
        const formData = new FormData();
    
        // 添加字符串类型的数据
        formData.append('user_id',localUserID)
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);  // 考虑安全性，通常密码不应该这样传输
        formData.append('phone', phone);
        formData.append('bio', bio);
    
        // 添加文件类型的数据
        if (file)
    
     {
            formData.append('avatar', file);
        }
    
        // 发送PUT请求到后端
        fetch(`http://127.0.0.1:8000/users/crud/${localUserID}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if (response.status === 200) {
                alert("保存成功！"); // 如果响应状态为200，显示保存成功提示
                window.location.reload();
            };
            return response.json();
        })
        .then(data => {
            console.log('Update success:', data); // 打印更新成功的数据
        })
        .catch(error => console.error('Error:', error)); // 处理错误
    }

    // 获取用户信息，并在用户ID不正确时重定向到正确的页面
    useEffect(() => {
        if (localUserID) {
            fetch(`http://127.0.0.1:8000/users/crud/${localUserID}`)
            .then(response => response.json())
            .then(data => setUserInfor(data))
            .catch(error => console.error('Error', error));
        }
        if (currentUserID !== localUserID) {
            navigate(`../infor/${localUserID}`)
        }
    }, [localUserID , navigate , currentUserID]);
    // 渲染用户信息表单
    return (
        <Container className="userInforContainer">
            <img src={"http://127.0.0.1:8000"+avatar} alt="头像" className="avatar"/>
            <Form.Control type="text" value={username} className="name" onChange={e => setUsername(e.target.value)}/>
            <Modal.Dialog>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Form.Label>更改头像?</Form.Label>
                            <UplaodFile setUploadFile={setFile} size_limit={3} fileTypes={['image/jpeg', 'image/png']}/>
                        </Row>
                        <Form.Group className="formMargin">
                            <Row>
                                <Col>
                                    <Form.Label>个人简介</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        value={bio}
                                        onChange={e => setBio(e.target.value)}
                                        />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label>邮件地址</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        autoFocus
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>电话号码</Form.Label>
                                    <Form.Control
                                        value={phone}
                                        onChange={e=> setPhone(e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Row>
                    <Col className="formMargin">
                        <Button variant="danger">
                            更改密码
                        </Button>
                    </Col>
                </Row>
                <Modal.Footer>
                    <Button variant="secondary">
                        关闭
                    </Button>
                    <Button variant="primary" className="buttonMargin" onClick={updateInfor}>
                        保存
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Container>
    )
}