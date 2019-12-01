import React, { useEffect } from 'react';
import { Form, Input, Tooltip, Icon, Button, Card } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ApolloError, gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import router from 'umi/router';
import { Message } from '../../api/common/notice';
import UserRules from '../../api/user/rule';
import Link from 'umi/link';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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
      OK
    }
  }
`;

interface LoginUserPayload {
  email: string;
  password: string;
}

function LoginForm(props: FormComponentProps & WithTranslation) {
  const { t } = props;

  const {
    getFieldDecorator,
    getFieldsError,
    isFieldTouched,
    getFieldError,
    validateFields,
  } = props.form;

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const [loginUser, { loading: mutationLoading, error: mutationError }] = useMutation<{
    input: LoginUserPayload;
  }>(GQL_REGISTER, {
    onCompleted: (data: any) => {
      Message.Success(t('user.tooltip.register_success'));
      router.push('/login');
    },
    onError: (error: ApolloError) => {
      Message.Error(error.graphQLErrors[0].message);
    },
  });

  let handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, payload: LoginUserPayload) => {
      if (!err) {
        // console.log('Received values of form: ', payload);
        loginUser({
          variables: {
            input: payload,
          },
        });
      }
    });
  };

  const usernameError = isFieldTouched('username') && getFieldError('username');
  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');
  let hasErrors = function(fieldsError: Record<string, string[] | undefined>) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  return (
    <div>
      <Card
        title={t('user.login')}
        extra={<Link to="/register">{t('user.register')}</Link>}
        style={{ width: 'auto' }}
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item
            label={<span>{t('user.email')} </span>}
            validateStatus={emailError ? 'error' : ''}
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: t('notice.required'),
                },
                {
                  type: 'email',
                  message: t('user.tooltip.email'),
                },
              ],
            })(<Input placeholder={t('user.tooltip.email')} />)}
          </Form.Item>
          <Form.Item label={t('user.password')} validateStatus={passwordError ? 'error' : ''}>
            {getFieldDecorator('password', {
              rules: [
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
              ],
            })(<Input.Password placeholder={t('user.tooltip.password')} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
              {t('user.register')}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const loginForm = Form.create({ name: 'login' })(withTranslation()(LoginForm));
export default loginForm;
