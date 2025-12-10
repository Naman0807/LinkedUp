
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
import UserNav from "@/components/user-nav";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import SidebarWrapper from "@/components/sidebar-wrapper";

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

  if (loading) {
     return (
        <div className="flex items-center justify-center h-screen">
          <Bot className="h-12 w-12 animate-pulse text-primary" />
        </div>
      );
  }

  if (!user) {
    return null;
  }

  return (
    <SidebarProvider>
        <SidebarWrapper menuItems={menuItems} pathname={pathname}>
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
        </SidebarWrapper>
    </SidebarProvider>
  );
}
