import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus2, Download, Trash2, Mail, Edit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const reports = [
    {
        id: 1, 
        title: "Еженедельный отчет по затратам ЦФО", 
        description: "Сводка по ключевым статьям затрат для руководителей ЦФО.",
        last_sent: "15.11.2025, 09:00",
        schedule: "Каждый понедельник, 09:00",
        recipients_count: 5,
        is_active: true,
    },
    {
        id: 2, 
        title: "План-факт анализ по ГСМ", 
        description: "Детальный отчет по расходам на горюче-смазочные материалы.",
        last_sent: "01.11.2025, 10:00",
        schedule: "1-й день месяца, 10:00",
        recipients_count: 2,
        is_active: true,
    },
    {
        id: 3, 
        title: "Отчет по аномальным транзакциям (черновик)", 
        description: "Отчет для службы безопасности с фокусом на аномалии.",
        last_sent: "-",
        schedule: "Не настроено",
        recipients_count: 0,
        is_active: false,
    },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
        <Card>
            <CardHeader className="flex-row justify-between items-center">
                <div>
                    <CardTitle>Центр отчетов</CardTitle>
                    <CardDescription>
                    Управление созданными отчетами и автоматическими рассылками.
                    </CardDescription>
                </div>
                <Link href="/reports/new">
                    <Button size="lg"><FilePlus2 className="mr-2 h-4 w-4"/>Создать отчет</Button>
                </Link>
            </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map(report => (
                <Card key={report.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                             <CardTitle className="text-lg">{report.title}</CardTitle>
                             <Badge variant={report.is_active ? "success" : "secondary"}>
                                {report.is_active ? "Активен" : "Черновик"}
                             </Badge>
                        </div>
                        <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-3">
                        <div className="text-sm text-muted-foreground">
                           <strong>Последняя отправка:</strong> {report.last_sent}
                        </div>
                         <div className="text-sm text-muted-foreground">
                           <strong>Расписание:</strong> {report.schedule}
                        </div>
                         <div className="text-sm text-muted-foreground">
                           <strong>Получателей:</strong> {report.recipients_count}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between bg-muted/40 py-3 px-4 rounded-b-lg">
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm"><Mail className="h-4 w-4"/></Button>
                           <Button variant="outline" size="sm"><Download className="h-4 w-4"/></Button>
                        </div>
                         <div className="flex gap-2">
                           <Button variant="ghost" size="sm" className="text-muted-foreground"><Edit className="h-4 w-4"/></Button>
                           <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="h-4 w-4"/></Button>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
