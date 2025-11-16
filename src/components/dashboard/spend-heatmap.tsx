'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface HeatmapRow {
    category: string;
    [key: string]: string | number;
}

interface SpendHeatmapProps {
  data?: HeatmapRow[];
}

const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

// A function to get a color based on value to simulate a heatmap.
const getColorForValue = (value: number) => {
  const min = 20;
  const max = 250;
  const ratio = (value - min) / (max - min);

  if (ratio < 0.4) {
    return 'bg-green-100/50';
  }
  if (ratio < 0.7) {
    return 'bg-yellow-100/50';
  }
  return 'bg-red-100/50';
}

export function SpendHeatmap({ data }: SpendHeatmapProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                 <CardTitle>Таблица затрат</CardTitle>
                 <CardDescription>Распределение затрат по категориям и месяцам (млн ₽)</CardDescription>
            </div>
            <Select defaultValue="all">
                <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Выберите подразделение" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все подразделения</SelectItem>
                    <SelectItem value="dp1">Перерабатывающий завод №1</SelectItem>
                    <SelectItem value="dp2">Добывающее предприятие №2</SelectItem>
                    <SelectItem value="co">Центральный офис</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        {!data ? (
          <div className="space-y-2 pt-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold w-[120px]">Категория</TableHead>
              {months.map(month => <TableHead key={month} className="text-right">{month}</TableHead>)} 
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.category}>
                <TableCell className="font-medium">{row.category}</TableCell>
                {months.map(month => (
                  <TableCell key={month} className={`text-right text-sm ${getColorForValue(row[month] as number)}`}>
                    {(row[month] as number).toLocaleString('ru-RU')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </CardContent>
    </Card>
  );
}
