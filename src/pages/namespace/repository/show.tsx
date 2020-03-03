import React, { useState } from 'react';
import {
  SettingOutlined,
  CodeOutlined,
  IssuesCloseOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import {Menu, PageHeader, Popover, Tag} from 'antd';
import {LockOutlined} from "@ant-design/icons/lib";

export default function(props: any) {
  const [current, setCurrent] = useState('code');
  const { SubMenu } = Menu;

  const handleClick = (e: any) => {
    console.log(e.key);
    if (e.key == "clone") {
      return;
    }
    setCurrent(e.key);
  };

  return (
    <div>
      <PageHeader
        title={<span><Tag color="blue"><LockOutlined /></Tag> moli / hello</span>}
      />
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="code">
          <CodeOutlined />
          Code
        </Menu.Item>
        <Menu.Item key="issues" disabled={true}>
          <IssuesCloseOutlined />
          Issues
        </Menu.Item>
        <Menu.Item key="settings" style={{ float: 'right' }} disabled={true}>
          <SettingOutlined />
          Settings
        </Menu.Item>
        <Menu.Item key="clone" style={{ float: 'right' }} onBlur={()=>{}}>
          <CloudDownloadOutlined />
          <Popover
            placement="bottomRight"
            title="Clone or download"
            content={
              <div>
                <div>http</div>
                <div>ssh</div>
              </div>
            }
          >
            Clone or download
          </Popover>
        </Menu.Item>
      </Menu>
    </div>
  );
}
