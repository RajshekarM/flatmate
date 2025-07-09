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
const scheduledAssignment_1 = require("../models/scheduledAssignment");
const schedule_1 = require("../models/schedule");
const groups_1 = require("../models/groups");
const router = express_1.default.Router();
/**
 * POST /api/timed
 * Create one or more scheduled assignments
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignments } = req.body;
    if (!Array.isArray(assignments)) {
        res.status(400).json({ error: 'assignments must be an array' });
        return;
    }
    try {
        const result = yield scheduledAssignment_1.ScheduledAssignmentModel.insertMany(assignments);
        res.status(201).json({ message: 'Scheduled assignments saved', data: result });
    }
    catch (err) {
        console.error('❌ Failed to save assignments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * GET /api/timed
 * Get all scheduled assignments or filter by scheduleId
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scheduleId } = req.query;
    const filter = scheduleId ? { scheduleId } : {};
    try {
        const result = yield scheduledAssignment_1.ScheduledAssignmentModel.find(filter);
        res.status(200).json(result);
    }
    catch (err) {
        console.error('❌ Failed to fetch assignments:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * PUT /api/timed/:id
 * Update a scheduled assignment
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield scheduledAssignment_1.ScheduledAssignmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            res.status(404).json({ error: 'Assignment not found' });
            return;
        }
        res.json({ message: 'Assignment updated', updated });
    }
    catch (err) {
        console.error('❌ Failed to update assignment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * DELETE /api/timed/:id
 * Delete a scheduled assignment
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield scheduledAssignment_1.ScheduledAssignmentModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'Assignment not found' });
            return;
        }
        res.json({ message: 'Assignment deleted', id: req.params.id });
    }
    catch (err) {
        console.error('❌ Failed to delete assignment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.post('/rotate/:scheduleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { scheduleId } = req.params;
        // 1. Fetch all assignments for the schedule
        const assignments = yield scheduledAssignment_1.ScheduledAssignmentModel.find({ scheduleId });
        if (assignments.length === 0) {
            res.status(404).json({ error: 'No assignments found for this schedule' });
            return;
        }
        const allCompleted = assignments.every(a => a.completed);
        if (!allCompleted) {
            res.status(400).json({ error: 'All assignments must be completed before rotating' });
            return;
        }
        // 2. Find the schedule and its group
        const schedule = yield schedule_1.ScheduleModel.findById(scheduleId);
        if (!schedule || !schedule.groupId) {
            res.status(404).json({ error: 'Schedule or associated group not found' });
            return;
        }
        const group = yield groups_1.GroupModel.findById(schedule.groupId);
        if (!group || !((_a = group.members) === null || _a === void 0 ? void 0 : _a.length)) {
            res.status(404).json({ error: 'Group or members not found' });
            return;
        }
        const members = group.members.map(m => m.id); // Assuming members is array of objects with `id`
        // 3. Prepare rotated assignments
        const uniqueChores = [...new Set(assignments.map(a => a.choreTitle))];
        const newDate = new Date();
        newDate.setDate(newDate.getDate() + 7);
        const newAssignments = uniqueChores.map((title, index) => ({
            scheduleId,
            choreTitle: title,
            memberId: members[index % members.length],
            completed: false,
            date: newDate.toISOString().split('T')[0],
        }));
        // 4. Save rotated assignments
        yield scheduledAssignment_1.ScheduledAssignmentModel.insertMany(newAssignments);
        res.status(200).json({
            message: 'Chores rotated successfully',
            data: newAssignments,
        });
    }
    catch (err) {
        console.error('❌ Failed to rotate chores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
