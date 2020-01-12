import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Input,
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import { WithTranslation, withTranslation } from 'react-i18next';

function NewRepositoryFrom(props: FormComponentProps & WithTranslation) {
  const { t } = props;

  const handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Owner">
        <span className="ant-form-text">moli</span>
      </Form.Item>
      <Form.Item label="Name">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Please input your name',
            },
          ],
        })(<Input placeholder="Please input your name" />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: 'Please input your name',
            },
          ],
        })(<Input placeholder="Please input your name" />)}
      </Form.Item>
    </Form>
  );
}

const newRepositoryForm = Form.create({ name: 'newRepository' })(
  withTranslation()(NewRepositoryFrom),
);
export default newRepositoryForm;
