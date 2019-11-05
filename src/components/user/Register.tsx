import React from "react";
import { Form, Input, Tooltip, Icon, AutoComplete, Button, Select } from "antd";
import { FormComponentProps } from "antd/lib/form/Form";
import { withTranslation, WithTranslation } from "react-i18next";
import { validPassword, validUsername } from "./validate";

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

  validPassword = (rule: any, value: String, callback: any) => {
    if (!validPassword(value)) {
      callback(this.props.t("user.tooltip.password"));
    } else {
      callback();
    }
  };

  validUsername = (rule: any, value: String, callback: any) => {
    if (!validUsername(value)) {
      callback(this.props.t("user.tooltip.username"));
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;
    const { t } = this.props;

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
          <h3>{t("user.register")}</h3>
          <Form.Item
            label={
              <span>
                {t("user.email")}{" "}
                <Tooltip title={t("user.tooltip.email_tip")}>
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: t("user.tooltip.email")
                },
                {
                  required: true,
                  message: t("user.tooltip.email")
                }
              ]
            })(<Input placeholder={t("user.tooltip.email")} />)}
          </Form.Item>
          <Form.Item label={t("user.password")} hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  validator: this.validPassword
                }
              ]
            })(<Input.Password placeholder={t("user.tooltip.password")} />)}
          </Form.Item>
          <Form.Item label={t("user.username")}>
            {getFieldDecorator("username", {
              rules: [
                {
                  validator: this.validUsername
                }
              ]
            })(<Input placeholder={t("user.tooltip.username")} />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              {t("user.register")}
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
