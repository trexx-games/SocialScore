import fetch from 'isomorphic-unfetch';
import { retrieveAuthTokenFromContext } from '@webbyx/next-js';
import { GetAuthProfileDocument } from '@stack/data-access';
import { GRAPHQL_ENDPOINT } from './constant';

export const checkAuthProfile = async (context?: any): Promise<any> => {
  const token = retrieveAuthTokenFromContext(context);
  if (!token) return Promise.resolve(null);

  // NOTE: Replace with project GraphQL document
  const query = GetAuthProfileDocument?.loc?.source?.body ?? {};
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
    }),
  });
  const result = await res.json();

  console.log('result', result);
  // NOTE: Replace with project GraphQL result
  // TODO: change to project API response
  return result?.data?.getAuthProfile ?? null;
};

export default checkAuthProfile;
