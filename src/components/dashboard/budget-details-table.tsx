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
import { cn } from "@/lib/utils";

const budgetDetailsData = [
  {
    category: "Сырье",
    budget: 500000,
    spent: 350000,
    remaining: 150000,
    variance: -5,
  },
  {
    category: "Персонал",
    budget: 400000,
    spent: 420000,
    remaining: -20000,
    variance: 5,
  },
  {
    category: "Энергия",
    budget: 150000,
    spent: 140000,
    remaining: 10000,
    variance: -6.67,
  },
  {
    category: "Ремонты",
    budget: 100000,
    spent: 110000,
    remaining: -10000,
    variance: 10,
  },
  {
    category: "Прочее",
    budget: 100000,
    spent: 90000,
    remaining: 10000,
    variance: -10,
  },
];

export function BudgetDetailsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Детализация бюджета</CardTitle>
        <CardDescription>Обзор по категориям</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Бюджет</TableHead>
              <TableHead className="text-right">Потрачено</TableHead>
              <TableHead className="text-right">Остаток</TableHead>
              <TableHead className="text-right">Отклонение</TableHead>
              <TableHead className="text-center">Освоение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetDetailsData.map((item) => (
              <TableRow key={item.category}>
                <TableCell className="font-medium">{item.category}</TableCell>
                <TableCell className="text-right">${item.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">${item.spent.toLocaleString()}</TableCell>
                <TableCell className={cn("text-right", item.remaining < 0 ? "text-destructive" : "text-success")}>
                  ${item.remaining.toLocaleString()}
                </TableCell>
                <TableCell className={cn("text-right font-semibold", item.variance > 0 ? "text-destructive" : "text-success")}>
                  {item.variance.toFixed(2)}%
                </TableCell>
                <TableCell>
                  <Progress value={(item.spent / item.budget) * 100} className="h-2" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
