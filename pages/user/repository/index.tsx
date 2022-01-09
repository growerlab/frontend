import React from 'react';
// @ts-ignore
import {FormComponentProps} from '@ant-design/compatible/lib/form';

import {RepositoryList} from '../../../components/repository/List';
import {getUserInfo} from '../../../api/user/session';
import {getTitle} from '../../../common/document';
import i18n from '../../../i18n';

export default function (props: FormComponentProps) {
  getTitle(i18n.t('repository.list'));
  const {form} = props;
  const ownerPath = getUserInfo()!.namespacePath;

  return (
    <div>
      <RepositoryList ownerPath={ownerPath}/>
    </div>
  );
}
