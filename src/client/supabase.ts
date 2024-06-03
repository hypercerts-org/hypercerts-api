import {supabaseCachingApiKey, supabaseCachingUrl} from "../utils/constants.js";
import {createClient} from "@supabase/supabase-js";
import {type CachingDatabase as CachingDatabaseTypes } from "../types/supabaseCaching.js";
import {type Database as DataDatabaseTypes} from "../types/supabaseData.js";

// Create a single supabase client for interacting with your database
export const supabaseCaching = createClient<CachingDatabaseTypes>(
  supabaseCachingUrl,
  supabaseCachingApiKey
);

export const supabaseData = createClient<DataDatabaseTypes>(
  supabaseCachingUrl,
  supabaseCachingApiKey
);