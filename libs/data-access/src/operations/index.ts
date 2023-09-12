import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

import * as Types from '../@types/index';
const defaultOptions = {} as const;
export type ConnectMutationVariables = Types.Exact<{
  input: Types.ConnectInput;
}>;

export type ConnectMutation = {
  __typename?: 'Mutation';
  connect: {
    __typename?: 'AccessToken';
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
  };
};

export type LinkWalletMutationVariables = Types.Exact<{
  input: Types.WalletLinkInput;
}>;

export type LinkWalletMutation = {
  __typename?: 'Mutation';
  linkWallet: {
    __typename?: 'Wallet';
    address: string;
    createdAt: any;
    id: number;
    lastSyncDate?: any | null;
    updatedAt: any;
  };
};

export type RefreshTokenMutationVariables = Types.Exact<{
  input: Types.RefreshAccessTokenInput;
}>;

export type RefreshTokenMutation = {
  __typename?: 'Mutation';
  refreshToken: {
    __typename?: 'AccessToken';
    accessToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
    refreshToken: string;
  };
};

export type GetAuthProfileQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type GetAuthProfileQuery = {
  __typename?: 'Query';
  getAuthProfile?: {
    __typename?: 'User';
    address: string;
    createdAt: any;
    id: number;
    lastSyncDate?: any | null;
    updatedAt: any;
    username: string;
  } | null;
};

export type ListLinkedWalletQueryVariables = Types.Exact<{
  [key: string]: never;
}>;

export type ListLinkedWalletQuery = {
  __typename?: 'Query';
  listLinkedWallet: Array<{
    __typename?: 'Wallet';
    address: string;
    createdAt: any;
    id: number;
    lastSyncDate?: any | null;
    updatedAt: any;
  }>;
};

export type AccessTokenFragment = {
  __typename?: 'AccessToken';
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  refreshToken: string;
};

export type UserInfoFragment = {
  __typename?: 'User';
  address: string;
  createdAt: any;
  id: number;
  lastSyncDate?: any | null;
  updatedAt: any;
  username: string;
};

export type WalletInfoFragment = {
  __typename?: 'Wallet';
  address: string;
  createdAt: any;
  id: number;
  lastSyncDate?: any | null;
  updatedAt: any;
};

export const AccessTokenFragmentDoc = gql`
  fragment AccessToken on AccessToken {
    accessToken
    expiresIn
    refreshExpiresIn
    refreshToken
  }
`;
export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    address
    createdAt
    id
    lastSyncDate
    updatedAt
    username
  }
`;
export const WalletInfoFragmentDoc = gql`
  fragment WalletInfo on Wallet {
    address
    createdAt
    id
    lastSyncDate
    updatedAt
  }
`;
export const ConnectDocument = gql`
  mutation connect($input: ConnectInput!) {
    connect(input: $input) {
      ...AccessToken
    }
  }
  ${AccessTokenFragmentDoc}
`;
export type ConnectMutationFn = Apollo.MutationFunction<
  ConnectMutation,
  ConnectMutationVariables
>;

/**
 * __useConnectMutation__
 *
 * To run a mutation, you first call `useConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectMutation, { data, loading, error }] = useConnectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectMutation,
    ConnectMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ConnectMutation, ConnectMutationVariables>(
    ConnectDocument,
    options
  );
}
export type ConnectMutationHookResult = ReturnType<typeof useConnectMutation>;
export type ConnectMutationResult = Apollo.MutationResult<ConnectMutation>;
export type ConnectMutationOptions = Apollo.BaseMutationOptions<
  ConnectMutation,
  ConnectMutationVariables
>;
export const LinkWalletDocument = gql`
  mutation linkWallet($input: WalletLinkInput!) {
    linkWallet(input: $input) {
      ...WalletInfo
    }
  }
  ${WalletInfoFragmentDoc}
`;
export type LinkWalletMutationFn = Apollo.MutationFunction<
  LinkWalletMutation,
  LinkWalletMutationVariables
>;

/**
 * __useLinkWalletMutation__
 *
 * To run a mutation, you first call `useLinkWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkWalletMutation, { data, loading, error }] = useLinkWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLinkWalletMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LinkWalletMutation,
    LinkWalletMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LinkWalletMutation, LinkWalletMutationVariables>(
    LinkWalletDocument,
    options
  );
}
export type LinkWalletMutationHookResult = ReturnType<
  typeof useLinkWalletMutation
>;
export type LinkWalletMutationResult =
  Apollo.MutationResult<LinkWalletMutation>;
export type LinkWalletMutationOptions = Apollo.BaseMutationOptions<
  LinkWalletMutation,
  LinkWalletMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation refreshToken($input: RefreshAccessTokenInput!) {
    refreshToken(input: $input) {
      ...AccessToken
    }
  }
  ${AccessTokenFragmentDoc}
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const GetAuthProfileDocument = gql`
  query getAuthProfile {
    getAuthProfile {
      ...UserInfo
    }
  }
  ${UserInfoFragmentDoc}
`;

/**
 * __useGetAuthProfileQuery__
 *
 * To run a query within a React component, call `useGetAuthProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAuthProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAuthProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAuthProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAuthProfileQuery,
    GetAuthProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAuthProfileQuery, GetAuthProfileQueryVariables>(
    GetAuthProfileDocument,
    options
  );
}
export function useGetAuthProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAuthProfileQuery,
    GetAuthProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAuthProfileQuery, GetAuthProfileQueryVariables>(
    GetAuthProfileDocument,
    options
  );
}
export type GetAuthProfileQueryHookResult = ReturnType<
  typeof useGetAuthProfileQuery
>;
export type GetAuthProfileLazyQueryHookResult = ReturnType<
  typeof useGetAuthProfileLazyQuery
>;
export type GetAuthProfileQueryResult = Apollo.QueryResult<
  GetAuthProfileQuery,
  GetAuthProfileQueryVariables
>;
export const ListLinkedWalletDocument = gql`
  query listLinkedWallet {
    listLinkedWallet {
      ...WalletInfo
    }
  }
  ${WalletInfoFragmentDoc}
`;

/**
 * __useListLinkedWalletQuery__
 *
 * To run a query within a React component, call `useListLinkedWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useListLinkedWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListLinkedWalletQuery({
 *   variables: {
 *   },
 * });
 */
export function useListLinkedWalletQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListLinkedWalletQuery,
    ListLinkedWalletQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListLinkedWalletQuery, ListLinkedWalletQueryVariables>(
    ListLinkedWalletDocument,
    options
  );
}
export function useListLinkedWalletLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListLinkedWalletQuery,
    ListLinkedWalletQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListLinkedWalletQuery,
    ListLinkedWalletQueryVariables
  >(ListLinkedWalletDocument, options);
}
export type ListLinkedWalletQueryHookResult = ReturnType<
  typeof useListLinkedWalletQuery
>;
export type ListLinkedWalletLazyQueryHookResult = ReturnType<
  typeof useListLinkedWalletLazyQuery
>;
export type ListLinkedWalletQueryResult = Apollo.QueryResult<
  ListLinkedWalletQuery,
  ListLinkedWalletQueryVariables
>;
