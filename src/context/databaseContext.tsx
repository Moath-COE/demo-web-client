"use client";
import { createContext, useContext } from "react";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

type SupabaseClient = ReturnType<typeof createClient<Database>>;
export const DatabaseContext = createContext<SupabaseClient | null>(null);
export const useDatabase = (): SupabaseClient =>
  useContext(DatabaseContext) as SupabaseClient;
