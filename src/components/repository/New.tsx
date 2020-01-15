import { Form, Switch, Button, Input } from 'antd';

import { FormComponentProps } from 'antd/lib/form';
import { WithTranslation, withTranslation } from 'react-i18next';
import { RepositoryRules } from '../../api/rule';
import { gql, ApolloError } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { Message } from '../../api/common/notice';
import router from 'umi/router';

const GQL_REGISTER = gql`
  mutation createRepository($input: NewRepositoryPayload!) {
    createRepository(input: $input) {
      OK
    }
  }
`;

interface NewRepositoryPayload {
  namespacePath: string;
  name: string;
  public: boolean;
}

function NewRepositoryFrom(props: FormComponentProps & WithTranslation) {
  const { t } = props;
  const { getFieldDecorator } = props.form;

  document.title = t('repository.create_repository');

  const [createRepository, { loading: mutationLoading, error: mutationError }] = useMutation<{
    input: NewRepositoryPayload;
  }>(GQL_REGISTER, {
    onCompleted: (data: any) => {
      Message.Success(t('user.tooltip.login_success'));
      router.push('/user/');
    },
  });

  const handleSubmit = function(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    props.form.validateFields((err, payload: NewRepositoryPayload) => {
      if (!err) {
        createRepository({
          variables: {
            input: payload,
          },
        });
      }
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label={t('repository.owner')}>
        <span className="ant-form-text">moli</span>
      </Form.Item>
      <Form.Item label={t('repository.name')}>
        {getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: t('notice.required'),
            },
            {
              min: RepositoryRules.repositoryNameMinLength,
              message: t('repository.tooltip.name'),
            },
            {
              pattern: RepositoryRules.repositoryNameRegex,
              message: t('repository.tooltip.name'),
            },
          ],
        })(<Input placeholder={t('repository.name')} />)}
      </Form.Item>
      <Form.Item label={t('repository.description')}>
        {getFieldDecorator('description', {
          rules: [
            {
              required: false,
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label={t('repository.public')}>
        {getFieldDecorator('public', { valuePropName: 'checked' })(<Switch />)}
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
  withTranslation()(NewRepositoryFrom),
);
export default newRepositoryForm;
