import React from 'react';
import { Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import RegisterForm from '../components/user/Register';

export default function Register(props: FormComponentProps) {
  return (
    <div>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <RegisterForm></RegisterForm>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
