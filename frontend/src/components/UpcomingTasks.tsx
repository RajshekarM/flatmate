import type { choreAssignment } from '../types';

interface UpcomingTaskProps {
  assignemnts : choreAssignment[];
  currentUserId: string;
}


export default function UpcomingTasks({ assignemnts, currentUserId }: UpcomingTaskProps ) {
  
  return (
    <div className="bg-white text-black p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-gray-700">Upcoming Tasks</h2>
      <h1>Hello {currentUserId}</h1>
      <ul className="space-y-2">
        {assignemnts.map((t, i) => (
          <li key={i} className="text-sm text-gray-800">
            {t.date} • {t.choreTitle} → {t.memberId}
          </li>
        ))}
      </ul>
    </div>
  );
}
