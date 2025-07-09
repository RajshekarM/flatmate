import { useState } from "react";
import type { OnDemandChore } from "../types";

interface OnDemandAlertsProps {
  chores: OnDemandChore[];
  currentUserId: string;
}



const OnDemandAlerts = ({ chores, currentUserId }: OnDemandAlertsProps) => {

  const groupMembers = ['Raj', 'Anita', 'Divya'];



  const [onDemandChores, setOnDemandChores] = useState<OnDemandChore[]>([
    {
      id: 'trash',
      name: 'Take out Trash',
      lastAssignedTo: 'Divya',
      triggered: false,
      triggeredAt: '',
      alertCount:0,
      alertRecipients:[],
    },
  ]);

 
  

  const handleTrigger = (choreId: string) => {
  setOnDemandChores((prev) =>
    prev.map((chore) => {
      if (chore.id !== choreId) return chore;
console.log(chore.triggered)
      const newAlertCount = chore.alertCount + 1;

      return {
        ...chore,
        triggered: true,
        triggeredAt: new Date().toISOString(),
        alertCount: newAlertCount,
        alertRecipients:
          newAlertCount >= 3
            ? [...groupMembers] // notify everyone
            : [chore.lastAssignedTo], // notify assignee only
      };
    })
  );
};


const handleMarkDone = (choreId: string) => {
  setOnDemandChores((prev) =>
    prev.map((chore) => {
      if (chore.id !== choreId) return chore;

      const nextIndex =
        (groupMembers.indexOf(chore.lastAssignedTo) + 1) % groupMembers.length;
      
      return {
        ...chore,
        lastAssignedTo: groupMembers[nextIndex],
        triggered: false,
        triggeredAt: "",
        alertCount: 0,
        alertRecipients: [],
      };
    })
  );
};




  const triggeredChores = chores.filter((c) => c.triggered);


  if (triggeredChores.length === 0) return null;

  return (
    <div className="p-6 space-y-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold">On-Demand Chores</h2>

      {onDemandChores.map((chore) => (
        <div key={chore.id} className="bg-gray-50 p-4 rounded shadow space-y-2">
          <div className="text-sm text-gray-600">Chore: {chore.name}</div>
          
          {chore.triggered ? (
                <div className="bg-gray-100 p-4 rounded space-y-2">
                  <p>
                    🧹 <strong>{chore.lastAssignedTo}</strong>, please take out the trash!
                  </p>
                  <p className="text-sm text-gray-500">
                    Notified: {chore.alertRecipients.join(", ")} ({chore.alertCount}x)
                  </p>

                  {chore.lastAssignedTo === currentUserId ? (
                    <button
                      onClick={() => handleMarkDone(chore.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      ✅ Mark as Done
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTrigger(chore.id)}
                      className="bg-yellow-500 text-black px-3 py-1 rounded"
                    >
                      🔔 Remind {chore.lastAssignedTo}
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleTrigger(chore.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  🚨 Trash is full — Alert!
                </button>
              )}



        </div>
      ))}
    </div>  );
};

export default OnDemandAlerts;
