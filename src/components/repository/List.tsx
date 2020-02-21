import { FormComponentProps } from 'antd/lib/form';
import { WithTranslation, withTranslation } from 'react-i18next';
import { List, Button, Skeleton, Avatar } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

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

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMoreBtn}
        dataSource={list}
        renderItem={(item: RepoData) => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
          >
            <Skeleton avatar title={false} loading={false /*item.loading*/} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.description}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default withTranslation()(RepositoryList);
