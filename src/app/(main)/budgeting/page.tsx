import { KpiCard } from "@/components/dashboard/kpi-card";
import { TrendingUp, TrendingDown, DollarSign, Goal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BudgetDetailsTable } from "@/components/dashboard/budget-details-table";

export default function BudgetingPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Общий бюджет"
          value="$1,250,000"
          icon={<DollarSign className="h-6 w-6 text-muted-foreground" />}
          trend="+2% по сравнению с прошлым кварталом"
        />
        <KpiCard 
          title="Освоено"
          value="$780,500"
          icon={<TrendingUp className="h-6 w-6 text-success" />}
          trend="+15% по сравнению с планом"
        />
        <KpiCard 
          title="Остаток"
          value="$469,500"
          icon={<TrendingDown className="h-6 w-6 text-destructive" />}
          trend="-8% по сравнению с планом"
        />
        <KpiCard 
          title="Уровень освоения"
          value="62.4%"
          icon={<Goal className="h-6 w-6 text-success" />}
          trend="+2.4% по сравнению с планом"
        />
        <KpiCard 
          title="Прогноз перерасхода"
          value="$50,000"
          icon={<TrendingDown className="h-6 w-6 text-destructive" />}
          trend="+5% по сравнению с прошлым прогнозом"
        />
        <KpiCard 
          title="Экономия"
          value="$25,000"
          icon={<TrendingUp className="h-6 w-6 text-success" />}
          trend="Новые инициативы по сокращению затрат"
        />
        <KpiCard 
          title="Свободный денежный поток"
          value="$150,000"
          icon={<DollarSign className="h-6 w-6 text-muted-foreground" />}
          trend="Улучшение операционной эффективности"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <Select defaultValue="all">
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Выберите отдел" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все отделы</SelectItem>
            <SelectItem value="production">Производство</SelectItem>
            <SelectItem value="logistics">Логистика</SelectItem>
            <SelectItem value="maintenance">Обслуживание</SelectItem>
            <SelectItem value="hr">Кадры</SelectItem>
            <SelectItem value="it">ИТ</SelectItem>
            <SelectItem value="marketing">Маркетинг</SelectItem>
          </SelectContent>
        </Select>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Создать бюджет
        </Button>
      </div>
      <BudgetDetailsTable />
    </div>
  )
}
