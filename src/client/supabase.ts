import { supabaseApiKey } from "@/utils/constants";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  "https://icidusuyshxkefjmqccr.supabase.co/",
  supabaseApiKey
);
