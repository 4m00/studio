'use client';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const heatmapData = [
    { "category": "Сырье", "Янв": 120, "Фев": 130, "Мар": 110, "Апр": 150, "Май": 160, "Июн": 155, "Июл": 170, "Авг": 165, "Сен": 180, "Окт": 175, "Ноя": 160, "Дек": 190 },
    { "category": "Персонал", "Янв": 200, "Фев": 210, "Мар": 205, "Апр": 220, "Май": 215, "Июн": 225, "Июл": 230, "Авг": 220, "Сен": 240, "Окт": 235, "Ноя": 230, "Дек": 250 },
    { "category": "Энергия", "Янв": 80, "Фев": 85, "Мар": 90, "Апр": 95, "Май": 110, "Июн": 120, "Июл": 130, "Авг": 125, "Сен": 115, "Окт": 100, "Ноя": 90, "Дек": 140 },
    { "category": "Ремонты", "Янв": 50, "Фев": 40, "Мар": 60, "Апр": 70, "Май": 65, "Июн": 80, "Июл": 90, "Авг": 110, "Сен": 100, "Окт": 95, "Ноя": 85, "Дек": 120 },
    { "category": "Логистика", "Янв": 70, "Фев": 75, "Мар": 80, "Апр": 85, "Май": 90, "Июн": 95, "Июл": 100, "Авг": 105, "Сен": 110, "Окт": 120, "Ноя": 115, "Дек": 130 },
    { "category": "Маркетинг", "Янв": 30, "Фев": 35, "Мар": 40, "Апр": 45, "Май": 50, "Июн": 55, "Июл": 60, "Авг": 65, "Сен": 70, "Окт": 75, "Ноя": 80, "Дек": 90 },
    { "category": "Прочее", "Янв": 20, "Фев": 22, "Мар": 25, "Апр": 28, "Май": 30, "Июн": 32, "Июл": 35, "Авг": 38, "Сен": 40, "Окт": 42, "Ноя": 45, "Дек": 50 },
];

export default function AnalyticsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(new Date().getFullYear(), 11, 31),
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-2xl font-bold">Центр аналитики</h1>
                <p className="text-muted-foreground">Интерактивный анализ операционных затрат</p>
            </div>
             <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Экспорт в PDF
            </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 flex flex-col gap-6">
                <CostDynamicsChart />
                {isClient && <SpendHeatmap data={heatmapData} />}
                <DrillDownTable />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Фильтры</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label>Период</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {isClient && date?.from ? (
                                        date.to ? (
                                            <>{date.from.toLocaleDateString('ru-RU')} - {date.to.toLocaleDateString('ru-RU')}</>
                                        ) : (
                                            date.from.toLocaleDateString('ru-RU')
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
                        <div className="space-y-2">
                            <Label>Центры ответственности (ЦФО)</Label>
                            <Select>
                                <SelectTrigger>
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
                        <div className="space-y-2">
                             <Label>Статьи затрат</Label>
                             <Select>
                                <SelectTrigger>
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
                        <Button size="lg" className="w-full"><Filter className="mr-2 h-4 w-4" /> Применить</Button>
                    </CardContent>
                </Card>
                <CostStructureChart />
            </div>
        </div>
    </div>
  );
}
