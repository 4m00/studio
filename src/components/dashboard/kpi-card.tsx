import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Kpi } from "@/lib/types";
import { ArrowDown, ArrowUp, TrendingUp, AlertCircle } from "lucide-react";

export function KpiCard({ title, value, change, changeType, status }: Kpi) {
  const statusClasses = {
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    neutral: "text-muted-foreground",
  };
  
  const Icon = status === 'destructive' ? AlertCircle : changeType === 'increase' ? ArrowUp : ArrowDown;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4", statusClasses[status])} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== 0 && (
          <p className={cn("text-xs flex items-center gap-1", statusClasses[status])}>
            {change > 0 ? `+${change}` : change}% к прошлому месяцу
          </p>
        )}
      </CardContent>
    </Card>
  );
}
