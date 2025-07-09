"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = require("../models/schedule");
const router = express_1.default.Router();
/**
 * POST /api/schedules
 * Create a new schedule
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, startDate, groupId } = req.body;
        if (!name || !type || !startDate || !groupId) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        const newSchedule = new schedule_1.ScheduleModel({ name, type, startDate, groupId });
        const saved = yield newSchedule.save();
        res.status(201).json(saved);
    }
    catch (err) {
        console.error('❌ Failed to create schedule:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * GET /api/schedules
 * Get all schedules
 */
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield schedule_1.ScheduleModel.find();
        res.json(schedules);
    }
    catch (err) {
        console.error('❌ Failed to fetch schedules:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * PUT /api/schedules/:id
 * Update a schedule (name, type, startDate)
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, startDate } = req.body;
        const updated = yield schedule_1.ScheduleModel.findByIdAndUpdate(req.params.id, { name, type, startDate }, { new: true });
        if (!updated) {
            res.status(404).json({ error: 'Schedule not found' });
            return;
        }
        res.json(updated);
    }
    catch (err) {
        console.error('❌ Failed to update schedule:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * DELETE /api/schedules/:id
 * Delete a schedule by ID
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield schedule_1.ScheduleModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Schedule not found' });
            return;
        }
        res.json({ message: 'Schedule deleted successfully', id: req.params.id });
    }
    catch (err) {
        console.error('❌ Failed to delete schedule:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
