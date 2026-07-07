import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-4 flex-1 justify-start">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/dashboard/my-library">مكتبتي</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <ThemeToggle />
          <Link href={"/"} className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </div>
    </header>
  );
}
