import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileWarningPopup } from "@/components/mobile-warning-popup";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <SidebarInset>
        <MobileWarningPopup />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
