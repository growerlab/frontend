import { Breadcrumb } from 'antd';
import React from 'react';
import Link from 'umi/link';

const HeaderStyle = {
  marginTop: 40,
};

class IndexHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/register">注册</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/login">登录</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={HeaderStyle}></div>
      </div>
    );
  }
}

export default IndexHeader;
