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
const onDemandAssignment_1 = require("../models/onDemandAssignment");
const router = express_1.default.Router();
/**
 * GET /api/dashboard/announcements
 * Returns hardcoded or DB announcements
 */
router.get('/announcements', (_req, res) => {
    res.json([
        "Please clean the hallway before Sunday.",
        "Guests visiting Friday — kitchen must be spotless."
    ]);
});
/**
 * GET /api/dashboard/today
 * Returns assignments for today based on weekday
 */
router.get('/today', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const chores = yield scheduledAssignment_1.ScheduledAssignmentModel.find({ type: 'weekday' });
        const todayChores = chores.filter((assignment) => {
            return assignment.day === today;
        });
        res.json(todayChores);
    }
    catch (err) {
        console.error('❌ Failed to get today\'s chores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * GET /api/dashboard/upcoming
 * Returns upcoming weekday assignments (e.g., next 3 days)
 */
router.get('/upcoming', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const days = getNextNDays(3); // next 3 weekdays
        const chores = yield scheduledAssignment_1.ScheduledAssignmentModel.find({ type: 'weekday' });
        const upcoming = chores.filter((assignment) => {
            return days.includes(assignment.day);
        });
        res.json(upcoming);
    }
    catch (err) {
        console.error('❌ Failed to get upcoming chores:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/**
 * GET /api/dashboard/alerts
 * Returns triggered on-demand chores
 */
router.get('/alerts', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const alerts = yield onDemandAssignment_1.OnDemandAssignmentModel.find({ triggered: true });
        res.json(alerts);
    }
    catch (err) {
        console.error('❌ Failed to get on-demand alerts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
/**
 * Utility: Get next N weekdays as strings ("Monday", etc.)
 */
function getNextNDays(n) {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayIndex = new Date().getDay();
    return Array.from({ length: n }, (_, i) => {
        const index = (todayIndex + i + 1) % 7;
        return weekdays[index];
    });
}
