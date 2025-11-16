"use client";

import * as React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { costStructureData } from "@/lib/mock-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
  costs: {
    label: "Затраты",
  },
  Сырье: {
    label: "Сырье",
    color: "hsl(var(--chart-1))",
  },
  Персонал: {
    label: "Персонал",
    color: "hsl(var(--chart-2))",
  },
  Энергия: {
    label: "Энергия",
    color: "hsl(var(--chart-3))",
  },
  Ремонты: {
    label: "Ремонты",
    color: "hsl(var(--chart-4))",
  },
  Прочее: {
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
      <CardHeader>
        <CardTitle>Структура затрат</CardTitle>
        <CardDescription>По основным категориям</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
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
                innerRadius={80}
                strokeWidth={5}
              >
                {costStructureData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartConfig[entry.name as keyof typeof chartConfig]?.color} />
                ))}
              </Pie>
               <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                verticalAlign="middle"
                align="right"
                layout="vertical"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
