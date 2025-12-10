
"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar
} from "@/components/ui/sidebar";
import Logo from "@/components/logo";
import { cn } from "@/lib/utils";
import { Gem } from "lucide-react";

type MenuItem = {
    href: string;
    label: string;
    icon: React.ElementType;
}

export default function SidebarWrapper({ 
    children,
    menuItems,
    pathname,
}: { 
    children: React.ReactNode,
    menuItems: MenuItem[],
    pathname: string,
}) {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

  return (
    <>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <Logo size="sm" iconOnly={isCollapsed} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className={cn(pathname === item.href && "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary")}
                  tooltip={{ children: item.label, side: "right" }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
           <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/upgrade"}
                  className={cn("bg-accent/10 text-accent-foreground hover:bg-accent/20", pathname === "/dashboard/upgrade" && "bg-accent text-accent-foreground hover:bg-accent/90")}
                  tooltip={{ children: "Upgrade", side: "right" }}
                >
                  <Link href="/dashboard/upgrade">
                    <Gem />
                    <span>Upgrade</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      {children}
    </>
  );
}
