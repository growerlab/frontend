import React from 'react';
import LoginForm from '../components/user/Login';
import { withTranslation } from 'react-i18next';
import { setTitle } from '../common/document';

const login = function(props: any) {
  const { t } = props;
  setTitle(t('website.login'));

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default withTranslation()(login);
