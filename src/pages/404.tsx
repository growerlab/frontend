import { Result, Button } from 'antd';
import router from 'umi/router';

export default function() {
  return (
    <Result
      status="404"
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
