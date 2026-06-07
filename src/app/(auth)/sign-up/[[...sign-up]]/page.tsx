"use client";

import { SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignUpContent() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect_url") || "/enroll";
  const redirectUrl = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/enroll";

  return <SignUp forceRedirectUrl={redirectUrl} fallbackRedirectUrl="/" />;
}

export default function Page() {
  return (
    <Suspense>
      <SignUpContent />
    </Suspense>
  );
}
