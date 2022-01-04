import { Tag } from 'antd';
import { LockOutlined, UnlockOutlined } from '@ant-design/icons/lib';
import React from 'react';

const repoPrivateIcon = (
  <Tag color="blue">
    <LockOutlined />
  </Tag>
);

const repoPublicIcon = (
  <Tag color="green">
    <UnlockOutlined />
  </Tag>
);

export function showRepoIcon(pub: boolean) {
  return pub ? repoPublicIcon : repoPrivateIcon;
}
