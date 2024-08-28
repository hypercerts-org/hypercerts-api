import type {Database as SupabaseDatabase} from './supabaseCaching.js';
import type {KyselifyDatabase} from 'kysely-supabase'

export type CachingDatabase = KyselifyDatabase<SupabaseDatabase>