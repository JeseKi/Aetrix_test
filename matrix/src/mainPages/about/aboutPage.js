import React from "react";
import Container from "react-bootstrap/Container";

import AetrixNavBar from "../navbar";
import "./aboutPage.css"

export default function About () {
    return(
        <div className="aboutPage">
            <AetrixNavBar src={"/imgs/mainPageImgs/LogoWithText_black.svg"} textColor={"black"} isPublic={true}/>
            <div className="aboutContentContainer">
                <Container className="container">
                    <span className="title">关于ÆTRIX</span>
                    <span className="content">ÆTRIX是一个创新型组织，专注于通过“体外创新”来推动社会和经济发展。这种创新是指在主流学界、传统业内、旧产业与旧商业体系之外进行的创新活动，旨在构建“边缘价值网”。</span>
                </Container>
                <hr style={{borderWidth:"3px"}}/>
                <Container className="container">
                    <span className="content" style={{marginLeft:"0",width:"41%"}}>
                    ÆTRIX的1.0所尝试的服装自组织是一种新型商业模式，基于web3逻辑，
                    通过自组织网络和大v传播，实现合作与共享收益。它不依赖单一出资方，而是通过大v的公众信用和全产业链参与构建商业信用组织，形
                    成可传承的微产业联盟。ÆTRIX平台通过区块链技术和智能合约支持这一模式的发展。
                    </span>
                    <span className="title" style={{marginLeft:"20%"}}>ÆTRIX1.0 服装自组织</span>
                </Container>
            </div>
        </div>
    )
}