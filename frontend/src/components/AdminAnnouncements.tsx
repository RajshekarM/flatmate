interface AdminAnnouncementsProps {
  messages: string[];
}

export default function AdminAnnouncements({ messages }: AdminAnnouncementsProps) {
  if (!messages || messages.length === 0) return null;

  return (
    <div className="bg-white text-black rounded-xl shadow p-4">
      <h2 className="text-lg font-semibold text-orange-600 mb-2">📢 Imp Announcements</h2>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {messages.map((msg, i) => (
          <li key={i}>📌 {msg}</li>
        ))}
      </ul>
    </div>
  );
}
