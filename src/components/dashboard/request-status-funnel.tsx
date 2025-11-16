import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { requestStatusData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function RequestStatusFunnel() {
  const colors = [
    "bg-primary",
    "bg-primary/80",
    "bg-primary/60",
    "bg-destructive/80",
  ];
  const total = requestStatusData.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статус заявок</CardTitle>
        <CardDescription>Воронка согласования</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-end h-[244px] pt-6">
        <div className="w-full flex flex-col items-center justify-end gap-0.5">
          {requestStatusData.map((status, index) => {
            const widthPercentage = (status.count / requestStatusData[0].count) * 100;
            return (
              <div
                key={status.label}
                className={cn(
                  "h-12 flex items-center justify-center text-white font-semibold rounded-sm text-sm transition-all duration-500",
                  colors[index % colors.length]
                )}
                style={{ width: `${widthPercentage}%` }}
              >
                <div className="flex flex-col items-center">
                    <span>{status.label}</span>
                    <span className="text-xs font-normal">{status.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
