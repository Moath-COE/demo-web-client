import "@livekit/components-styles";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
