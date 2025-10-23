import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ModeChartProps {
  data: { mode: string; count: number }[];
}

const COLORS = ['#10B981', '#3B82F6', '#F59E0B'];

export function ModeChart({ data }: ModeChartProps) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>পদ্ধতি বিতরণ</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ mode, count }) => `${mode}: ${count}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
