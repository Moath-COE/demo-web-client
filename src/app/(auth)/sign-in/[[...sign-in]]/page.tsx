"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect_url") || "/my-library";
  const redirectUrl = rawRedirect.startsWith("/") && !rawRedirect.startsWith("//") ? rawRedirect : "/my-library";

  return <SignIn forceRedirectUrl={redirectUrl} fallbackRedirectUrl="/" />;
}

export default function Page() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
