import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import pc_data from "./pc.json"

function ProvinceCitySelector({setProvince , setCity}) {
    const [provinces, setProvinces] = useState(Object.keys(pc_data)); // 省份列表
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setProvince(selectedProvince);
        setSelectedCity(''); // 重置城市选择
    };

    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        setCity(selectedCity);
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
