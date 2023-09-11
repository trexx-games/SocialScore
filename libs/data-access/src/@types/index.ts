export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSON: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
  refreshExpiresIn: Scalars['Float'];
  refreshToken: Scalars['String'];
};

/** The input used to connect smart wallet */
export type ConnectInput = {
  address: Scalars['String'];
  /** The signing message */
  message: Scalars['String'];
  /** The signing signature */
  signature: Scalars['String'];
  /** Optional: username for smart wallet. If not provided will random generate one */
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** This API used for connect smart wallet */
  connect: AccessToken;
  /** This API used to link input wallet to smart wallet */
  linkWallet: Wallet;
  /** This API used to exchange new access token with an old token */
  refreshToken: AccessToken;
};

export type MutationConnectArgs = {
  input: ConnectInput;
};

export type MutationLinkWalletArgs = {
  input: WalletLinkInput;
};

export type MutationRefreshTokenArgs = {
  input: RefreshAccessTokenInput;
};

export type Query = {
  __typename?: 'Query';
  /** This API used to retrieve current profile */
  getAuthProfile?: Maybe<User>;
  utilsTest?: Maybe<Scalars['JSON']>;
};

/** The input used to prolong user access. NOTE: refreshToken must matched with connected wallet */
export type RefreshAccessTokenInput = {
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  lastSyncDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Wallet = {
  __typename?: 'Wallet';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  lastSyncDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

/** The input used to link wallet to smart wallet */
export type WalletLinkInput = {
  /** Wallet address that going to link with smart wallet */
  address: Scalars['String'];
  /** The signing message */
  message: Scalars['String'];
  /** The signing signature */
  signature: Scalars['String'];
};
