"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3,
  LineChart,
  PieChart,
  Calendar,
  Filter,
  Table2,
  Gauge,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Save,
  Eye,
  Settings,
  Trash2,
  Copy,
  Plus,
  GripVertical,
  Download,
} from "lucide-react";
import Link from "next/link";

interface Widget {
  id: string;
  type: string;
  title: string;
  position: { row: number; col: number; width: number; height: number };
}

const componentCategories = [
  {
    id: "charts",
    name: "Графики",
    open: true,
    items: [
      { id: "bar", icon: BarChart3, name: "Столбчатая диаграмма" },
      { id: "line", icon: LineChart, name: "Линейный график" },
      { id: "pie", icon: PieChart, name: "Круговая диаграмма" },
      { id: "area", icon: TrendingUp, name: "Area chart" },
      { id: "gauge", icon: Gauge, name: "Gauge (индикатор)" },
    ],
  },
  {
    id: "tables",
    name: "Таблицы",
    open: true,
    items: [
      { id: "table", icon: Table2, name: "Простая таблица" },
      { id: "pivot", icon: Table2, name: "Pivot table" },
    ],
  },
  {
    id: "filters",
    name: "Фильтры",
    open: false,
    items: [
      { id: "date", icon: Calendar, name: "Date picker" },
      { id: "dropdown", icon: Filter, name: "Dropdown" },
    ],
  },
];

export default function ReportBuilderPage() {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "1",
      type: "bar",
      title: "Затраты по месяцам",
      position: { row: 0, col: 0, width: 8, height: 4 },
    },
    {
      id: "2",
      type: "pie",
      title: "Структура затрат",
      position: { row: 0, col: 8, width: 4, height: 4 },
    },
  ]);
  const [selectedWidget, setSelectedWidget] = useState<string | null>("1");

  const addWidget = (type: string) => {
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: "Новый виджет",
      position: { row: widgets.length, col: 0, width: 6, height: 3 },
    };
    setWidgets([...widgets, newWidget]);
    setSelectedWidget(newWidget.id);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
    if (selectedWidget === id) {
      setSelectedWidget(null);
    }
  };

  const duplicateWidget = (id: string) => {
    const widget = widgets.find((w) => w.id === id);
    if (widget) {
      const newWidget = {
        ...widget,
        id: Date.now().toString(),
        position: { ...widget.position, row: widget.position.row + 1 },
      };
      setWidgets([...widgets, newWidget]);
    }
  };

  const getWidgetIcon = (type: string) => {
    const component = componentCategories
      .flatMap((c) => c.items)
      .find((i) => i.id === type);
    return component?.icon || BarChart3;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/reports">
            <Button variant="ghost" size="sm">
              ← Назад
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Конструктор отчетов</h1>
            <p className="text-sm text-muted-foreground">
              Создайте свой кастомный дашборд
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Сохранить
          </Button>
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Предпросмотр
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <Card className="col-span-2 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Компоненты</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-2 min-h-0">
            <ScrollArea className="h-full">
              <div className="space-y-2 pr-4">
                {componentCategories.map((category) => (
                  <Collapsible key={category.id} defaultOpen={category.open}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted rounded-md transition-colors">
                      <span className="font-medium text-sm">
                        {category.name}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-1 space-y-1">
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => addWidget(item.id)}
                          className="w-full flex items-center gap-2 p-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          <span>{item.name}</span>
                        </button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="col-span-7 flex flex-col gap-4 min-h-0">
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Input
                  placeholder="Название дашборда..."
                  defaultValue="Мой кастомный дашборд"
                  className="max-w-md"
                />
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4 min-h-0">
              <ScrollArea className="h-full">
                <div className="space-y-4 pb-4">
                  {widgets.length === 0 ? (
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                      <Plus className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Добавьте компоненты из левой панели
                      </p>
                    </div>
                  ) : (
                    widgets.map((widget) => {
                      const Icon = getWidgetIcon(widget.type);
                      const isSelected = selectedWidget === widget.id;
                      return (
                        <div
                          key={widget.id}
                          onClick={() => setSelectedWidget(widget.id)}
                          className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                            isSelected
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                              <Icon className="h-5 w-5 text-primary" />
                              <span className="font-medium">{widget.title}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  duplicateWidget(widget.id);
                                }}
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeWidget(widget.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          <div
                            className={`bg-muted rounded-md flex items-center justify-center text-muted-foreground ${
                              widget.position.height > 3 ? "h-64" : "h-32"
                            }`}
                          >
                            <div className="text-center">
                              <Icon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <span className="text-sm">
                                Настройте источник данных
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card className="col-span-3 flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Свойства компонента</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            {selectedWidget ? (
              <ScrollArea className="h-full">
                <div className="space-y-4 pr-4">
                  <Tabs defaultValue="data">
                    <TabsList className="w-full">
                      <TabsTrigger value="data" className="flex-1">
                        Данные
                      </TabsTrigger>
                      <TabsTrigger value="style" className="flex-1">
                        Стиль
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="data" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Источник данных</Label>
                        <Select defaultValue="costs">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="costs">
                              Операционные затраты
                            </SelectItem>
                            <SelectItem value="budgets">
                              Бюджеты и лимиты
                            </SelectItem>
                            <SelectItem value="requests">
                              Заявки на расходы
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Метрика (Y-axis)</Label>
                        <Select defaultValue="amount">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amount">Сумма затрат</SelectItem>
                            <SelectItem value="count">Количество</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Категория (X-axis)</Label>
                        <Select defaultValue="month">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="month">Месяц</SelectItem>
                            <SelectItem value="department">
                              Подразделение
                            </SelectItem>
                            <SelectItem value="category">Категория</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Глобальные фильтры</Label>
                          <input type="checkbox" defaultChecked />
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="mr-2 h-4 w-4" />
                          Добавить фильтр
                        </Button>
                      </div>

                      <Separator />

                      <Button className="w-full">Обновить данные</Button>
                    </TabsContent>

                    <TabsContent value="style" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Заголовок</Label>
                        <Input
                          defaultValue={
                            widgets.find((w) => w.id === selectedWidget)
                              ?.title || ""
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Тип графика</Label>
                        <Select defaultValue="bar">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bar">Столбчатая</SelectItem>
                            <SelectItem value="line">Линейная</SelectItem>
                            <SelectItem value="area">Область</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Цветовая схема</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {["blue", "green", "red", "purple", "orange"].map(
                            (color) => (
                              <button
                                key={color}
                                className={`h-8 rounded-md border-2 border-muted hover:border-primary transition-colors bg-${color}-500`}
                              />
                            )
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Показать легенду</Label>
                          <input type="checkbox" defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Показать метки</Label>
                          <input type="checkbox" defaultChecked />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Высота (px)</Label>
                        <Input type="number" defaultValue={300} min={200} />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <div>
                  <Settings className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Выберите компонент для настройки</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
