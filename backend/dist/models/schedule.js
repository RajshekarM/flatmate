"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ScheduleSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['weekly', 'cyclic'], required: true },
    startDate: { type: String, required: true }, // ISO string
    groupId: { type: String, required: true, ref: 'Group' },
    // ✅ Just references
    assignments: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'ScheduledAssignment' }],
    onDemandChores: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'OnDemandAssignment' }],
});
exports.ScheduleModel = mongoose_1.default.model('Schedule', ScheduleSchema);
