import React, {FocusEventHandler, useEffect, useState} from 'react';
import {withTranslation, WithTranslation} from 'react-i18next';
import {ApolloError, gql} from 'apollo-boost';
import {useMutation} from '@apollo/react-hooks';
import {useRouter} from 'next/router'
import Link from 'next/link';
import {TextInputField, Button, SearchIcon} from 'evergreen-ui'
import validator from 'validator';

import {Message} from '../../api/common/notice';
import {UserRules} from '../../api/rule';
import {login, LoginInfo} from '../../api/user/session';
import {Router} from '../../config/router';

// const GQL_REGISTER = gql`
//   mutation loginUser($input: LoginUserPayload!) {
//     loginUser(input: $input) {
//       token
//       namespacePath
//       email
//       name
//       publicEmail
//     }
//   }
// `;

interface LoginUserPayload {
  email: string;
  password: string;
}

function LoginForm(props: WithTranslation) {
  const router = useRouter();
  const {t} = props;
  const [emailValidateMsg, setEmailValidateMsg] = useState(null);
  const [pwdValidateMsg, setPwdValidateMsg] = useState(null);


  // const [loginUser] = useMutation<{
  //   input: LoginUserPayload;
  // }>(GQL_REGISTER);

  // const onFinish = function (values: {}) {
  //   loginUser({
  //     variables: {
  //       input: values,
  //     },
  //   })
  //     .then((data: any) => {
  //       if (data.data.loginUser) {
  //         login(data.data.loginUser as LoginInfo);
  //       }
  //       Message.Success(t('user.tooltip.login_success'));
  //       router.push(Router.User.Index);
  //     })
  //     .catch(reason => {
  //     });
  // };

  const validate = {
    "email": (obj: Element) => {
      const val = obj.value;
      if (!validator.isEmail(val)) {
        setEmailValidateMsg(t('user.login_tooltip.email_invalid'));
      } else {
        setEmailValidateMsg(null);
      }
    },
    "password": (obj: Element) => {
      const val = obj.value;
      if (validator.isEmpty(val)) {
        setPwdValidateMsg(t('user.login_tooltip.password_invalid'));
      } else {
        setPwdValidateMsg(null)
      }
    }
  }

  const onBlur = (event: FocusEventHandler) => {
    const obj = event.target;
    validate[obj.type](obj)
    return
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mx-auto h-12 w-auto text-center text-3xl">Logo</h1>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="-space-y-px">
            <div>
              <TextInputField
                type="email"
                name="email"
                autoComplete="email"
                isInvalid={false}
                required
                label="Email"
                validationMessage={emailValidateMsg}
                onBlur={onBlur}
              />
            </div>
            <div>
              <TextInputField
                type="password"
                name="password"
                isInvalid={false}
                required
                label="Password"
                validationMessage={pwdValidateMsg}
                onBlur={onBlur}
              />
            </div>
          </div>

          <div>
            <Button appearance="primary" marginY={8} marginRight={12} className="w-full">
              {t('user.login')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withTranslation()(LoginForm);
