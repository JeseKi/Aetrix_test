import React from "react";
import {Routes , Route} from "react-router-dom"
import { Button, Container } from "react-bootstrap";

import Login from "./login/login";
import SignUp from "./signup/signup";

export default function User () {
    return (
        <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
        </Routes>
    )
}

function UserInfo () {
    return(
        <Container>
            <button>
                <img src="" alt="头像"/>
            </button>
        </Container>
    )
}