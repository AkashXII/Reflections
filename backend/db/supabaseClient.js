import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config()

export const supabase= createClient(process.env.VITE_supabase_url,process.env.VITE_supabase_key)