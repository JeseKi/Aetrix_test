import React, { useEffect, useRef } from 'react';
import { Link, Route, Routes , NavLink} from 'react-router-dom';
import { Accordion } from 'react-bootstrap';

import "./volunteerSignUp.css"

export default function VolunteerSignUp() {
  return (
    <div className='modulesbody'>
        <Slide />
    </div>
  );
}
// 实时改变侧边栏的回退箭头
function Slide () {
    // 创建一个ref来引用图像
    const backRootRef = useRef();

    // 实时改变图像
    useEffect(() => {
        // 定义mouseenter和mouseleave事件处理函数
        const handleMouseEnter = () => {
            backRootRef.current.src = '/imgs/sildeImgs/arrowhead_blue.svg';
        };
        const handleMouseLeave = () => {
            backRootRef.current.src = '/imgs/sildeImgs/arrowhead_black.svg';
        };

        // 获取当前的ref元素
        const backRootElem = backRootRef.current;

        // 添加事件监听器
        backRootElem.addEventListener('mouseenter', handleMouseEnter);
        backRootElem.addEventListener('mouseleave', handleMouseLeave);

        // 清除函数，在组件卸载时移除事件监听器
        return () => {
            backRootElem.removeEventListener('mouseenter', handleMouseEnter);
            backRootElem.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []); // 空数组确保effect只在挂载时运行一次

    return (
        <div>
            <nav className='nav'>
                <p className='title'>志愿者报名</p>
            </nav>
            <div className='slide'>
                <Link className='iconNav' to="/">
                        <img ref={backRootRef} className='icon' src='/imgs/sildeImgs/arrowhead_black.svg' alt='返回'/>
                </Link>
                    <Accordion defaultActiveKey="0" className='link'>
                        <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                                报名志愿者
                            </Accordion.Header>
                            <Accordion.Body>
                                <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to='volunteersignup'>报名志愿者</NavLink><p></p>
                                <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to='volunteerinitiate'>发起自组织</NavLink>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
            </div>
            <div className='contentContainer'>
                <Routes>
                    <Route path='volunteersignup' element={<SignUp />} />
                    <Route path='volunteerinitiate' element={<Initiate />} />
                </Routes>
             </div>
        </div>
    )
}

function SignUp () {
    return (
        <div className='content'>
            <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to='/tables/volunteersignup'>报名志愿者</NavLink>
        </div>
    )
}

function Initiate () {
    return(
        <div className='content'>
            <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to='/tables/volunteerinitiate'>发起自组织</NavLink>
        </div>
    )
}