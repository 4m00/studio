'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostDynamicsChart } from "@/components/dashboard/cost-dynamics-chart";
import { CostStructureChart } from "@/components/dashboard/cost-structure-chart";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Download, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { DrillDownTable } from "@/components/dashboard/drill-down-table";
import { DateRange } from 'react-day-picker';

const SpendHeatmap = dynamic(
  () => import('@/components/dashboard/spend-heatmap').then(mod => mod.SpendHeatmap),
  { ssr: false }
);

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });

  return (
    <div className="flex flex-col gap-6">
       <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
                <CardTitle>Центр аналитики</CardTitle>
                <CardDescription>Интерактивный анализ операционных затрат</CardDescription>
            </div>
             <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Экспорт в PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
             <div className="flex items-end gap-4 p-4 border rounded-lg bg-muted/40">
                <div className="flex-1">
                    <Label className="text-xs">Период</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                            variant={"outline"}
                            className="w-full justify-start text-left font-normal mt-1"
                            >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>{date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}</>
                                ) : (
                                    date.from.toLocaleDateString()
                                )
                                ) : (
                                <span>Выберите дату</span>
                            )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                 <div className="flex-1">
                    <Label className="text-xs">Центры ответственности (ЦФО)</Label>
                    <Select>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Все предприятия (5)" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все предприятия (5)</SelectItem>
                            <SelectItem value="1">Предприятие 1</SelectItem>
                            <SelectItem value="2">Предприятие 2</SelectItem>
                            <SelectItem value="3">Предприятие 3</SelectItem>
                            <SelectItem value="4">Предприятие 4</SelectItem>
                            <SelectItem value="5">Предприятие 5</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                 <div className="flex-1">
                    <Label className="text-xs">Статьи затрат</Label>
                     <Select>
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Все категории" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все категории</SelectItem>
                            <SelectItem value="office">Канцтовары</SelectItem>
                            <SelectItem value="rent">Аренда</SelectItem>
                            <SelectItem value="salary">Зарплата</SelectItem>
                            <SelectItem value="marketing">Маркетинг</SelectItem>
                        </SelectContent>
                    </Select>
                 </div>
                <Button size="lg"><Filter className="mr-2 h-4 w-4" /> Применить</Button>
            </div>
        </CardContent>
      </Card>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
            <CostDynamicsChart />
        </div>
         <div className="lg:col-span-2">
            <CostStructureChart />
        </div>
       </div>

       <div>
         <SpendHeatmap />
       </div>

       <div>
        <DrillDownTable />
       </div>

    </div>
  );
}
