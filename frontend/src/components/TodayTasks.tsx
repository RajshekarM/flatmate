import { useState } from 'react';
import type { ChoreAssignment } from '../types';

interface Props {
  chores: ChoreAssignment[];
}

export default function TodayTasks({ chores }: Props) {
  const [taskList, setTaskList] = useState<ChoreAssignment[]>(chores);

  const toggleCompletion = (index: number) => {
    const updated = [...taskList];
    updated[index].completed = !updated[index].completed;
    setTaskList(updated);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold text-blue-700 mb-3">🧹 Today’s Chores</h2>

      {taskList.length === 0 ? (
        <p className="text-gray-500 italic">No chores assigned for today 🎉</p>
      ) : (
        <ul className="space-y-3">
          {taskList.map((chore, index) => (
            <li
              key={index}
              className={`flex justify-between items-center border p-2 rounded-md ${
                chore.completed ? 'bg-green-100 line-through text-gray-500' : ''
              }`}
            >
              <span>{chore.choreTitle} • {chore.frequency}</span>
              <div className="space-x-2">
                <button
                  onClick={() => toggleCompletion(index)}
                  className={`${
                    chore.completed
                      ? 'bg-gray-500'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white px-3 py-1 rounded`}
                >
                  {chore.completed ? 'Undo' : 'Mark Done'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
