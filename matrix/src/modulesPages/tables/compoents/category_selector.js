import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function SelfOrganizedSelect({ setCategorySelect }) {
    const categories = ["艺术", "音乐", "设计", "服装", "剪辑", "摄影", "AI", "互联网", "创业", "副业自组织"];
    const [selectedCategory,

 setSelectedCategory] = useState('');

    const handleCategoryChange = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
        setCategorySelect(newCategory); // 向外传递所选的种类
    };

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