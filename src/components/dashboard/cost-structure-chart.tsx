"use client";

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { costStructureData } from "@/lib/mock-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
  "costs": {
    label: "Затраты",
  },
  "Сырье": {
    label: "Сырье",
    color: "hsl(var(--chart-1))",
  },
  "Персонал": {
    label: "Персонал",
    color: "hsl(var(--chart-2))",
  },
  "Энергия": {
    label: "Энергия",
    color: "hsl(var(--chart-3))",
  },
  "Ремонты": {
    label: "Ремонты",
    color: "hsl(var(--chart-4))",
  },
  "Прочее": {
    label: "Прочее",
    color: "hsl(var(--chart-5))",
  },
};

export function CostStructureChart({ className }: { className?: string }) {
  const totalValue = React.useMemo(() => {
    return costStructureData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className={className}>
      <CardHeader className="items-center pb-0">
        <CardTitle>Структура затрат</CardTitle>
        <CardDescription>По основным категориям</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <ResponsiveContainer>
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={costStructureData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                outerRadius={80}
              >
                {costStructureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                ))}
              </Pie>
               <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                verticalAlign="bottom"
                align="center"
                layout="horizontal"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
