import type { Database as SupabaseDatabase } from "./supabaseData.js";
import type { KyselifyDatabase } from "kysely-supabase";

export type DataDatabase = KyselifyDatabase<SupabaseDatabase>;
