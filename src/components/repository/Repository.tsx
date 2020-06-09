import React, { useState } from 'react';
import {
  SettingOutlined,
  CodeOutlined,
  IssuesCloseOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import { Menu, PageHeader, Popover, Tag } from 'antd';
import { LockOutlined } from '@ant-design/icons/lib';
import { withTranslation, WithTranslation } from 'react-i18next';
import {
  GQL_QUERY_REPOSITORY,
  TypeRepository,
  TypeRepositoryArgs,
} from '../../api/repository/graphql';

import { useQuery } from '@apollo/react-hooks';

function Repository(props: WithTranslation & TypeRepositoryArgs) {
  const { t } = props;
  const { ownerPath, path } = props;
  const [current, setCurrent] = useState('code');
  const { SubMenu } = Menu;

  const { data, loading, error } = useQuery<TypeRepository, {}>(GQL_QUERY_REPOSITORY, {
    variables: { ownerPath: ownerPath, path: path },
  });

  if (loading) {
    return 'loading...';
  }

  const handleClick = (e: any) => {
    console.log(e.key);
    if (e.key == 'clone') {
      return;
    }
    setCurrent(e.key);
  };

  return (
    <div>
      <PageHeader
        title={
          <span>
            <Tag color="blue">
              <LockOutlined />
            </Tag>
            {data!.repository.pathGroup}
          </span>
        }
      />
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="code">
          <CodeOutlined />
          Code
        </Menu.Item>
        <Menu.Item key="issues" disabled={true}>
          <IssuesCloseOutlined />
          Issues
        </Menu.Item>
        <Menu.Item key="settings" style={{ float: 'right' }} disabled={true}>
          <SettingOutlined />
          Settings
        </Menu.Item>
        <Menu.Item key="clone" style={{ float: 'right' }} onBlur={() => {}}>
          <CloudDownloadOutlined />
          <Popover
            placement="bottomRight"
            title="Clone or download"
            content={
              <div>
                <div>{data!.repository.gitHttpURL}</div>
                <div>{data!.repository.gitSshURL}</div>
              </div>
            }
          >
            Clone or download
          </Popover>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default withTranslation()(Repository);
