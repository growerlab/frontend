import React from 'react';
import { Row, Col } from 'antd';
import Activate from '../components/user/Activate';
import { withTranslation } from 'react-i18next';

const activateUser = function(props: any) {
  const { t } = props;
  document.title = t('website.activate_user');

  return (
    <div>
      <Row>
        <Col span={6} />
        <Col span={12}>
          <Activate />
        </Col>
        <Col span={6} />
      </Row>
    </div>
  );
};

export default withTranslation()(activateUser);
