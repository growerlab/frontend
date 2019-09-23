import { Component } from "react";
import Link from "next/link";
import Layout from "./layouts/Layout";

class Index extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Link href="/about">
            <a>About</a>
          </Link>
        </Layout>
      </div>
    );
  }
}

export default Index;
