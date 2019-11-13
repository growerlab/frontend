import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { withTranslation, WithTranslation } from 'react-i18next';
import Register from '../../api/user/register';

function RegisterForm(props: FormComponentProps & WithTranslation) {
  const { getFieldDecorator } = props.form;
  const { t } = props;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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

  let handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        let reg = new Register({
          email: '',
          password: '',
          username: '',
        });
        if (!reg.validate()) {
        }
      } else {
        // TODO notice
      }
    });
  };

  let evalValidPassword = function(rule: any, value: String, callback: any) {
    if (!Register.validPassword(value)) {
      callback(props.t('user.tooltip.password'));
    } else {
      callback();
    }
  };

  let evalValidUsername = function(rule: any, value: String, callback: any) {
    if (!Register.validUsername(value)) {
      callback(props.t('user.tooltip.username'));
    } else {
      callback();
    }
  };

  return (
    <div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <h3>{t('user.register')}</h3>
        <Form.Item label={t('user.username')}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: t('user.tooltip.username'),
              },
              {
                validator: evalValidUsername,
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
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: t('user.tooltip.email'),
              },
              {
                required: true,
                message: t('user.tooltip.email'),
              },
            ],
          })(<Input placeholder={t('user.tooltip.email')} />)}
        </Form.Item>
        <Form.Item label={t('user.password')}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: t('user.tooltip.password'),
              },
              {
                validator: evalValidPassword,
              },
            ],
          })(<Input.Password placeholder={t('user.tooltip.password')} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {t('user.register')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

const registerForm = Form.create({ name: 'register' })(withTranslation()(RegisterForm));
export default registerForm;
