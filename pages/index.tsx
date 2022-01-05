import React from 'react';
import { withTranslation } from 'react-i18next';
import { setTitle } from '../common/document';
import Head from 'next/head'
import Link from 'next/link'
import {Button} from "evergreen-ui";


const index = function(props: any) {
  const { t } = props;
  const titleStyle = {
    fontSize: '24vm',
    textAlign: 'center',
  };

  setTitle(t('website.title'));

  return (
    <div>
      <Head>
        <title>Rethinking git</title>
      </Head>

      <h2 className="text-6xl font-bold text-center mt-7">Rethinking Git</h2>
      <div className="text-center mt-7">
        <Link href="/login">
          <Button marginRight={16} appearance="primary" size={"large"}>
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default withTranslation()(index);
