import React from "react";
import {Routes , Route} from "react-router-dom"

import Login from "./login/login";
import SignUp from "./signup/signup";

export default function User () {
    return (
        <Routes>
            <Route path="/" element={"Hello World"} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
        </Routes>
    )
}