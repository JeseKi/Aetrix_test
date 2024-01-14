import React from "react"
import "./page.css"

export default function MainPage () {
    return(
        <div>
            <TopHalf />
            <BottomHalf />
        </div>
    )
}

function TopHalf () {
    return (
    <div className="topHalf">
        <a href="/"><img className="logo" alt="主页" src="/imgs/mainPageImgs/LogoWithText.png"/></a>
        <p className="title">ÆTRIX</p>
        <div className="moduleEntrys">
            <a href="/modules/volunteer/introduction">
                <div className="moduleEntry">
                    <img src="/imgs/mainPageImgs/VolunteerSignUp.svg" alt="报名志愿者" title="报名志愿者"/>
                    <p>报名志愿者</p>
                </div>
            </a>
        </div>
    </div>
    )
}

function BottomHalf () {
    return (
    <div className="bottomHalf">
     <h2>价值回归</h2>
     <h1>将原本属于人们的价值还给他们</h1>
    </div>
    )
}