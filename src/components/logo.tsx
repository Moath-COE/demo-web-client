import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  priority?: boolean;
}

export function Logo({ className, priority }: LogoProps) {
  return (
    <>
      <Image
        src="/static/sanad-logo-primary.png"
        alt="سند"
        width={140}
        height={82}
        priority={priority}
        className={cn("object-contain dark:hidden", className)}
      />
      <Image
        src="/static/sanad-logo-reverse.png"
        alt="سند"
        width={140}
        height={82}
        priority={priority}
        className={cn("hidden object-contain dark:block", className)}
      />
    </>
  );
}
