import React from "react";
import TopNav from "@/components/landing/topNav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNav />
      <div className="flex justify-center py-10 bg-background min-h-[80vh]">
        {children}
      </div>
    </>
  );
}
