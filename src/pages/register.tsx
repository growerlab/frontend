import React from 'react';
import { Row, Col } from 'antd';
import RegisterForm from '../components/user/Register';

export default function Register(props: any) {
  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <RegisterForm></RegisterForm>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}
