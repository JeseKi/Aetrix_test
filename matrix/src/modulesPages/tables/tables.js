import React from "react";
import { Route, Routes } from "react-router-dom";

import VolunteerSignUpTable from "../volunteerSignUp/table/table";
import AetrixNavBar from "../../mainPages/navbar"

export default function Tables () {
    return (
            <div>
                <AetrixNavBar src="/imgs/mainPageImgs/LogoWithText_black.svg" textColor="black"/>
                <Routes>
                    <Route path="volunteersignup" element={<VolunteerSignUpTable />} />
                </Routes>
                <div style={{height:"10vh"}}></div>
            </div>
    )
}