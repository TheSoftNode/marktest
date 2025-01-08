import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Transaction } from '@/types/credits';

interface UsageTrendsProps {
  transactions: Transaction[];
}

export const UsageTrendsChart: React.FC<UsageTrendsProps> = ({ transactions }) => {
  // Process transactions into monthly data
  const monthlyData = transactions.reduce((acc: any[], transaction) => {
    const date = new Date(transaction.time_of_use);
    const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
    
    const existingMonth = acc.find(item => item.month === monthYear);
    if (existingMonth) {
      if (transaction.transaction_type === 'usage') {
        existingMonth.credits += transaction.amount;
        existingMonth.analyses += 1;
      }
    } else {
      acc.push({
        month: monthYear,
        credits: transaction.transaction_type === 'usage' ? transaction.amount : 0,
        analyses: transaction.transaction_type === 'usage' ? 1 : 0
      });
    }
    return acc;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage Trends</CardTitle>
        <CardDescription>Analysis and credit usage over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              {/* Keep existing chart configuration */}
              <defs>
                <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="analyses"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorAnalyses)"
                name="Analyses"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="credits"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorCredits)"
                name="Credits Used"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};