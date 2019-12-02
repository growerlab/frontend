import React from 'react';
import { Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import RegisterForm from '../components/user/Register';

export default function Register(props: FormComponentProps) {
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
