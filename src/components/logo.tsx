import { Bot } from "lucide-react";
import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const isSmall = size === "sm";
  return (
    <Link href="/" className="flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring rounded-sm">
      <Bot className={`${isSmall ? "h-6 w-6" : "h-8 w-8"} text-primary`} />
      <span className={`ml-2 font-bold ${isSmall ? "text-lg" : "text-xl"}`}>LinkedUp</span>
    </Link>
  );
}
