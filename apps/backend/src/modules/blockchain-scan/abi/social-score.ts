export const SocialScoreABI = [
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
