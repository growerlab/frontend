import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { List, Button, Skeleton, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Item from './ListItem';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons/lib';
import {
  GQL_QUERY_REPOSITORIES,
  Repository,
  TypeRepositoriesArgs,
  TypeRepositories,
} from '../../api/repository/graphql';

function RepositoryList(props: WithTranslation & TypeRepositoriesArgs) {
  const { t } = props;
  const { ownerPath } = props;
  const [initLoading, setInitLoading] = useState(false);

  const { data, loading, error } = useQuery<TypeRepositories, {}>(GQL_QUERY_REPOSITORIES, {
    variables: { ownerPath: ownerPath },
  });

  if (loading) {
    return 'loading...';
  }

  // let defaultRepoData: TypeRepositories = { repositories: [] };
  // const [list, setList] = useState<TypeRepositories>(defaultRepoData);

  // useEffect(() => {
  //   if (data !== undefined) {
  //     defaultRepoData.repositories = defaultRepoData.repositories.concat(data!.repositories);
  //     setList(defaultRepoData);
  //   }
  // }, [loading]);

  // const onLoadMore = function() {
  //   fetchMore();
  //   return defaultRepoData;
  // };

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

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="vertical"
        loadMore={loadMoreBtn}
        dataSource={data!.repositories}
        renderItem={(item: Repository) => (
          <List.Item
            key={item.uuid}
            // actions={[<StarOutlined />, <LikeOutlined />, <MessageOutlined />]}
          >
            <Item
              path={'/user/repos/' + item.path}
              name={item.pathGroup}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default withTranslation()(RepositoryList);
