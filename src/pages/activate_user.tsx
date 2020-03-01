import React from 'react';
import { Row, Col } from 'antd';
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form';
import Activate from '../components/user/Activate';

export default function ActivateUser(props: FormComponentProps) {
  return (
    <div>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <Activate></Activate>
        </Col>
        <Col span={6}></Col>
      </Row>
    </div>
  );
}
