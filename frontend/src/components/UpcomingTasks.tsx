import type { ChoreAssignment } from '../types';


export default function UpcomingTasks({ chores }: { chores: ChoreAssignment[] }) {
  const upcoming = [
    { day: 'Wed', name: 'Emma', task: 'Dusting' },
    { day: 'Thu', name: 'Sarah', task: 'Mop Hallway' },
  ];

  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Upcoming Tasks</h2>
      <ul className="space-y-2">
        {upcoming.map((t, i) => (
          <li key={i} className="text-sm text-gray-800">
            {t.day} • {t.name} → {t.task}
          </li>
        ))}
      </ul>
    </div>
  );
}
