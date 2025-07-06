import mongoose from 'mongoose';

// 🗓️ Scheduled Assignment Schema
export const ScheduledAssignmentSchema = new mongoose.Schema({
  choreTitle: { type: String, required: true },
  memberId: { type: String, required: true },
  frequency: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'biweekly', 'monthly'],
    required: true,
  },
  type: {
    type: String,
    enum: ['date', 'weekday'],
    required: true,
  },
  date: { type: String },       // For date-based assignments
  weekday: { type: String },    // For weekday-based ones
  completed: { type: Boolean, default: false },
  scheduleId: {
    type: String,
    required: true,
    ref: 'Schedule'
  }
});

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
});

export const ScheduledAssignmentModel = mongoose.model(
  'ScheduledAssignment',
  ScheduledAssignmentSchema
);

export const OnDemandAssignmentModel = mongoose.model(
  'OnDemandAssignment',
  OnDemandAssignmentSchema
);
