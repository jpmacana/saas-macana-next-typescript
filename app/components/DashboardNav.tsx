"use client";
import { cn } from "@/lib/utils";
import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Ajustes",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Billetera",
    href: "/dashboard/billetera",
    icon: CreditCard,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link key={index} href={item.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium space-x-5 gap-2 hover:bg-accent hover:text-accent-foreground",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "bg-transparent text-foreground"
            )}
          >
            <item.icon className="size-4 text-primary " />
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
