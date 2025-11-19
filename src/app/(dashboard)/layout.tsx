import { AppHeader } from "@/components/ui/app-header";
import AppSidebar from "@/components/ui/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-accent/20">{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Layout;
