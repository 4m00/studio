import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const initiatives = [
    { id: 1, title: "Оптимизация логистических маршрутов", status: "В работе", progress: 65, economy: 45, economy_ytd: 28, department: "Служба логистики" },
    { id: 2, title: "Переход на нового поставщика сырья 'Альфа'", status: "Завершено", progress: 100, economy: 60, economy_ytd: 60, department: "Перерабатывающий завод №1" },
    { id: 3, title: "Внедрение системы энергосбережения на ДП №2", status: "В работе", progress: 40, economy: 80, economy_ytd: 32, department: "Добывающее предприятие №2" },
    { id: 4, title: "Централизация закупок офисных принадлежностей", status: "Планируется", progress: 0, economy: 15, economy_ytd: 0, department: "Центральный офис" },
    { id: 5, title: "Аутсорсинг IT-поддержки 1-й линии", status: "Завершено", progress: 100, economy: 22, economy_ytd: 22, department: "ИТ-департамент" },
];

const statusColors = {
  "В работе": "bg-yellow-500/20 text-yellow-700 border-yellow-500/30",
  "Завершено": "bg-success/20 text-success-foreground border-success/30",
  "Планируется": "bg-blue-500/20 text-blue-700 border-blue-500/30",
};


export default function InitiativesPage() {
    const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 });

  return (
    <div className="flex flex-col gap-8">
         <Card>
            <CardHeader>
                <CardTitle>Инициативы по сокращению затрат</CardTitle>
                <CardDescription>
                Обзор и отслеживание прогресса по инициативам, направленным на повышение эффективности.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map(initiative => (
                 <Card key={initiative.id}>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{initiative.title}</CardTitle>
                            <Badge variant="outline" className={statusColors[initiative.status as keyof typeof statusColors]}>{initiative.status}</Badge>
                        </div>
                        <CardDescription>{initiative.department}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm text-muted-foreground">Прогресс выполнения</span>
                                <span className="text-sm font-semibold">{initiative.progress}%</span>
                            </div>
                            <Progress value={initiative.progress} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Плановая экономия</span>
                                <span className="font-semibold">{formatter.format(initiative.economy * 1000000)}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Экономия с начала года (YTD)</span>
                                <span className="font-semibold text-success">{formatter.format(initiative.economy_ytd * 1000000)}</span>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            ))}
        </div>
    </div>
  );
}
