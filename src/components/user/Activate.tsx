import { FormComponentProps } from 'antd/lib/form';
import { WithTranslation, withTranslation } from 'react-i18next';
import { Result, Button, Spin, Icon } from 'antd';
import { ApolloError, gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import router from 'umi/router';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// TODO 没有标题

const GQL_REGISTER = gql`
  mutation activateUser($input: ActivateCodePayload!) {
    activateUser(input: $input) {
      OK
    }
  }
`;

interface ActivateCodePayload {
  code: string;
}

interface Status {
  Title: string;
  Status?: string;
  SubTitle?: string;
  Icon?: React.ReactNode;
  Extra?: React.ReactNode;
}

// 状态
//  1. 请求参数中未包含code 2. 请求接口中 3|4. 接口返回正常|错误  5. 激活码已被使用过(服务器端返回)
//
function Activate(props: FormComponentProps & WithTranslation) {
  const { t } = props;

  let { code } = useParams();

  let loginBtn = (
    <Button
      type="primary"
      onClick={() => {
        router.push('/login');
      }}
    >
      {t('user.login')}
    </Button>
  );

  const status: { [key: string]: Status } = {
    NotFound: {
      Title: t('user.activate.not_found.code'),
      SubTitle: t('user.activate.invalid'),
      Icon: <Icon type="question-circle" theme="twoTone" />,
    },
    Pending: {
      Title: t('user.activate.pending'),
      SubTitle: t('user.activate.pending_sub'),
      Icon: <Spin size="large" />,
    },
    Faild: {
      Title: t('user.activate.invalid'),
      Icon: <Icon type="frown" theme="twoTone" />,
      Extra: loginBtn,
    },
    Success: {
      Title: t('user.activate.success'),
      SubTitle: t('user.activate.success_sub'),
      Icon: <Icon type="smile" theme="twoTone" />,
      Extra: loginBtn,
    },
  };

  const [curStatus, setStatus] = useState(status['Pending']);

  const [activateUser, { loading: mutationLoading, error: mutationError }] = useMutation<{
    input: ActivateCodePayload;
  }>(GQL_REGISTER, {
    onCompleted: (data: any) => {
      if (data.activateUser.OK !== null) {
        setStatus(status['Success']);
      }
    },
    onError: (error: ApolloError) => {
      setStatus(status['Faild']);
    },
  });

  useEffect(() => {
    activateUser({
      variables: {
        input: {
          code: code,
        },
      },
    });
  }, []);

  return (
    <Result
      // status={curStatus.Status !== null ? 'warning' : curStatus.Status}
      icon={curStatus.Icon === null ? '' : curStatus.Icon}
      title={curStatus.Title}
      subTitle={curStatus.SubTitle}
      extra={curStatus.Extra}
    />
  );
}

export default withTranslation()(Activate);
