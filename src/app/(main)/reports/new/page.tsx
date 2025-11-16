import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CostDynamicsChart } from "@/components/dashboard/cost-dynamics-chart";
import { CostStructureChart } from "@/components/dashboard/cost-structure-chart";
import { DrillDownTable } from "@/components/dashboard/drill-down-table";
import { PlusCircle, Grid, BarChart2, Table, Save, Send } from "lucide-react";

const availableWidgets = [
  { id: 'cost-dynamics', title: 'Динамика затрат', component: <CostDynamicsChart />, icon: <BarChart2 className="h-8 w-8 text-primary" /> },
  { id: 'cost-structure', title: 'Структура затрат', component: <CostStructureChart />, icon: <Grid className="h-8 w-8 text-primary" /> },
  { id: 'plan-fact', title: 'План/факт анализ', component: <DrillDownTable />, icon: <Table className="h-8 w-8 text-primary" /> },
];

export default function NewReportPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
      
      {/* Left Column: Report Settings & Widgets */}
      <div className="lg:col-span-1 flex flex-col gap-8 sticky top-6">
        <Card>
          <CardHeader>
            <CardTitle>Конструктор отчета</CardTitle>
            <CardDescription>Создайте свой шаблон для регулярной аналитики.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Название отчета</Label>
              <Input id="report-name" placeholder="Еженедельный отчет по затратам" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-description">Описание</Label>
              <Textarea id="report-description" placeholder="Ключевые метрики для комитета по затратам" rows={3}/>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Доступные виджеты</CardTitle>
                <CardDescription>Нажмите, чтобы добавить виджет в отчет.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {availableWidgets.map(widget => (
                    <Button key={widget.id} variant="outline" className="w-full h-auto justify-start p-4 gap-4">
                        {widget.icon}
                        <div className="text-left">
                            <p className="font-semibold">{widget.title}</p>
                            <p className="text-xs text-muted-foreground">Добавить блок в отчет</p>
                        </div>
                    </Button>
                ))}
            </CardContent>
        </Card>
      </div>

      {/* Right Column: Report Preview & Schedule */}
      <div className="lg:col-span-3 flex flex-col gap-8">
         <Card className="flex-1">
            <CardHeader>
                <CardTitle>Предпросмотр отчета</CardTitle>
                <CardDescription>Так будет выглядеть ваш отчет. Виджеты можно перетаскивать и настраивать.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6 border m-6 mt-0 border-dashed rounded-lg min-h-[400px]">
                {/* Placeholder for dropped widgets */}
                <div className="text-center py-20">
                    <PlusCircle className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-4 text-lg font-medium">Добавьте виджеты</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Начните с выбора виджетов из панели слева.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
             <CardHeader>
                <CardTitle>Настройка рассылки</CardTitle>
                <CardDescription>Настройте автоматическую отправку отчета по расписанию.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Switch id="schedule-enabled" />
                    <Label htmlFor="schedule-enabled">Включить автоматическую рассылку</Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="frequency">Частота</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Еженедельно" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="daily">Ежедневно</SelectItem>
                                <SelectItem value="weekly">Еженедельно</SelectItem>
                                <SelectItem value="monthly">Ежемесячно</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="day">День</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="Понедельник" /></SelectTrigger>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="time">Время</Label>
                         <Select>
                            <SelectTrigger><SelectValue placeholder="09:00" /></SelectTrigger>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="recipients">Получатели (через запятую)</Label>
                    <Textarea id="recipients" placeholder="cfo@company.ru, ceo@company.ru, ..." />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline"><Save className="mr-2 h-4 w-4"/>Сохранить как черновик</Button>
                <Button><Send className="mr-2 h-4 w-4"/>Сохранить и активировать</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
