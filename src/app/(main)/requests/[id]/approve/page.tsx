import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  File,
  User,
  Calendar,
  DollarSign,
  Building,
  CheckCircle,
  XCircle,
  RotateCw,
  BrainCircuit,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ApprovalTimeline } from "@/components/dashboard/approval-timeline";

const requestDetails = {
  id: "REQ-2025-0812",
  title: "Закупка запчастей для экскаватора",
  initiator: "Петров В.С.",
  department: "ДП №1 / Рудник №3",
  date: "16.11.2025",
  amount: 2450000,
  currency: "RUB",
  status: "На согласовании",
  justification: "Требуется срочный ремонт экскаватора в связи с выходом из строя гидравлической системы. Простой техники ведет к ежедневным убыткам в размере 1.5 млн. рублей.",
  files: [
    { name: "счет_на_оплату_123.pdf", size: "2.1MB" },
    { name: "коммерческое_предложение.pdf", size: "1.5MB" },
    { name: "дефектная_ведомость.xlsx", size: "850KB" },
  ],
};

const budgetInfo = {
    limit: 5000000,
    spent: 1800000,
    request: 2450000,
    get remaining() { return this.limit - this.spent; },
    get remainingAfter() { return this.remaining - this.request; },
    get isOverBudget() { return this.remainingAfter < 0; },
};

const mlAnalysis = {
    score: 8.2,
    isAnomalous: true,
    anomalies: [
        "Сумма заявки на 15% выше средней по данной категории за последние 6 месяцев.",
        "Поставщик 'ООО Техно-Трейд' ранее не использовался данным подразделением.",
        "Закупка в конце квартала, что является частым паттерном для освоения бюджета."
    ],
    recommendation: "Рекомендуется запросить дополнительное коммерческое предложение от альтернативного поставщика и уточнить причины выбора нового контрагента."
}

export default function ApprovalPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Main Request Info */}
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Согласование: {requestDetails.id}</CardTitle>
            <CardDescription>{requestDetails.title}</CardDescription>
            <Badge className="w-fit mt-2" variant={requestDetails.status === 'На согласовании' ? 'yellow' : 'default'}>{requestDetails.status}</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Основная информация</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground"/><span>Инициатор:</span> <span className="font-medium">{requestDetails.initiator}</span></div>
                <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground"/><span>Подразделение:</span> <span className="font-medium">{requestDetails.department}</span></div>
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground"/><span>Дата:</span> <span className="font-medium">{requestDetails.date}</span></div>
                <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 text-muted-foreground"/><span>Сумма:</span> <span className="font-bold text-base">{requestDetails.amount.toLocaleString()} {requestDetails.currency}</span></div>
              </div>
            </div>
            <Separator />
             <div>
              <h3 className="font-semibold mb-2">Обоснование</h3>
              <p className="text-sm bg-muted/50 p-4 rounded-md">{requestDetails.justification}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold mb-2">Приложенные документы ({requestDetails.files.length})</h3>
              <div className="p-4 border rounded-md space-y-3">
                {requestDetails.files.map(file => (
                    <div key={file.name} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-md transition-colors">
                        <div className="flex items-center gap-3">
                            <File className="h-5 w-5 text-muted-foreground" />
                            <a href="#" className="font-mono text-sm underline text-blue-600">{file.name}</a>
                        </div>
                        <span className="text-sm text-muted-foreground">{file.size}</span>
                    </div>
                ))}
              </div>
            </div>
          </CardContent>
           <CardFooter className="flex gap-4 justify-end">
                <Button variant="destructive"><XCircle className="mr-2 h-4 w-4" /> Отклонить</Button>
                <Button variant="outline"><RotateCw className="mr-2 h-4 w-4" /> Вернуть инициатору</Button>
                <Button className="bg-green-600 hover:bg-green-700"><CheckCircle className="mr-2 h-4 w-4" /> Согласовать</Button>
            </CardFooter>
        </Card>

        <Card>
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-6 w-6 text-blue-600"/> ML-анализ и рекомендации</CardTitle>
                <CardDescription>Автоматический анализ заявки на основе исторических данных.</CardDescription>
            </CardHeader>
             <CardContent>
                 {mlAnalysis.isAnomalous ? (
                     <Alert variant="warning">
                         <AlertCircle className="h-4 w-4"/>
                         <AlertTitle>Выявлены аномалии (ML Score: {mlAnalysis.score} / 10)</AlertTitle>
                         <AlertDescription>
                             <ul className="list-disc pl-5 mt-2 space-y-1">
                                 {mlAnalysis.anomalies.map((item, i) => <li key={i}>{item}</li>)}
                             </ul>
                             <Separator className="my-3"/>
                             <p className="font-semibold">Рекомендация: {mlAnalysis.recommendation}</p>
                         </AlertDescription>
                     </Alert>
                 ) : (
                      <Alert variant="success">
                         <TrendingUp className="h-4 w-4" />
                         <AlertTitle>Аномалий не выявлено (ML Score: {mlAnalysis.score} / 10)</AlertTitle>
                         <AlertDescription>
                            Заявка соответствует типичным паттернам расходов для данного подразделения и категории.
                         </AlertDescription>
                     </Alert>
                 )}
             </CardContent>
        </Card>
      </div>

      {/* Right Column - Budget & Approvals */}
      <div className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="h-6 w-6"/> Бюджетный контроль</CardTitle>
                <CardDescription>Статья: Ремонт и обслуживание техники</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
                 <div className="flex justify-between items-center"><span>Лимит на период</span> <span className="font-bold">{budgetInfo.limit.toLocaleString()} ₽</span></div>
                <div className="flex justify-between items-center"><span>Уже израсходовано</span> <span className="font-bold">{budgetInfo.spent.toLocaleString()} ₽</span></div>
                <Separator />
                <div className="flex justify-between items-center font-medium"><span>Доступный остаток</span> <span>{budgetInfo.remaining.toLocaleString()} ₽</span></div>
                 <div className="flex justify-between items-center font-medium"><span>Сумма по заявке</span> <span>{budgetInfo.request.toLocaleString()} ₽</span></div>
                <Separator />
                <div className={`flex justify-between items-center text-lg font-bold ${budgetInfo.isOverBudget ? 'text-destructive' : 'text-success'}`}>
                    <span>Остаток после операции</span> 
                    <span>{budgetInfo.remainingAfter.toLocaleString()} ₽</span>
                </div>
                 {budgetInfo.isOverBudget && (
                    <p className="text-xs text-destructive text-center p-2 bg-destructive/10 rounded-md">Операция превышает доступный лимит!</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>История согласования</CardTitle>
            </CardHeader>
            <CardContent>
                <ApprovalTimeline />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
