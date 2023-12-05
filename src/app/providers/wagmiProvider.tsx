'use client';

import React from 'react';

import { WagmiConfig, createConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';

import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

import { isDevOrPreview } from '@/utils/helpers/env';
import { useWallet } from './Wallet';

export default function WagmiProvider({ children }: React.PropsWithChildren) {
  const { onConnect, onDisconnect } = useWallet();
  const alchemyApiKey = process.env.NEXT_PUBLIC_AlCHEMY_API_KEY;
  const walletConnectProjectId =
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

  if (!alchemyApiKey) throw 'Alchemy API key missing';
  if (!walletConnectProjectId) throw 'Wallet Connect project ID missing';

  const chains = [isDevOrPreview() ? polygonMumbai : polygon];

  const config = createConfig(
    getDefaultConfig({
      // Required API Keys
      alchemyId: alchemyApiKey,
      walletConnectProjectId,

      // Required config
      appName: 'KORUS',

      // Optional config
      chains,
      appDescription: '',
      appUrl: process.env.NEXT_PUBLIC_VERCEL_URL,
      appIcon: process.env.NEXT_PUBLIC_VERCEL_URL + '/public/homepage-logo.png',
    })
  );

  return (
    <WagmiConfig {...{ config }}>
      <ConnectKitProvider
        options={{ walletConnectName: 'Wallet Connect', overlayBlur: 0.8 }}
        customTheme={{
          '--ck-body-background': 'rgba(0,0,0)',
          '--ck-body-background-transparent': 'rgba(0,0,0)',
          '--ck-border-radius': '0.75rem',
          '--ck-modal-box-shadow': 'inset 0 0 0 1px rgba(255, 255, 255, 0.80);',
          '--ck-primary-button-border-radius': '0.75rem',
          '--ck-primary-button-background': 'rgba(0,0,0)',
          '--ck-primary-button-box-shadow':
            'inset 0 0 0 1px rgba(255, 255, 255, 0.20);',
        }}
        {...{ onConnect, onDisconnect }}
      >
        {children}
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
