import { ABI } from './ABI';
import {
  formatEther,
  parseEther,
  decodeAbiParameters,
  keccak256,
  toHex,
  WalletClient,
  PublicClient,
} from 'viem';
import { BigDecimal } from './BigDecimal';

export type NftTransfer = {
  tokenId: string;
};

class PixlynxBaseContract {
  walletClient: WalletClient;
  publicClient: PublicClient;

  constructor(walletClient: WalletClient, publicClient: PublicClient) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;
  }

  get account() {
    if (!this.walletClient.account)
      throw new Error(
        `${PixlynxBaseContract.name} has not been initalized with a walletClient`
      );
    return this.walletClient.account;
  }

  get accountAddress() {
    if (!this.walletClient.account)
      throw new Error(
        `${PixlynxBaseContract.name} has not been initalized with a walletClient`
      );
    return this.walletClient.account?.address;
  }
}

export class PixelynxNftContract extends PixlynxBaseContract {
  private _contractAddress: `0x${string}`;

  constructor(
    contractAddress: `0x${string}`,
    walletClient: WalletClient,
    publicClient: PublicClient
  ) {
    super(walletClient, publicClient);
    this._contractAddress = contractAddress;
  }

  async getName(): Promise<string> {
    const name = await this.publicClient.readContract({
      address: this._contractAddress,
      abi: ABI,
      functionName: 'name',
    });
    return name;
  }

  async mintNfts(qty?: number): Promise<`0x${string}`> {
    if (!qty) qty = 1;

    const mintPrice = await this.getMintPrice();

    const { request } = await this.publicClient.simulateContract({
      address: this._contractAddress,
      abi: ABI,
      functionName: 'mint',
      args: [this.accountAddress, BigInt(qty)],
      value: parseEther(mintPrice as `${number}`) * BigInt(qty),
    });

    const transaction = await this.walletClient.writeContract(request);
    return transaction;
  }

  async processTransaction(
    transactionHash: `0x${string}`
  ): Promise<NftTransfer[]> {
    const reciept = await this.publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    });
    if (reciept.status !== 'success') throw Error('Transaction reverted');
    const transfers = reciept.logs
      .filter((log) => {
        return (
          log.topics &&
          log.topics[0] ===
            keccak256(toHex('Transfer(address,address,uint256)'))
        );
      })
      .map((log) => {
        const from = decodeAbiParameters(
          [{ type: 'address', name: 'from' }],
          // @ts-ignore
          log.topics[1]
        )[0] as unknown as string;
        const to = decodeAbiParameters(
          [{ type: 'address', name: 'to' }],
          // @ts-ignore
          log.topics[2]
        )[0] as unknown as string;
        const tokenId = decodeAbiParameters(
          [{ type: 'uint256', name: 'tokenId' }],
          // @ts-ignore
          log.topics[3]
        )[0] as unknown as string;

        return {
          from,
          to,
          tokenId,
        };
      })
      .map((t) => ({ from: t.from, to: t.to, tokenId: t.tokenId.toString() }));

    return transfers;
  }

  private async _convertMaticToUsd(
    matic: bigint
  ): Promise<{ price: BigDecimal; rate: number }> {
    const response = await fetch(
      'https://d18fo4qklf3096.cloudfront.net/api/v1/exchange/MATIC/USD'
    );
    if (!response.ok) {
      throw Error('Unable to fetch matic/usd rate');
    }

    const rate = (await response.json()).rate as number;
    const decimalRate = new BigDecimal(rate);

    return { price: decimalRate.mul(BigDecimal.fromBigInt(matic)), rate };
  }

  async getMintPrice() {
    const bigPrice = await this.publicClient.readContract({
      address: this._contractAddress,
      abi: ABI,
      functionName: 'mintPrice',
    });

    return formatEther(bigPrice, 'wei');
  }

  async getMintPricev2() {
    const bigPrice = await this.publicClient.readContract({
      address: this._contractAddress,
      abi: ABI,
      functionName: 'mintPrice',
    });

    const usdPrice = await this._convertMaticToUsd(bigPrice);

    return {
      rate: usdPrice.rate,
      crypto: {
        raw: bigPrice.toString(),
        formatted: `${formatEther(bigPrice, 'wei')} MATIC`,
        price: formatEther(bigPrice, 'wei'),
        denom: 'MATIC',
      },
      fiat: {
        raw: usdPrice.price.toString(),
        formatted: `$${usdPrice.price.toString().slice(0, 4)}`,
        price: usdPrice.price.toString().slice(0, 4),
        priceWithPaperCardFee: usdPrice.price.add(0.5).toString().slice(0, 4),
        denom: 'USD',
      },
    };
  }
}
