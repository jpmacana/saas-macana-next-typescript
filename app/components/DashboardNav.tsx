import { CreditCard, Home, Settings } from "lucide-react";
import Link from "next/link";

export const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Ajustes",
    href: "/dashboard/ajustes",
    icon: Settings,
  },
  {
    name: "Billetera",
    href: "/dashboard/billetera",
    icon: CreditCard,
  },
];

export function DashboardNav() {
  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-foreground"
        >
            <span className="flex items-center gap-2">

          <item.icon className="h-4 w-4" />
          {item.name}
            </span>
        </Link>
      ))}
    </nav>
  );
}
