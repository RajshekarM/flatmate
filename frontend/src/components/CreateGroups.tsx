import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Group } from "../types";
import { PanelsTopLeft } from "lucide-react";

type CreateGroupsProps = {
  onSave: (group: Group) => void;
  onCancel: () => void;
};


export default function CreateGroups({ onSave, onCancel }: CreateGroupsProps) {

  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([{ id: uuidv4(), name: "", email: "" }]);

  const handleAddMember = () => {
    setMembers([...members, { id: uuidv4(), name: "", email: "" }]);
  };

  const handleRemoveMember = (id:string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleMemberChange = (id:string, field:string, value:string) => {
    setMembers(members.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newGroup = {
      id: uuidv4(),
      name: groupName,
      members,
    };
    onSave(newGroup); // send data to Groups page
  };
  return (
    <form onSubmit={handleSubmit} className="border p-4 mt-4 rounded bg-white">
      <h2 className="text-lg font-semibold mb-2">Create a New Group</h2>
      <input
        className="border border-gray-300 p-2 rounded w-full text-black"
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        required
      />
      <h3 className="font-medium mb-2">Members</h3>
      {members.map((member, idx) => (
        <div key={member.id} className="flex items-center rder-gray-300 text-black gap-2 mb-2">
          <input
            className="border p-2 flex-1"
            type="text"
            placeholder="Name"
            value={member.name}
            onChange={(e) => handleMemberChange(member.id, "name", e.target.value)}
            required
          />
          <input
            className="border border-gray-300 p-2 rounded w-full text-black"
            type="email"
            placeholder="Email"
            value={member.email}
            onChange={(e) => handleMemberChange(member.id, "email", e.target.value)}
          />
          {members.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveMember(member.id)}
              className="text-red-600"
            >
              ❌
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={handleAddMember} className="text-blue-600 mb-3">
        + Add Member
      </button>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Group
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
}
