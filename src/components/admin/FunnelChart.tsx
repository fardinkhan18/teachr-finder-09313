import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FunnelChartProps {
  data: { stage: string; value: number }[];
}

const stageLabels = {
  views: 'ভিউ',
  applies: 'আবেদন',
  shortlists: 'শর্টলিস্ট',
  hires: 'নিয়োগ',
};

export function FunnelChart({ data }: FunnelChartProps) {
  const chartData = data.map(d => ({
    ...d,
    stage: stageLabels[d.stage as keyof typeof stageLabels] || d.stage,
  }));

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>আবেদন ফানেল</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="stage" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
