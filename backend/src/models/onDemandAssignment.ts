import mongoose from 'mongoose';

// ⚡ On-Demand Assignment Schema
export const OnDemandAssignmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastAssignedTo: { type: String, required: true },
  triggered: { type: Boolean, default: false },
  triggeredAt: { type: String, required: true },
  alertCount: { type: Number, default: 0 },
  alertRecipients: { type: [String], default: [] },
  scheduleId: {
    type: String,
    required: true,
    ref: 'Schedule'
  }
},
{
  collection: 'OnDemandAssignment' // 👈 Add this line to force exact name
});

export const OnDemandAssignmentModel = mongoose.model(
  'OnDemandAssignment',
  OnDemandAssignmentSchema
);
