import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import HeroForm from "@/components/landing/hero-form";
import { MobileWarningPopup } from "@/components/mobile-warning-popup";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

export default async function Home() {
  const [instRes, majorRes] = await Promise.all([
    supabase.from("institutions").select("id, name").order("name"),
    supabase.from("majors").select("id, name, institution_id").order("name"),
  ]);

  return (
    <main className="min-h-dvh overflow-y-auto [@media(min-height:600px)]:h-dvh [@media(min-height:600px)]:overflow-hidden flex flex-col relative">
      <MobileWarningPopup />
      <HeroForm
        institutions={instRes.data || []}
        majors={majorRes.data || []}
      />
    </main>
  );
}
