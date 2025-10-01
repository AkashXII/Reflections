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
}