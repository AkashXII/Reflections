import express from "express"
import { supabase } from "../db/supabaseClient.js";

const router=express.Router()

router.get("/", async(req,res)=>{
    const{user_id}=req.query
    const{data,error}=await supabase
    .from("reflections")
    .select("*")
    .eq("user_id",user_id)
    .order("entry_date",{ascending:false})
    if(error) return res.status(400).json({error:error.message})
        res.json(data)

})