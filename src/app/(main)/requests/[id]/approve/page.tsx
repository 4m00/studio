"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Check,
  X,
  RotateCcw,
  FileText,
  Download,
  Clock,
  Bot,
} from "lucide-react";
import Link from "next/link";

export default function ApproveRequestPage() {
  const [comment, setComment] = useState("");
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const expenseItems = [
    {
      id: 1,
      category: "Запчасти для оборудования",
      vendor: "ООО ГидроСервис",
      description: "Гидроцилиндр HSG 180/100",
      quantity: 2,
      unit: "шт",
      price: 450000,
      vat: 20,
    },
    {
      id: 2,
      category: "Запчасти для оборудования",
      vendor: "ООО ГидроСервис",
      description: "Комплект уплотнений",
      quantity: 4,
      unit: "к-т",
      price: 85000,
      vat: 20,
    },
    {
      id: 3,
      category: "Логистика",
      vendor: "ООО Транслогистик",
      description: "Срочная доставка",
      quantity: 1,
      unit: "усл",
      price: 180000,
      vat: 20,
    },
  ];

  const calculateItemTotal = (item: typeof expenseItems[0]) => {
    const subtotal = item.quantity * item.price;
    const vatAmount = (subtotal * item.vat) / 100;
    return subtotal + vatAmount;
  };

  const totalAmount = expenseItems.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0
  );
  const totalWithoutVat = expenseItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const totalVat = totalAmount - totalWithoutVat;

  const budgetPlan = 12500000;
  const budgetUsed = 8340000;
  const budgetAfter = budgetUsed + totalAmount;
  const budgetPercent = (budgetUsed / budgetPlan) * 100;
  const budgetPercentAfter = (budgetAfter / budgetPlan) * 100;

  const documents = [
    { id: 1, name: "Коммерческое предложение ГидроСервис.pdf", size: 1400000 },
    { id: 2, name: "Дефектная ведомость экскаватора.pdf", size: 890000 },
    { id: 3, name: "Расчет потерь от простоя.xlsx", size: 145000 },
    { id: 4, name: "Фото повреждения.jpg", size: 2100000 },
  ];

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " Б";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " КБ";
    return (bytes / (1024 * 1024)).toFixed(1) + " МБ";
  };

  return (
    <div className="flex flex-col gap-6">
      <Alert className="bg-warning/10 border-warning">
        <AlertCircle className="h-5 w-5 text-warning" />
        <AlertDescription className="flex items-center justify-between">
          <span className="font-medium">
            Требуется ваше согласование | Заявка REQ-2025-00342 | SLA: осталось
            1 день 4 часа
          </span>
          <div className="flex gap-2">
            <Dialog
              open={isApproveDialogOpen}
              onOpenChange={setIsApproveDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" className="bg-success hover:bg-success/90">
                  <Check className="mr-2 h-4 w-4" />
                  Утвердить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Подтвердите утверждение заявки REQ-2025-00342
                  </DialogTitle>
                  <DialogDescription>
                    После утверждения заявка перейдет на следующий этап
                    согласования
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Сумма:</span>
                      <span className="font-semibold">
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Подразделение:</span>
                      <span className="font-semibold">
                        Добывающее предприятие №2
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="approveComment">
                      Комментарий (опционально)
                    </Label>
                    <Textarea
                      id="approveComment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Ваш комментарий..."
                      rows={3}
                    />
                  </div>
                  <Alert>
                    <AlertDescription className="text-sm">
                      После утверждения заявка перейдет на следующий этап
                      согласования
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsApproveDialogOpen(false)}
                  >
                    Отмена
                  </Button>
                  <Button className="bg-success hover:bg-success/90">
                    Подтвердить утверждение
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              variant="outline"
              className="border-warning text-warning hover:bg-warning/10"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Вернуть на доработку
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
            >
              <X className="mr-2 h-4 w-4" />
              Отклонить
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о заявке</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Номер заявки
                  </div>
                  <div className="font-semibold">REQ-2025-00342</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Статус</div>
                  <Badge className="bg-warning/20 text-warning-foreground border-warning/30">
                    На согласовании у руководителя
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Инициатор
                </div>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://picsum.photos/seed/ivanov/40/40"
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>ИП</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">Иванов Петр Сергеевич</div>
                    <div className="text-sm text-muted-foreground">
                      Начальник участка
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm space-y-1">
                  <div>
                    <span className="text-muted-foreground">
                      Подразделение:{" "}
                    </span>
                    Добывающее предприятие №2 / Рудник №4
                  </div>
                  <div>
                    <span className="text-muted-foreground">Email: </span>
                    ivanov.ps@company.ru
                  </div>
                  <div>
                    <span className="text-muted-foreground">Телефон: </span>
                    +7 (921) 123-45-67
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Дата создания</div>
                <div>14.11.2025 15:30</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="font-semibold mb-2">
                  Закупка запчастей для ремонта экскаватора Komatsu PC-1250
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  Требуется срочный ремонт экскаватора в связи с выходом из
                  строя гидравлической системы. Простой техники приводит к
                  потерям добычи 500 тонн руды в сутки. Плановый ремонт был
                  перенесен из-за задержки поставки оригинальных запчастей.
                  Запрашиваемые позиции - критичные компоненты гидравлики
                  производства Германия.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Позиции расходов</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">№</TableHead>
                    <TableHead>Статья затрат</TableHead>
                    <TableHead>Поставщик</TableHead>
                    <TableHead>Описание</TableHead>
                    <TableHead className="text-right">Кол-во</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                    <TableHead className="text-right">НДС</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="text-sm">{item.category}</TableCell>
                      <TableCell className="text-sm">{item.vendor}</TableCell>
                      <TableCell className="text-sm">
                        {item.description}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity} {item.unit}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(item.quantity * item.price)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          (item.quantity * item.price * item.vat) / 100
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4" />

              <div className="flex justify-end">
                <div className="space-y-2 w-96">
                  <div className="flex justify-between text-sm">
                    <span>Без НДС:</span>
                    <span className="font-semibold">
                      {formatCurrency(totalWithoutVat)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>НДС:</span>
                    <span className="font-semibold">
                      {formatCurrency(totalVat)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>ИТОГО:</span>
                    <span>{formatCurrency(totalAmount)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Приложенные документы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-sm font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatFileSize(doc.size)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Просмотр
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Контроль бюджета</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium mb-1">
                  Центр финансовой ответственности
                </div>
                <div className="text-sm">Добывающее предприятие №2</div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium mb-1">Статья бюджета</div>
                <div className="text-sm">Ремонты основных средств</div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium mb-2">
                  Бюджет на ноябрь 2025
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">План:</span>
                      <span className="font-semibold">
                        {formatCurrency(budgetPlan)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        Использовано:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(budgetUsed)} ({budgetPercent.toFixed(1)}
                        %)
                      </span>
                    </div>
                    <Progress value={budgetPercent} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        После заявки:
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(budgetAfter)} (
                        {budgetPercentAfter.toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={budgetPercentAfter} className="h-2" />
                  </div>
                </div>
              </div>

              <Alert>
                <Check className="h-4 w-4 text-success" />
                <AlertDescription className="text-success font-medium">
                  Лимит не превышен
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                Маршрут согласования
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="w-0.5 h-12 bg-success" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      Создана инициатором
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Иванов П.С.
                    </div>
                    <div className="text-xs text-muted-foreground">
                      14.11.2025 15:30
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center text-white">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="w-0.5 h-12 bg-muted" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      Согласование руководителя
                    </div>
                    <div className="text-xs text-muted-foreground">ВЫ</div>
                    <Badge variant="outline" className="mt-1 text-xs">
                      SLA: до 18.11.2025 18:00
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      3
                    </div>
                    <div className="w-0.5 h-12 bg-muted" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      Бюджетный контроль
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Финансовая служба
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      4
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      Финальное утверждение
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Автоматически
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Похожие заявки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                <p className="text-muted-foreground">
                  За последние 3 месяца от этого подразделения:
                </p>
                <ul className="space-y-1">
                  <li>15 заявок на ремонт техники</li>
                  <li>Средняя сумма: {formatCurrency(980000)}</li>
                  <li>Все утверждены без замечаний</li>
                </ul>
                <Button variant="link" className="p-0 h-auto">
                  Показать историю
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                ML-анализ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Alert>
                  <AlertDescription className="font-medium">
                    Анализ аномалий: Не выявлено
                  </AlertDescription>
                </Alert>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>
                      Цены соответствуют рыночным (отклонение +3.5%)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>
                      Поставщик имеет положительную историю (15 сделок)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                    <span>Сумма типична для данной категории</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
                    <span>
                      Частота заявок от подразделения выше среднего (+18%)
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button className="w-full bg-success hover:bg-success/90">
                <Check className="mr-2 h-4 w-4" />
                Утвердить
              </Button>
              <Button
                variant="outline"
                className="w-full border-warning text-warning hover:bg-warning/10"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Вернуть на доработку
              </Button>
              <Button
                variant="outline"
                className="w-full border-destructive text-destructive hover:bg-destructive/10"
              >
                <X className="mr-2 h-4 w-4" />
                Отклонить
              </Button>
              <Separator className="my-4" />
              <div className="space-y-2">
                <Label htmlFor="comment" className="text-sm">
                  Комментарий (опционально)
                </Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ваш комментарий..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-between border-t pt-4">
        <Link href="/requests">
          <Button variant="outline">← Назад к списку</Button>
        </Link>
      </div>
    </div>
  );
}
