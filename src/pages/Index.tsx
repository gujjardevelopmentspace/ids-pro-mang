import { DashboardLayout } from "@/components/DashboardLayout";
import { 
  MetricCard, 
  PieChartIcon, 
  TrendUpIcon, 
  BarsIcon,
  CalendarPlusIcon,
  CalendarCheckIcon,
  CalendarMinusIcon
} from "@/components/MetricCard";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-12">
        {/* Work Order - All Over */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            WORK ORDER <span className="font-normal text-muted-foreground">(ALL OVER)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={<PieChartIcon />}
              value="0"
              label="Total Work Order Amount"
              color="cyan"
            />
            <MetricCard
              icon={<TrendUpIcon />}
              value="0"
              label="Approved Amount"
              color="green"
            />
            <MetricCard
              icon={<BarsIcon />}
              value="0"
              label="Under Process Amount"
              color="coral"
            />
          </div>
        </section>

        {/* Inspection Requests */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            INSPECTION REQUESTS <span className="font-normal text-muted-foreground">(ALL OVER)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={<PieChartIcon />}
              value="0"
              label="Total Inspection Requests"
              color="cyan"
            />
            <MetricCard
              icon={<TrendUpIcon />}
              value="0"
              label="Approved Requests"
              color="green"
            />
            <MetricCard
              icon={<BarsIcon />}
              value="0"
              label="Pending Requests"
              color="coral"
            />
          </div>
        </section>

        {/* Work Order - October 2025 */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            WORK ORDER <span className="font-normal text-muted-foreground">(OCTOBER 2025)</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard
              icon={<CalendarPlusIcon />}
              value="0"
              label="Total Work Order Amount"
              color="cyan"
            />
            <MetricCard
              icon={<CalendarCheckIcon />}
              value="0"
              label="Approved Amount"
              color="green"
            />
            <MetricCard
              icon={<CalendarMinusIcon />}
              value="0"
              label="Under Process Amount"
              color="coral"
            />
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Index;
