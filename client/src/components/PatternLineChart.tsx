import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

interface PatternLineChartProps {
  data: number[];
}

export function PatternLineChart({ data }: PatternLineChartProps) {
  const chartData = data.map((val, idx) => ({
    index: idx,
    value: val * 100
  }));

  return (
    <div className="w-full h-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[0, 100]} hide />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0038FF" 
            strokeWidth={2} 
            dot={{ fill: '#0038FF', r: 3 }}
            activeDot={{ r: 5, fill: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
