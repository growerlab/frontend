import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from '../components/user/Login';
import { withTranslation } from 'react-i18next';

const login = function(props: any) {
  const { t } = props;
  document.title = t('website.login');

  return (
    <div>
      <Row>
        <Col span={6} />
        <Col span={12}>
          <LoginForm />
        </Col>
        <Col span={6} />
      </Row>
    </div>
  );
};

export default withTranslation()(login);
