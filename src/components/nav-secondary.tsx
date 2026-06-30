"use client";

import * as React from "react";
import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Send, BadgeInfo } from "lucide-react";

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent data-tour-id="sidebar-footer">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=o1e0rrbS7kqQNlF7Ujtq3OZh5xehzrpFsPkr2swunsVUM1hWWFRPNzdRWVYzU1M3RDIzWVE1NFgySi4u"
                target="_blank"
              >
                <Send className="ml-2 size-4" />
                <span>قيم تجربتك</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="https://wa.me/966501473370" target="_blank">
                <BadgeInfo className="ml-2 size-4" />
                <span>تواصل مع الدعم</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
