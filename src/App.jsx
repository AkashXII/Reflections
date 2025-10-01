import { useState } from "react";
import AuthForm from "./components/AuthForm";  // ✅ correct path

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        // If no user logged in → show the AuthForm
        <AuthForm onLogin={(loggedInUser) => setUser(loggedInUser)} />
      ) : (
        // If user logged in → show a welcome screen
        <div className="min-h-screen flex items-center justify-center bg-green-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.email} 🎉</h1>
            <p>You’re now signed in!</p>
          </div>
        </div>
      )}
    </div>
  );
}
