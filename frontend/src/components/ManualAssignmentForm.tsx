import { useState } from 'react';

interface Chore {
  id: string;
  title: string;
}

interface Member {
  id: string;
  name: string;
}

interface ManualAssignmentFormProps {
  chores: Chore[];
  members: Member[];
  onSubmit: (assignments: {
    choreId: string;
    memberId: string;
    assignedTo: string; // date or day
    frequency: string;
    type: 'date' | 'weekday';
  }[]) => void;
}

export default function ManualAssignmentForm({
  chores,
  members,
  onSubmit,
}: ManualAssignmentFormProps) {
  const [assignmentType, setAssignmentType] = useState<'date' | 'weekday'>('date');
  const [assignedTo, setAssignedTo] = useState('');
  const [assignments, setAssignments] = useState<{
    [choreId: string]: { memberId: string; frequency: string };
  }>({});

  const handleMemberChange = (choreId: string, memberId: string) => {
    setAssignments((prev) => ({
      ...prev,
      [choreId]: {
        ...prev[choreId],
        memberId,
      },
    }));
  };

  const handleFrequencyChange = (choreId: string, frequency: string) => {
    setAssignments((prev) => ({
      ...prev,
      [choreId]: {
        ...prev[choreId],
        frequency,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = Object.entries(assignments)
      .filter(([_, v]) => v.memberId && v.frequency && assignedTo)
      .map(([choreId, { memberId, frequency }]) => ({
        choreId,
        memberId,
        frequency,
        assignedTo,
        type: assignmentType,
      }));

    if (result.length > 0) {
      onSubmit(result);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md text-black"
    >
      <h2 className="text-xl font-semibold text-gray-800">🧹 Assign All Chores</h2>

      {/* Assignment Type */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Assign by:</label>
        <select
          value={assignmentType}
          onChange={(e) => {
            setAssignmentType(e.target.value as 'date' | 'weekday');
            setAssignedTo('');
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="date">Date</option>
          <option value="weekday">Weekday</option>
        </select>
      </div>

      {/* Date or Day Picker */}
      {assignmentType === 'date' ? (
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Date</label>
          <input
            type="date"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border px-3 py-2 rounded text-gray-700"
          />
        </div>
      ) : (
        <div>
          <label className="text-sm font-medium text-gray-600 mb-1 block">Day</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border px-3 py-2 rounded text-gray-700"
          >
            <option value="">-- Select Day --</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              )
            )}
          </select>
        </div>
      )}

      {/* Chore Assignments */}
      {chores.map((chore) => (
        <div key={chore.id} className="grid grid-cols-3 items-center gap-3">
          <label className="text-gray-700 font-medium">{chore.title}</label>

          {/* Member Selection */}
          <select
            value={assignments[chore.id]?.memberId || ''}
            onChange={(e) => handleMemberChange(chore.id, e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Select Member --</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* Frequency Selection */}
          <select
            value={assignments[chore.id]?.frequency || ''}
            onChange={(e) => handleFrequencyChange(chore.id, e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Frequency --</option>
            <option value="none">None</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        ✅ Submit All Assignments
      </button>
    </form>
  );
}
