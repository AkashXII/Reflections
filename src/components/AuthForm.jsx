import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function AuthForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("signin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("🌱 Check your email for confirmation!");
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin(data.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-green-100"
      >
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          {mode === "signup" ? "Join the Garden" : "Welcome Back 🌿"}
        </h2>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 p-2 rounded">
            ⚠️ {error}
          </div>
        )}

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-green-800 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50/50"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-green-800 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50/50"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Submit button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-500 text-white font-semibold shadow-md hover:from-green-500 hover:to-green-600 transition disabled:opacity-50"
        >
          {loading
            ? "🌱 Growing..."
            : mode === "signup"
            ? "Sign Up"
            : "Sign In"}
        </button>

        {/* Toggle sign in / sign up */}
        <p className="mt-6 text-sm text-center text-green-700">
          {mode === "signup" ? "Already have an account? " : "New here? "}
          <button
            type="button"
            onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
            className="text-green-600 font-medium hover:underline"
          >
            {mode === "signup" ? "Sign In" : "Create one"}
          </button>
        </p>
      </form>
    </div>
  );
}
