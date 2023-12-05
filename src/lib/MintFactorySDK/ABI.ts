export const ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '__pixelynxNftDeployer',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '___pixelynxOwnershipContract',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'symbol',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'baseURI',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'maxSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'mintStartTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'allowlistStartTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'mintRandom',
            type: 'bool',
          },
          {
            internalType: 'address[]',
            name: 'internalTokenGatedContracts',
            type: 'address[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'percentage',
                type: 'uint256',
              },
            ],
            internalType: 'struct SharedStructs.Beneficiary[]',
            name: 'beneficiaries',
            type: 'tuple[]',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'to',
                type: 'address',
              },
              {
                internalType: 'uint256',
                name: 'percentage',
                type: 'uint256',
              },
            ],
            internalType: 'struct SharedStructs.Royality',
            name: 'royalties',
            type: 'tuple',
          },
        ],
        internalType: 'struct SharedStructs.NewCollectionInitialize',
        name: 'collectionInitialize',
        type: 'tuple',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'AddressZero',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AirdropEmptyReceipientListOrMintingMoreThenSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ApprovalToCurrentOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ApproveCallerIsNotTokenOrApprovedForAll',
    type: 'error',
  },
  {
    inputs: [],
    name: 'ApproveToCaller',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BeneficiaryPercentageHigherThanMax',
    type: 'error',
  },
  {
    inputs: [],
    name: 'BeneficiaryPercentageMustBe100',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CallerIsNotTokenOwnerOrApproved',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CanNotSetMintMaxSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidAddressOrNoTokensLeft',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidInternalTokenGatedContract',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidNumberOfBeneficiaries',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidTokenId',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintAtLeastOneToken',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintIsPaused',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintMoreTokensThanSupply',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintNotEnoughAllowance',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintNotEnoughFunds',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintNotStarted',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintToZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MintTokenGatedRequirementFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotAllowedToGift',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
    ],
    name: 'OperatorNotAllowed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RoyaltiesPercentageWrong',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RoyaltiesRecipientZeroAddress',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TimestampHigherThanMintTimestamp',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TokenDoesNotExist',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferFromIncorrectOwner',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransferToNonErc721Receiver',
    type: 'error',
  },
  {
    inputs: [],
    name: 'allowlistMintStarted',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allowlistStartTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'numToMint',
        type: 'uint256',
      },
    ],
    name: 'checkClaimEligibility',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inAllowlistPeriod',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'inMintablePeriod',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'isRandomMint',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxMintSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'numToMint',
        type: 'uint256',
      },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintStartTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokensRemaining',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;
