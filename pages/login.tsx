import React from 'react';
import { Row, Col } from 'antd';
import LoginForm from '../components/user/Login';
import { withTranslation } from 'react-i18next';
import { setTitle } from '../common/document';

const login = function(props: any) {
  const { t } = props;
  setTitle(t('website.login'));

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
