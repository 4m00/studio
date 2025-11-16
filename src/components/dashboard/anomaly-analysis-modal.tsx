import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart, BrainCircuit, FileText, Share2, TrendingDown, TrendingUp, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";

const barData = [
  { month: 'Июн', value: 1.5 },
  { month: 'Июл', value: 1.6 },
  { month: 'Авг', value: 1.4 },
  { month: 'Сен', value: 1.7 },
  { month: 'Окт', value: 1.8 },
  { month: 'Ноя', value: 2.7 },
];

export function AnomalyAnalysisModal({ anomaly }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Анализ</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
             <div className="flex items-start justify-between">
                <div>
                    <Badge variant={anomaly.status === 'critical' ? 'destructive' : 'yellow'}>
                        {anomaly.status === 'critical' ? 'Критическая аномалия' : 'Предупреждение'}
                    </Badge>
                    <DialogTitle className="text-2xl mt-2">{anomaly.id}: {anomaly.description}</DialogTitle>
                    <DialogDescription>{anomaly.details}</DialogDescription>
                </div>
                <div className="text-right pl-4">
                    <div className="text-3xl font-bold text-destructive">{anomaly.amount}</div>
                    <div className="text-sm text-muted-foreground">Отклонение от нормы</div>
                </div>
            </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">

            {/* Left side: Pattern graph and RCA */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5"/> Паттерн расходов</CardTitle>
                        <CardDescription>Сравнение с историческими данными (млн ₽)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                         <ResponsiveBar
                            data={barData}
                            keys={['value']}
                            indexBy="month"
                            margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
                            padding={0.4}
                            valueScale={{ type: 'linear' }}
                            colors={({ indexValue, data }) => indexValue === 'Ноя' ? '#ef4444' : '#60a5fa'}
                            axisBottom={{
                                legend: 'Месяц',
                                legendPosition: 'middle',
                                legendOffset: 32
                            }}
                            axisLeft={{
                                legend: 'Сумма',
                                legendPosition: 'middle',
                                legendOffset: -35
                            }}
                            enableLabel={false}
                            animate={true}
                            defs={[
                                {
                                    id: 'avgLine',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: '#9ca3af',
                                    rotation: -45,
                                    lineWidth: 2,
                                    spacing: 8
                                }
                            ]}
                           markers={[
                                {
                                    axis: 'y',
                                    value: 1.6,
                                    lineStyle: { stroke: '#a1a1aa', strokeWidth: 2, strokeDasharray: '4 4' },
                                    legend: 'Среднее: 1.6 млн',
                                    legendOrientation: 'horizontal',
                                    textStyle: { fill: '#71717a'}
                                },
                           ]}
                        />
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5"/> Анализ первопричин (RCA)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                <span>Основной поставщик: <strong>ООО "Арктик-Транс"</strong></span>
                                <Badge variant="secondary">+85% затрат</Badge>
                            </div>
                             <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                <span>Тип техники: <strong>Карьерные самосвалы</strong></span>
                                <Badge variant="secondary">+60% затрат</Badge>
                            </div>
                             <div className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                                <span>Ответственный: <strong>Сидоров А. В.</strong></span>
                                <Button size="sm" variant="outline">Профиль</Button>
                            </div>
                        </div>
                    </CardContent>
                 </Card>
            </div>

            {/* Right side: AI recommendations and actions */}
            <div className="space-y-6">
                <Card className="bg-blue-50/50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-800"><BrainCircuit className="h-5 w-5"/> Рекомендации AI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-3 rounded-lg bg-white border border-blue-100">
                            <h4 className="font-semibold flex items-center gap-2"><TrendingDown className="h-4 w-4 text-green-600"/>Потенциал экономии: ~850 000 ₽</h4>
                            <p className="text-sm text-muted-foreground mt-1">Запросить у ООО "Арктик-Транс" детализацию расхода топлива по каждому ТС. Сравнить с нормативами.</p>
                        </div>
                         <div className="p-3 rounded-lg bg-white border border-blue-100">
                            <h4 className="font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-yellow-600"/>Риск: Повторение в следующем периоде</h4>
                            <p className="text-sm text-muted-foreground mt-1">Установить лимиты на заправку для карьерных самосвалов и ввести обязательную сверку с путевыми листами.</p>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Дальнейшие действия</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                       <Button variant="outline" className="justify-start"><FileText className="mr-2 h-4 w-4"/> Запросить доп. документы у инициатора</Button>
                       <Button variant="outline" className="justify-start"><Share2 className="mr-2 h-4 w-4"/> Передать на рассмотрение в службу безопасности</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
