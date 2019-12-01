import React from 'react';
import { Row, Col } from 'antd';

import { FormComponentProps } from 'antd/lib/form/Form';
import Activate from '../components/user/Activate';

export default function ActivateUser(props: FormComponentProps) {
  return (
    <div>
      <Row>
        <Col span={8}></Col>
        <Col span={8}>
          <Activate></Activate>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
}
