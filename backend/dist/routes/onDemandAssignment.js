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
const onDemandAssignment_1 = require("../models/onDemandAssignment");
const router = express_1.default.Router();
/**
 * POST /api/ondemand
 * Create one or more on-demand chores
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chores } = req.body;
    if (!Array.isArray(chores)) {
        res.status(400).json({ error: 'chores must be an array' });
        return;
    }
    try {
        const result = yield onDemandAssignment_1.OnDemandAssignmentModel.insertMany(chores);
        res.status(201).json({ message: 'On-demand chores saved', data: result });
    }
    catch (err) {
        console.error('❌ Failed to save on-demand chores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * GET /api/ondemand
 * Get all on-demand chores (optionally by scheduleId or triggered=true)
 */
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { scheduleId, triggered } = req.query;
    const filter = {};
    if (scheduleId)
        filter.scheduleId = scheduleId;
    if (triggered)
        filter.triggered = triggered === 'true';
    try {
        const result = yield onDemandAssignment_1.OnDemandAssignmentModel.find(filter);
        res.status(200).json(result);
    }
    catch (err) {
        console.error('❌ Failed to fetch on-demand chores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * PUT /api/ondemand/:id
 * Update a triggered chore (alert count, triggered flag, etc.)
 */
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield onDemandAssignment_1.OnDemandAssignmentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            res.status(404).json({ error: 'On-demand chore not found' });
            return;
        }
        res.json({ message: 'On-demand chore updated', updated });
    }
    catch (err) {
        console.error('❌ Failed to update on-demand chore:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * DELETE /api/ondemand/:id
 * Delete a triggered chore
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield onDemandAssignment_1.OnDemandAssignmentModel.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ error: 'On-demand chore not found' });
            return;
        }
        res.json({ message: 'On-demand chore deleted', id: req.params.id });
    }
    catch (err) {
        console.error('❌ Failed to delete on-demand chore:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
