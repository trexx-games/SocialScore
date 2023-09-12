/**
 * ===========================
 * CONSTANT
 * ===========================
 */
export const APP_NAME = 'Social Scorer';

/**
 * ===========================
 * ENVIRONMENT VARIABLES
 * ===========================
 */
// api endpoint (base url)
export const BASE_ENDPOINT =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3434';

// api endpoint (graphql endpoint)
export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3434/graphql';

// api endpoint (graphql subscription endpoint)
export const GRAPHQL_SUBSCRIPTION_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'ws://localhost:3333/graphql';

/**
 * ===========================
 * APP ROUTE
 * ===========================
 */
// default path after login
export const DEFAULT_PATH_AFTER_SIGN_IN = '/dashboard';

// default path before login
export const DEFAULT_PATH_BEFORE_SIGN_IN = '/';

// path for login page
export const SIGN_IN_PATH = '/signin';

// page not found page
export const NOT_FOUND_PATH = '/404';

// onboarding path
export const ONBOARDING_PATH = '/onboarding';

// path accessible by public
// by default, this works as a whitelist.
// everything else that is not listed here will not be accessible by the public
export const PATHS_ONLY_ALLOWED_BEFORE_AUTH = [
  SIGN_IN_PATH,
  '/404',
  '/500',
  '/login',
  '/main',
  '/wallets',
  '/dashboard',
];

// restricted path that can't be accessed if user has already signed in
export const PATHS_NOT_ALLOWED_AFTER_AUTH = [SIGN_IN_PATH];

// path for admin portal (optional)
export const PATHS_FOR_ADMIN_ONLY = ['/app'];

// config to defined path that only shows content, which has no header, footer, sidebar, etc
// NOTE: This needed to handle on frontend level
export const NO_LAYOUT_PATH = [SIGN_IN_PATH];

/**
 * ===========================
 * BLOCKCHAIN VARIABLES
 * ===========================
 */

export const JSON_RPC_URL = 'https://mumbai.rpc.thirdweb.com';

export const MUMBAI_NETWORK_ID = 80001;

export const SOCIAL_SCORE_CONTRACT_ADDRESS =
  '0xa58077B5F5549004Ea92F56d832aB7705f939Cc0';

export const SOCIAL_SCORE_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'ScoreUpdated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getDaoActions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'approvals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'proposals_submitted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.DaoActions',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getDefiActions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'loans',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'total_volume',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'swaps',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'repayments',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.DefiActions',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getGeneralActions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'transactions',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'unique_addresses_interacted',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.GeneralActions',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
    ],
    name: 'getNftActions',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'minted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'purchased',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'held',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.NftActions',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_approvals',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_proposals_submitted',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_votes',
        type: 'uint256',
      },
    ],
    name: 'updateDaoActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_loans',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_total_volume',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_swaps',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_repayments',
        type: 'uint256',
      },
    ],
    name: 'updateDefiActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_transactions',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_unique_addresses_interacted',
        type: 'uint256',
      },
    ],
    name: 'updateGeneralActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_minted',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_purchased',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_sold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_held',
        type: 'uint256',
      },
    ],
    name: 'updateNftActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_user',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_total_volume',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_purchased',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_sold',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_held',
        type: 'uint256',
      },
    ],
    name: 'updateTokenActions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userScores',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'loans',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'total_volume',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'swaps',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'repayments',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.DefiActions',
        name: 'defi_actions',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'approvals',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'proposals_submitted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'votes',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.DaoActions',
        name: 'dao_actions',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'total_volume',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'purchased',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'held',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.TokenActions',
        name: 'token_actions',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'minted',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'purchased',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'sold',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'held',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.NftActions',
        name: 'nft_actions',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'transactions',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'unique_addresses_interacted',
            type: 'uint256',
          },
        ],
        internalType: 'struct SocialScore.GeneralActions',
        name: 'general_actions',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
