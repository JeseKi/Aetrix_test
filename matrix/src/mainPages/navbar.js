import React , {useState , useEffect} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";

import "./navbar.css"

export default function AetrixNavBar ({src , textColor , isPublic}) {
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

    // token
    const token = localStorage.getItem('token');

    // 使用 useEffect 发送 HTTP 请求，获取用户信息
    useEffect(() => {
        fetchUserData();
    }, []);

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
                } 
            } catch (error) {
                localStorage.setItem("userID", null)
                localStorage.setItem("token", null)
            }
        }
    };
    // 获取用户信息
    useEffect(() => {
        if (localUserID) {
            fetch(`http://127.0.0.1:8000/users/crud/${localUserID}`)
            .then(response => response.json())
            .then(data => setUserInfor(data))
            .catch(error => console.error('Error', error));
        }
    }, [localUserID]);

    function changeDisplay () {
        if (avatar) {
            return (
                <img className="avatar" alt="头像" style={{width:"3vw",height:"3vw"}} src={"http://127.0.0.1:8000"+avatar} />)
        }
        else {
            return "登录"
        }
    }

    return (
        <Navbar className="navbar_top">
                <Nav.Link href="/">
                    <img className="logo" alt="主页" src={src}/>
                </Nav.Link>
                <Container className="text" style={{color:textColor}}>
                    <Nav.Link href="/about">关于ÆTRIX</Nav.Link>
                    <Nav.Link href="/cooperation">联系我们</Nav.Link>
                    <Nav.Link href="/users/login">{changeDisplay()}</Nav.Link>
                </Container>
        </Navbar>
    )
}