import type { ChoreAssignment } from '../types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  chores: ChoreAssignment[];
  currentDate: string;
}

export default function MissedChores({ chores, currentDate }: Props) {
  console.log("Missed")
  const today = dayjs(currentDate);
  const weekdayMap: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};


    const missed = chores.filter((task) => {
    const assignedDay = task.assignedTo;
    const isDateType = task.type === 'date';
    const isWeekdayType = task.type === 'weekday';

    // Only proceed if the task is not marked done (you can later use a `task.completed` flag)
    if (task.completed) return false;

    // Missed date-based task
    if (isDateType) {
      return dayjs(assignedDay).isBefore(today, 'day');
    }

    // Missed weekday-based task (assume current day is Monday and task was Saturday)
    if (isWeekdayType) {
      const weekdayNumber = weekdayMap[assignedDay]; // e.g., "Monday" → 1
      const todayNumber = today.day();
      return weekdayNumber < todayNumber;
    }

    return false;
  });

  if (missed.length === 0) return null;

  return (
    <div className="bg-white text-black rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-red-600 mb-3">❌ Missed Chores</h2>
      <ul className="space-y-2 text-sm text-gray-800">
        {missed.map((task, i) => {
          const dueLabel =
            task.type === 'date'
              ? `Due: ${dayjs(task.assignedTo).from(today)}`
              : `Expected: ${task.assignedTo}`;

          return (
            <li key={i} className="flex justify-between items-center">
              <span>🚫 {task.choreTitle} • {task.memberId}</span>
              <span className="text-gray-500 text-xs">{dueLabel}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
