import { useState, useEffect } from "react";

export default function ReflectionForm({ user, onAdd }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("happy");
  const [quote, setQuote] = useState(null);

  // Fetch a random quote
  const fetchQuote = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reflections/quote");
      const data = await res.json();
      setQuote({ content: data[0].q, author: data[0].a });
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !quote) {
      console.log("⚠️ Missing text or quote", { text, quote });
      return;
    }

    const newReflection = {
      user_id: user.id,
      quote: `${quote.content} — ${quote.author || "Unknown"}`,
      reflection_text: text,
      mood,
    };

    try {
      const res = await fetch("http://localhost:5000/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReflection),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Backend error:", data.error);
        return;
      }

      await onAdd(data); 
      setText(""); 
      await fetchQuote(); 
    } catch (err) {
      console.error("❌ Network error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100 mb-6"
    >
      {/* Quote card */}
      {quote && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm">
          <p className="italic text-green-800 text-lg">“{quote.content}”</p>
          <p className="text-right text-green-600 mt-2">— {quote.author}</p>
        </div>
      )}

      {/* Reflection textarea */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-green-800 mb-1">
          Your Reflection
        </label>
        <textarea
          className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50/50"
          placeholder="Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      </div>

      {/* Mood selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-green-800 mb-1">
          Mood
        </label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50/50"
        >
          <option value="happy">Happy</option>
          <option value="calm">Calm</option>
          <option value="stressed">Stressed</option>
          <option value="sad">Sad</option>
          <option value="excited">Excited</option>
        </select>
      </div>

      {/* Save button */}
      <button
        className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:from-green-500 hover:to-green-600 transition"
      >
        Save Reflection
      </button>
    </form>
  );
}
