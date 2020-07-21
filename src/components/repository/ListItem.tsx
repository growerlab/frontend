import React from 'react';
import { List, Skeleton } from 'antd';
import Link from 'umi/link';

interface Args {
  path: string;
  name: string;
  description: string;
}

export function ListItem(props: Args) {
  const { path, name, description } = props;

  return (
    <div>
      <Skeleton avatar={false} title={false} loading={false} active={true}>
        <List.Item.Meta title={<Link to={path}>{name}</Link>} description={description} />
      </Skeleton>
    </div>
  );
}
