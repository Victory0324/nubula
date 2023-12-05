import {
  NftTransfer,
  PixelynxNftContract,
} from '@/lib/MintFactorySDK/PixelynxNftContract';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import Toast from '@/app/shared/Toasts/Toast';

import { usePublicClient, useWalletClient } from 'wagmi';
import { completeMintTransaction } from '@/utils/api/authenticated/elyxnir/inventory/completeMintTransaction';
import { useRecordMintTransaction } from '@/utils/api/authenticated/elyxnir/inventory/recordMintTransaction';
import { ContractInfo } from './useMintContract';
import { useWallet } from '@/app/providers/Wallet';
import { claimWithPaper } from '@/utils/api/authenticated/elyxnir/inventory/claimWithPaper';

export default function useMintFactorySdk() {
  const recordMintTransaction = useRecordMintTransaction();
  const publicClient = usePublicClient();
  const { data: walletClient, isError, isLoading } = useWalletClient();
  const { walletAddress } = useWallet();

  const errorToast = useCallback(
    (action: string) =>
      toast(
        <Toast
          type={'error'}
          title={'Failure'}
          body={`Unable to ${action}. Please try again.`}
        />
      ),
    []
  );

  const getMintPrice = useCallback(
    async (contractAddress: `0x${string}`): Promise<MintPrice | undefined> => {
      try {
        if (!walletClient) return;

        const contract = new PixelynxNftContract(
          contractAddress,
          walletClient,
          publicClient
        );

        return await contract.getMintPricev2();
      } catch (e) {
        console.error('getting mint price error', e);
        errorToast('get mint price');
      }
    },
    [errorToast, publicClient, walletClient]
  );

  const getName = useCallback(
    async (contractAddress: `0x${string}`): Promise<string | undefined> => {
      try {
        if (!walletClient) return;

        const contract = new PixelynxNftContract(
          contractAddress,
          walletClient,
          publicClient
        );

        return await contract.getName();
      } catch (e) {
        console.error('name response error', e);
        errorToast('get collection name');
      }
    },
    [errorToast, publicClient, walletClient]
  );

  const startMintNftTransaction = useCallback(
    async ({
      contractInfo,
      quantity,
      instanceId,
      transactionType,
    }: {
      contractInfo: ContractInfo;
      quantity: number;
      instanceId?: string;
      transactionType?: 'Card' | 'Wallet';
    }) => {
      try {
        // no wagmi wallet connected
        if (!walletClient) {
          // paper wallet connected
          if (walletAddress) {
            const { success, data } = await claimWithPaper({
              contractId: contractInfo.contractId,
              type: instanceId ? 'ugc' : 'unlock', // use ugc for tracks, unlock for kor
            });
            return {
              transactionHash: data?.transactionId,
              success,
              instanceId,
            };
          }
          throw 'No wallet connected';
        } else {
          const contract = new PixelynxNftContract(
            contractInfo.contractAddress,
            walletClient,
            publicClient
          );

          const transactionHash = await contract.mintNfts(quantity);

          // ONLY FOR MINTING TRACK
          if (instanceId && transactionType) {
            const { success } = await recordMintTransaction({
              transactionType,
              transactionHash,
              instanceId,
            });

            if (!success) throw 'Error posting transaction hash';
          }

          return { success: true, transactionHash, contract, instanceId };
        }
      } catch (e) {
        return { success: false, error: e };
      }
    },
    [recordMintTransaction, publicClient, walletAddress, walletClient]
  );

  const completeMintingTracks = useCallback(
    async ({
      transfers,
      instanceId,
      contractAddress,
    }: {
      transfers: NftTransfer[];
      instanceId: string;
      contractAddress: string;
    }) => {
      const completeTransferPromises = await Promise.all(
        transfers.map(async (transfer: NftTransfer) => {
          return await completeMintTransaction({
            instanceId,
            token: parseInt(transfer.tokenId),
            contractAddress,
          });
        })
      );

      const completeTransferSuccess = completeTransferPromises.every(
        (transfer) => transfer.success
      );

      return { success: completeTransferSuccess };
    },
    []
  );

  const processMintNftTransaction = useCallback(
    async ({
      contract,
      transactionHash,
      instanceId,
      contractAddress,
    }: {
      contract: PixelynxNftContract;
      contractAddress: `0x${string}`;
      transactionHash: `0x${string}`;
      instanceId?: string;
    }) => {
      try {
        const transfers = await contract.processTransaction(transactionHash);

        // ONLY FOR MINTING TRACK
        if (instanceId) {
          const { success } = await completeMintingTracks({
            transfers,
            instanceId,
            contractAddress,
          });

          return { success };
        }

        return { success: true };
      } catch (e) {
        return { success: false, error: e };
      }
    },
    [completeMintingTracks]
  );

  return {
    getMintPrice,
    getName,
    isError,
    isLoading,
    startMintNftTransaction,
    processMintNftTransaction,
    completeMintingTracks,
  };
}
