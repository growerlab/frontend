import Link from "next/link";
import { Component } from "react";

const linkStyle = {
  marginRight: 15
};

class Header extends Component {
  render() {
    return (
      <div>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
        <Link href="/login">
          <a style={linkStyle}>登录</a>
        </Link>
        <Link href="/register">
          <a style={linkStyle}>注册</a>
        </Link>
      </div>
    );
  }
}

export default Header;
