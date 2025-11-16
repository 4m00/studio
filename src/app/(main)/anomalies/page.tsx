'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { AlertCircle, BrainCircuit, Calendar, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnomalyAnalysisModal } from "@/components/dashboard/anomaly-analysis-modal";

const anomaliesData = [
  { 
    id: 'ANOM-001', 
    description: 'Резкий рост затрат на ГСМ в ДП №1', 
    date: '15.11.2025', 
    status: 'critical',
    score: 9.5,
    amount: "+ 1.2 млн ₽",
    details: "Затраты на ГСМ на 45% выше среднемесячного значения за последний год."
  },
  { 
    id: 'ANOM-004', 
    description: 'Авансовый платеж без договора (ПЗ №2)', 
    date: '13.11.2025', 
    status: 'critical',
    score: 9.1,
    amount: "4.5 млн ₽",
    details: "Платеж контрагенту, с которым отсутствует действующий договор в системе."
  },
   { 
    id: 'ANOM-006', 
    description: 'Повторный счет-фактура от ООО "ТехСервис"', 
    date: '11.11.2025', 
    status: 'critical',
    score: 8.9,
    amount: "850 000 ₽",
    details: "Счет с идентичным номером и суммой уже был оплачен в прошлом квартале."
  },
  { 
    id: 'ANOM-002', 
    description: 'Нетипичный поставщик услуг для ЦО', 
    date: '14.11.2025', 
    status: 'warning',
    score: 7.8,
    amount: "320 000 ₽",
    details: "Закупка услуг у поставщика, который ранее не оказывал услуги для Центрального офиса."
  },
  { 
    id: 'ANOM-003', 
    description: 'Закупка канцтоваров на 250% выше средней', 
    date: '14.11.2025', 
    status: 'warning',
    score: 7.2,
    amount: "+ 150 000 ₽",
    details: "Сумма закупки значительно превышает средние показатели по данной статье."
  },
  { 
    id: 'ANOM-005', 
    description: 'Завышенная цена на запчасти в заявке REQ-0873', 
    date: '12.11.2025', 
    status: 'warning',
    score: 6.9,
    amount: "+25%",
    details: "Цена на позицию 'Гидронасос X-15' на 25% выше рыночной (по данным ML-модели)."
   },
];

const getStatusVariant = (status) => {
    if(status === 'critical') return 'destructive';
    if(status === 'warning') return 'yellow';
    return 'default';
}

export default function AnomaliesPage() {
  return (
    <div className="flex flex-col gap-6">
        <Card>
             <CardHeader>
                <CardTitle>Обнаруженные аномалии</CardTitle>
                <CardDescription>Список потенциально проблемных операций, выявленных ML-алгоритмами.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/40">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Поиск по ID, описанию, сумме..." className="pl-10" />
                    </div>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[240px]">
                            <SelectValue placeholder="Все статусы" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все статусы</SelectItem>
                             <SelectItem value="critical">Критический</SelectItem>
                            <SelectItem value="warning">Предупреждение</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select defaultValue="all">
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Все подразделения" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Все подразделения</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button size="lg" className="whitespace-nowrap"><Filter className="mr-2 h-4 w-4"/> Показать</Button>
                 </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {anomaliesData.map(anomaly => (
                <Card key={anomaly.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <Badge variant={getStatusVariant(anomaly.status)}>{anomaly.status === 'critical' ? 'Критическая' : 'Предупреждение'}</Badge>
                                <CardTitle className="text-lg mt-2">{anomaly.description}</CardTitle>
                            </div>
                             <div className="text-right">
                                <div className="font-bold text-lg text-destructive">{anomaly.amount}</div>
                                <div className="text-xs text-muted-foreground">Отклонение</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{anomaly.details}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center bg-muted/40 py-3 px-4 rounded-b-lg">
                       <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="flex items-center gap-1"><Calendar className="h-4 w-4"/><span>{anomaly.date}</span></div>
                          <span>|</span>
                          <div className="flex items-center gap-1"><BrainCircuit className="h-4 w-4"/><span>ML Score: <b>{anomaly.score}</b></span></div>
                       </div>
                        <AnomalyAnalysisModal anomaly={anomaly} />
                    </CardFooter>
                </Card>
            ))}
        </div>
    </div>
  );
}
