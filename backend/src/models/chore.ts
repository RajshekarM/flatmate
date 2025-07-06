export interface OnDemandChore {
  id: string;
  name: string;
  lastAssignedTo: string;
  triggered: boolean;
  triggeredAt: string;
  alertCount: number;
  alertRecipients: string[];
}
