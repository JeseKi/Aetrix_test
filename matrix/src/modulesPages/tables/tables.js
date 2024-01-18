import React from "react";
import { Route, Routes } from "react-router-dom";

import VolunteerInitiateTable from "../volunteerSignUp/table/volunteerInitiateTable";
import VolunteerSignUpTable from "../volunteerSignUp/table/volunteerSignUpTbale";
import AetrixNavBar from "../../mainPages/navbar"

export default function Tables () {
    return (
            <div>
                <AetrixNavBar src="/imgs/mainPageImgs/LogoWithText_black.svg" textColor="black"/>
                <Routes>
                    <Route path="volunteerinitiate" element={<VolunteerInitiateTable />} />
                    <Route path="volunteersignup" element={<VolunteerSignUpTable />} />"
                </Routes>
                <div style={{height:"10vh"}}></div>
            </div>
    )
}