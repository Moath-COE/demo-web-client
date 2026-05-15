"use client";

import type { ReactNode } from "react";
import { useSession } from "@clerk/nextjs";
import { DatabaseContext } from "@/context/databaseContext";
import initializeSupabase from "@/lib/supabaseClient";
import { useMemo } from "react";
import { MobileWarningPopup } from "@/components/mobile-warning-popup";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { session } = useSession();
  const supabase = useMemo(() => {
    return initializeSupabase(async () => {
      return session ? session.getToken() : null;
    });
  }, [session]); // Re-create only when session changes

  return (
    <DatabaseContext.Provider value={supabase}>
      {/* <MobileWarningPopup /> */}
      {children}
    </DatabaseContext.Provider>
  );
}
