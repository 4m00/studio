import { KpiCard } from "@/components/dashboard/kpi-card";
import { kpiData } from "@/lib/mock-data";
import { CostDynamicsChart } from "@/components/dashboard/cost-dynamics-chart";
import { CostStructureChart } from "@/components/dashboard/cost-structure-chart";
import { TopDeviationsWidget } from "@/components/dashboard/top-deviations-widget";
import { RequestStatusFunnel } from "@/components/dashboard/request-status-funnel";
import { AnomaliesWidget } from "@/components/dashboard/anomalies-widget";
import { RecentRequestsTable } from "@/components/dashboard/recent-requests-table";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} {...kpi} />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <CostDynamicsChart className="lg:col-span-4" />
        <CostStructureChart className="lg:col-span-3" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TopDeviationsWidget />
        <RequestStatusFunnel />
        <AnomaliesWidget />
      </div>
      <div>
        <RecentRequestsTable />
      </div>
    </div>
  );
}
