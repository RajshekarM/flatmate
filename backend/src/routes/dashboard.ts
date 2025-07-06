import express, { Request, Response } from 'express';
import { ScheduledAssignmentModel, OnDemandAssignmentModel } from '../models/assignments';

const router = express.Router();

/**
 * GET /api/dashboard/announcements
 * Returns hardcoded or DB announcements
 */
router.get('/announcements', (_req: Request, res: Response): void => {
  res.json([
    "Please clean the hallway before Sunday.",
    "Guests visiting Friday — kitchen must be spotless."
  ]);
});

/**
 * GET /api/dashboard/today
 * Returns assignments for today based on weekday
 */
router.get('/today', async (_req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const chores = await ScheduledAssignmentModel.find({ type: 'weekday' });

    const todayChores = chores.filter((assignment: any) => {
      return assignment.day === today;
    });

    res.json(todayChores);
  } catch (err) {
    console.error('❌ Failed to get today\'s chores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/dashboard/upcoming
 * Returns upcoming weekday assignments (e.g., next 3 days)
 */
router.get('/upcoming', async (_req: Request, res: Response): Promise<void> => {
  try {
    const days = getNextNDays(3); // next 3 weekdays
    const chores = await ScheduledAssignmentModel.find({ type: 'weekday' });

    const upcoming = chores.filter((assignment: any) => {
      return days.includes(assignment.day);
    });

    res.json(upcoming);
  } catch (err) {
    console.error('❌ Failed to get upcoming chores:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/dashboard/alerts
 * Returns triggered on-demand chores
 */
router.get('/alerts', async (_req: Request, res: Response): Promise<void> => {
  try {
    const alerts = await OnDemandAssignmentModel.find({ triggered: true });
    res.json(alerts);
  } catch (err) {
    console.error('❌ Failed to get on-demand alerts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

/**
 * Utility: Get next N weekdays as strings ("Monday", etc.)
 */
function getNextNDays(n: number): string[] {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();

  return Array.from({ length: n }, (_, i) => {
    const index = (todayIndex + i + 1) % 7;
    return weekdays[index];
  });
}
