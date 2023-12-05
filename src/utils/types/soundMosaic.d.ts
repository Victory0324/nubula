type Coordinates = {
  x: number;
  y: number;
};

interface InputStem {
  itemId: string;
  itemType: 'clip';
  korDisplayName: string;
  korId: string;
  genre: string;
  style: string;
  key: string;
  packDisplayName: string;
  packId: string;
  category: string;
  packVersion: string;
  clip: string;
  section: string;
  gainDb: number;
  durationBeats: number;
  bpm: number;
  trackTitle: string;
  trackArtist: string;
  audioUrl: string;
  audioUrlWav: string;
  unlockId: string;
  coordinates: Coordinates;
}

interface OutputTrackArrangement {
  itemId: string;
  itemType: 'clip';
  startBeats: number;
  durationBeats: number;
}

interface OutputTrackStem {
  category: string;
  categoryId: number;
  itemId: string;
  itemType: 'stem';
  audioUrl: string;
  audioUrlWav: string;
  arrangement: OutputTrackArrangement[];
}

interface OutputTrack {
  itemId: string;
  unlockId: string;
  itemType: 'track';
  audioUrl: string;
  audioUrlWav: string;
  zipFileUrl: string;
  artists?: string[];
  artworkImageUrl?: string;
  generatedTrackName: string;
  korId: string;
  bpm: number;
  durationBeats: number;
  inputStemId: string;
  unlockIds: string[];
  arrangement: OutputTrackArrangement[];
  stems?: OutputTrackStem[];
  instanceId?: string;
  isFavourite?: boolean;
  name?: string;
}

interface OutputTrackPostBody extends OutputTrack {
  korTokenId: number;
  korContractAddress: string;
}
