import mongoose from 'mongoose';

export interface OnDemandChore {
  id: string;
  name: string;
  lastAssignedTo: string;
  triggered: boolean;
  triggeredAt: string;
  alertCount: number;
  alertRecipients: string[];
}


const ChoreSchema = new mongoose.Schema({
  title: String,
  description: String,
  defaultFrequency: String, // e.g., 'weekly', 'biweekly'
});



export const ChoreModel = mongoose.model('Chore', ChoreSchema);

