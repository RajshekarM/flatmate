const OnDemandAlerts = ({ chores, currentUserId }) => {
  const triggeredChores = chores.filter(c => c.triggered);

  if (triggeredChores.length === 0) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-red-600">
        🚨 On-Demand Alerts
      </h3>
      <ul className="list-disc pl-5 space-y-1">
        {triggeredChores.map((chore) => (
          <li key={chore.id}>
            <span className="font-medium">{chore.name}</span>{' '}
            <span className="text-sm text-gray-500">
              Assigned to: {chore.lastAssignedTo}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnDemandAlerts;
