import express, { Request, Response } from 'express';
import { ScheduleModel } from '../models/schedule';

const router = express.Router();

/**
 * POST /api/schedules
 * Create a new schedule
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, startDate, groupId } = req.body;

    if (!name || !type || !startDate || !groupId) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const newSchedule = new ScheduleModel({ name, type, startDate, groupId });
    const saved = await newSchedule.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Failed to create schedule:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/schedules
 * Get all schedules
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const schedules = await ScheduleModel.find();
    res.json(schedules);
  } catch (err) {
    console.error('❌ Failed to fetch schedules:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/schedules/:id
 * Update a schedule (name, type, startDate)
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, type, startDate } = req.body;

    const updated = await ScheduleModel.findByIdAndUpdate(
      req.params.id,
      { name, type, startDate },
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error('❌ Failed to update schedule:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/schedules/:id
 * Delete a schedule by ID
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ScheduleModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: 'Schedule not found' });
      return;
    }

    res.json({ message: 'Schedule deleted successfully', id: req.params.id });
  } catch (err) {
    console.error('❌ Failed to delete schedule:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});









export default router;
