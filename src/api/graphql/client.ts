import config from '../../config/config';
import ApolloClient, { ApolloError } from 'apollo-boost';
import { ErrorResponse } from 'apollo-link-error';
import { Message } from '../common/notice';
import i18n from '../../i18n';

const client = new ApolloClient({
  uri: config.backendUrl,
  onError: (error: ErrorResponse) => {
    console.error('apollo onError: ', error);
    if (error.networkError) {
      Message.Error(i18n.t('message.error.ERROR'));
    }
    if (error.graphQLErrors) {
      Message.Error(error.graphQLErrors[0].message);
    }
  },
});

export default client;
