"use client";

import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useUser } from "@clerk/nextjs";

const data = {
  user: {
    name: "معاذ",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "مكتبتي",
      url: "/my-library",
      icon: IconDashboard,
    },
    // {
    //   title: "المهام اليومية",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "تحليلات الاداء",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "المشاريع",
    //   url: "#",
    //   icon: IconFolder,
    // },
    // {
    //   title: "الفريق",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Image
                  width={25}
                  height={25}
                  src="/static/logo.png"
                  alt="Company Logo"
                />
                <span className="text-base font-semibold">Chapter-14</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="pt-2 border-t border-[#1d5479]">
        <NavUser
          user={{
            name: user?.fullName || "",
            email: user?.primaryEmailAddress?.emailAddress || "",
            avatar: user?.imageUrl || "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
