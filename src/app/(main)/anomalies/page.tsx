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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, AlertTriangle, AlertCircle } from "lucide-react";
import { anomaliesData } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const statusConfig = {
  critical: {
    icon: AlertCircle,
    color: "text-destructive border-destructive",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-warning border-warning",
  },
};

export default function AnomaliesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>🤖 Интеллектуальный анализ аномалий</CardTitle>
        <CardDescription>
          Все автоматически выявленные отклонения и аномальные операции.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {anomaliesData.map((anomaly) => {
              const { icon: Icon, color } = statusConfig[anomaly.status];
              return (
                <TableRow key={anomaly.id}>
                  <TableCell className="font-medium">{anomaly.id}</TableCell>
                  <TableCell>{anomaly.description}</TableCell>
                  <TableCell>{anomaly.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(color, "capitalize")}>
                      <Icon className="mr-2 h-4 w-4" />
                      {anomaly.status === "critical" ? "Критическая" : "Предупреждение"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Расследовать</DropdownMenuItem>
                        <DropdownMenuItem>Отметить как ложное</DropdownMenuItem>
                        <DropdownMenuItem>Создать задачу</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
