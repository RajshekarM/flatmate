"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ChoreSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    defaultFrequency: String, // e.g., 'weekly', 'biweekly'
});
exports.ChoreModel = mongoose_1.default.model('Chore', ChoreSchema);
