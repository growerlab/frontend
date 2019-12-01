import { Breadcrumb } from 'antd';
import React from 'react';
import Link from 'umi/link';

const HeaderStyle = {
  marginTop: 20,
};

class IndexHeader extends React.Component {
  render() {
    return (
      <div>
        <div style={HeaderStyle}>
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
        </div>
      </div>
    );
  }
}

export default IndexHeader;
