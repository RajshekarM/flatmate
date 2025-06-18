import { useState } from 'react';
import type { ChoreAssignment } from '../types';

interface Props {
  chores: ChoreAssignment[];
  currentUserId: string;
}

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Example color map for members
const memberColors: Record<string, string> = {
  Raj: 'text-blue-600',
  Emma: 'text-green-600',
  Sarah: 'text-pink-600',
};

export default function WeekOverview({ chores, currentUserId }: Props) {
  const [showOnlyMine, setShowOnlyMine] = useState(true);

  const grouped: Record<string, ChoreAssignment[]> = {};
  weekDays.forEach(day => (grouped[day] = []));

  // Filter + group
  chores.forEach(task => {
    const isUserMatch = !showOnlyMine || task.memberId === currentUserId;
    if (task.type === 'weekday' && isUserMatch && weekDays.includes(task.assignedTo)) {
      grouped[task.assignedTo].push(task);
    }
  });

  return (
    <div className="bg-white text-black rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-blue-700">🗓️ Weekly Chore Overview</h2>
        <button
          onClick={() => setShowOnlyMine(!showOnlyMine)}
          className="text-sm border px-3 py-1 rounded text-gray-700 hover:bg-gray-100"
        >
          {showOnlyMine ? 'Show All Tasks' : 'Show My Tasks'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        {weekDays.map(day => (
          <div key={day} className="border rounded p-3">
            <h3 className="font-semibold text-gray-700 mb-2">{day}</h3>
            {grouped[day].length === 0 ? (
              <p className="text-gray-400 italic">No chores</p>
            ) : (
              <ul className="space-y-1">
                {grouped[day].map((chore, i) => {
                  const color = memberColors[chore.memberId] || 'text-gray-800';
                  return (
                    <li key={i}>
                      🧹 {chore.choreTitle} → <span className={color}>{chore.memberId}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
