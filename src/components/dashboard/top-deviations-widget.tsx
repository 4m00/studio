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
import { Badge } from "@/components/ui/badge";
import { budgetDeviationsData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function TopDeviationsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Топ отклонений от бюджета</CardTitle>
        <CardDescription>Подразделения с наибольшими отклонениями</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Подразделение</TableHead>
              <TableHead className="text-right">Отклонение</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetDeviationsData.map((item) => (
              <TableRow key={item.department}>
                <TableCell className="font-medium">
                  {item.department}
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
