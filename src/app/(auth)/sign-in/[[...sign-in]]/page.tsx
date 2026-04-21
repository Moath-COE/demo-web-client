"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/my-library";

  return <SignIn forceRedirectUrl={redirectUrl} fallbackRedirectUrl="/" />;
}

export default function Page() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
