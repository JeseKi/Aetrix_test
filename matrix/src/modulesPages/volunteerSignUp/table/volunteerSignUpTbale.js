import React from "react"
import { Container } from "react-bootstrap"

import Address_Table from "../../tables/compoents/address_selector"
import SelfOrganizedSelect from "../../tables/compoents/category_selector"
import UplaodImg from "../../tables/compoents/upload_img"
import "./volunteerInitiateTable.css"

export default function VolunteerSignUpTable() {
    return (
        <div className="div">
            <h1>自组织志愿者报名</h1>
            <Container className="tableContainer">
                <h1>个人情报</h1>
            </Container>
        </div>
    )
}