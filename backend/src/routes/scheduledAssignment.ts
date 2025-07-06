import express, { Request, Response } from 'express';
import { ScheduledAssignmentModel } from '../models/assignments';
import { ScheduleModel } from '../models/schedule';

const router = express.Router();

/**
 * POST /api/timed
 * Create one or more scheduled assignments
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { assignments } = req.body;

  if (!Array.isArray(assignments)) {
    res.status(400).json({ error: 'assignments must be an array' });
    return;
  }

  try {
    const result = await ScheduledAssignmentModel.insertMany(assignments);
    res.status(201).json({ message: 'Scheduled assignments saved', data: result });
  } catch (err) {
    console.error('❌ Failed to save assignments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/timed
 * Get all scheduled assignments or filter by scheduleId
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { scheduleId } = req.query;
  const filter = scheduleId ? { scheduleId } : {};

  try {
    const result = await ScheduledAssignmentModel.find(filter);
    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Failed to fetch assignments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/timed/:id
 * Update a scheduled assignment
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await ScheduledAssignmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    res.json({ message: 'Assignment updated', updated });
  } catch (err) {
    console.error('❌ Failed to update assignment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/timed/:id
 * Delete a scheduled assignment
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ScheduledAssignmentModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    res.json({ message: 'Assignment deleted', id: req.params.id });
  } catch (err) {
    console.error('❌ Failed to delete assignment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/rotate/:scheduleId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { scheduleId } = req.params;

    // 1. Fetch all assignments for the schedule
    const assignments = await ScheduledAssignmentModel.find({ scheduleId });

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
    const schedule = await ScheduleModel.findById(scheduleId);
    if (!schedule || !schedule.groupId) {
      res.status(404).json({ error: 'Schedule or associated group not found' });
      return;
    }

    const group = await GroupModel.findById(schedule.groupId);
    if (!group || !group.members?.length) {
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
    await ScheduledAssignmentModel.insertMany(newAssignments);

    res.status(200).json({
      message: 'Chores rotated successfully',
      data: newAssignments,
    });
  } catch (err) {
    console.error('❌ Failed to rotate chores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
