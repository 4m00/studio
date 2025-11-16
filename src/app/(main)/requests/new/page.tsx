"use client";

import { useState } from "react";
import { Stepper, Step, StepLabel, Button as MuiButton } from "@mui/material";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload, File, DollarSign, AlertCircle, CheckCircle, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

const steps = [
  "Основная информация",
  "Детализация и вложения",
  "Проверка бюджета и согласование",
];

function Step1({ onNext }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">
          Название заявки <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Например, Закупка запчастей для экскаватора"
          defaultValue="Закупка запчастей для экскаватора"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="department">
          Подразделение (ЦФО) <span className="text-destructive">*</span>
        </Label>
        <Select defaultValue="dp1-r3">
          <SelectTrigger>
            <SelectValue placeholder="Выберите подразделение" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dp1-r3">ДП №1 / Рудник №3</SelectItem>
            <SelectItem value="co">Центральный офис</SelectItem>
            <SelectItem value="pz2">Перерабатывающий завод №2</SelectItem>
            <SelectItem value="sl">Служба логистики</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="justification">
          Обоснование <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="justification"
          placeholder="Опишите цель и необходимость расхода"
          rows={4}
          defaultValue="Требуется срочный ремонт экскаватора в связи с выходом из строя гидравлической системы."
        />
      </div>
      <Button onClick={onNext} className="mt-4">Далее</Button>
    </div>
  );
}

function Step2({ onNext, onBack }) {
  return (
    <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="amount">Сумма <span className="text-destructive">*</span></Label>
                <Input id="amount" type="number" placeholder="250000" defaultValue="250000" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="currency">Валюта</Label>
                <Select defaultValue="rub">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rub">RUB</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                    </SelectContent>
                </Select>
            </div>
      </div>
      <div className="space-y-2">
        <Label>Прикрепленные документы</Label>
        <div className="flex items-center justify-center w-full">
            <Label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите для загрузки</span> или перетащите файлы</p>
                    <p className="text-xs text-muted-foreground">PDF, XLSX, DOCX, PNG, JPG (до 10MB)</p>
                </div>
                <Input id="dropzone-file" type="file" className="hidden" multiple />
            </Label>
        </div>
      </div>
       <div className="space-y-2 pt-4">
         <Label>Загруженные файлы</Label>
         <div className="p-4 border rounded-md space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <span className="font-mono text-sm">счет_№123.pdf</span>
                </div>
                <span className="text-sm text-muted-foreground">2.1MB</span>
            </div>
            <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <File className="h-5 w-5 text-muted-foreground" />
                    <span className="font-mono text-sm">спецификация.xlsx</span>
                </div>
                <span className="text-sm text-muted-foreground">850KB</span>
            </div>
         </div>
       </div>
      <div className="flex justify-between mt-4">
        <Button onClick={onBack} variant="outline">Назад</Button>
        <Button onClick={onNext}>Далее</Button>
      </div>
    </div>
  );
}

function Step3({ onBack }) {
  const budget = {
    limit: 500000,
    spent: 180000,
    request: 250000
  };
  const remaining = budget.limit - budget.spent;
  const remainingAfter = remaining - budget.request;
  const isOverBudget = remainingAfter < 0;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center gap-2"><DollarSign className="h-5 w-5"/>Бюджетный контроль</h3>
        <Card className="mt-2">
            <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center"><span>Лимит по статье "Ремонт оборудования"</span> <span className="font-bold">{budget.limit.toLocaleString()} ₽</span></div>
                <div className="flex justify-between items-center"><span>Уже израсходовано</span> <span className="font-bold">{budget.spent.toLocaleString()} ₽</span></div>
                <Separator />
                <div className="flex justify-between items-center font-medium"><span>Доступный остаток</span> <span>{remaining.toLocaleString()} ₽</span></div>
                 <div className="flex justify-between items-center font-medium"><span>Сумма по заявке</span> <span>{budget.request.toLocaleString()} ₽</span></div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold"><span>Остаток после операции</span> <span>{remainingAfter.toLocaleString()} ₽</span></div>
                 {isOverBudget ? (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Превышение бюджета!</AlertTitle>
                        <AlertDescription>
                        Операция превышает доступный лимит по статье на <span className="font-bold">{Math.abs(remainingAfter).toLocaleString()} ₽</span>. Требуется дополнительное согласование.
                        </AlertDescription>
                    </Alert>
                ) : (
                     <Alert variant="success">
                        <CheckCircle className="h-4 w-4" />
                        <AlertTitle>В рамках бюджета</AlertTitle>
                        <AlertDescription>
                        Операция не превышает доступный лимит по статье.
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
      </div>
       <div>
        <h3 className="text-lg font-medium flex items-center gap-2"><Users className="h-5 w-5"/>Маршрут согласования</h3>
        <Card className="mt-2">
             <CardContent className="pt-6">
                <ul className="space-y-4">
                    <li className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-green-100 text-green-700 font-bold">1</div>
                        <div>
                            <p className="font-medium">Иванов И.И.</p>
                            <p className="text-sm text-muted-foreground">Непосредственный руководитель</p>
                        </div>
                    </li>
                     <li className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 font-bold">2</div>
                        <div>
                            <p className="font-medium">Петров П.П.</p>
                            <p className="text-sm text-muted-foreground">Руководитель ЦФО</p>
                        </div>
                    </li>
                     <li className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 font-bold">3</div>
                        <div>
                            <p className="font-medium">Сидоров С.С.</p>
                            <p className="text-sm text-muted-foreground">Финансовый контролер</p>
                        </div>
                    </li>
                </ul>
             </CardContent>
        </Card>
      </div>
      <div className="flex justify-between mt-8">
        <Button onClick={onBack} variant="outline">Назад</Button>
        <Button>Отправить на согласование</Button>
      </div>
    </div>
  );
}


export default function NewRequestPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 onNext={handleNext} />;
      case 1:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Step3 onBack={handleBack} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новая заявка на расход</CardTitle>
        <CardDescription>
          Заполните форму для регистрации и согласования нового расхода.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ marginBottom: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>{getStepContent(activeStep)}</div>
      </CardContent>
    </Card>
  );
}
