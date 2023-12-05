import {
  PaperEmbeddedWalletSdk,
  UserStatus as PaperUserStatus,
} from '@paperxyz/embedded-wallet-service-sdk';

type PaperWallet = (Awaited<ReturnType<PaperEmbeddedWalletSdk['getUser']>> & {
  status: PaperUserStatus.LOGGED_IN_WALLET_INITIALIZED;
})['wallet'];

export const PixelynxOnChainUserActions = [
  'korus:dapp:connect',
  'korus:noiz:daily',
] as const;
export type PixelynxOnChainUserAction =
  (typeof PixelynxOnChainUserActions)[number];

export class PixelynxOnChainUserActionContract {
  public static readonly contractChainAddress: Map<number, string> = new Map([
    [80001, '0x137869ea679188ea52dc799ee42af8465b93e780'],
    [137, '0xd1e9831bf494ce259b9e98dd209881a8db735125'],
  ]);

  public static readonly actionIds: Map<PixelynxOnChainUserAction, string> =
    new Map([
      [
        'korus:dapp:connect',
        '0xdcd0a26f4e870eb36093f295d0d18c87e079fff649b293649b9fc329a767a0f2',
      ],
      [
        'korus:noiz:daily',
        '0xca59fbe82a9996e6e1b0e5d4323d7d56d069c344ba0e845ec02c56ede2f22f0d',
      ],
    ]);

  constructor(
    private paperSdk: PaperEmbeddedWalletSdk,
    private chainId: number
  ) {}

  private async wallet(): Promise<PaperWallet> {
    const user = await this.paperSdk.getUser();
    if (user.status !== PaperUserStatus.LOGGED_IN_WALLET_INITIALIZED) {
      throw new Error(
        'PixelynxUserActionContract.wallet(): paper user is not logged in'
      );
    }

    return user.wallet;
  }

  private getActionId(actionIdString: PixelynxOnChainUserAction): string {
    const actionId =
      PixelynxOnChainUserActionContract.actionIds.get(actionIdString);
    if (actionId) {
      throw new Error(
        `PixelynxUserActionContract.#getActionId(): Unsupported action: ${actionIdString}`
      );
    }
    return PixelynxOnChainUserActionContract.actionIds.get(actionIdString)!;
  }

  private contractAddress(): string {
    const contractAdddress =
      PixelynxOnChainUserActionContract.contractChainAddress.get(this.chainId);
    if (!contractAdddress) {
      throw new Error(
        `PixelynxUserActionContract.#contractAddress(): Unsupported chain ID`
      );
    }
    return contractAdddress;
  }

  public async connectToDapp() {
    const wallet = await this.wallet();

    const result = await wallet.gasless.callContract({
      contractAddress: this.contractAddress(),
      methodInterface: 'function connectToDapp()',
      methodArgs: [],
    });

    return result.transactionHash;
  }

  public async userAction(actionIdString: string) {
    const wallet = await this.wallet();

    const result = await wallet.gasless.callContract({
      contractAddress: this.contractAddress(),
      methodInterface: 'function userAction(bytes32 actionId) external',
      methodArgs: [actionIdString],
    });

    return result.transactionHash;
  }
}
