export function getClipUnlockIds(mints: TokenData[]) {
  const clipUnlockIds: { [key: string]: boolean } = {};

  for (const { korus } of mints) {
    if (korus?.unlockId && korus.unlockId.length === korus.itemType.length) {
      for (let i = 0; i < korus.unlockId.length; i++) {
        if (korus.itemType[i] === 'clip') {
          clipUnlockIds[korus.unlockId[i]] = true;
        }
      }
    }
  }

  return Object.keys(clipUnlockIds);
}

export function getKorUnlockIds(mints: TokenData[] | null) {
  if (!mints) return [];

  const unlockIds: { [key: string]: boolean } = {};

  for (const { korus } of mints) {
    if (korus?.unlockId && korus.unlockId.length === korus.itemType.length) {
      for (let i = 0; i < korus.unlockId.length; i++) {
        if (korus.itemType[i] === 'kor') {
          unlockIds[korus.unlockId[i]] = true;
        }
      }
    }
  }

  return Object.keys(unlockIds);
}

export function getCollections(mints: TokenData[]) {
  const collections: { [key: string]: boolean } = {};

  for (const { nftCollection } of mints) {
    collections[nftCollection.slug] = true;
  }

  return Object.keys(collections);
}

export function getMintPrices({
  mintPrice,
  quantity,
}: {
  mintPrice?: MintPrice;
  quantity: number;
}) {
  const fiat = !mintPrice?.fiat
    ? '-'
    : `\$${(
        parseFloat(mintPrice.fiat.price) * quantity +
        parseFloat(mintPrice.fiat.priceWithPaperCardFee)
      ).toFixed(2)}`;

  const crypto = !mintPrice?.crypto
    ? '-'
    : `${parseFloat(mintPrice.crypto.price) * quantity} ${
        mintPrice.crypto.denom
      }`;

  return { fiat, crypto };
}

export function getMintsForKorUnlockId({
  unlockId,
  mints,
}: {
  unlockId?: string;
  mints: TokenData[] | null;
}) {
  if (!mints || !unlockId) return [];

  const matchingMints: TokenData[] = [];

  for (const mint of mints) {
    const { korus } = mint;
    if (korus?.unlockId && korus.unlockId.length === korus.itemType.length) {
      for (let i = 0; i < korus.unlockId.length; i++) {
        if (korus.itemType[i] === 'kor' && korus.unlockId[i] === unlockId) {
          matchingMints.push(mint);
        }
      }
    }
  }

  return matchingMints;
}
