import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, FileText, BarChart2, PieChart } from "lucide-react";

const reports = [
    { id: 1, title: "Ежемесячный отчет по затратам", description: "Детальный отчет по всем статьям затрат за выбранный период.", icon: FileText, format: "PDF, XLSX" },
    { id: 2, title: "Анализ отклонений от бюджета", description: "Сравнение фактических затрат с плановыми показателями по подразделениям.", icon: BarChart2, format: "PDF, XLSX" },
    { id: 3, title: "Структура затрат", description: "Визуализация структуры затрат в виде диаграммы.", icon: PieChart, format: "PNG, PDF" },
    { id: 4, title: "Отчет по статусам заявок", description: "Сводная информация по количеству и суммам заявок в различных статусах.", icon: FileText, format: "XLSX" },
    { id: 5, title: "Отчет по эффективности инициатив", description: "Анализ экономического эффекта от внедренных инициатив.", icon: FileText, format: "PDF" },
];

export default function ReportsPage() {
  return (
     <div className="flex flex-col gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Генератор отчетов</CardTitle>
                <CardDescription>
                    Формирование и выгрузка стандартных и настраиваемых отчетов.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map(report => {
            const Icon = report.icon;
            return (
                 <Card key={report.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <Icon className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <CardTitle className="text-lg">{report.title}</CardTitle>
                                <CardDescription className="mt-1">{report.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-end">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Форматы: {report.format}</span>
                            <Button>
                                <FileDown className="mr-2 h-4 w-4" />
                                Сформировать
                            </Button>
                        </div>
                    </CardContent>
                 </Card>
            )
        })}
        </div>
    </div>
  );
}
