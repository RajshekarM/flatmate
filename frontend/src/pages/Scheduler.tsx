import { useEffect, useState } from 'react';
import ManualAssignmentForm from '../components/ManualAssignmentForm';
import type { Group } from '../types';
import { toast } from 'react-toastify';


export default function Scheduler() {

const [isCreating, setIsCreating] = useState(false);

const [newSchedule, setNewSchedule] = useState({
  name: '',
  type: 'weekly',
  startDate: '',      // <-- add if not already present
  groupId: '',        // <-- new
});


const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const members = [
  { id: 'm1', name: 'Raj' },
  { id: 'm2', name: 'Emma' },
];
const [assignments, setAssignments] = useState([
  { day: 'Monday', memberId: '', choreId: '' },
  { day: 'Tuesday', memberId: '', choreId: '' },
  { day: 'Wednesday', memberId: '', choreId: '' },
]);

const chores = [
  { id: 'c1', title: 'Clean Kitchen' },
  { id: 'c2', title: 'Clean Upper Washroom' },
  { id: 'c3', title: 'Clean Lower Washroom' },
  { id: 'c4', title: 'Kitchen North' },
  { id: 'c5', title: 'Kitchen South' },

];
const [currentGroup, setCurrentGroup] = useState<Group>( {
  id: 1,
  name: 'EdenCommoms',
  members: [],
})

useEffect(() => {
  if (currentGroup) {
    setNewSchedule((prev) => ({ ...prev, groupId: currentGroup.id }));
  }
}, [currentGroup]);

const handleManualSubmit = async (
  assignments: {
    choreId: string;
    memberId: string;
    assignedTo: string;
    frequency: string;
    type: 'date' | 'weekday';
  }[]
) => {
  console.log('✅ Assignment submitted:', assignments);

  try {
    // 1. Create the schedule
    const response = await fetch('/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSchedule), // make sure this includes groupId
    });

    if (!response.ok) {
      throw new Error('Failed to create schedule');
    }

    const created = await response.json();
    console.log('✅ Schedule created:', created);

    // 2. Post the assignments with scheduleId attached
    const scheduledAssignments = assignments.map((a) => ({
      ...a,
      scheduleId: created._id,
    }));

    const assignResponse = await fetch('/api/timed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignments: scheduledAssignments }),
    });

    if (!assignResponse.ok) {
      throw new Error('Failed to save assignments');
    }

    const assigned = await assignResponse.json();
    console.log('✅ Assignments saved:', assigned);

    // 🧼 Optional: reset form, show toast, etc.
  } catch (error) {
    console.error('❌ Submission failed:', error);
    // Optionally show user error feedback
  }
  setNewSchedule({ name: '', type: 'weekly', startDate: '', groupId: currentGroup?.id || '' });
  toast.success?.('Schedule and assignments saved!') || alert('✅ Schedule and assignments saved!');

};

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-800">🗓️ Chore Scheduler</h1>

      {/* Create Schedule Bar */}
      <div className="flex flex-wrap gap-4 items-center">

              {/*Modal Logic*/}
                {!isCreating ? (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    + Create New Schedule
                  </button>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("Saving schedule:", newSchedule);
                      // TODO: Add to schedule list or backend
                      setIsCreating(false);
                    }}
                    className="flex flex-col gap-3 border p-4 rounded-md bg-gray-50 shadow max-w-sm"
                  >
                    <label className="font-medium text-gray-700">Schedule Name</label>
                    <input
                      type="text"
                      value={newSchedule.name}
                      onChange={(e) =>
                        setNewSchedule({ ...newSchedule, name: e.target.value })
                      }
                      className="border px-3 py-2 rounded"
                      placeholder="e.g., Week 1"
                      required
                    />

                    <label className="font-medium text-gray-700">Schedule Type</label>
                    <select
                      value={newSchedule.type}
                      onChange={(e) =>
                        setNewSchedule({ ...newSchedule, type: e.target.value as 'weekly' | 'cyclic' })
                      }
                      className="border px-3 py-2 rounded"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="cyclic">Cyclic</option>
                    </select>

                    <div className="flex justify-between mt-3">
                      <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsCreating(false)}
                        type="button"
                        className="text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                  
                )}


              <select className="border rounded px-3 py-2 text-gray-700">
                <option value="weekly">Weekly Rotation</option>
                <option value="cyclic">Cyclic Rotation</option>
              </select>
            </div>
        <div>  
      </div>

      

      <div className="mt-6">
            <h2 className="text-lg font-semibold text-red-800 mb-3">Assign Chores</h2>
                


                <ManualAssignmentForm
                  chores={chores}
                  members={members}
                  onSubmit={handleManualSubmit}
                />


      </div>

         



            

    
  </div>



















  );



}
