import React from "react";
import { useState } from "react";
import { FolderOpenIcon } from "evergreen-ui";

import { ListItem } from "./ListItem";
import {
  TypeRepositoriesArgs,
  TypeRepository,
} from "../../api/repository/types";
import { Repository } from "../../api/repository/repository";

export function RepositoryList(props: TypeRepositoriesArgs) {
  const { ownerPath } = props;
  const [initLoading, setInitLoading] = useState(false);

  const repo = new Repository({ ownerPath: ownerPath });
  const repoData = repo.list();

  if (repoData === null) {
    return (
      <div>
        <div className="text-center text-1xl ">
          <FolderOpenIcon size={60} className="text-sky-400 inline" />
          <div>暂无仓库</div>
        </div>
      </div>
    );
  }
  const repositories = repoData.repositories;

  const loadMoreBtn = !initLoading ? (
    <div
      style={{
        textAlign: "center",
        marginTop: 12,
        height: 32,
        lineHeight: "32px",
      }}
    >
      {/* <Button onClick={onLoadMore}>更多</Button> */}
    </div>
  ) : null;

  return (
    <div>
      {/*<List*/}
      {/*  className="demo-loadmore-list"*/}
      {/*  loading={initLoading}*/}
      {/*  itemLayout="vertical"*/}
      {/*  loadMore={loadMoreBtn}*/}
      {/*  dataSource={repositories}*/}
      {/*  renderItem={(item) => (*/}
      {/*    <List.Item*/}
      {/*      key={item.uuid}*/}
      {/*      // actions={[<StarOutlined />, <LikeOutlined />, <MessageOutlined />]}*/}
      {/*    >*/}
      {/*      <ListItem*/}
      {/*        pub={item.public}*/}
      {/*        path={"/user/repos/" + item.path}*/}
      {/*        name={item.pathGroup}*/}
      {/*        description={item.description}*/}
      {/*      />*/}
      {/*    </List.Item>*/}
      {/*  )}*/}
      {/*/>*/}
    </div>
  );
}
