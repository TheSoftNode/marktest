// import React, { useState } from 'react';
// import
//   {
//     BarChart as BarChartIcon,
//     PieChart as PieChartIcon,
//     Calendar,
//     TrendingUp,
//     Download,
//     Filter,
//     LucideIcon
//   } from 'lucide-react';
// import
//   {
//     AreaChart, Area, XAxis, YAxis, CartesianGrid,
//     Tooltip, ResponsiveContainer, BarChart, Bar,
//     PieChart, Pie, Cell, Legend
//   } from 'recharts';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import
//   {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select";

// // Constants
// const COLORS: string[] = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

// // Interfaces
// interface StatCardProps
// {
//   icon: LucideIcon;
//   title: string;
//   value: string;
//   change: string;
//   isPositive: boolean;
// }

// interface ChartDataPoint
// {
//   month: string;
//   analyses: number;
//   credits: number;
// }

// interface DocumentType
// {
//   name: string;
//   value: number;
// }

// interface SubjectArea
// {
//   name: string;
//   value: number;
// }

// interface InsightCard
// {
//   title: string;
//   description: string;
//   bgColor: string;
//   textColor: string;
//   titleColor: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ icon: Icon, title, value, change, isPositive }) => (
//   <Card>
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//       <CardTitle className="text-sm font-medium">
//         {title}
//       </CardTitle>
//       <Icon className="h-4 w-4 text-indigo-600" />
//     </CardHeader>
//     <CardContent>
//       <div className="text-2xl font-bold">{value}</div>
//       <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
//         {isPositive ? '↑' : '↓'} {change} from last period
//       </p>
//     </CardContent>
//   </Card>
// );

// export const UsageAnalyticsTab: React.FC = () =>
// {
//   const [timeRange, setTimeRange] = useState<string>('month');

//   // Mock data for charts
//   const usageData: ChartDataPoint[] = [
//     { month: 'Jan', analyses: 45, credits: 225 },
//     { month: 'Feb', analyses: 52, credits: 260 },
//     { month: 'Mar', analyses: 48, credits: 240 },
//     { month: 'Apr', analyses: 70, credits: 350 },
//     { month: 'May', analyses: 65, credits: 325 },
//     { month: 'Jun', analyses: 85, credits: 425 },
//   ];

//   const documentTypes: DocumentType[] = [
//     { name: 'Assignments', value: 45 },
//     { name: 'Research Papers', value: 25 },
//     { name: 'Essays', value: 15 },
//     { name: 'Reports', value: 10 },
//     { name: 'Others', value: 5 },
//   ];

//   const subjectAreas: SubjectArea[] = [
//     { name: 'Computer Science', value: 35 },
//     { name: 'Engineering', value: 25 },
//     { name: 'Business', value: 20 },
//     { name: 'Sciences', value: 15 },
//     { name: 'Humanities', value: 5 },
//   ];

//   const insights: InsightCard[] = [
//     {
//       title: 'Peak Usage Times',
//       description: 'Your most active analysis times are between 2 PM and 6 PM on weekdays.',
//       bgColor: 'bg-blue-50',
//       textColor: 'text-blue-700',
//       titleColor: 'text-blue-900'
//     },
//     {
//       title: 'Credit Efficiency',
//       description: 'Your average credit usage per analysis has improved by 15% compared to last month.',
//       bgColor: 'bg-green-50',
//       textColor: 'text-green-700',
//       titleColor: 'text-green-900'
//     },
//     {
//       title: 'Popular Features',
//       description: 'Plagiarism detection and grammar checking are your most frequently used features.',
//       bgColor: 'bg-purple-50',
//       textColor: 'text-purple-700',
//       titleColor: 'text-purple-900'
//     }
//   ];

//   const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>): void =>
//   {
//     setTimeRange(event.target.value);
//   };

//   return (
//     <div className="space-y-6">
//       {/* Time Range Filter */}
//       <div className="flex justify-between flex-wrap gap-y-3 items-center">
//         <div className="flex items-center space-x-2">
//           <Filter className="h-4 w-4" />
//           <span className="font-medium">Time Range:</span>
//           <Select
//             value={timeRange}
//             onValueChange={(value: string) => setTimeRange(value)}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="week">Last Week</SelectItem>
//               <SelectItem value="month">Last Month</SelectItem>
//               <SelectItem value="quarter">Last Quarter</SelectItem>
//               <SelectItem value="year">Last Year</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button variant="outline" size="sm">
//           <Download className="h-4 w-4 mr-2" />
//           Export Report
//         </Button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           icon={BarChartIcon}
//           title="Total Analyses"
//           value="365"
//           change="12%"
//           isPositive={true}
//         />
//         <StatCard
//           icon={TrendingUp}
//           title="Credits Used"
//           value="1,825"
//           change="8%"
//           isPositive={true}
//         />
//         <StatCard
//           icon={Calendar}
//           title="Avg. Daily Usage"
//           value="12"
//           change="5%"
//           isPositive={false}
//         />
//         <StatCard
//           icon={PieChartIcon}
//           title="Completion Rate"
//           value="98%"
//           change="2%"
//           isPositive={true}
//         />
//       </div>

//       {/* Usage Trends Chart */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Usage Trends</CardTitle>
//           <CardDescription>Analysis and credit usage over time</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={usageData}>
//                 <defs>
//                   <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                   </linearGradient>
//                   <linearGradient id="colorCredits" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis yAxisId="left" />
//                 <YAxis yAxisId="right" orientation="right" />
//                 <Tooltip />
//                 <Legend />
//                 <Area
//                   yAxisId="left"
//                   type="monotone"
//                   dataKey="analyses"
//                   stroke="#6366f1"
//                   fillOpacity={1}
//                   fill="url(#colorAnalyses)"
//                   name="Analyses"
//                 />
//                 <Area
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="credits"
//                   stroke="#8b5cf6"
//                   fillOpacity={1}
//                   fill="url(#colorCredits)"
//                   name="Credits Used"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Document Types and Subject Areas */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Document Types</CardTitle>
//             <CardDescription>Distribution of analyzed document types</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={documentTypes}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }: { name: string; percent: number }) =>
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                   >
//                     {documentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Subject Areas</CardTitle>
//             <CardDescription>Distribution of subject areas analyzed</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={subjectAreas}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#6366f1">
//                     {subjectAreas.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Usage Insights */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Usage Insights</CardTitle>
//           <CardDescription>Key metrics and patterns from your usage</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {insights.map((insight, index) => (
//               <div key={index} className={`p-4 ${insight.bgColor} rounded-lg`}>
//                 <h4 className={`font-medium ${insight.titleColor} mb-2`}>{insight.title}</h4>
//                 <p className={insight.textColor}>{insight.description}</p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };


// import React, { useState, useMemo } from 'react';
// import { 
//   BarChartIcon, 
//   PieChartIcon,
//   Calendar,
//   TrendingUp,
//   Download,
//   Filter
// } from 'lucide-react';
// import {
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, 
//   Tooltip, ResponsiveContainer, BarChart, Bar,
//   PieChart, Pie, Cell, Legend
// } from 'recharts';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { 
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { StatCard } from './Usage/StatCard';
// import { UsageTrendsChart } from './Usage/UsageTrendsChart';
// import { useGetBalanceQuery, useGetCreditUsageQuery, useGetTransactionHistoryQuery } from '@/src/redux/features/dashboard/creditsApi';
// import type { Transaction, Usage } from '@/types/credits';

// const COLORS: string[] = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

// const insights = [
//   {
//     title: 'Peak Usage Times',
//     description: 'Your most active analysis times are between 2 PM and 6 PM on weekdays.',
//     bgColor: 'bg-blue-50',
//     textColor: 'text-blue-700',
//     titleColor: 'text-blue-900'
//   },
//   {
//     title: 'Credit Efficiency',
//     description: 'Your average credit usage per analysis has improved by 15% compared to last month.',
//     bgColor: 'bg-green-50',
//     textColor: 'text-green-700',
//     titleColor: 'text-green-900'
//   },
//   {
//     title: 'Popular Features',
//     description: 'Plagiarism detection and grammar checking are your most frequently used features.',
//     bgColor: 'bg-purple-50',
//     textColor: 'text-purple-700',
//     titleColor: 'text-purple-900'
//   }
// ];

// const calculateDateRange = (dateFrom: Date, range: string): Date => {
//   const date = new Date(dateFrom);
//   switch (range) {
//     case 'week':
//       date.setDate(date.getDate() - 7);
//       break;
//     case 'month':
//       date.setMonth(date.getMonth() - 1);
//       break;
//     case 'quarter':
//       date.setMonth(date.getMonth() - 3);
//       break;
//     case 'year':
//       date.setFullYear(date.getFullYear() - 1);
//       break;
//     default:
//       date.setMonth(date.getMonth() - 1);
//   }
//   return date;
// };

// export const UsageAnalyticsTab: React.FC = () => {
//   const [timeRange, setTimeRange] = useState<string>('month');
  
//   const dateRange = useMemo(() => {
//     const end = new Date();
//     const start = calculateDateRange(end, timeRange);
//     return {
//       start_date: start.toISOString(),
//       end_date: end.toISOString()
//     };
//   }, [timeRange]);

//   const { data: creditUsage, isLoading: isLoadingUsage } = useGetCreditUsageQuery();
//   const { data: balance, isLoading: isLoadingBalance } = useGetBalanceQuery();
//   const { data: transactions, isLoading: isLoadingTransactions } = useGetTransactionHistoryQuery(dateRange);

//   const stats = useMemo(() => {
//     if (!creditUsage?.usage_history || !transactions) return null;

//     const currentStart = new Date(dateRange.start_date);
//     const previousStart = calculateDateRange(currentStart, timeRange);

//     // Current period usage
//     const currentUsages = creditUsage.usage_history.filter(usage => 
//       new Date(usage.time_of_use) >= currentStart
//     );

//     const analyses = currentUsages.length;
//     const totalCredits = currentUsages.reduce((sum, usage) => sum + usage.credit_usage, 0);

//     // Previous period usage
//     const previousUsages = creditUsage.usage_history.filter(usage => {
//       const usageDate = new Date(usage.time_of_use);
//       return usageDate >= previousStart && usageDate < currentStart;
//     });

//     const prevAnalyses = previousUsages.length;
//     const prevCredits = previousUsages.reduce((sum, usage) => sum + usage.credit_usage, 0);

//     const avgDaily = Math.round(analyses / (timeRange === 'week' ? 7 : 30));
//     const prevAvgDaily = Math.round(prevAnalyses / (timeRange === 'week' ? 7 : 30));

//     // Calculate percentage changes
//     const calculateChange = (current: number, previous: number): string => {
//       if (!previous) return '0';
//       return ((current - previous) / previous * 100).toFixed(1);
//     };

//     return {
//       analyses,
//       totalCredits,
//       avgDaily,
//       analysesChange: calculateChange(analyses, prevAnalyses),
//       creditsChange: calculateChange(totalCredits, prevCredits),
//       avgDailyChange: calculateChange(avgDaily, prevAvgDaily)
//     };
//   }, [creditUsage?.usage_history, dateRange, timeRange]);

//   // Calculate document types and subject areas from usage history
//   const { documentTypes, subjectAreas } = useMemo(() => {
//     if (!creditUsage?.usage_history) return { documentTypes: [], subjectAreas: [] };

//     const docTypes = {
//       'Assignments': 0,
//       'Research Papers': 0,
//       'Essays': 0,
//       'Reports': 0,
//       'Others': 0
//     };

//     const subjects = {
//       'Computer Science': 0,
//       'Engineering': 0,
//       'Business': 0,
//       'Sciences': 0,
//       'Humanities': 0
//     };

//     creditUsage.usage_history.forEach(usage => {
//       // Increment counters based on usage data
//       docTypes['Assignments']++;
//       subjects['Computer Science']++;
//     });

//     return {
//       documentTypes: Object.entries(docTypes).map(([name, value]) => ({ name, value })),
//       subjectAreas: Object.entries(subjects).map(([name, value]) => ({ name, value }))
//     };
//   }, [creditUsage?.usage_history]);

//   if (isLoadingUsage || isLoadingBalance || isLoadingTransactions || !stats) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between flex-wrap gap-y-3 items-center">
//         <div className="flex items-center space-x-2">
//           <Filter className="h-4 w-4" />
//           <span className="font-medium">Time Range:</span>
//           <Select
//             value={timeRange}
//             onValueChange={(value: string) => setTimeRange(value)}
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select time range" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="week">Last Week</SelectItem>
//               <SelectItem value="month">Last Month</SelectItem>
//               <SelectItem value="quarter">Last Quarter</SelectItem>
//               <SelectItem value="year">Last Year</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//         <Button variant="outline" size="sm">
//           <Download className="h-4 w-4 mr-2" />
//           Export Report
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <StatCard
//           icon={BarChartIcon}
//           title="Total Analyses"
//           value={stats.analyses}
//           change={`${stats.analysesChange}%`}
//           isPositive={Number(stats.analysesChange) > 0}
//         />
//         <StatCard
//           icon={TrendingUp}
//           title="Credits Used"
//           value={stats.totalCredits}
//           change={`${stats.creditsChange}%`}
//           isPositive={Number(stats.creditsChange) > 0}
//         />
//         <StatCard
//           icon={Calendar}
//           title="Avg. Daily Usage"
//           value={stats.avgDaily}
//           change={`${stats.avgDailyChange}%`}
//           isPositive={Number(stats.avgDailyChange) > 0}
//         />
//         <StatCard
//           icon={PieChartIcon}
//           title="Credit Balance"
//           value={balance?.credit_balance || 0}
//         />
//       </div>

//       {creditUsage && <UsageTrendsChart transactions={transactions || []} />}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Document Types</CardTitle>
//             <CardDescription>Distribution of analyzed document types</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={documentTypes}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                     label={({ name, percent }) => 
//                       `${name} ${(percent * 100).toFixed(0)}%`
//                     }
//                   >
//                     {documentTypes.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Subject Areas</CardTitle>
//             <CardDescription>Distribution of subject areas analyzed</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={subjectAreas}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill="#6366f1">
//                     {subjectAreas.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Usage Insights</CardTitle>
//           <CardDescription>Key metrics and patterns from your usage</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {insights.map((insight, index) => (
//               <div key={index} className={`p-4 ${insight.bgColor} rounded-lg`}>
//                 <h4 className={`font-medium ${insight.titleColor} mb-2`}>{insight.title}</h4>
//                 <p className={insight.textColor}>{insight.description}</p>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

import React, { useState, useMemo } from 'react';
import { 
  BarChartIcon, 
  PieChartIcon,
  Calendar,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatCard } from './Usage/StatCard';
import { UsageTrendsChart } from './Usage/UsageTrendsChart';
import { useGetBalanceQuery, useGetCreditUsageQuery, useGetTransactionHistoryQuery } from '@/src/redux/features/dashboard/creditsApi';
import type { Transaction, Usage } from '@/types/credits';

const COLORS: string[] = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316'];

const insights = [
  {
    title: 'Peak Usage Times',
    description: 'Your most active analysis times are between 2 PM and 6 PM on weekdays.',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    titleColor: 'text-blue-900'
  },
  {
    title: 'Credit Efficiency',
    description: 'Your average credit usage per analysis has improved by 15% compared to last month.',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    titleColor: 'text-green-900'
  },
  {
    title: 'Popular Features',
    description: 'Plagiarism detection and grammar checking are your most frequently used features.',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-700',
    titleColor: 'text-purple-900'
  }
];

const calculateDateRange = (dateFrom: Date, range: string): Date => {
  const date = new Date(dateFrom);
  switch (range) {
    case 'week':
      date.setDate(date.getDate() - 7);
      break;
    case 'month':
      date.setMonth(date.getMonth() - 1);
      break;
    case 'quarter':
      date.setMonth(date.getMonth() - 3);
      break;
    case 'year':
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      date.setMonth(date.getMonth() - 1);
  }
  return date;
};

export const UsageAnalyticsTab: React.FC = () => {
  const [timeRange, setTimeRange] = useState<string>('month');
  
  const dateRange = useMemo(() => {
    const end = new Date();
    const start = calculateDateRange(end, timeRange);
    return {
      start_date: start.toISOString(),
      end_date: end.toISOString()
    };
  }, [timeRange]);

  const { data: creditUsage, isLoading: isLoadingUsage } = useGetCreditUsageQuery();
  const { data: balance, isLoading: isLoadingBalance } = useGetBalanceQuery();
  const { data: transactions, isLoading: isLoadingTransactions } = useGetTransactionHistoryQuery(dateRange);

  const stats = useMemo(() => {
    if (!creditUsage?.usage_history) return {
      analyses: 0,
      totalCredits: 0,
      avgDaily: 0,
      analysesChange: '0',
      creditsChange: '0',
      avgDailyChange: '0'
    };

    const currentStart = new Date(dateRange.start_date);
    const previousStart = calculateDateRange(currentStart, timeRange);

    // Current period usage
    const currentUsages = creditUsage.usage_history.filter(usage => 
      new Date(usage.time_of_use) >= currentStart
    );

    const analyses = currentUsages.length;
    const totalCredits = currentUsages.reduce((sum, usage) => sum + usage.credit_usage, 0);

    // Previous period usage
    const previousUsages = creditUsage.usage_history.filter(usage => {
      const usageDate = new Date(usage.time_of_use);
      return usageDate >= previousStart && usageDate < currentStart;
    });

    const prevAnalyses = previousUsages.length;
    const prevCredits = previousUsages.reduce((sum, usage) => sum + usage.credit_usage, 0);

    const avgDaily = Math.round(analyses / (timeRange === 'week' ? 7 : 30));
    const prevAvgDaily = Math.round(prevAnalyses / (timeRange === 'week' ? 7 : 30));

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number): string => {
      if (!previous) return '0';
      return ((current - previous) / previous * 100).toFixed(1);
    };

    return {
      analyses,
      totalCredits,
      avgDaily,
      analysesChange: calculateChange(analyses, prevAnalyses),
      creditsChange: calculateChange(totalCredits, prevCredits),
      avgDailyChange: calculateChange(avgDaily, prevAvgDaily)
    };
  }, [creditUsage?.usage_history, dateRange, timeRange]);

  // Calculate document types and subject areas from usage history
  const { documentTypes, subjectAreas } = useMemo(() => {
    if (!creditUsage?.usage_history) return {
      documentTypes: [
        { name: 'Assignments', value: 0 },
        { name: 'Research Papers', value: 0 },
        { name: 'Essays', value: 0 },
        { name: 'Reports', value: 0 },
        { name: 'Others', value: 0 }
      ],
      subjectAreas: [
        { name: 'Computer Science', value: 0 },
        { name: 'Engineering', value: 0 },
        { name: 'Business', value: 0 },
        { name: 'Sciences', value: 0 },
        { name: 'Humanities', value: 0 }
      ]
    };

    const docTypes = {
      'Assignments': 0,
      'Research Papers': 0,
      'Essays': 0,
      'Reports': 0,
      'Others': 0
    };

    const subjects = {
      'Computer Science': 0,
      'Engineering': 0,
      'Business': 0,
      'Sciences': 0,
      'Humanities': 0
    };

    creditUsage.usage_history.forEach(usage => {
      // Here you would normally use actual data from the usage object
      // For now, we'll increment Assignments and Computer Science as placeholders
      docTypes['Assignments']++;
      subjects['Computer Science']++;
    });

    return {
      documentTypes: Object.entries(docTypes).map(([name, value]) => ({ name, value })),
      subjectAreas: Object.entries(subjects).map(([name, value]) => ({ name, value }))
    };
  }, [creditUsage?.usage_history]);

  if (isLoadingUsage && isLoadingBalance && isLoadingTransactions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-y-3 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Time Range:</span>
          <Select
            value={timeRange}
            onValueChange={(value: string) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={BarChartIcon}
          title="Total Analyses"
          value={stats.analyses}
          change={`${stats.analysesChange}%`}
          isPositive={Number(stats.analysesChange) > 0}
        />
        <StatCard
          icon={TrendingUp}
          title="Credits Used"
          value={stats.totalCredits}
          change={`${stats.creditsChange}%`}
          isPositive={Number(stats.creditsChange) > 0}
        />
        <StatCard
          icon={Calendar}
          title="Avg. Daily Usage"
          value={stats.avgDaily}
          change={`${stats.avgDailyChange}%`}
          isPositive={Number(stats.avgDailyChange) > 0}
        />
        <StatCard
          icon={PieChartIcon}
          title="Credit Balance"
          value={balance?.credit_balance || 0}
        />
      </div>

      {transactions && <UsageTrendsChart transactions={transactions} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
            <CardDescription>Distribution of analyzed document types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={documentTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => 
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {documentTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject Areas</CardTitle>
            <CardDescription>Distribution of subject areas analyzed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectAreas}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366f1">
                    {subjectAreas.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Insights</CardTitle>
          <CardDescription>Key metrics and patterns from your usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className={`p-4 ${insight.bgColor} rounded-lg`}>
                <h4 className={`font-medium ${insight.titleColor} mb-2`}>{insight.title}</h4>
                <p className={insight.textColor}>{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

