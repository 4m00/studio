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
import { Progress } from "@/components/ui/progress";
import { budgetDeviationsData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function BudgetingPage() {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Бюджеты</CardTitle>
        <CardDescription>
          Обзор исполнения бюджетов по подразделениям.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Подразделение</TableHead>
              <TableHead className="text-right">План</TableHead>
              <TableHead className="text-right">Факт</TableHead>
              <TableHead>Исполнение</TableHead>
              <TableHead className="text-right">Отклонение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetDeviationsData.map((item) => {
              const execution = (item.fact / item.plan) * 100;
              return (
                <TableRow key={item.department}>
                  <TableCell className="font-medium">{item.department}</TableCell>
                  <TableCell className="text-right">{formatter.format(item.plan * 1000000)}</TableCell>
                  <TableCell className="text-right">{formatter.format(item.fact * 1000000)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                       <Progress value={execution} className={cn(execution > 100 && "[&>div]:bg-destructive")} />
                       <span>{execution.toFixed(1)}%</span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right font-semibold",
                      item.deviation > 5
                        ? "text-destructive"
                        : item.deviation < -5
                        ? "text-success"
                        : "text-warning"
                    )}
                  >
                    {item.deviation > 0 ? "+" : ""}
                    {item.deviation.toFixed(2)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
