import { useState, useEffect } from "react";

export default function ReflectionForm({ user, onAdd }) {
  const [text, setText] = useState("");
  const [mood, setMood] = useState("happy");
  const [quote, setQuote] = useState(null);


  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://zenquotes.io/api/random");
        const data = await res.json();
        setQuote({ content: data[0].q, author: data[0].a });
      } catch (err) {
        console.error("Error fetching quote:", err);
      }
    };
    fetchQuote();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || !quote) return;

    const newReflection = {
      user_id: user.id,
      quote: `${quote.content} — ${quote.author || "Unknown"}`,
      reflection_text: text, 
      mood,
    };

    await onAdd(newReflection);
    setText("");
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      const data = await res.json();
      setQuote({ content: data[0].q, author: data[0].a });
    } catch (err) {
      console.error("Error fetching new quote:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      {quote && (
        <div className="mb-4 p-3 bg-slate-100 rounded">
          <p className="italic">"{quote.content}"</p>
          <p className="text-right">— {quote.author}</p>
        </div>
      )}

      <textarea
        className="w-full border rounded p-2 mb-2"
        placeholder="Write your reflection..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="happy">Happy</option>
        <option value="calm">Calm</option>
        <option value="stressed">Stressed</option>
        <option value="sad">Sad</option>
        <option value="excited">Excited</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Reflection
      </button>
    </form>
  );
}
