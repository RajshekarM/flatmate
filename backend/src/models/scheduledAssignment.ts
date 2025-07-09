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
}, {
  collection: 'ScheduledAssignment' // 👈 Add this line to force exact name
});

export const ScheduledAssignmentModel = mongoose.model(
  'ScheduledAssignment',
  ScheduledAssignmentSchema
);
