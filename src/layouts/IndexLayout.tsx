import IndexHeader from "./IndexHeader";
import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <IndexHeader />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
