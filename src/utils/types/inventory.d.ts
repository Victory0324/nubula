TemplateType = 'Track' | 'Stem' | 'Video';

interface Instance {
  tokenId: string | null;
  type: TemplateType;
  instanceId: string;
  userOwner: string;
  isFavourite: boolean;
  templateId: string;
  quantity: number?;
  name: string;
  templateId: string;
  description: string;
  isMinted: boolean;
  body: StemInput;
}

interface StemInstance extends Instance {
  body: InputStem;
}

interface TrackInstance extends Instance {
  body: TrackTemplateBody;
}

type VideoTemplateBody = {
  videoUrl: string;
  thumbnailUrl: string;
  name: string;
  itemId: string;
  itemType: 'video';
  duration: number;
  trackTemplateIds: string[];
  scenzNames: string[];
};

interface VideoInstance extends Instance {
  body: VideoTemplateBody;
}

interface StemMetadata {
  category: string;
  itemId: string;
  itemType: string;
}

type TrackTemplateBody = Omit<OutputTrack, 'instanceId' | 'isFavourite'>;

interface TrackTemplate {
  templateId: string;
  type: TemplateType;
  body: TrackTemplateBody;
  description: string;
}

interface VideoTemplate {
  templateId: string;
  type: TemplateType;
  body: VideoTemplateBody;
  description: string;
}

interface NewStemTemplate {
  id: string;
  name: string;
  description: string;
  type: 'Stem';
  rarity: null;
  imageUrl: null;
  iconUrl: null;
  nftInfo: null;
  body: InputStem;
}

interface GenesisKorNft {
  transactionId: string;
  checkoutId: string;
  contractId: string;
  status: string;
  hasPaymentError: boolean;
  isPaymentSubmitted: boolean;
  isPaymentReceived: boolean;
  isNFTDelivered: boolean;
  isFreeClaim: boolean;
}

interface KorPatchBody {
  korUnlockId: string;
  chosenBackground: number;
  isKORTutorialDone: boolean;
  isBackgroundTutorialDone: boolean;
}

interface Kor {
  korName: string;
  korUnlockId: string;
  chosenBackground: number;
  isKORTutorialDone: boolean;
  isBackgroundTutorialDone: boolean;
  eyeColor: string;
  contractAddresses: {
    TrackContractAddress: string;
    PaperContractId: string;
    KORContractAddress: string;
    PaperTrackContractID: string;
  };
  korAsset?: string;
  korImage?: string;
  isKORClaimed: boolean;
  isLocked: boolean;
  animationsAvailable: boolean;
}

interface SelectedKorId {
  korUnlockId: string;
}
