import { Bot } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ size = "md", iconOnly = false }: { size?: "sm" | "md", iconOnly?: boolean }) {
  const isSmall = size === "sm";
  return (
    <Link href="/" className={cn("flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring rounded-sm", iconOnly && "w-8 h-8")}>
      <Bot className={`${isSmall ? "h-6 w-6" : "h-8 w-8"} text-primary`} />
      <span className={cn("ml-2 font-bold", isSmall ? "text-lg" : "text-xl", iconOnly && "sr-only")}>LinkedUp</span>
    </Link>
  );
}
