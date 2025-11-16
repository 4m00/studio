import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

const initiatives = [
  { id: 1, name: 'Оптимизация логистики', start: new Date(2025, 2, 1), end: new Date(2025, 8, 30), progress: 65, color: '#3b82f6' },
  { id: 2, name: 'Новый поставщик сырья', start: new Date(2025, 0, 15), end: new Date(2025, 4, 15), progress: 100, color: '#16a34a' },
  { id: 3, name: 'Энергосбережение ДП-2', start: new Date(2025, 3, 1), end: new Date(2025, 11, 31), progress: 40, color: '#f97316' },
  { id: 4, name: 'Централизация закупок', start: new Date(2025, 5, 1), end: new Date(2025, 10, 1), progress: 0, color: '#a855f7' },
  { id: 5, name: 'Аутсорсинг IT-поддержки', start: new Date(2025, 1, 1), end: new Date(2025, 6, 30), progress: 100, color: '#16a34a' },
  { id: 6, name: 'Внедрение ЭДО', start: new Date(2025, 6, 15), end: new Date(2025, 11, 20), progress: 25, color: '#3b82f6' },
];

const GanttChart = () => {
  const startDate = new Date(2025, 0, 1);
  const endDate = new Date(2025, 11, 31);
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(2025, i, 1);
    return monthDate.toLocaleString('default', { month: 'short' });
  });

  return (
    <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Диаграмма Ганта по инициативам</CardTitle>
                    <CardDescription>Временные рамки и прогресс выполнения проектов на 2025 год</CardDescription>
                </div>
                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4"/> Фильтры</Button>
            </div>
        </CardHeader>
        <CardContent className="pr-10">
            <div className="relative text-xs font-sans">
                {/* Month Headers */}
                <div className="grid grid-cols-12 h-8 sticky top-0 bg-background z-10 border-b">
                    {months.map((month, i) => (
                        <div key={i} className="text-center border-r text-muted-foreground font-medium">{month}</div>
                    ))}
                </div>

                {/* Gantt Bars */}
                <div className="space-y-3 mt-3">
                    {initiatives.map((initiative, index) => {
                        const left = ((initiative.start.getTime() - startDate.getTime()) / (1000 * 3600 * 24) / totalDays) * 100;
                        const width = ((initiative.end.getTime() - initiative.start.getTime()) / (1000 * 3600 * 24) / totalDays) * 100;

                        return (
                             <Popover key={initiative.id}>
                                <PopoverTrigger asChild>
                                    <div className="flex items-center w-full h-10 cursor-pointer">
                                        <div className="w-48 pr-4 text-right truncate font-medium text-muted-foreground">{initiative.name}</div>
                                        <div className="flex-1 h-full bg-muted/60 rounded-md relative overflow-hidden">
                                            <div style={{ left: `${left}%`, width: `${width}%` }} className="absolute h-full">
                                                 <div className="h-full rounded-md opacity-40" style={{ backgroundColor: initiative.color }}></div>
                                                 <div style={{ width: `${initiative.progress}%`}} className="absolute top-0 left-0 h-full rounded-l-md" >
                                                    <div className="h-full rounded-l-md" style={{ backgroundColor: initiative.color }}></div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className="grid gap-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium leading-none">{initiative.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {initiative.start.toLocaleDateString()} - {initiative.end.toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-sm">
                                            Прогресс: <strong>{initiative.progress}%</strong>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        );
                    })}
                </div>
            </div>
        </CardContent>
    </Card>
  );
};

export default GanttChart;
