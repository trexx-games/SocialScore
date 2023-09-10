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
  Date: any;
  DateTime: any;
  Json: any;
  Upload: any;
};

export type LoginInput = {
  device_id: Scalars['String'];
  password: Scalars['String'];
  user_mobile: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  TokenResponse?: Maybe<TokenResponse>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  Login?: Maybe<LoginResponse>;
};

export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  token?: Maybe<Scalars['String']>;
  token_type?: Maybe<Scalars['String']>;
};
