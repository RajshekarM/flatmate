import dayjs from 'dayjs';
import type { choreAssignment } from '../types';

export function fetchUpcomingChores(assignments: choreAssignment[]): choreAssignment[] {
  const today = dayjs();
  const todayDate = today.format('YYYY-MM-DD');
  const todayWeekday = today.format('dddd');

  return assignments.filter((task) => {
    
    if (task.type === 'weekday' && task.assignedTo === todayWeekday) {
      switch (task.frequency) {
        case 'daily': return true;
        case 'weekly': return true;
        case 'biweekly': return today.day() % 2 === 0;
        case 'monthly': return today.date() <= 7;
        default: return false;
      }
    }

    return false;
  });
}
