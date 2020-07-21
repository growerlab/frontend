import ApolloClient, { ApolloError } from 'apollo-boost';
import { ErrorResponse } from 'apollo-link-error';
import config from '../../config/config';
import { Message } from '../common/notice';
import i18n from '../../i18n';
import { getUserInfo } from '../user/session';

const client = new ApolloClient({
  uri: config.backendUrl,
  headers: {
    'auth-user-token': currentUserToken(),
  },
  onError: (error: ErrorResponse) => {
    console.error('apollo onError: ', error);
    if (error.networkError) {
      Message.Error(i18n.t('message.error.ERROR'));
      return;
    }

    if (error.graphQLErrors) {
      if (error.graphQLErrors.length > 0) {
        // @ts-ignore
        const code = error.graphQLErrors[0].extensions.code;
        Message.Error(code);
      }
    }
  },
});

function currentUserToken(): string | null {
  let info = getUserInfo();
  if (info !== null) {
    return info.token;
  }
  return null;
}

export default client;
