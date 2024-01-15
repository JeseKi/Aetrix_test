import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container";

import "./navbar.css"

export default function AetrixNavBar ({src , textColor}) {
    return (
        <Navbar className="navbar_top">
                <Nav.Link href="/">
                    <img className="logo" alt="主页" src={src}/>
                </Nav.Link>
                <Container className="text" style={{color:textColor}}>
                    <Nav.Link href="/about">关于ÆTRIX</Nav.Link>
                    <Nav.Link href="/cooperation">联系我们</Nav.Link>
                    <Nav.Link href="/user/login">登录</Nav.Link>
                </Container>
        </Navbar>
    )
}