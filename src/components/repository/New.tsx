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
  Input
} from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import { WithTranslation, withTranslation } from 'react-i18next';

function NewRepositoryFrom(props: FormComponentProps & WithTranslation) {
  const { t } = props;
  const { getFieldDecorator } = props.form;

  const handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 }
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label={t('repository.owner')}>
        <span className="ant-form-text">moli</span>
      </Form.Item>
      <Form.Item label={t('repository.name')}>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: t('notice.required')
            }
          ]
        })(<Input placeholder={t('repository.name')} />)}
      </Form.Item>
      <Form.Item label={t('repository.description')}>
        {getFieldDecorator('username', {
          rules: [
            {
              required: false
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label={t('repository.public')}>
        {getFieldDecorator('switch', { valuePropName: 'checked' })(<Switch />)}
      </Form.Item>
      <Form.Item wrapperCol={{ span: 6, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          {t('repository.create_repository')}
        </Button>
      </Form.Item>
    </Form>
  );
}

const newRepositoryForm = Form.create({ name: 'newRepository' })(
  withTranslation()(NewRepositoryFrom)
);
export default newRepositoryForm;
