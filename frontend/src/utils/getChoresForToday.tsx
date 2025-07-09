import dayjs from 'dayjs';
import type { choreAssignment } from '../types';

const mockAssignments: choreAssignment[] = [
  {
    choreTitle: 'Clean Kitchen',
    memberId: 'm1',
    assignedTo: 'Saturday',
    frequency: 'biweekly',
    type: 'weekday',
    scheduleId:'2'
  },
  {
    choreTitle: 'Clean Hall',
    memberId: 'm1',
    assignedTo: 'Saturday',
    frequency: 'biweekly',
    type: 'weekday',
    scheduleId:'2'
  },
  {
    choreTitle: 'Clean Washroom',
    memberId: 'm2',
    assignedTo: '2025-06-15',
    frequency: 'none',
    type: 'date',
    scheduleId:'2'
  },
];


export function fetchChores()
{
  return mockAssignments
}

export function fetchTodayChores(assignments: choreAssignment[], currentUserId: string): choreAssignment[] {
  const today = dayjs();
  console.log(currentUserId)
  const todayDate = today.format('YYYY-MM-DD');
  const todayWeekday = today.format('dddd');

  return assignments.filter((task) => {
    if (task.memberId !== currentUserId) return false;

    if (task.type === 'date') {
      return task.assignedTo === todayDate;
    }

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
