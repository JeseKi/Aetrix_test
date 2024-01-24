import React from "react"

import "./indexPage.css"
import AetrixNavBar from "../navbar"
import InfinityPathCanvas from "../compoents/colorfulDots/colorfulDot"
import TypingEffect from "../compoents/targetTypeEffect/effect"

export default function MainPage () {
    return(
        <div>
            <TopHalf />
        </div>
    )
}

function TopHalf () {

    return (
    <div className="topHalf">
        <AetrixNavBar src={"/imgs/mainPageImgs/LogoWithText.png"} textColor={"white"} isPublic={true}/>
        <InfinityPathCanvas />
        <TypingEffect />
    </div>
    )
}

// function BottomHalf () {
//     return (
//     <div className="bottomHalf">
//      <h2>价值回归</h2>
//      <h1>将原本属于人们的价值还给他们</h1>
//     </div>
//     )
// }