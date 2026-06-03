import "@livekit/components-styles";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      {children}
      <Toaster
        dir="ltr"
        toastOptions={{
          classNames: {
            icon: "text-accent/80!",
          },
        }}
      />
    </>
  );
}
