import { useState, useEffect } from "react";
import AuthForm from "./components/AuthForm";
import ReflectionForm from "./components/ReflectionForm";
import ReflectionList from "./components/ReflectionList";
import { supabase } from "./supabaseClient";

function App() {
  const [user, setUser] = useState(null);
  const [reflections, setReflections] = useState([]);

  const fetchReflections = async (uid) => {
    const res = await fetch(`http://localhost:5000/api/reflections?user_id=${uid}`);
    const data = await res.json();
    setReflections(data);
  };

  const addReflection = async (newReflection) => {
    const res = await fetch("http://localhost:5000/api/reflections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReflection),
    });
    const data = await res.json();
    setReflections([data, ...reflections]);
  };

  const deleteReflection = async (id) => {
    await fetch(`http://localhost:5000/api/reflections/${id}`, { method: "DELETE" });
    setReflections(reflections.filter((r) => r.id !== id));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (user) fetchReflections(user.id);
  }, [user]);

  if (!user) return <AuthForm onLogin={setUser} />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quote Reflections</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <ReflectionForm user={user} onAdd={addReflection} />
      <ReflectionList reflections={reflections} onDelete={deleteReflection} />
    </div>
  );
}

export default App;
