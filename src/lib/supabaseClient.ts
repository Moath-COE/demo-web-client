import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";

const initializeSupabase = (
  accessToken: (() => Promise<string | null>) | undefined,
): ReturnType<typeof createClient<Database>> => {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    accessToken: accessToken,
  });
};

export default initializeSupabase;
