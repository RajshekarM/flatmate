import { useState } from "react";
import CreateGroups from "../components/CreateGroups";
import type { Group } from "../types";

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleSaveGroup = (newGroup:Group) => {
    setGroups([...groups, newGroup]);
    setIsCreating(false);
  };


  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">👥 Group & Members</h1>
      <p className="text-gray-600">Invite flatmates, manage roles, and monitor group activity.</p>

      <div>
        <button onClick={() => setIsCreating(!isCreating)} className="bg-black mt-4">
          {isCreating ? "Close" : "Create New Group"}
        </button>

        {isCreating && (
          <CreateGroups onSave={handleSaveGroup} onCancel={() => setIsCreating(false)} />
        )}
      </div>

      <div className="mt-6 text-black">
        <h2 className="text-xl font-semibold">Your Groups</h2>
        <ul className="mt-2 space-y-2">
          {groups.map((g) => (
            <li key={g.id} className="border p-2 rounded">
              <strong>{g.name}</strong> — {g.members.length} member(s)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
