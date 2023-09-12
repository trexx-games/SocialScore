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
  JSONObject: any;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
  refreshExpiresIn: Scalars['Float'];
  refreshToken: Scalars['String'];
};

export type BlockchainSource = {
  __typename?: 'BlockchainSource';
  address: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  meta: Scalars['JSONObject'];
  name: Scalars['String'];
  status: BlockchainSourceStatus;
  updatedAt: Scalars['DateTime'];
};

export type BlockchainSourceFilter = {
  address?: InputMaybe<StringFieldComparison>;
  and?: InputMaybe<Array<BlockchainSourceFilter>>;
  createdAt?: InputMaybe<DateFieldComparison>;
  id?: InputMaybe<IntFieldComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<BlockchainSourceFilter>>;
  updatedAt?: InputMaybe<DateFieldComparison>;
};

export type BlockchainSourceSort = {
  direction: SortDirection;
  field: BlockchainSourceSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum BlockchainSourceSortFields {
  Address = 'address',
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt',
}

export enum BlockchainSourceStatus {
  Activated = 'ACTIVATED',
  Deactivated = 'DEACTIVATED',
}

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

export type DateFieldComparison = {
  between?: InputMaybe<DateFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  notBetween?: InputMaybe<DateFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateFieldComparisonBetween = {
  lower: Scalars['DateTime'];
  upper: Scalars['DateTime'];
};

export type IntFieldComparison = {
  between?: InputMaybe<IntFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  notBetween?: InputMaybe<IntFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntFieldComparisonBetween = {
  lower: Scalars['Int'];
  upper: Scalars['Int'];
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
  blockchainSource: BlockchainSource;
  blockchainSources: Array<BlockchainSource>;
  dexSwapScanning?: Maybe<Scalars['JSONObject']>;
  /** This API used to retrieve current profile */
  getAuthProfile?: Maybe<User>;
  /** This API used to list linked wallets from smart wallet */
  listLinkedWallet: Array<Wallet>;
  nounsDaoProposalScanning?: Maybe<Scalars['JSONObject']>;
  nounsDaoVoteScanning?: Maybe<Scalars['JSONObject']>;
  /** This API used to retrieve wallet */
  retrieveWallet: WalletProfile;
  tokenBalanceScan?: Maybe<Scalars['JSONObject']>;
  tokenTransferScan?: Maybe<Scalars['JSONObject']>;
  utilsTest?: Maybe<Scalars['JSON']>;
};

export type QueryBlockchainSourceArgs = {
  id: Scalars['Int'];
};

export type QueryBlockchainSourcesArgs = {
  filter?: BlockchainSourceFilter;
  sorting?: Array<BlockchainSourceSort>;
};

export type QueryDexSwapScanningArgs = {
  walletAddress: Scalars['String'];
};

export type QueryNounsDaoProposalScanningArgs = {
  walletAddress: Scalars['String'];
};

export type QueryNounsDaoVoteScanningArgs = {
  walletAddress: Scalars['String'];
};

export type QueryRetrieveWalletArgs = {
  input: WalletRetrieveInput;
};

export type QueryTokenBalanceScanArgs = {
  address: Scalars['String'];
};

export type QueryTokenTransferScanArgs = {
  address: Scalars['String'];
};

/** The input used to prolong user access. NOTE: refreshToken must matched with connected wallet */
export type RefreshAccessTokenInput = {
  refreshToken: Scalars['String'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST',
}

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  iLike?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<Scalars['Boolean']>;
  isNot?: InputMaybe<Scalars['Boolean']>;
  like?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  notILike?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  notLike?: InputMaybe<Scalars['String']>;
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

export type WalletProfile = {
  __typename?: 'WalletProfile';
  address: Scalars['String'];
  tokenBalances: WalletTokenBalance;
  tokenTransfers: WalletTokenTransfer;
};

/** The input used to retrieve wallet */
export type WalletRetrieveInput = {
  /** Wallet address that going to retrieve */
  address: Scalars['String'];
};

export type WalletTokenBalance = {
  __typename?: 'WalletTokenBalance';
  balances: Array<WalletTokenType>;
  total: Scalars['Float'];
};

export type WalletTokenTransfer = {
  __typename?: 'WalletTokenTransfer';
  total: Scalars['Float'];
  transfers: Array<WalletTokenType>;
};

export type WalletTokenType = {
  __typename?: 'WalletTokenType';
  amount: Scalars['Float'];
  type: Scalars['String'];
};
