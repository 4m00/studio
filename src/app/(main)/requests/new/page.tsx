"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Plus,
  Trash2,
  Upload,
  X,
  FileText,
  Save,
  Send,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface ExpenseItem {
  id: string;
  category: string;
  vendor: string;
  description: string;
  quantity: number;
  unit: string;
  price: number;
  vat: number;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

const steps = [
  { id: 1, name: "Общая информация", completed: false },
  { id: 2, name: "Позиции расходов", completed: false },
  { id: 3, name: "Документы", completed: false },
  { id: 4, name: "Согласование", completed: false },
];

export default function NewRequestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [expenseItems, setExpenseItems] = useState<ExpenseItem[]>([
    {
      id: "1",
      category: "Запчасти и комплектующие",
      vendor: "ООО Промтех",
      description: "Подшипник SKF 6218",
      quantity: 10,
      unit: "шт",
      price: 45000,
      vat: 20,
    },
  ]);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: "1", name: "Коммерческое предложение.pdf", size: 1200000, type: "pdf" },
    { id: "2", name: "Спецификация.xlsx", size: 856000, type: "xlsx" },
  ]);

  const calculateTotal = () => {
    return expenseItems.reduce((sum, item) => {
      const itemTotal = item.quantity * item.price;
      return sum + itemTotal + (itemTotal * item.vat) / 100;
    }, 0);
  };

  const calculateTotalWithoutVat = () => {
    return expenseItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };

  const calculateTotalVat = () => {
    return calculateTotal() - calculateTotalWithoutVat();
  };

  const addExpenseItem = () => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      category: "",
      vendor: "",
      description: "",
      quantity: 1,
      unit: "шт",
      price: 0,
      vat: 20,
    };
    setExpenseItems([...expenseItems, newItem]);
  };

  const removeExpenseItem = (id: string) => {
    setExpenseItems(expenseItems.filter((item) => item.id !== id));
  };

  const removeFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((file) => file.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ";
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const budgetLimit = 100000000;
  const budgetUsed = 78500000;
  const budgetAfter = budgetUsed + calculateTotal();
  const budgetPercent = (budgetAfter / budgetLimit) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <Link href="/requests">
              <Button variant="ghost" size="sm">
                ← Назад
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Новая заявка на расход</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Автосохранение: 2 минуты назад
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Сохранить как черновик
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Отправить на согласование
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > step.id
                    ? "bg-success text-white"
                    : currentStep === step.id
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? "✓" : step.id}
              </div>
              <span
                className={`text-xs mt-1 ${
                  currentStep === step.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 ${
                  currentStep > step.id ? "bg-success" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Общая информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="requestId">Номер заявки</Label>
                    <Input
                      id="requestId"
                      value="REQ-2025-00456"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">
                      Валюта <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="RUB">
                      <SelectTrigger id="currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RUB">RUB ₽</SelectItem>
                        <SelectItem value="USD">USD $</SelectItem>
                        <SelectItem value="EUR">EUR €</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">
                    Название заявки <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="Закупка оборудования..."
                    defaultValue="Закупка запчастей для экскаватора"
                  />
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">
                      Подразделение <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="dp2">
                      <SelectTrigger id="department">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dp1">
                          Добывающее предприятие №1
                        </SelectItem>
                        <SelectItem value="dp2">
                          Добывающее предприятие №2
                        </SelectItem>
                        <SelectItem value="pz1">
                          Перерабатывающий завод №1
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">Проект</Label>
                    <Select>
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Выберите проект" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mod2025">
                          Проект модернизации 2025
                        </SelectItem>
                        <SelectItem value="exp2025">
                          Проект расширения 2025
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="period">
                      Период <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="nov2025">
                      <SelectTrigger id="period">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nov2025">Ноябрь 2025</SelectItem>
                        <SelectItem value="dec2025">Декабрь 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Позиции расходов</CardTitle>
                <Button onClick={addExpenseItem} size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить позицию
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {expenseItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-4 border rounded-lg space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          Позиция #{index + 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExpenseItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>
                            Статья затрат{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Select defaultValue={item.category}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Запчасти и комплектующие">
                                Запчасти и комплектующие
                              </SelectItem>
                              <SelectItem value="Услуги подрядчиков">
                                Услуги подрядчиков
                              </SelectItem>
                              <SelectItem value="Логистика">
                                Логистика
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>
                            Поставщик{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            defaultValue={item.vendor}
                            placeholder="ООО Промтех"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>
                          Описание <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          defaultValue={item.description}
                          placeholder="Подшипник SKF 6218"
                        />
                      </div>

                      <div className="grid grid-cols-5 gap-4">
                        <div className="space-y-2">
                          <Label>
                            Кол-во <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            defaultValue={item.quantity}
                            min="1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>
                            Ед.изм <span className="text-destructive">*</span>
                          </Label>
                          <Select defaultValue={item.unit}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="шт">шт</SelectItem>
                              <SelectItem value="кг">кг</SelectItem>
                              <SelectItem value="м">м</SelectItem>
                              <SelectItem value="л">л</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>
                            Цена <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            type="number"
                            defaultValue={item.price}
                            min="0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Сумма</Label>
                          <Input
                            value={formatCurrency(item.quantity * item.price)}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>НДС {item.vat}%</Label>
                          <Input
                            value={formatCurrency(
                              (item.quantity * item.price * item.vat) / 100
                            )}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="flex justify-end">
                  <div className="space-y-2 w-80">
                    <div className="flex justify-between text-sm">
                      <span>Итого без НДС:</span>
                      <span className="font-semibold">
                        {formatCurrency(calculateTotalWithoutVat())}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>НДС:</span>
                      <span className="font-semibold">
                        {formatCurrency(calculateTotalVat())}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-base font-bold">
                      <span>ИТОГО:</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Документы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-1">
                    Перетащите файлы или нажмите для выбора
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, XLSX, JPG, PNG (до 10 МБ)
                  </p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Загруженные файлы</Label>
                    {uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Просмотр
                          </Button>
                          <Button variant="ghost" size="sm">
                            Скачать
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Маршрут согласования</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white">
                        ✓
                      </div>
                      <div className="w-0.5 h-16 bg-success" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="font-medium">Создана инициатором</div>
                      <div className="text-sm text-muted-foreground">
                        Иванов П.С.
                      </div>
                      <div className="text-xs text-muted-foreground">
                        14.11.2025 15:30
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                        2
                      </div>
                      <div className="w-0.5 h-16 bg-muted" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="font-medium">
                        Согласование руководителя
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Петров И.И.
                      </div>
                      <Badge variant="outline" className="mt-1">
                        SLA: 2 рабочих дня
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        3
                      </div>
                      <div className="w-0.5 h-16 bg-muted" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="font-medium">Бюджетный контроль</div>
                      <div className="text-sm text-muted-foreground">
                        Финансовая служба
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Если сумма {">"} 100,000 ₽
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                        4
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">Финальное утверждение</div>
                      <div className="text-sm text-muted-foreground">
                        Автоматически
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Бюджетный контроль
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">
                  Лимит бюджета ЦФО
                </div>
                <Progress value={budgetPercent} className="h-2" />
                <div className="text-xs text-muted-foreground mt-1">
                  Использовано {formatCurrency(budgetUsed)} из{" "}
                  {formatCurrency(budgetLimit)}
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-sm font-medium mb-1">
                  После этой заявки
                </div>
                <div className="text-lg font-bold">
                  {formatCurrency(budgetAfter)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {budgetPercent.toFixed(1)}% от лимита
                </div>
              </div>
              <Alert>
                <AlertDescription>
                  {budgetPercent > 100 ? (
                    <span className="text-destructive font-medium">
                      Требуется согласование CFO
                    </span>
                  ) : (
                    <span className="text-success font-medium">
                      В пределах лимита
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-xs text-muted-foreground space-y-1">
                <p>
                  <span className="text-destructive">*</span> - обязательные
                  поля
                </p>
                <p>Все изменения автоматически сохраняются</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between border-t pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Назад
        </Button>
        <Button
          onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
          disabled={currentStep === 4}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
