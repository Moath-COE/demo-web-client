"use client";

import {
  IconCirclePlusFilled,
  IconMessageReport,
  type Icon,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              data-tour-id="add-courses-btn"
              tooltip="إضافة مزيد من المواد لمكتبتك"
              className="bg-accent text-primary-foreground hover:bg-accent/90 hover:text-primary-foreground min-w-8 duration-200 ease-linear"
              onClick={() => router.push("/enroll")}
            >
              <IconCirclePlusFilled />
              <span>إضافة مزيد من المواد</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMessageReport />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="pt-4 border-t border-[#1d5479]">
          {items.map((item, index) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                variant={"default"}
                tooltip={item.title}
                isActive={index === 0}
                disabled={index !== 0}
              >
                {item.icon && <item.icon />}
                <Link href={item.url}>
                  {item.title} {index !== 0 ? "- قريبا " : ""}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
