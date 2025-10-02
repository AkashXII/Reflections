import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://varljgziabiwryfhudhj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZhcmxqZ3ppYWJpd3J5Zmh1ZGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyOTAyNjIsImV4cCI6MjA3NDg2NjI2Mn0.coA2BH7rhoMRLSM6O7vVr-G4jiDJnYvDIR8ZfvxYaMc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
