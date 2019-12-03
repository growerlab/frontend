import React, { useEffect } from 'react';
import { Form, Input, Tooltip, Icon, Button, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ApolloError, gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import router from 'umi/router';
import { Message } from '../../api/common/notice';
import UserRules from '../../api/user/rule';

const GQL_REGISTER = gql`
  mutation registerUser($input: NewUserPayload!) {
    registerUser(input: $input) {
      OK
    }
  }
`;

interface NewUserPayload {
  email: string;
  username: string;
  password: string;
}

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

function RegisterForm(props: FormComponentProps & WithTranslation) {
  const {
    getFieldDecorator,
    getFieldsError,
    isFieldTouched,
    getFieldError,
    validateFields,
  } = props.form;

  const { t } = props;

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const [registerUser, { loading: mutationLoading, error: mutationError }] = useMutation<{
    input: NewUserPayload;
  }>(GQL_REGISTER, {
    onCompleted: (data: any) => {
      Message.Success(t('user.tooltip.register_success'));
      router.push('/login');
    },
  });

  let handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, payload: NewUserPayload) => {
      if (!err) {
        // console.log('Received values of form: ', payload);
        registerUser({
          variables: {
            input: payload,
          },
        });
        // .then(value => {
        //   console.log('then -- ', value);
        // });
      }
    });
  };

  let hasErrors = function(fieldsError: Record<string, string[] | undefined>) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const usernameError = isFieldTouched('username') && getFieldError('username');
  const emailError = isFieldTouched('email') && getFieldError('email');
  const passwordError = isFieldTouched('password') && getFieldError('password');

  return (
    <div>
      <Card
        title={t('user.register')}
        extra={<span>{t('user.tooltip.register_notice')}</span>}
        style={{ width: 'auto' }}
      >
        <Form {...formItemLayout} onSubmit={handleSubmit}>
          <Form.Item label={t('user.username')} validateStatus={usernameError ? 'error' : ''}>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: t('notice.required'),
                },
                {
                  min: UserRules.usernameMinLength,
                  message: t('user.tooltip.username'),
                },
                {
                  max: UserRules.usernameMaxLength,
                  message: t('user.tooltip.username'),
                },
                {
                  pattern: UserRules.usernameRegex,
                  message: t('user.tooltip.username'),
                },
              ],
            })(<Input placeholder={t('user.tooltip.username')} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                {t('user.email')}{' '}
                <Tooltip title={t('user.tooltip.email_tip')}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
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

const registerForm = Form.create({ name: 'register' })(withTranslation()(RegisterForm));
export default registerForm;
