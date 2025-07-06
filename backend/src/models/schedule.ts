import mongoose from 'mongoose';
import {
  ScheduledAssignmentSchema,
  OnDemandAssignmentSchema,
} from './assignments'; // adjust path as needed

const ScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['weekly', 'cyclic'],
    required: true,
  },
  startDate: {
    type: String, // ISO format string
    required: true,
  },
  groupId: {
    type: String,
    required: true,
    ref: 'Group', // assumes you have a Group model
  },
  assignments: {
    type: [ScheduledAssignmentSchema],
    default: [],
  },
  onDemandChores: {
    type: [OnDemandAssignmentSchema],
    default: [],
  },
});

export const ScheduleModel = mongoose.model('Schedule', ScheduleSchema);
