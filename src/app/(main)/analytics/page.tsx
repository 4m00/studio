import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostDynamicsChart } from "@/components/dashboard/cost-dynamics-chart";
import { CostStructureChart } from "@/components/dashboard/cost-structure-chart";
import { TopDeviationsWidget } from "@/components/dashboard/top-deviations-widget";
import { RequestStatusFunnel } from "@/components/dashboard/request-status-funnel";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { kpiData } from "@/lib/mock-data";
import { KpiCard } from "@/components/dashboard/kpi-card";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
       <Card>
        <CardHeader>
          <CardTitle>Аналитика операционных затрат</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-4 mt-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                        variant={"outline"}
                        className="w-[280px] justify-start text-left font-normal"
                        >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        01.01.2025 - 16.11.2025
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
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
                        <SelectValue placeholder="Все предприятия (5)" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все предприятия (5)</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Все категории" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Все категории</SelectItem>
                    </SelectContent>
                </Select>
                <RadioGroup defaultValue="monthly" className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">По месяцам</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="quarterly" id="quarterly" />
                        <Label htmlFor="quarterly">По кварталам</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yearly" id="yearly" />
                        <Label htmlFor="yearly">По годам</Label>
                    </div>
                </RadioGroup>
                <div className="ml-auto flex items-center gap-2">
                    <Button>Применить</Button>
                    <Button variant="outline">Сбросить</Button>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Экспорт отчета
                    </Button>
                </div>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CostDynamicsChart className="lg:col-span-4" />
        <CostStructureChart className="lg:col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <TopDeviationsWidget />
        <RequestStatusFunnel />
      </div>
    </div>
  );
}
