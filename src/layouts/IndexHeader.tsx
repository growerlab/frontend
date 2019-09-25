import { Breadcrumb } from "antd";
import React from "react";

const HeaderStyle = {
  marginTop: 40
};

class IndexHeader extends React.Component {
  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/">Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/register">注册</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">登录</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={HeaderStyle}></div>
      </div>
    );
  }
}

export default IndexHeader;
