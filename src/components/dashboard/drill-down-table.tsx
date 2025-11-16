'use client';
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const data = [
  {
    type: "cfo",
    name: "Перерабатывающий завод №1",
    plan: 500, fact: 580, deviation: 16,
    children: [
        { type: "category", name: "Сырье и материалы", plan: 250, fact: 310, deviation: 24, children: [
            { type: "item", name: "Руда золотоносная", plan: 200, fact: 260, deviation: 30 },
            { type: "item", name: "Хим. реагенты", plan: 50, fact: 50, deviation: 0 },
        ]},
        { type: "category", name: "Ремонт оборудования", plan: 80, fact: 110, deviation: 37.5 },
        { type: "category", name: "Персонал", plan: 150, fact: 140, deviation: -6.7 },
    ]
  },
  {
    type: "cfo",
    name: "Добывающее предприятие №2",
    plan: 800, fact: 880, deviation: 10,
    children: [
        { type: "category", name: "ФОТ", plan: 400, fact: 420, deviation: 5 },
        { type: "category", name: "ГСМ", plan: 150, fact: 180, deviation: 20 },
        { type: "category", name: "Запчасти", plan: 250, fact: 280, deviation: 12 },
    ]
  },
  { type: "cfo", name: "Служба логистики", plan: 120, fact: 135, deviation: 12.5 },
  { type: "cfo", name: "Центральный офис", plan: 200, fact: 180, deviation: -10 },
  { type: "cfo", name: "ИТ-департамент", plan: 80, fact: 75, deviation: -6.25 },
];

const getDeviationColor = (deviation) => {
  if (deviation > 10) return "destructive";
  if (deviation > 0) return "yellow";
  return "success";
};

const DrillDownRow = ({ item, level, isExpanded, onToggle }) => {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <>
      <TableRow className={level === 0 ? "bg-muted/50" : ""}>
        <TableCell style={{ paddingLeft: `${level * 20 + 12}px` }}>
            <div className="flex items-center gap-2">
                 {hasChildren && (
                    <Button variant="ghost" size="icon" onClick={onToggle} className="h-6 w-6">
                        {isExpanded ? <ChevronDown className="h-4 w-4"/> : <ChevronRight className="h-4 w-4"/>}
                    </Button>
                )}
                <span className={level === 0 ? 'font-bold' : 'font-medium'}>{item.name}</span>
            </div>
        </TableCell>
        <TableCell className="text-right font-mono">{item.plan?.toLocaleString()}</TableCell>
        <TableCell className="text-right font-mono">{item.fact?.toLocaleString()}</TableCell>
        <TableCell className="text-right">
            <Badge variant={getDeviationColor(item.deviation)}>{item.deviation?.toFixed(1)}%</Badge>
        </TableCell>
      </TableRow>
      {hasChildren && isExpanded && item.children.map(child => (
        <DrillDownRow key={child.name} item={child} level={level + 1} isExpanded={true} onToggle={() => {}} />
      ))}
    </>
  );
};

export function DrillDownTable() {
  const [expandedRows, setExpandedRows] = React.useState({ [data[0].name]: true, [data[1].name]: true });

  const toggleRow = (name) => {
    setExpandedRows(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <Card>
        <CardHeader>
             <CardTitle>Анализ план/факт с детализацией</CardTitle>
             <CardDescription>Анализ исполнения бюджета по ЦФО и статьям (млн ₽)</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Центр финансовой ответственности / Статья</TableHead>
                    <TableHead className="text-right">План</TableHead>
                    <TableHead className="text-right">Факт</TableHead>
                    <TableHead className="text-right">Отклонение, %</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(item => (
                        <DrillDownRow
                            key={item.name}
                            item={item}
                            level={0}
                            isExpanded={!!expandedRows[item.name]}
                            onToggle={() => toggleRow(item.name)}
                        />
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  );
}
