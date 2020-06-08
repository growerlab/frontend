import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { List, Skeleton } from 'antd';
import Link from 'umi/link';

interface Args {
  ownerPath: string;
  path: string;
  name: string;
  description: string;
}

function ListItem(props: WithTranslation & Args) {
  const { ownerPath } = props;
  const { path, name, description } = props;

  return (
    <div>
      <Skeleton avatar={false} title={false} loading={false /*item.loading*/} active={true}>
        <List.Item.Meta
          title={<Link to={'/' + ownerPath + '/' + path}>{name}</Link>}
          description={description}
        />
      </Skeleton>
    </div>
  );
}

export default withTranslation()(ListItem);
