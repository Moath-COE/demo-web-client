"use client";

import dynamic from "next/dynamic";

const StudyClient = dynamic(() => import("./study-client"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-svh items-center justify-center bg-background"
      style={{
        backgroundImage: "url('/static/assets/texture-gold.png')",
        backgroundBlendMode: "lighten",
        backgroundRepeat: "repeat",
      }}
    />
  ),
});

export default function StudyPage() {
  return <StudyClient />;
}
