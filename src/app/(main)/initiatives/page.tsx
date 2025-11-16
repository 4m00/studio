import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import GanttChart from "@/components/dashboard/gantt-chart";
import { DollarSign, Target, TrendingUp, CheckCircle } from "lucide-react";


const initiatives = [
    { id: 1, title: "Оптимизация логистических маршрутов", status: "В работе", progress: 65, economy: 45, economy_ytd: 28, department: "Служба логистики" },
    { id: 2, title: "Переход на нового поставщика сырья 'Альфа'", status: "Завершено", progress: 100, economy: 60, economy_ytd: 60, department: "Перерабатывающий завод №1" },
    { id: 3, title: "Внедрение системы энергосбережения на ДП №2", status: "В работе", progress: 40, economy: 80, economy_ytd: 32, department: "Добывающее предприятие №2" },
    { id: 4, title: "Централизация закупок офисных принадлежностей", status: "Планируется", progress: 0, economy: 15, economy_ytd: 0, department: "Центральный офис" },
    { id: 5, title: "Аутсорсинг IT-поддержки 1-й линии", status: "Завершено", progress: 100, economy: 22, economy_ytd: 22, department: "ИТ-департамент" },
];

const statusColors: { [key: string]: string } = {
  "В работе": "yellow",
  "Завершено": "success",
  "Планируется": "blue",
};

const portfolioKpis = {
    totalEconomy: initiatives.reduce((sum, item) => sum + item.economy, 0),
    ytdEconomy: initiatives.reduce((sum, item) => sum + item.economy_ytd, 0),
    avgProgress: initiatives.reduce((sum, item) => sum + item.progress, 0) / initiatives.length,
    completedCount: initiatives.filter(item => item.status === 'Завершено').length,
}

const formatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function InitiativesPage() {

  return (
    <div className="flex flex-col gap-8">
         <Card>
            <CardHeader>
                <CardTitle>Портфель инициатив по повышению эффективности</CardTitle>
                <CardDescription>
                Дашборд для контроля и анализа стратегических проектов по сокращению затрат.
                </CardDescription>
            </CardHeader>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Плановая годовая экономия</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatter.format(portfolioKpis.totalEconomy * 1000000)}</div>
                    <p className="text-xs text-muted-foreground">по всем инициативам</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Экономия с начала года (YTD)</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-success">{formatter.format(portfolioKpis.ytdEconomy * 1000000)}</div>
                    <p className="text-xs text-muted-foreground">факт с начала года</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Средний прогресс</CardTitle>
                     <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100"><Progress value={portfolioKpis.avgProgress} className="h-1 w-12 absolute" /></div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{portfolioKpis.avgProgress.toFixed(0)}%</div>
                     <p className="text-xs text-muted-foreground">по всем активным инициативам</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Завершено инициатив</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{portfolioKpis.completedCount} / {initiatives.length}</div>
                    <p className="text-xs text-muted-foreground">от общего числа</p>
                </CardContent>
            </Card>
        </div>

        <GanttChart />

        <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-4">Список инициатив</h2>
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {initiatives.map(initiative => (
                    <Card key={initiative.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-base font-bold">{initiative.title}</CardTitle>
                                <Badge variant={statusColors[initiative.status]}>{initiative.status}</Badge>
                            </div>
                            <CardDescription>{initiative.department}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm text-muted-foreground">Прогресс выполнения</span>
                                    <span className="text-sm font-semibold">{initiative.progress}%</span>
                                </div>
                                <Progress value={initiative.progress} />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                                <div className="flex flex-col p-3 bg-muted/50 rounded-md">
                                    <span className="text-muted-foreground">План. экономия</span>
                                    <span className="font-semibold">{formatter.format(initiative.economy * 1000000)}</span>
                                </div>
                                <div className="flex flex-col p-3 bg-muted/50 rounded-md">
                                    <span className="text-muted-foreground">Экономия YTD</span>
                                    <span className="font-semibold text-success">{formatter.format(initiative.economy_ytd * 1000000)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
