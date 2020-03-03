import React, { useEffect } from 'react';
import { Input, Button, Card, Form } from 'antd';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ApolloError, gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import router from 'umi/router';
import Link from 'umi/link';

import { Message } from '../../api/common/notice';
import { UserRules } from '../../api/rule';
import { Login, LoginInfo } from '../../api/user/session';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 3,
      offset: 8,
    },
  },
};

const GQL_REGISTER = gql`
  mutation loginUser($input: LoginUserPayload!) {
    loginUser(input: $input) {
      token
      namespacePath
      email
      name
      publicEmail
    }
  }
`;

interface LoginUserPayload {
  email: string;
  password: string;
}

function LoginForm(props: WithTranslation) {
  const { t } = props;

  const [loginUser] = useMutation<{
    input: LoginUserPayload;
  }>(GQL_REGISTER);

  const onFinish = function(values: {}) {
    loginUser({
      variables: {
        input: values,
      },
    })
      .then((data: any) => {
        if (data.data.loginUser) {
          Login(data.data.loginUser as LoginInfo);
        }
        Message.Success(t('user.tooltip.login_success'));
        router.push('/user/');
      })
      .catch(reason => {});
  };

  return (
    <div>
      <Card
        title={t('user.login')}
        extra={<Link to="/register">{t('user.register')}</Link>}
        style={{ width: 'auto' }}
      >
        <Form {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            name="email"
            label={<span>{t('user.email')} </span>}
            rules={[
              {
                required: true,
                message: t('notice.required'),
              },
              {
                type: 'email',
                message: t('user.tooltip.email'),
              },
            ]}
          >
            <Input placeholder={t('user.tooltip.email')} />
          </Form.Item>
          <Form.Item
            name="password"
            label={t('user.password')}
            rules={[
              {
                required: true,
                message: t('notice.required'),
              },
              {
                min: UserRules.pwdMinLength,
                message: t('user.tooltip.password'),
              },
              {
                max: UserRules.pwdMaxLength,
                message: t('user.tooltip.password'),
              },
              {
                pattern: UserRules.passwordRegex,
                message: t('user.tooltip.password'),
              },
            ]}
          >
            <Input.Password placeholder={t('user.tooltip.password')} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {t('user.login')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default withTranslation()(LoginForm);
