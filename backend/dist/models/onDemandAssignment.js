"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnDemandAssignmentModel = exports.OnDemandAssignmentSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// ⚡ On-Demand Assignment Schema
exports.OnDemandAssignmentSchema = new mongoose_1.default.Schema({
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
}, {
    collection: 'OnDemandAssignment' // 👈 Add this line to force exact name
});
exports.OnDemandAssignmentModel = mongoose_1.default.model('OnDemandAssignment', exports.OnDemandAssignmentSchema);
