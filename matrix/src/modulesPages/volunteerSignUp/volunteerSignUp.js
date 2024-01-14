import React, { useEffect, useRef } from 'react';
import { Link, Route, Routes , NavLink} from 'react-router-dom';

import "./volunteerSignUp.css"

export default function VolunteerSignUp() {
  return (
    <div className='modulesbody'>
        <Slide />
    </div>
  );
}

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
            <nav className='slide'>
                <Link className='iconNav' to="/">
                    <img ref={backRootRef} className='icon' src='/imgs/sildeImgs/arrowhead_black.svg' alt='返回'/>
                </Link>
                <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to="/modules/volunteer/introduction"  >志愿者介绍</NavLink>
                <NavLink className={({ isActive }) => isActive ? 'link activeLink' : 'link'} to="/modules/volunteer/signup">志愿者报名</NavLink>
            </nav>
            <div className='contentContainer'>
                <Routes>
                    <Route path='introduction' element={<Content />} />
                    <Route path='signup' element={<Content />} />
                </Routes>
             </div>
        </div>
    )
}

function Content () {
    return (
        <div className='content'>
            Hello World
        </div>
    )
}