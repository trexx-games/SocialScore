import {
  ApolloClientOptions,
  retrieveAuthTokenFromContext,
} from '@webbyx/next-js';
import { ApolloLink } from '@apollo/client';
import { GRAPHQL_ENDPOINT, GRAPHQL_SUBSCRIPTION_ENDPOINT } from './constant';

const isProduction = process.env.NODE_ENV === 'production';
export const apolloOptions: ApolloClientOptions = {
  graphqlRequest: {
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin',
  },
  websocketRequest: {
    url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
    lazy: true,
    connectionParams: {},
  },
  typeDefs: {},
  resolvers: {},
  connectToDevTools: !isProduction && typeof window !== 'undefined',
  getAuthToken: async (ctx) => {
    return retrieveAuthTokenFromContext(ctx);
  },
  constructApolloLinks: ({ errorLink, authLink, httpLink }) => {
    const requestAudienceLink = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        return {
          headers: {
            ...headers,
            // add custom headers to every request
            // ['x-custom-header']: 'abc',
          },
        };
      });
      return forward(operation);
    });
    // apollo links
    return [errorLink, authLink, requestAudienceLink, httpLink];
  },
};

export default apolloOptions;
