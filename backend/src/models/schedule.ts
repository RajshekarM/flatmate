import mongoose from 'mongoose';
import {
  ScheduledAssignmentSchema,
} from './scheduledAssignment'; // adjust path as needed


import {
  OnDemandAssignmentSchema,
} from './onDemandAssignment'; 


const ScheduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['weekly', 'cyclic'], required: true },
  startDate: { type: String, required: true }, // ISO string
  groupId: { type: String, required: true, ref: 'Group' },

  // ✅ Just references
  assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScheduledAssignment' }],
  onDemandChores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OnDemandAssignment' }],
});


export const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);
