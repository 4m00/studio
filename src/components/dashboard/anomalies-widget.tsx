import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { anomaliesData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function AnomaliesWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Аномалии за неделю</CardTitle>
        <CardDescription>Автоматически выявленные отклонения</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {anomaliesData.slice(0, 5).map((anomaly) => (
          <div key={anomaly.id} className="flex items-start gap-3">
            <div>
              {anomaly.status === "critical" ? (
                <AlertCircle className="h-5 w-5 text-destructive" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-warning" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{anomaly.description}</p>
              <p className="text-xs text-muted-foreground">{anomaly.date}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
