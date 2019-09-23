import Link from "next/link";
import React from "react";
import Layout from "./layouts/Layout";

class About extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <p>this is about</p>
        </Layout>
      </div>
    );
  }
}

export default About;
