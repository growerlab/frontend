import { FormComponentProps } from 'antd/lib/form';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { List, Button, Skeleton, Avatar, Icon } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Link from 'umi/link';
import Item from './Item';

const GQL_LIST_REPOSITORY = gql`
  query repositories($ownerPath: String!) {
    repositories(ownerPath: $ownerPath) {
      uuid
      path
      name
      description
      createdAt
      owner {
        name
        username
      }
    }
  }
`;

interface RepoData {
  uuid: string;
  name: string;
  path: string;
  description: string;
  createdAt: number;
  Public: boolean;
  // StartCount: number;
  // ForkCount: number;
  // LastUpdatedAt: number;
}

interface Repositories {
  repositories: RepoData[];
}

interface RepositoryArgs {
  ownerPath: string;
}

function RepositoryList(props: WithTranslation & RepositoryArgs) {
  const { t } = props;
  const { ownerPath } = props;
  let defaultRepoData: RepoData[] = [];

  const [initLoading, setInitLoading] = useState(false);
  const [list, setList] = useState(defaultRepoData);

  const { data, loading, error } = useQuery<Repositories, {}>(GQL_LIST_REPOSITORY, {
    variables: { ownerPath: ownerPath },
  });

  useEffect(() => {
    if (!loading && error === undefined) {
      if (data !== undefined) {
        defaultRepoData = defaultRepoData.concat(data!.repositories);
        setList(defaultRepoData);
      }
    }
  }, [loading]);

  const onLoadMore = function() {
    // fetchMore()
    // return defaultRepoData;
  };

  const loadMoreBtn =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        {/* <Button onClick={onLoadMore}>更多</Button> */}
      </div>
    ) : null;

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMoreBtn}
        dataSource={list}
        renderItem={(item: RepoData) => (
          <List.Item
            key={item.uuid}
            actions={[
              <IconText type="star-o" text="0" key="list-vertical-star-o" />,
              <IconText type="like-o" text="0" key="list-vertical-like-o" />,
              <IconText type="message" text="0" key="list-vertical-message" />,
            ]}
          >
            <Item
              ownerPath={ownerPath}
              path={item.path}
              name={item.name}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default withTranslation()(RepositoryList);
