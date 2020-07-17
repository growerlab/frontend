import { Form, Button, Input, Checkbox } from 'antd';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import router from 'umi/router';

import { RepositoryRules } from '../../api/rule';
import { Message } from '../../api/common/notice';
import { GetUserInfo } from '../../api/user/session';
import Router from '../../router';
import { Store } from 'antd/lib/form/interface';

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

function NewRepositoryFrom(props: WithTranslation) {
  const { t } = props;
  const [form] = Form.useForm();

  const [createRepository, { loading: mutationLoading, error: mutationError }] = useMutation<{
    input: NewRepositoryPayload;
  }>(GQL_REGISTER, {
    onCompleted: (data: any) => {
      Message.Success(t('repository.tooltip.success'));
      router.push(Router.User.Repository.List);
    },
  });

  const handleSubmit = (values: Store) => {
    var payload = values as NewRepositoryPayload;

    createRepository({
      variables: {
        input: payload,
      },
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Form {...formItemLayout} onFinish={handleSubmit}>
      <Form.Item
        label={t('repository.owner')}
        name="namespacePath"
        initialValue={GetUserInfo()!.namespacePath}
      >
        <Input hidden={true}></Input>
        <span className="ant-form-text">{GetUserInfo()!.name}</span>
      </Form.Item>

      <Form.Item
        label={t('repository.name')}
        name="name"
        rules={[
          {
            required: true,
            message: t('notice.required'),
          },
          {
            pattern: RepositoryRules.repositoryNameRegex,
            message: t('repository.tooltip.name'),
          },
        ]}
      >
        <Input placeholder={t('repository.name')} />
      </Form.Item>

      <Form.Item
        label={t('repository.description')}
        name="description"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="public" label={t('repository.public')} initialValue={true}>
        <Checkbox checked></Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ span: 6, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          {t('repository.create_repository')}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withTranslation()(NewRepositoryFrom);
