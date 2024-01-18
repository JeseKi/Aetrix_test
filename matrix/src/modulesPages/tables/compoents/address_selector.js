import React, { useState } from 'react';
import { Col, Form, Row , Tabs, Tab, Container } from 'react-bootstrap';

import pc_data from "./pc.json"

/**
 * ProvinceCitySelector 组件用于选择省份和城市。
 * 
 * Props:
 * - setProvince: 一个函数，用于设置父组件中的省份状态。
 * - setCity: 一个函数，用于设置父组件中的城市状态。
 */
function ProvinceCitySelector({ setProvince, setCity }) {
    // 使用 useState 创建 provinces、selectedProvince 和 selectedCity 状态
    const [provinces] = useState(Object.keys(pc_data)); // 省份列表
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    /**
     * 处理选择省份的变化事件。
     * 
     * 当用户选择一个省份时，这个函数会被调用。它更新 selectedProvince 状态，
     * 并调用 setProvince 函数以将新选定的省份值传递给父组件。同时，它重置
     * 了城市选择，将 selectedCity 和父组件中的城市状态都重置为空字符串。
     * 
     * @param {Object} e - 事件对象
     */
    const handleProvinceChange = (e) => {
        const newSelectedProvince = e.target.value;
        setSelectedProvince(newSelectedProvince);
        setProvince(newSelectedProvince); // 使用新选定的省份值
        setSelectedCity(''); // 重置城市选择
        setCity(''); // 也重置外部组件中的城市
    };

    /**
     * 处理选择城市的变化事件。
     * 
     * 当用户选择一个城市时，这个函数会被调用。它更新 selectedCity 状态，
     * 并调用 setCity 函数以将新选定的城市值传递给父组件。
     * 
     * @param {Object} e - 事件对象
     */
    const handleCityChange = (e) => {
        const newSelectedCity = e.target.value;
        setSelectedCity(newSelectedCity);
        setCity(newSelectedCity); // 使用新选定的城市值
    };

    // 返回一个表单组件，包含省份和城市选择框
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

function Address_Table({title , setProvince, setCity, setDetailedAddress, setIsAbroad, setZipcode}) {
  const littleContainer = {
    boxShadow: '3px 3px 10px #AAAAAA',
    borderRadius: '10px',
    marginTop: '1vh',
    marginBottom: '1vh',
    padding: '1vw',
  };
  
    return (
        <Container style={littleContainer}>
        <h3>{title}</h3>
        <Tabs>
          <Tab eventKey="Domestic" title="国内">
            <Row>
              <Col>
                <ProvinceCitySelector
                  setProvince={setProvince}
                  setCity={setCity}
                />
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>详细地址</Form.Label>
                  <Form.Control
                    placeholder="XX区XX街道..."
                    onChange={(e) => {
                      setDetailedAddress(e.target.value)
                      setIsAbroad(false)
                  }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>邮编</Form.Label>
                  <Form.Control
                    placeholder="123456"
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="Foreign" title="国外">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>详细地址</Form.Label>
                  <Form.Control
                    placeholder="XX区XX街道..."
                    onChange={(e) => {
                      setDetailedAddress(e.target.value)
                      setIsAbroad(true)
                  }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>邮编</Form.Label>
                  <Form.Control
                    placeholder="123456"
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>
    )
}

export default Address_Table;