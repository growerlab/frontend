import React from 'react';
import { Result, Button } from 'antd';
import router from 'umi/router';
import { setTitle } from '../common/document';

export default function() {
  setTitle('404 Not Found');

  return (
    <Result
      status={404}
      title="404"
      subTitle="Not Found"
      extra={
        <Button
          type="primary"
          onClick={() => {
            router.push('/');
          }}
        >
          Back Home
        </Button>
      }
    />
  );
}
