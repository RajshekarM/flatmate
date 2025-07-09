"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledAssignmentModel = exports.ScheduledAssignmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// 🗓️ Scheduled Assignment Schema
exports.ScheduledAssignmentSchema = new mongoose_1.default.Schema({
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
    date: { type: String }, // For date-based assignments
    weekday: { type: String }, // For weekday-based ones
    completed: { type: Boolean, default: false },
    scheduleId: {
        type: String,
        required: true,
        ref: 'Schedule'
    }
}, {
    collection: 'ScheduledAssignment' // 👈 Add this line to force exact name
});
exports.ScheduledAssignmentModel = mongoose_1.default.model('ScheduledAssignment', exports.ScheduledAssignmentSchema);
