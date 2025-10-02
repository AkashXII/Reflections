export default function ReflectionList({ reflections, onDelete }) {
  return (
    <div className="space-y-6">
      {reflections.map((r) => (
        <div
          key={r.id}
          className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition"
        >
          {/* Quote */}
          <blockquote className="text-lg italic text-green-800 mb-3">
            “{r.quote}”
          </blockquote>

          {/* Reflection text */}
          <p className="text-gray-700 mb-4">{r.reflection_text}</p>

          <div className="flex justify-between items-center text-sm">
            {/* Left side: mood + date */}
            <div className="flex flex-col">
              <span
                className={`mb-1 px-3 py-1 rounded-full font-medium text-white self-start
                  ${
                    r.mood === "happy"
                      ? "bg-yellow-500"
                      : r.mood === "calm"
                      ? "bg-green-400"
                      : r.mood === "stressed"
                      ? "bg-red-400"
                      : r.mood === "sad"
                      ? "bg-blue-400"
                      : r.mood === "excited"
                      ? "bg-pink-400"
                      : "bg-gray-400"
                  }`}
              >
                {r.mood}
              </span>
              {/* Date */}
              <span className="text-gray-500 text-xs">
                {new Date(r.entry_date).toLocaleDateString()}
              </span>
            </div>

            {/* Delete button */}
            <button
              onClick={() => onDelete(r.id)}
              className="text-red-600 hover:text-red-800 font-medium transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
