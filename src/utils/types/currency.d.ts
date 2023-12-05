interface CurrencyBalance {
  currencyId: string;
  value: number;
}

interface Reward {
  canClaim: boolean;
  lastClaimedDate: string;
  lastClaimedScheduleIndex: number;
  claimCount: number;
  actionTag: string;
  actionId: string;
  nextScheduleIndex: number;
  nextScheduleValue: number;
  currencyId: string;
}
