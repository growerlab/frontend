import React from 'react';
import IndexLayout from '../layouts';
import { Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import RegisterForm from '../components/user/Register';

class Register extends React.Component<FormComponentProps, any> {
  render() {
    return (
      <div>
        <IndexLayout>
          <Row>
            <Col span={8}></Col>
            <Col span={8}>
              <RegisterForm></RegisterForm>
            </Col>
            <Col span={8}></Col>
          </Row>
        </IndexLayout>
      </div>
    );
  }
}

export default Register;
