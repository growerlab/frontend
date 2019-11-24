import React, { useEffect } from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { withTranslation, WithTranslation } from 'react-i18next';
import { ApolloError, gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const passwordRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]+$/s;
const usernameRegex = /^[a-zA-Z0-9_-]+$/s;

const rule = {
  pwdMinLength: 8,
  pwdMaxLength: 32,
  usernameMinLength: 4,
  usernameMaxLength: 40,
};

const GQL_REGISTER = gql`
  mutation registerUser($input: NewUserPayload!) {
    registerUser(input: $input) {
      OK
    }
  }
`;

// interface SaveUser {
//   name: string;
//   email: string;
//   username: string;
//   verified_at: Date;
// }

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
      console.log('onCompleted -- ', data);
    },
    onError: (error: ApolloError) => {
      console.log('onCompletonErrored -- ', error);
    },
  });

  let handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, payload: NewUserPayload) => {
      if (!err) {
        console.log('Received values of form: ', payload);

        registerUser({
          variables: {
            input: payload,
          },
        })
          .catch((reason: any) => {
            console.log('catch -- ', reason);
          })
          .then(value => {
            console.log('then -- ', value);
          });
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
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <h2>{t('user.register')}</h2>
        <Form.Item label={t('user.username')} validateStatus={usernameError ? 'error' : ''}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: t('notice.required'),
              },
              {
                min: rule.usernameMinLength,
                message: t('user.tooltip.username'),
              },
              {
                max: rule.usernameMaxLength,
                message: t('user.tooltip.username'),
              },
              {
                pattern: usernameRegex,
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
                min: rule.pwdMinLength,
                message: t('user.tooltip.password'),
              },
              {
                max: rule.pwdMaxLength,
                message: t('user.tooltip.password'),
              },
              {
                pattern: passwordRegex,
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
    </div>
  );
}

const registerForm = Form.create({ name: 'register' })(withTranslation()(RegisterForm));
export default registerForm;
