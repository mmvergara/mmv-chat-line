import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { DBTypes } from "./db-types";

export const supabase = () =>
  createServerComponentSupabaseClient<DBTypes>({
    headers,
    cookies,
  });
