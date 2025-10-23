import { KpiCard } from '@/components/admin/KpiCard';
import { FunnelChart } from '@/components/admin/FunnelChart';
import { ModeChart } from '@/components/admin/ModeChart';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminKpis } from '@/features/admin/api';
import { Users, CheckCircle, Clock, FileText, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { data: kpis, isLoading } = useAdminKpis();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[400px] rounded-2xl" />
          <Skeleton className="h-[400px] rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!kpis) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">ড্যাশবোর্ড</h2>
        <p className="text-muted-foreground">স্মার্ট টিউটর কানেক্ট সামগ্রিক পরিসংখ্যান</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard
          title="মোট টিউটর"
          value={kpis.totalTutors}
          icon={Users}
        />
        <KpiCard
          title="ভেরিফাইড টিউটর"
          value={kpis.approvedTutors}
          icon={CheckCircle}
        />
        <KpiCard
          title="পেন্ডিং টিউটর"
          value={kpis.pendingTutors}
          icon={Clock}
        />
        <KpiCard
          title="মোট পোস্ট"
          value={kpis.totalPosts}
          icon={FileText}
        />
        <KpiCard
          title="নিয়োগ হার"
          value={`${kpis.hireRate}%`}
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <FunnelChart data={kpis.funnel} />
        <ModeChart data={kpis.modeDist} />
      </div>

      {/* Subject Distribution */}
      <div className="grid gap-4">
        <h3 className="text-xl font-semibold">বিষয় অনুযায়ী টিউটর</h3>
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-5">
          {Object.entries(kpis.subjectDist).map(([subject, count]) => (
            <div
              key={subject}
              className="p-4 rounded-2xl border bg-card hover:shadow-md transition-shadow"
            >
              <div className="text-sm text-muted-foreground">{subject}</div>
              <div className="text-2xl font-bold mt-1">{count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
