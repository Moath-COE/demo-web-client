import { Button } from "@/components/ui/button";
import { IconExternalLink } from "@tabler/icons-react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1 className="text-base font-medium">مكتبتي</h1>
        <div className="mr-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://chapter14.net/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-card"
            >
              <IconExternalLink className="h-4 w-4" />
              <span>منصة الدورات</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
