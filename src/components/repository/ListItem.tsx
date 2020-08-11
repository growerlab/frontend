import React from 'react';
import { List, Skeleton } from 'antd';
import Link from 'umi/link';
import { showRepoIcon } from './common';

interface Args {
  path: string;
  name: string;
  description: string;
  pub: boolean;
}

export function ListItem(props: Args) {
  const { pub, path, name, description } = props;

  return (
    <div>
      <List.Item.Meta
        title={
          <Link to={path}>
            {showRepoIcon(pub)} {name}
          </Link>
        }
        description={description}
      />
    </div>
  );
}
