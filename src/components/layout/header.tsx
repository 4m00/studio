import { Bell, Calendar as CalendarIcon, ChevronsUpDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/layout/user-nav";
import { Breadcrumb } from "../ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { SidebarTrigger } from "../ui/sidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
       <SidebarTrigger className="md:hidden"/>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/dashboard" },
          { label: "Дашборд" },
        ]}
      />
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Search will be here */}
      </div>
      <div className="hidden md:flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              01.01.2025 - 16.11.2025
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={new Date(2025, 0)}
              selected={{
                from: new Date(2025, 0, 1),
                to: new Date(2025, 10, 16),
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Все подразделения" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Все подразделения</SelectItem>
                <SelectItem value="dp1">Добывающее предприятие №1</SelectItem>
                <SelectItem value="dp2">Добывающее предприятие №2</SelectItem>
                <SelectItem value="pz1">Перерабатывающий завод №1</SelectItem>
            </SelectContent>
        </Select>

        <Button variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Обновить данные</span>
        </Button>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Уведомления</span>
      </Button>
      <UserNav />
    </header>
  );
}
