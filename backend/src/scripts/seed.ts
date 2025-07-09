import mongoose from 'mongoose';
import { UserModel } from '../models/user';
import { GroupModel } from '../models/groups';
import { ChoreModel } from '../models/chore';
import { ScheduleModel } from '../models/schedule';
import { ScheduledAssignmentModel } from '../models/scheduledAssignment';
import {  OnDemandAssignmentModel } from '../models/onDemandAssignment';
const MONGO_URI = 'mongodb://127.0.0.1:27017/flatmates';


async function seed() {

  async function safeConnect() {
  // If already connected, disconnect first
  if (mongoose.connection.readyState !== 0) {
    console.log('🔌 Closing previous DB connection...');
    await mongoose.disconnect();
  }
  await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');
}


  await safeConnect();
  
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
  await UserModel.deleteMany({});
  await GroupModel.deleteMany({});
  await ChoreModel.deleteMany({});
  await ScheduleModel.deleteMany({});
  await ScheduledAssignmentModel.deleteMany({});
  await OnDemandAssignmentModel.deleteMany({});

  // 1. Create Group
  const group = await GroupModel.create({ name: 'Flatmates', members: [] });

  // 2. Create Users
  const raj = await UserModel.create({ username: 'Raj', groupId: group._id });
  const emma = await UserModel.create({ username: 'Emma', groupId: group._id });

  // Update group with members
  group.members = [raj._id, emma._id];
  await group.save();

  // 3. Create Chores
  const kitchen = await ChoreModel.create({ title: 'Clean Kitchen', groupId: group._id });
  const trash = await ChoreModel.create({ title: 'Take Out Trash', groupId: group._id });
  const bathroom = await ChoreModel.create({ title: 'Clean Bathroom', groupId: group._id });

  // 4. Create Schedule
  const schedule = await ScheduleModel.create({
    name: 'Weekly Cleaning',
    type: 'weekly',
    startDate: new Date().toISOString(),
    groupId: group._id,
    assignments: [],
    onDemandChores: [],
  });

  // 5. Create Scheduled Assignments
  const assignment1 = await ScheduledAssignmentModel.create({
    choreTitle: kitchen.title,
    memberId: raj._id.toString(),
    frequency: 'weekly',
    type: 'weekday',
    weekday: 'Monday',
    completed: false,
    scheduleId: schedule._id.toString(),
  });

  const assignment2 = await ScheduledAssignmentModel.create({
    choreTitle: bathroom.title,
    memberId: emma._id.toString(),
    frequency: 'weekly',
    type: 'weekday',
    weekday: 'Wednesday',
    completed: false,
    scheduleId: schedule._id.toString(),
  });

  // 6. Create On-Demand Assignment
  const onDemand = await OnDemandAssignmentModel.create({
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
  await schedule.save();

  console.log('✅ Seeding complete!');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ Seeding error:', err);
  process.exit(1);
});
