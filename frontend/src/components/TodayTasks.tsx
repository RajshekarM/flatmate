import { useEffect, useState } from 'react';
import type { choreAssignment } from '../types';

interface todayTaskProps {
  todaysChores: choreAssignment[];
  currentUserId: string;
}
export default function TodayTasks({ todaysChores, currentUserId }: todayTaskProps) {
  const [taskList, setTaskList] = useState<choreAssignment[]>(todaysChores);
  const [isLoading, setIsLoading] = useState(false);

  
  const triggerRotation = async (scheduleId:string) => {
  try {
    const res = await fetch(`/api/timed/rotate/${scheduleId}`, {
      method: 'POST'
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Rotation completed:', data);
      // Optional: Toast or refresh UI
    } else {
      console.warn('⚠️ Rotation skipped:', data.error);
    }
  } catch (err) {
    console.error('❌ Failed to trigger rotation:', err);
  }
};

  useEffect(() => {
  if (taskList.length > 0 && taskList.every(task => task.completed)) {
    // ✅ All tasks appear complete, notify backend
    const scheduleId = taskList[0].scheduleId
    triggerRotation(scheduleId);
  }
}, [taskList]);


  const toggleCompletion = async (index: number) => {
    const updated = [...taskList];
    const task = updated[index];
    const newStatus = !task.completed;

    try {
      const response = await fetch(`/api/timed/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update task');

      updated[index] = { ...task, completed: newStatus };
      setTaskList(updated);
    } catch (err) {
      console.error('❌ Error updating task:', err);
      alert('Failed to update chore status. Please try again.');
    }
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
