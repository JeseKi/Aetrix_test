import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

/**
 * SelfOrganizedSelect 组件用于选择希望参与的自组织种类。
 * 
 * Props:
 * - setCategorySelect: 一个函数，用于设置父组件中的自组织种类状态。
 */
function SelfOrganizedSelect({ setCategorySelect }) {
    // 定义可选的自组织种类
    const categories = ["艺术", "音乐", "设计", "服装", "剪辑", "摄影", "AI", "互联网", "创业", "副业自组织"];
    // 使用 useState 创建 selectedCategory 状态
    const [selectedCategory, setSelectedCategory] = useState('');

    // 处理选择种类的变化事件
    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        setCategorySelect(newCategory); // 向外传递所选的种类
    };

    // 返回一个表单组件，包含下拉选择框
    return (
        <Form.Group>
            <Form.Label>希望参与的自组织种类</Form.Label>
            <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">选择种类</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}

export default SelfOrganizedSelect;
