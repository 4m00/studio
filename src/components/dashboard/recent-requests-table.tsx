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
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { recentRequestsData } from "@/lib/mock-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

const statusColors: { [key: string]: string } = {
  Утверждено: "bg-success/20 text-success-foreground border-success/30",
  "На согласовании": "bg-warning/20 text-warning-foreground border-warning/30",
  Отклонено: "bg-destructive/20 text-destructive-foreground border-destructive/30",
};


export function RecentRequestsTable() {
  const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Недавние заявки</CardTitle>
        <CardDescription>Последние 8 заявок в системе</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Номер</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead>Инициатор</TableHead>
              <TableHead>Подразделение</TableHead>
              <TableHead className="text-right">Сумма</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRequestsData.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.date}</TableCell>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={`https://picsum.photos/seed/${request.avatar}/24/24`} data-ai-hint="person portrait"/>
                    <AvatarFallback>{request.initiator.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {request.initiator}
                </TableCell>
                <TableCell>{request.department}</TableCell>
                <TableCell className="text-right font-semibold">
                  {formatter.format(request.amount)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("capitalize", statusColors[request.status])}>
                    {request.status}
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
                      <DropdownMenuItem><Eye className="mr-2 h-4 w-4"/>Просмотр</DropdownMenuItem>
                      <DropdownMenuItem><Pencil className="mr-2 h-4 w-4"/>Редактировать</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4"/>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
