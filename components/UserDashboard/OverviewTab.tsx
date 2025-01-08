import React from 'react';
import
{
  Star,
  Gift,
  TrendingUp,
  Clock,
  FileText,
  CreditCard,
  History,
  Upload,
  Plus,
  LucideIcon
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import
{
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface UserAnalytics
{
  total_analyses: number;
  total_cost: number;
  analyses_by_type: {
    type: string;
    count: number;
    total_cost: number;
  }[];
  free_analysis_available: boolean;
}

interface OverviewProps
{
  creditBalance: {
    current: number;
    nextExpiration: {
      credits: number;
      days: number;
    };
  };
  transactions: Array<{
    id: string;
    type: 'credit' | 'debit';
    title: string;
    date: string;
    credit_amount: number;
    dollar_amount: number;
    description: string;
  }>;
  onNewAnalysis: () => void;
  onBuyCredits: () => void;
  analytics: UserAnalytics;
  activeCoupons?: {
    count: number;
    summary?: string;
  };

  usageData: Array<{
    date: string;
    analyses: number;
    credits: number;
  }>;

  usageMetrics: {
    currentMonth: number;
    trend: number;
  };
}

interface StatCardProps
{
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}



const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, subtitle, trend }) => (
  <Card className="transition-all duration-300 hover:shadow-md hover:border-violet-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-3 px-4">
      <CardTitle className="text-sm font-semibold tracking-wide text-gray-700">
        {title}
      </CardTitle>
      <div className="p-1.5 rounded-lg bg-violet-50">
        <Icon className="h-4 w-4 text-violet-600" />
      </div>
    </CardHeader>

    <CardContent className="px-4 pb-4 space-y-2">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="flex items-center gap-2">
        {trend && (
          <span
            className={`font-medium ${trend.positive
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-rose-600 bg-rose-50'
              } px-1.5 py-0.5 rounded-full text-xs`}
          >
            {trend.value}
          </span>
        )}
        <span className="text-gray-600 text-sm font-medium">{subtitle}</span>
      </div>
    </CardContent>
  </Card>
);

export const OverviewTab: React.FC<OverviewProps> = ({
  creditBalance,
  transactions,
  onNewAnalysis,
  onBuyCredits,
  analytics,
  activeCoupons,
  usageData,
  usageMetrics
}) =>
{
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CreditCard}
          title="Available Credits"
          value={creditBalance.current}
          subtitle="from recent purchase"
          trend={{
            value: `+${creditBalance.nextExpiration.credits}`,
            positive: true
          }}
        />
        <StatCard
          icon={FileText}
          title="Total Analyses"
          value={analytics.total_analyses}
          subtitle={`Total cost: ${analytics.total_cost} credits`}
        />

        <StatCard
          icon={Star}
          title="Active Coupons"
          value={activeCoupons?.count || 0}
          subtitle={activeCoupons?.summary || "No active coupons"}
        />
        <StatCard
          icon={History}
          title="Usage This Month"
          value={usageMetrics.currentMonth}
          subtitle="from last month"
          trend={{
            value: `${usageMetrics.trend > 0 ? '+' : ''}${usageMetrics.trend}`,
            positive: usageMetrics.trend >= 0
          }}
        />
      </div>

      {/* Usage Analytics and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Usage Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
            <CardDescription>Analysis usage and credit consumption trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full" onClick={onNewAnalysis}>
              <Upload className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
            <Button className="w-full" variant="outline" onClick={onBuyCredits}>
              <Plus className="mr-2 h-4 w-4" />
              Buy Credits
            </Button>
            <Button className="w-full" variant="outline">
              <Gift className="mr-2 h-4 w-4" />
              Redeem Coupon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className='h-fit'>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key analysis metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Accuracy Rate</span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-2xl font-bold">98.5%</div>
                <div className="text-xs text-green-600">↑ 2.1% from last month</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Response Time</span>
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="text-2xl font-bold">1.2s</div>
                <div className="text-xs text-green-600">↑ 0.3s faster</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className='h-fit'>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest analysis and account activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 3).map((transaction) => (
                <div key={transaction.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="mr-4">
                    {transaction.type === 'credit' ? (
                      <CreditCard className="h-8 w-8 text-green-500" />
                    ) : (
                      <FileText className="h-8 w-8 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{transaction.title}</h4>
                    <p className="text-sm text-gray-500">{transaction.description}</p>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{transaction.credit_amount} credits
                    </div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};