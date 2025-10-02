export default function ReflectionList({ reflections, onDelete }) {
  return (
    <div className="space-y-4">
      {reflections.map((r) => (
        <div key={r.id} className="p-4 bg-slate-100 rounded shadow">
          <p className="italic">"{r.quote}"</p>
          <p className="mt-2">{r.reflection_text}</p>
          <p className="text-sm text-gray-500">Mood: {r.mood}</p>
          <button
            onClick={() => onDelete(r.id)}
            className="text-red-600 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
