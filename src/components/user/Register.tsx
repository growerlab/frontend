import React from "react";
import { Form, Input, Tooltip, Icon, AutoComplete, Button, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { withTranslation, WithTranslation } from "react-i18next";

class RegisterForm extends React.Component<
  FormComponentProps & WithTranslation,
  any
> {
  state = {
    autoCompleteResult: []
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  compareToFirstPassword = (
    rule: any,
    value: any,
    callback: { (arg0: string): void; (): void }
  ) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 3,
          offset: 8
        }
      }
    };

    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <h3>{this.props.t("user.register")}</h3>
          <Form.Item
            label={
              <span>
                用户名&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const defaultForm = Form.create({ name: "register" })(
  withTranslation()(RegisterForm)
);
export default defaultForm;
