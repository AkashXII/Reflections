import { useState } from "react";
import { useEffect } from "react";

export default function AuthForm({onLogin}){
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [mode,setMode]=useState('signin')
const [loading,setLoading]=useState('false')
const [error,setError]=useState('null')

async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setError(null)
    try{
        if(mode==="signup"){
            const {data,error}=await supabase.auth.signUp({email,password})
            if(error) throw error;
            alert('check your email for conformation')
        }
        else{
            const {data,error}=await supabase.auth.signInWithPassword({email,password})
            if (error) throw error;
            onLogin(data.user)
        }
    }
    catch(err){
        setError(err.message)
    }
    finally{
        setLoading(false)
    }
}
return (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      
      <h2 className="text-xl mb-4">
        {mode === 'signup' ? 'Sign up' : 'Sign in'}
      </h2>

      {/* Show error if any */}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {/* Email input */}
      <input 
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Password input */}
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
      />

      {/* Submit button */}
      <button 
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded"
      >
        {loading ? 'Working…' : mode === 'signup' ? 'Create account' : 'Sign in'}
      </button>

      {/* Toggle between sign in / sign up */}
      <div className="mt-3 text-sm text-center">
        <button
          type="button"
          onClick={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
          className="text-indigo-600"
        >
          {mode === 'signup' ? 'Have an account? Sign in' : "Need an account? Sign up"}
        </button>
      </div>
    </form>
  </div>
);

}