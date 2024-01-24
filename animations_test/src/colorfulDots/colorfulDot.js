import React, { useRef, useEffect, useState } from 'react';

const InfinityPathCanvas = () => {
    const canvasRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const drawDot = (x, y, color) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 创建径向渐变
            const radius = 120;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, color); // 中心为原色
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // 边缘透明

            // 使用渐变填充圆点
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 120;
            ctx.shadowColor = color;
            ctx.fill();

            // 设置合成模式并绘制文本
            ctx.globalCompositeOperation = 'source-atop';
            ctx.font = '300px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Ætrix', dimensions.width / 2, dimensions.height / 2 + 10);
            ctx.globalCompositeOperation = 'source-over'; // 重置合成模式
        };

        const animate = () => {
            const t = frame / 150;
            const centerX = dimensions.width / 2;
            const centerY = dimensions.height / 2;
            const x = centerX + 300 * Math.sin(t);
            const y = centerY + 150 * Math.sin(2 * t);

            const color = `hsl(${frame / 10 % 360}, 100%, 50%)`;

            drawDot(x, y, color);

            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [dimensions]);

    return <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} style={{position: "absolute"}}/>;
}

export default InfinityPathCanvas;
