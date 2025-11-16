import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, FileText, BarChart2, PieChart, Plus, Wrench, Star, Clock, Users } from "lucide-react";
import Link from "next/link";

const reports = [
    {
        id: 1,
        title: "Операционные затраты холдинга",
        description: "Динамика затрат, структура по категориям, план vs факт по ЦФО",
        category: "Финансовый",
        updateFrequency: "Ежедневно в 06:00",
        lastUpdate: "16.11.2025 06:15",
        users: 45,
        rating: 4.8,
        reviews: 23,
        icon: BarChart2,
        format: "PDF, XLSX"
    },
    {
        id: 2,
        title: "Отчет для CFO (еженедельный)",
        description: "KPI исполнения бюджета, критичные отклонения, статус инициатив",
        category: "Управленческий",
        updateFrequency: "Понедельник 09:00",
        lastUpdate: "13.11.2025 09:00",
        users: 12,
        rating: 5.0,
        reviews: 8,
        icon: FileText,
        format: "PDF"
    },
    {
        id: 3,
        title: "Детализация по поставщикам",
        description: "Рейтинг поставщиков, средние цены, история сделок",
        category: "Операционный",
        updateFrequency: "Реал-тайм",
        lastUpdate: "16.11.2025 14:30",
        users: 18,
        rating: 4.5,
        reviews: 12,
        icon: PieChart,
        format: "XLSX"
    },
    {
        id: 4,
        title: "Анализ отклонений от бюджета",
        description: "Сравнение фактических затрат с плановыми показателями",
        category: "Финансовый",
        updateFrequency: "Еженедельно",
        lastUpdate: "13.11.2025",
        users: 34,
        rating: 4.7,
        reviews: 19,
        icon: BarChart2,
        format: "PDF, XLSX"
    },
    {
        id: 5,
        title: "Отчет по эффективности инициатив",
        description: "Анализ экономического эффекта от внедренных инициатив",
        category: "Управленческий",
        updateFrequency: "Ежемесячно",
        lastUpdate: "01.11.2025",
        users: 21,
        rating: 4.9,
        reviews: 15,
        icon: FileText,
        format: "PDF"
    },
];

export default function ReportsPage() {
  return (
     <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-semibold">Отчеты и аналитика</h1>
                <p className="text-muted-foreground">Библиотека готовых отчетов и конструктор дашбордов</p>
            </div>
            <div className="flex gap-2">
                <Link href="/reports/builder">
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Конструктор дашборда
                    </Button>
                </Link>
                <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Создать отчет
                </Button>
            </div>
        </div>

        <Tabs defaultValue="library">
            <TabsList>
                <TabsTrigger value="library">Библиотека отчетов</TabsTrigger>
                <TabsTrigger value="my">Мои отчеты</TabsTrigger>
                <TabsTrigger value="favorite">Избранное</TabsTrigger>
                <TabsTrigger value="scheduled">Запланированные</TabsTrigger>
            </TabsList>

            <TabsContent value="library" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Стандартные отчеты</CardTitle>
                        <CardDescription>
                            Готовые шаблоны отчетов для различных потребностей
                        </CardDescription>
                    </CardHeader>
                </Card>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {reports.map(report => {
                        const Icon = report.icon;
                        return (
                            <Card key={report.id} className="flex flex-col hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start gap-4 mb-3">
                                        <div className="p-3 rounded-lg bg-primary/10">
                                            <Icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-1">{report.title}</CardTitle>
                                            <Badge variant="outline" className="text-xs">
                                                {report.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {report.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow flex flex-col justify-end space-y-3">
                                    <div className="text-xs text-muted-foreground space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-3 w-3" />
                                            <span>Обновление: {report.updateFrequency}</span>
                                        </div>
                                        <div>Последнее: {report.lastUpdate}</div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                <span>{report.users} чел</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                <span>{report.rating} ({report.reviews})</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <span className="text-xs text-muted-foreground">
                                            Форматы: {report.format}
                                        </span>
                                        <div className="flex gap-2">
                                            <Button size="sm">
                                                <FileDown className="mr-2 h-4 w-4" />
                                                Скачать
                                            </Button>
                                            <Button size="sm" variant="ghost">
                                                <Star className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </TabsContent>

            <TabsContent value="my">
                <Card>
                    <CardContent className="py-12 text-center">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">У вас пока нет созданных отчетов</p>
                        <Link href="/reports/builder">
                            <Button className="mt-4">
                                <Plus className="mr-2 h-4 w-4" />
                                Создать отчет
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="favorite">
                <Card>
                    <CardContent className="py-12 text-center">
                        <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Нет избранных отчетов</p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Добавьте отчеты в избранное для быстрого доступа
                        </p>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="scheduled">
                <Card>
                    <CardHeader>
                        <CardTitle>Запланированные отчеты</CardTitle>
                        <CardDescription>
                            Автоматическая генерация и рассылка отчетов по расписанию
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="border rounded-lg p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold">Еженедельный отчет для CFO</h3>
                                    <p className="text-sm text-muted-foreground">Дашборд: Операционные затраты холдинга</p>
                                </div>
                                <Badge>Активно</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Формат:</span> PDF
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Расписание:</span> Понедельник, 09:00
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Получатели:</span> cfo@company.ru, +3 чел
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Последняя отправка:</span> 13.11.2025 09:05
                                </div>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button size="sm" variant="outline">Редактировать</Button>
                                <Button size="sm" variant="outline">Отправить сейчас</Button>
                                <Button size="sm" variant="outline">Отключить</Button>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Новое расписание
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}
