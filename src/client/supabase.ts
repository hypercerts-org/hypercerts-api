import {supabaseApiKey, supabaseUrl} from "@/utils/constants";
import {createClient} from "@supabase/supabase-js";
import {Database} from "@/types/database-generated.types";

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
    supabaseUrl,
    supabaseApiKey
);
