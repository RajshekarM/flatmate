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
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const groups_1 = require("../models/groups");
const chore_1 = require("../models/chore");
const schedule_1 = require("../models/schedule");
const scheduledAssignment_1 = require("../models/scheduledAssignment");
const onDemandAssignment_1 = require("../models/onDemandAssignment");
const MONGO_URI = 'mongodb://127.0.0.1:27017/flatmates';
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        function safeConnect() {
            return __awaiter(this, void 0, void 0, function* () {
                // If already connected, disconnect first
                if (mongoose_1.default.connection.readyState !== 0) {
                    console.log('🔌 Closing previous DB connection...');
                    yield mongoose_1.default.disconnect();
                }
                yield mongoose_1.default.connect(MONGO_URI);
                console.log('✅ MongoDB connected');
            });
        }
        yield safeConnect();
        // / 🧹 Clear existing data
        //   await Promise.all([
        //     UserModel.deleteMany({}),
        //     GroupModel.deleteMany({}),
        //     ChoreModel.deleteMany({}),
        //     ScheduleModel.deleteMany({}),
        //     ScheduledAssignmentModel.deleteMany({}),
        //     OnDemandAssignmentModel.deleteMany({})
        //   ]);
        // Clear existing data
        yield user_1.UserModel.deleteMany({});
        yield groups_1.GroupModel.deleteMany({});
        yield chore_1.ChoreModel.deleteMany({});
        yield schedule_1.ScheduleModel.deleteMany({});
        yield scheduledAssignment_1.ScheduledAssignmentModel.deleteMany({});
        yield onDemandAssignment_1.OnDemandAssignmentModel.deleteMany({});
        // 1. Create Group
        const group = yield groups_1.GroupModel.create({ name: 'Flatmates', members: [] });
        // 2. Create Users
        const raj = yield user_1.UserModel.create({ username: 'Raj', groupId: group._id });
        const emma = yield user_1.UserModel.create({ username: 'Emma', groupId: group._id });
        // Update group with members
        group.members = [raj._id, emma._id];
        yield group.save();
        // 3. Create Chores
        const kitchen = yield chore_1.ChoreModel.create({ title: 'Clean Kitchen', groupId: group._id });
        const trash = yield chore_1.ChoreModel.create({ title: 'Take Out Trash', groupId: group._id });
        const bathroom = yield chore_1.ChoreModel.create({ title: 'Clean Bathroom', groupId: group._id });
        // 4. Create Schedule
        const schedule = yield schedule_1.ScheduleModel.create({
            name: 'Weekly Cleaning',
            type: 'weekly',
            startDate: new Date().toISOString(),
            groupId: group._id,
            assignments: [],
            onDemandChores: [],
        });
        // 5. Create Scheduled Assignments
        const assignment1 = yield scheduledAssignment_1.ScheduledAssignmentModel.create({
            choreTitle: kitchen.title,
            memberId: raj._id.toString(),
            frequency: 'weekly',
            type: 'weekday',
            weekday: 'Monday',
            completed: false,
            scheduleId: schedule._id.toString(),
        });
        const assignment2 = yield scheduledAssignment_1.ScheduledAssignmentModel.create({
            choreTitle: bathroom.title,
            memberId: emma._id.toString(),
            frequency: 'weekly',
            type: 'weekday',
            weekday: 'Wednesday',
            completed: false,
            scheduleId: schedule._id.toString(),
        });
        // 6. Create On-Demand Assignment
        const onDemand = yield onDemandAssignment_1.OnDemandAssignmentModel.create({
            name: trash.title,
            lastAssignedTo: raj._id.toString(),
            triggered: true,
            triggeredAt: new Date().toISOString(),
            alertCount: 0,
            alertRecipients: [emma._id.toString()],
            scheduleId: schedule._id.toString(),
        });
        // Link assignments to schedule
        schedule.assignments = [assignment1._id, assignment2._id];
        schedule.onDemandChores = [onDemand._id];
        yield schedule.save();
        console.log('✅ Seeding complete!');
        process.exit();
    });
}
seed().catch((err) => {
    console.error('❌ Seeding error:', err);
    process.exit(1);
});
