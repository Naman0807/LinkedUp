"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bot,
  Calendar,
  Gem,
  LayoutGrid,
  Library,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import UserNav from "@/components/user-nav";
import Logo from "@/components/logo";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/dashboard/generator", label: "Generator", icon: Sparkles },
  { href: "/dashboard/library", label: "Library", icon: Library },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
     return (
        <div className="flex items-center justify-center h-screen">
          <Bot className="h-12 w-12 animate-pulse text-primary" />
        </div>
      );
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader>
          <Logo size="sm" />
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
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-40">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add search or other header items here */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-secondary/40">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
