'use client';

import {
  Book,
  Bot,
  GanttChartSquare,
  LayoutDashboard,
  LineChart,
  ScrollText,
  Settings,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Дашборд" },
  { href: "/requests", icon: ScrollText, label: "Заявки" },
  { href: "/analytics", icon: LineChart, label: "Аналитика" },
  { href: "/budgeting", icon: Wallet, label: "Бюджеты" },
  { href: "/initiatives", icon: GanttChartSquare, label: "Инициативы" },
  { href: "/reports", icon: Book, label: "Отчеты" },
  { href: "/anomalies", icon: Bot, label: "Аномалии" },
];

const settingsNav = [
    { href: "/settings", icon: Settings, label: "Настройки" },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-14 items-center justify-center border-b group-data-[collapsible=icon]:justify-center">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Icons.Logo className="h-6 w-6 text-primary" />
          <span className="group-data-[collapsible=icon]:hidden">CostVision</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1 p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
            {settingsNav.map((item) => (
                 <SidebarMenuItem key={item.href}>
                 <Link href={item.href}>
                   <SidebarMenuButton
                     isActive={pathname.startsWith(item.href)}
                     tooltip={item.label}
                   >
                     <item.icon />
                     <span>{item.label}</span>
                   </SidebarMenuButton>
                 </Link>
               </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
