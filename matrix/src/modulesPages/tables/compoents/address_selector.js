import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import pc_data from "./pc.json"

function ProvinceCitySelector({setProvince, setCity}) {
    const [provinces] = useState(Object.keys(pc_data)); // 省份列表
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleProvinceChange = (e) => {
        const newSelectedProvince = e.target.value;
        setSelectedProvince(newSelectedProvince);
        setProvince(newSelectedProvince); // 使用新选定的省份值
        setSelectedCity(''); // 重置城市选择
        setCity(''); // 也重置外部组件中的城市
    };

    const handleCityChange = (e) => {
        const newSelectedCity = e.target.value;
        setSelectedCity(newSelectedCity);
        setCity(newSelectedCity); // 使用新选定的城市值
    };

    return (
        <Form>
            <Row>
                <Col>
                    <Form.Group controlId="provinceSelect">
                        <Form.Label>省份</Form.Label>
                        <Form.Control as="select" value={selectedProvince} onChange={handleProvinceChange}>
                            <option value="">选择省份</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>{province}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                
                <Col>
                    <Form.Group controlId="citySelect">
                        <Form.Label>城市</Form.Label>
                        <Form.Control as="select" value={selectedCity} onChange={handleCityChange} disabled={!selectedProvince}>
                            <option value="">选择城市</option>
                            {selectedProvince && pc_data[selectedProvince].map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}

export default ProvinceCitySelector;
