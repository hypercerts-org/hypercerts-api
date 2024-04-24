import {supabaseApiKey, supabaseUrl} from "../utils/constants.js";
import {createClient} from "@supabase/supabase-js";
import {type Database} from "../types/supabase.js";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
    supabaseUrl,
    supabaseApiKey
);
