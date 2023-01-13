import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { DBTypes } from "./db-types";

export const supabase = createBrowserSupabaseClient<DBTypes>();
