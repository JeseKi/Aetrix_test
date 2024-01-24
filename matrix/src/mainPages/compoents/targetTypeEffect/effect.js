import React, { useEffect, useState } from "react";
import "./effect.css";

// TypingEffect 组件
function TypingEffect() {
    const fullText = '将原本属于人们的价值还给他们';
    const [text, setText] = useState('');
    const [reverse, setReverse] = useState(false);

    useEffect(() => {
        let timer;
        if (!reverse) {
            if (text !== fullText) {
                timer = setTimeout(() => {
                    setText(fullText.substring(0, text.length + 1));
                }, 200);
            } else {
                timer = setTimeout(() => {
                    setReverse(true);
                }, 1000);
            }
        } else {
            if (text.length !== 0) {
                timer = setTimeout(() => {
                    setText(text.substring(0, text.length - 1));
                }, 50);
            } else {
                setReverse(false);
            }
        }
        return () => clearTimeout(timer);
    }, [text, reverse]);

    return (
        <span className="typing-effect">
            {text}
            <span className="cursor"></span>
        </span>
    );
}

// Title 组件
function Title() {
    const colors = ['#f7f3ec', '#f596aa', '#efbb24', '#00aa90', '#81c7d4'];
    const [currentColor, setCurrentColor] = useState(colors[0]);

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % colors.length;
            setCurrentColor(colors[i]);
        }, 2000);  // 每2000毫秒（2秒）更改一次颜色

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="t-index">
            <h1 className="targetTitle" style={{color: currentColor, textShadow: `0 0 50px ${currentColor}`}}>Value Regression</h1>
            <p className="p" style={{color: currentColor, textShadow: `0 0 50px ${currentColor}`}}><TypingEffect /></p>
        </div>
    )
}

export default Title;
