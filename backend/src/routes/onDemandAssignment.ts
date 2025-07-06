import express, { Request, Response } from 'express';
import { OnDemandAssignmentModel } from '../models/assignments';

const router = express.Router();

/**
 * POST /api/ondemand
 * Create one or more on-demand chores
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { chores } = req.body;

  if (!Array.isArray(chores)) {
    res.status(400).json({ error: 'chores must be an array' });
    return;
  }

  try {
    const result = await OnDemandAssignmentModel.insertMany(chores);
    res.status(201).json({ message: 'On-demand chores saved', data: result });
  } catch (err) {
    console.error('❌ Failed to save on-demand chores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/ondemand
 * Get all on-demand chores (optionally by scheduleId or triggered=true)
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { scheduleId, triggered } = req.query;
  const filter: any = {};

  if (scheduleId) filter.scheduleId = scheduleId;
  if (triggered) filter.triggered = triggered === 'true';

  try {
    const result = await OnDemandAssignmentModel.find(filter);
    res.status(200).json(result);
  } catch (err) {
    console.error('❌ Failed to fetch on-demand chores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PUT /api/ondemand/:id
 * Update a triggered chore (alert count, triggered flag, etc.)
 */
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await OnDemandAssignmentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      res.status(404).json({ error: 'On-demand chore not found' });
      return;
    }

    res.json({ message: 'On-demand chore updated', updated });
  } catch (err) {
    console.error('❌ Failed to update on-demand chore:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * DELETE /api/ondemand/:id
 * Delete a triggered chore
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await OnDemandAssignmentModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      res.status(404).json({ error: 'On-demand chore not found' });
      return;
    }

    res.json({ message: 'On-demand chore deleted', id: req.params.id });
  } catch (err) {
    console.error('❌ Failed to delete on-demand chore:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
