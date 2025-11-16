import { KpiCard } from "@/components/dashboard/kpi-card";
import { TrendingUp, TrendingDown, DollarSign, Goal, PlusCircle, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BudgetDetailsTable } from "@/components/dashboard/budget-details-table";

export default function BudgetingPage() {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold">Бюджетирование</h1>
                <p className="text-muted-foreground">Управление бюджетами подразделений на 2025 год</p>
            </div>
            <Button size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Создать бюджет
            </Button>
        </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Общий бюджет"
          value="850 млн ₽"
          icon={<DollarSign className="h-6 w-6 text-muted-foreground" />}
          trend="Выделено на 2025 год"
        />
        <KpiCard 
          title="Освоено"
          value="780.5 млн ₽"
          icon={<TrendingUp className="h-6 w-6 text-success" />}
          trend="+5% к прогнозу"
        />
        <KpiCard 
          title="Остаток"
          value="69.5 млн ₽"
          icon={<TrendingDown className="h-6 w-6 text-warning" />}
          trend="Доступно для распределения"
        />
        <KpiCard 
          title="Исполнение"
          value="91.8%"
          icon={<Goal className="h-6 w-6 text-primary" />}
          trend="Цель: 95% к концу года"
        />
      </div>

        <div className="flex items-center gap-4">
            <Select defaultValue="2025">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Выберите год" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
            </Select>
             <Select defaultValue="all">
                <SelectTrigger className="w-[320px]">
                    <SelectValue placeholder="Выберите подразделение" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все подразделения</SelectItem>
                    <SelectItem value="dp1">Перерабатывающий завод №1</SelectItem>
                    <SelectItem value="dp2">Добывающее предприятие №2</SelectItem>
                    <SelectItem value="co">Центральный офис</SelectItem>
                    <SelectItem value="it">ИТ-департамент</SelectItem>
                    <SelectItem value="log">Служба логистики</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Применить</Button>
        </div>

      <BudgetDetailsTable />

    </div>
  );
}
