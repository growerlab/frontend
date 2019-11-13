import config from '../../config/config';
import ApolloClient, { ApolloError } from 'apollo-boost';

const client = new ApolloClient({
  uri: config.backendUrl,
});

export default client;

export interface GqlEvent {
  onCompleted?: (data: any) => void;
  onError?: (error: ApolloError) => void;
}
