interface NftCollection {
  slug: string;
  name: string;
  metadataUrl: string;
  contractAddress: string;
}

interface KorusCollection {
  unlockId?: string[];
  itemType: string[];
}

interface TokenData {
  tokenId: number;
  nftCollection: NftCollection;
  korus: KorusCollection | null;
}

interface NftMetadata {
  total: number;
  take: number;
  skip: number;
}

interface NftData {
  data: TokenData[];
  meta: NftMetadata;
}

interface MintPrice {
  rate: number;
  crypto: {
    raw: string;
    formatted: string;
    price: string;
    denom: string;
  };
  fiat: {
    raw: string;
    formatted: string;
    price: string;
    priceWithPaperCardFee: string;
    denom: string;
  };
}

interface Contract {
  contractId: string;
  contractAddress: `0x${string}`;
}

interface PaperTransactionStatus {
  status: string;
  claimedTokens: {
    tokens: NftTransfer[];
  };
}
