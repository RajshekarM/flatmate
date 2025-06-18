export default function DashboardLayout() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6 text-black">
      <h1 className="text-3xl font-bold text-gray-800">🏠 FlatChores Dashboard</h1>

      {/* 📅 Schedule Summary Bar */}
      <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
        <div>
          <p className="font-medium">📆 Current Week: June 10 – June 16</p>
        </div>
        <button className="text-blue-600 hover:underline">🔄 View Rotations</button>
      </div>

      {/* 📣 Admin Announcements */}
      <div className="bg-yellow-100 border-l-4 border-yellow-400 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">📣 Admin Announcements</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Please clean the hallway before Sunday.</li>
          <li>Guests visiting Friday — kitchen must be spotless.</li>
        </ul>
      </div>

      {/* ✅ Today’s Chores */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-3">🧹 Today’s Chores</h2>
        <ul className="space-y-3">
          <li className="flex justify-between items-center border p-2 rounded-md">
            <span>Clean Kitchen • Raj • Biweekly</span>
            <div className="space-x-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Mark Done</button>
              <button className="text-sm text-blue-500 hover:underline">Remind Me Later</button>
            </div>
          </li>
        </ul>
      </div>

      {/* 📈 Chore Completion Stats */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-indigo-700 mb-2">📈 Chore Completion Stats</h2>
        <ul className="space-y-1">
          <li>Raj: ✅ 8 / ❌ 1 this week (89%)</li>
          <li>Emma: ✅ 6 / ❌ 2 this week (75%)</li>
          <li>Sarah: ✅ 7 / ❌ 0 this week (100%)</li>
        </ul>
      </div>

      {/* 📅 Upcoming Chores */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-purple-700 mb-2">📅 Upcoming Chores</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Wed • Emma → Dusting</li>
          <li>Thu • Sarah → Mop Hallway</li>
          <li>Fri • Raj → Take Out Trash</li>
        </ul>
      </div>

      {/* ❌ Missed Chores */}
      <div className="bg-red-100 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-red-700 mb-2">❌ Missed Chores</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Sarah → Mop Hallway (Due Yesterday)</li>
          <li>Raj → Clean Bathroom (Due 3 days ago)</li>
        </ul>
      </div>

      {/* 🔁 Rotation Preview */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-yellow-600 mb-2">🔁 Rotation Preview (Next Week)</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>Kitchen → Emma</li>
          <li>Trash → Sarah</li>
          <li>Hallway → Raj</li>
        </ul>
      </div>

      {/* 🏆 Shoutouts */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold text-green-700 mb-2">🏆 Shoutouts</h2>
        <ul className="list-disc ml-5 space-y-1">
          <li>🎉 Sarah completed 100% of tasks this week!</li>
          <li>💪 Raj has a 3-week completion streak!</li>
        </ul>
      </div>
    </div>
  );
}
