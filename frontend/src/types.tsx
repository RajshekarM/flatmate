
export interface Member {
  id: string;
  name: string;
  email?: string;
  role?: 'admin' | 'member';
}


export interface Group {
  id: string;
  name: string;
  members: Member[];
}

export interface Chore {
  id: number;
  name: string;
  assignedTo: string;
  type: 'Scheduled' | 'On-Demand';
  frequency: string | null;
  status: 'Pending' | 'Done';
}

export interface OnDemandChore {
  id: string;
  name: string;
  lastAssignedTo: string;       // current assignee
  triggered: boolean;
  triggeredAt: string;
  alertCount: number;           // how many alerts sent
  alertRecipients: string[];    // current notification targets
}

export interface choreAssignment {
  id?: string;
  scheduleId: string;           // ✅ REQUIRED
  choreTitle: string;
  choreId?: string;
  memberId?: string;
  assignedTo?: string;
  frequency?: 'none' | 'daily' | 'weekly' | 'biweekly' | 'monthly';
  type?: 'date' | 'weekday';
  date?: string;                // e.g., '2025-06-20'
  weekday?: string;             // e.g., 'Monday'
  completed?: boolean;
}

