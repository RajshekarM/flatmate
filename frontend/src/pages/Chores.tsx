import React, { useState } from 'react';
import type { Chore } from '../types';
import { v4 as uuidv4 } from 'uuid';


const ChoresPage = () => {
  const [chores, setChores] = useState<Chore[]>([]);
  const [choreName, setChoreName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [choreType, setChoreType] = useState<'Scheduled' | 'On-Demand'>('Scheduled');
  const [frequency, setFrequency] = useState('Daily');

  const handleAddChore = () => {
    console.log("hello")
    if (!choreName) return;

  const newChore: Chore = {
  id: uuidv4(),
  name: choreName,
  assignedTo,
  type: choreType,
  frequency: choreType === 'Scheduled' ? frequency : null,
  status: 'Pending',
};
newChore.assignedTo = assignedTo
newChore.name = choreName
newChore.frequency = frequency
newChore.type = choreType

setChores([...chores, newChore]);
console.log("hlo")
    // Clear fields
    setChoreName('');
    setAssignedTo('');
    setChoreType('Scheduled');
    setFrequency('Daily');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Chores</h2>

      {/* Add Chore Form */}
      <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
        <h3 className="text-lg font-semibold">Create a Chore</h3>

        <input
          type="text"
          placeholder="Chore name"
          value={choreName}
          onChange={(e) => setChoreName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          placeholder="Assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <select
          value={choreType}
          onChange={(e) => setChoreType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Scheduled">Scheduled Chore</option>
          <option value="On-Demand">On-Demand Chore</option>
        </select>

        {choreType === 'Scheduled' && (
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            
          </select>
        )}

        <button
          onClick={handleAddChore}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add Chore
        </button>
      </div>

      {/* Chores List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Chore List</h3>
        {chores.length === 0 ? (
          <p className="text-gray-500">No chores added yet.</p>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Chore</th>
                <th>Assigned To</th>
                <th>Type</th>
                <th>Frequency</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {chores.map((chore) => (
                <tr key={chore.id} className="border-b">
                  <td className="py-2">{chore.name}</td>
                  <td>{chore.assignedTo}</td>
                  <td>{chore.type}</td>
                  <td>{chore.type === 'Scheduled' ? chore.frequency : '—'}</td>
                  <td>{chore.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ChoresPage;
