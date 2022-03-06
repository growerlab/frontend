// import { LockOutlined, UnlockOutlined } from '@ant-design/icons/lib';
// import React from "react";
import { LockIcon, UnlockIcon } from "evergreen-ui";

const repoPrivateIcon = <LockIcon />;

const repoPublicIcon = <UnlockIcon />;

export function repoIcon(pub: boolean) {
  return pub ? repoPublicIcon : repoPrivateIcon;
}
