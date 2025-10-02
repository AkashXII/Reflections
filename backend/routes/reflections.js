import express from "express"
import { supabase } from "../db/supabaseClient.js";
import fetch from "node-fetch"

const router=express.Router()

router.get("/quote",async(req,res)=>{
    try{
        const response=await fetch("https://zenquotes.io/api/random")
        const data=await response.json()
        res.json(data)
    }
    catch(err){
        res.status(500).json({error:"failed to fetch quote"})
    }
})

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
router.post("/",async(req,res)=>{
    const {user_id,quote,reflection_text,mood}=req.body
    const{data,error}=await supabase
    .from("reflections")
    .insert([{user_id,quote,reflection_text,mood}])
    .select()
    if(error) return res.status(400).json({error:error.message})
    res.json(data[0])
})
router.put("/:id",async(req,res)=>{
    const{id}=req.params
    const{reflection_text,mood}=req.body
    const{data,error}=await supabase
    .from("reflections")
    .update({reflection_text,mood})
    .eq("id",id)
    .select()
    if (error) return res.status(400).json({error:error.message})
    res.json(data[0])
})
router.delete("/:id",async(req,res)=>{
    const{id}=req.params
    const{error}=await supabase
    .from("reflections")
    .delete()
    .eq("id",id)
    if (error) return res.status(400).json({error:error.message})
    res.json({success:true})
})
export default router