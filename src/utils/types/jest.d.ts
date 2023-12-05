import { DappeteerPage, DappeteerBrowser } from '@chainsafe/dappeteer';

declare global {
  const browser: DappeteerBrowser;
  const page: DappeteerPage;
}
