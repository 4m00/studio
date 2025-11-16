import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CostDynamicsChart } from "@/components/dashboard/cost-dynamics-chart";
import { CostStructureChart } from "@/components/dashboard/cost-structure-chart";
import { TopDeviationsWidget } from "@/components/dashboard/top-deviations-widget";
import { RequestStatusFunnel } from "@/components/dashboard/request-status-funnel";

export default function AnalyticsPage() {
  return (
    <div className="grid grid-cols-1 gap-8">
       <Card>
        <CardHeader>
          <CardTitle>Аналитика</CardTitle>
          <CardDescription>
            Углубленный анализ операционных затрат и заявок.
          </CardDescription>
        </CardHeader>
      </Card>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CostDynamicsChart className="lg:col-span-4" />
        <CostStructureChart className="lg:col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TopDeviationsWidget />
        <RequestStatusFunnel />
      </div>
    </div>
  );
}
