import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import RepositoryList from '../../../components/repository/List';
import { GetUserInfo } from '../../../api/user/session';

export default function(props: FormComponentProps) {
  const { form } = props;
  const ownerPath = GetUserInfo()!.namespacePath;

  return (
    <div>
      <RepositoryList ownerPath={ownerPath} />
    </div>
  );
}
