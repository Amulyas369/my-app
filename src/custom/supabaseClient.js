// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWxkcG11aHBhamRkZXdlZm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NDc0MTUsImV4cCI6MjAxOTMyMzQxNX0.NSh05h9dlKUbEXVsmTbUYLTA2Vyv85XH7HqXMj5lqrQ";
const supabaseUrl = "https://bomldpmuhpajddewefnb.supabase.co";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
