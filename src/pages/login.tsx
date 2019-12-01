import React from 'react';

import { Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import LoginForm from '../components/user/Login';

export default function Login(props: FormComponentProps) {
  return (
    <div>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <LoginForm></LoginForm>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
