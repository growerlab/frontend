import React, { useState } from 'react';
import {
  SettingOutlined,
  CodeOutlined,
  IssuesCloseOutlined,
  CloudDownloadOutlined,
} from '@ant-design/icons';
import {Menu, Popover} from 'antd';

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
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="code">
          <CodeOutlined />
          Code
        </Menu.Item>
        <Menu.Item key="issues">
          <IssuesCloseOutlined />
          Issues
        </Menu.Item>
        <Menu.Item key="settings" style={{ float: 'right' }}>
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
