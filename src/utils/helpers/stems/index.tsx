export function getInventoryStem(stem: InputStem, inventoryStems: Instance[]) {
  return inventoryStems.find(
    (inventoryStem) => inventoryStem.templateId === stem?.itemId
  );
}

export function getStemTitle(inventoryStems: Instance[], stem?: InputStem) {
  return stem
    ? getInventoryStem(stem, inventoryStems)?.name || stem?.trackTitle
    : '';
}

export function getStemFavorited(inventoryStems: Instance[], stem?: InputStem) {
  return stem
    ? getInventoryStem(stem, inventoryStems)?.isFavourite || false
    : false;
}

export function filterStems({
  genreFilter,
  stems,
  artistFilter,
  favoritesFilter,
  mintedFilter,
  inventoryStems,
  unlockedIds,
  sessionUnlockedIds,
}: {
  stems: InputStem[];
  inventoryStems: Instance[];
  genreFilter: string[];
  favoritesFilter: 'all' | 'favorites';
  artistFilter: string[];
  mintedFilter: string;
  unlockedIds: string[] | null;
  sessionUnlockedIds: string[] | null;
}) {
  let filtered = genreFilter.length
    ? stems.filter((stem) => genreFilter.includes(stem.style))
    : stems;

  filtered = artistFilter.length
    ? filtered.filter((stem) => artistFilter.includes(stem.trackArtist))
    : filtered;

  filtered =
    favoritesFilter === 'all'
      ? filtered
      : filtered.filter((stem) =>
          inventoryStems.find(
            (stemInstance) =>
              stemInstance.templateId === stem.itemId &&
              stemInstance.isFavourite
          )
        );

  const allUnlockedIds = [
    ...(unlockedIds || []),
    ...(sessionUnlockedIds || []),
  ];

  filtered =
    mintedFilter === 'all'
      ? filtered
      : mintedFilter === 'locked'
      ? filtered.filter((stem) => !allUnlockedIds?.includes(stem.unlockId))
      : filtered.filter((stem) => allUnlockedIds?.includes(stem.unlockId));

  return filtered;
}

export function canTemporarilyUnlock(stem: InputStem) {
  return !stem.packId.includes('mau5trap');
}
