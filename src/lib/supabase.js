import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL: " + URL);
console.log("ANON_KEY: " + ANON_KEY);

export const supabase = createClient(URL, ANON_KEY);