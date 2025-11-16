"use client";

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { costDynamicsData } from "@/lib/mock-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartConfig = {
  fact: {
    label: "Факт",
    color: "hsl(var(--chart-1))",
  },
  plan: {
    label: "План",
    color: "hsl(var(--chart-2))",
  },
};

export function CostDynamicsChart({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Динамика затрат по месяцам</CardTitle>
        <CardDescription>За 12 месяцев с линией плана</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer>
            <BarChart data={costDynamicsData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickFormatter={(value) => `${value} млрд ₽`} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="fact" fill="var(--color-fact)" radius={4} />
              <Bar dataKey="plan" fill="var(--color-plan)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
