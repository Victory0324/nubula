type WalletType = 'paper';

type AnalyticsCategory =
  | 'song'
  | 'stem'
  | 'page_flow'
  | 'tutorial'
  | 'share'
  | 'stream_royalty'
  | 'unlock'
  | 'token';

interface AnalyticsEventDataBase {
  name: string | null;
  user_id?: string | null;
}

interface EventTest extends AnalyticsEventDataBase {
  category: 'test';
  action: 'test';
}

interface SessionEvent extends AnalyticsEventDataBase {
  category: 'session';
  action: 'session_start';
}

type SongEventAction =
  | 'download'
  | 'delete'
  | 'favorite'
  | 'generated_create_b'
  | 'generated_lynx'
  | 'source'
  | 'mint_start'
  | 'mint_success'
  | 'save'
  | 'plays'
  | 'recreate'
  | 'clear'
  | 'autogenerate';

interface SongEventData extends AnalyticsEventDataBase {
  category: 'song';
  action: SongEventAction;
}

interface SongSaveEventData extends SongEventData {
  type: 'save' | 'own';
}

type VideoEventAction =
  | 'download'
  | 'delete'
  | 'favorite'
  | 'mint_start'
  | 'mint_success'
  | 'save'
  | 'plays';

interface VideoEventData extends AnalyticsEventDataBase {
  category: 'video';
  action: VideoEventAction;
}

type OauthIdentityProviders = 'Google' | 'Facebook';

type PageFlowAction =
  | 'korus_enter'
  | 'wallet_connect_start'
  | 'wallet_connect_success'
  | 'wallet_connect_skip'
  | 'login_start'
  | 'login_success'
  | 'registration_start'
  | 'registration_success'
  | 'dashboard_launch'
  | 'dashboard_view'
  | 'sidebar_launch'
  | 'navbar_launch';

interface StemEventData extends AnalyticsEventDataBase {
  category: 'stem';
  action: 'preview_hover' | 'preview_click' | 'click_create';
}

interface PageFlowEventData extends AnalyticsEventDataBase {
  category: 'page_flow';
  action: PageFlowAction;
  wallet_type?: WalletType | null;
}

interface OauthLoginEventData extends AnalyticsEventDataBase {
  category: 'page_flow';
  action: 'oauth_login_start' | 'oauth_login_success';
  provider: OauthIdentityProviders;
}

interface LoginFailedEventData extends AnalyticsEventDataBase {
  category: 'page_flow';
  action: 'login_failed';
  status_code: Response['status'];
}

interface TutorialEventData extends AnalyticsEventDataBase {
  category: 'tutorial';
  action: 'tutorial_skip' | 'tutorial_finished';
  tutorial: 'lynx' | 'nebula';
}

interface TutorialNebulaEventData extends AnalyticsEventDataBase {
  category: 'tutorial_nebula';
  action: 'tutorial_skip' | 'tutorial_finished';
}

interface TutorialLynxEventData extends AnalyticsEventDataBase {
  category: 'tutorial_lynx';
  action: 'tutorial_skip' | 'tutorial_finished';
}

interface ShareEventData extends AnalyticsEventDataBase {
  category: 'share';
  action: 'visit' | 'play' | 'open_sharing';
}

interface StreamRoyaltyEventData extends AnalyticsEventDataBase {
  category: 'stream_royalty';
  action: 'listen_30s+';
}

interface KorEventData extends AnalyticsEventDataBase {
  category: 'kor';
  action: 'claim_kor' | 'buy_kor' | 'change_kor';
}

interface UnlockEventData extends AnalyticsEventDataBase {
  category: 'unlock';
  action: 'track_collectibles';
}

interface ScenzEventData extends AnalyticsEventDataBase {
  category: 'scenz';
  action: 'change_scenz';
}

interface ProfileEventData extends AnalyticsEventDataBase {
  category: 'profile';
  action: 'change_picture';
  image_type: 'nft' | 'device';
}

interface SpentCoinsEventData extends AnalyticsEventDataBase {
  category: 'spent_coins';
  action: 'track_slots' | 'stems_unlock';
}

interface DailyRewardEventData extends AnalyticsEventDataBase {
  category: 'received_coins';
  action: 'daily_reward';
  day_number: number;
  claim_counts: number;
}

interface TrackCreatedEventData extends AnalyticsEventDataBase {
  category: 'received_coins';
  action: 'track_created';
}

interface XYPadEventData extends AnalyticsEventDataBase {
  category: 'xypad';
  action: 'turn_on' | 'turn_off' | 'recording_on' | 'recording_off';
}

type AnalyticsEventData =
  | EventTest
  | SongEventData
  | SongSaveEventData
  | VideoEventData
  | StemEventData
  | PageFlowEventData
  | OauthLoginEventData
  | LoginFailedEventData
  | TutorialNebulaEventData
  | TutorialLynxEventData
  | ShareEventData
  | StreamRoyaltyEventData
  | KorEventData
  | UnlockEventData
  | ScenzEventData
  | ProfileEventData
  | SpentCoinsEventData
  | XYPadEventData
  | DailyRewardEventData
  | TrackCreatedEventData
  | SessionEvent;

interface AnalyticsEvent {
  created_at: string;
  game_id: 'korus-web';
  event_type: AnalyticsEventType;
  event: AnalyticsEventData;
}

interface AnalyticsPayload {
  id: string;
  events: AnalyticsEvent[];
}
