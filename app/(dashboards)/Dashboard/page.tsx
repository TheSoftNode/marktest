"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Upload, Menu, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import
{
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditBalanceCard } from '@/components/UserDashboard/CreditBalanceCard';
import { TransactionHistory } from '@/components/UserDashboard/TransactionHistory';
import { UsageAnalyticsTab } from '@/components/UserDashboard/UsageAnalytics';
import { CouponsTab } from '@/components/UserDashboard/CouponsTab';
import { DocumentationTab } from '@/components/UserDashboard/DocumentationTab';
import { SettingsTab } from '@/components/UserDashboard/SettingsTab';
import { Sidebar } from '@/components/UserDashboard/Sidebar';
import { OverviewTab } from '@/components/UserDashboard/OverviewTab';
import
{
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreditPurchaseDialog } from '@/components/UserDashboard/CreditPurchaseDialog';
import AnalysisFlow from '@/components/UploadingFiles/AnalysisFlow';
import Link from 'next/link';
import { useGetUserAnalyticsQuery } from '@/src/redux/features/dashboard/analysisApi';
import { useGetUserCouponHistoryQuery } from '@/src/redux/features/dashboard/couponApi';
import { useGetBalanceQuery, useGetTransactionHistoryQuery } from '@/src/redux/features/dashboard/creditsApi';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { AnalysisManagement } from '@/components/AdminDashboard/AnalysisManagement';
import { CouponManagement } from '@/components/AdminDashboard/CouponManagement';
import { CreditManagement } from '@/components/AdminDashboard/CreditManagement';
import SavedAnalysisPage from '@/components/UserDashboard/Analysis/SaveAnalysis';



const DashboardPage: React.FC = () =>
{
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);

  const { data: analytics } = useGetUserAnalyticsQuery();
  const { data: couponsData } = useGetUserCouponHistoryQuery();
  const { data: balanceData } = useGetBalanceQuery();
  const { data: transactionHistory } = useGetTransactionHistoryQuery({});

  console.log(transactionHistory);


  // Handle window resize
  useEffect(() =>
  {
    const handleResize = () =>
    {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile)
      {
        setSidebarOpen(true);
      } else
      {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = (): void =>
  {
    if (isMobile)
    {
      setSheetOpen(!sheetOpen);
    } else
    {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const activeCouponsInfo = React.useMemo(() =>
  {
    if (!couponsData?.active_coupons?.length)
    {
      return { count: 0, summary: "No active coupons" };
    }

    // Count active coupons
    const count = couponsData.active_coupons.length;

    // Get the most recently applied coupon
    const latestCoupon = couponsData.active_coupons.reduce((latest, current) =>
    {
      return new Date(latest.applied_at) > new Date(current.applied_at) ? latest : current;
    });

    const value = latestCoupon.coupon_details.discount_value;
    let discountText = '';
    switch (latestCoupon.coupon_details.coupon_type)
    {
      case 'percentage':
        discountText = `${value}% off`;
        break;
      case 'fixed':
        discountText = `$${value} off`;
        break;
      case 'analysis_count':
        discountText = `${value} free analyses`;
        break;
      default:
        discountText = 'Discount active';
    }

    const summary = `Using ${latestCoupon.coupon_details.code} (${discountText})`;


    return { count, summary };
  }, [couponsData]);


  const transformedTransactions = React.useMemo(() =>
  {
    if (!transactionHistory) return [];

    return transactionHistory.map(transaction => ({
      id: `${transaction.time_of_use}-${transaction.transaction_type}`,
      type: transaction.credit_amount > 0 ? 'credit' : 'debit' as 'credit' | 'debit',
      title: transaction.transaction_type === 'payment' ? 'Credit Purchase' : 'Document Analysis',
      date: format(new Date(transaction.time_of_use), 'MMM dd, yyyy'),
      credit_amount: Math.abs(transaction.credit_amount),
      dollar_amount: transaction.dollar_amount,
      status: transaction.status,
      description: transaction.transaction_type === 'payment'
        ? `$${Math.abs(transaction.credit_amount).toFixed(2)}`
        : 'Analysis Usage'
    }));
  }, [transactionHistory]);


  const { usageData, usageMetrics } = React.useMemo(() =>
  {
    if (!transactionHistory) return {
      usageData: [],
      usageMetrics: { currentMonth: 0, trend: 0 }
    };

    // Get date ranges for calculations
    const currentDate = new Date();
    const currentMonthStart = startOfMonth(currentDate);
    const currentMonthEnd = endOfMonth(currentDate);
    const lastMonthStart = startOfMonth(subMonths(currentDate, 1));
    const lastMonthEnd = endOfMonth(subMonths(currentDate, 1));

    // Calculate month over month metrics
    const currentMonthUsages = transactionHistory.filter(t =>
      t.transaction_type === 'usage' &&
      new Date(t.time_of_use) >= currentMonthStart &&
      new Date(t.time_of_use) <= currentMonthEnd
    );

    const lastMonthUsages = transactionHistory.filter(t =>
      t.transaction_type === 'usage' &&
      new Date(t.time_of_use) >= lastMonthStart &&
      new Date(t.time_of_use) <= lastMonthEnd
    );

    const currentMonth = currentMonthUsages.length;
    const lastMonth = lastMonthUsages.length;
    const trend = currentMonth - lastMonth;

    // Generate chart data
    const dailyUsage = new Map();

    // Initialize all dates in the range
    let iterDate = lastMonthStart;
    while (iterDate <= currentMonthEnd)
    {
      const dateKey = format(iterDate, 'd MMM');
      dailyUsage.set(dateKey, {
        date: dateKey,
        analyses: 0,
        credits: 0
      });
      iterDate = new Date(iterDate.setDate(iterDate.getDate() + 1));
    }

    // Populate with actual usage data
    transactionHistory.forEach(transaction =>
    {
      if (transaction.transaction_type === 'usage')
      {
        const dateKey = format(new Date(transaction.time_of_use), 'd MMM');
        const existingData = dailyUsage.get(dateKey) || {
          date: dateKey,
          analyses: 0,
          credits: 0
        };

        dailyUsage.set(dateKey, {
          ...existingData,
          analyses: existingData.analyses + 1,
          credits: existingData.credits + Math.abs(transaction.credit_amount)
        });
      }
    });

    return {
      usageData: Array.from(dailyUsage.values()),
      usageMetrics: {
        currentMonth,
        trend
      }
    };
  }, [transactionHistory]);

  const creditBalance = React.useMemo(() => ({
    current: balanceData?.credit_balance || 0,
    nextExpiration: {
      credits: 0,
      days: 30
    }
  }), [balanceData]);



  const handleTabChange = (value: string): void =>
  {
    setActiveTab(value);
    if (isMobile)
    {
      setSheetOpen(false);
    }
  };

  const handleNewAnalysis = (): void =>
  {
    setActiveTab('analyse');
    console.log('New analysis clicked');
  };

  const handleBuyCredits = (): void =>
  {
    setCreditDialogOpen(true);
    console.log('Buy credits clicked');
  };

  const renderContent = () =>
  {
    switch (activeTab)
    {
      case 'overview':
        return (
          <OverviewTab
            creditBalance={creditBalance}
            transactions={transformedTransactions}
            onNewAnalysis={handleNewAnalysis}
            onBuyCredits={handleBuyCredits}
            analytics={analytics || { total_analyses: 0, total_cost: 0, analyses_by_type: [], free_analysis_available: false }}
            activeCoupons={activeCouponsInfo}
            usageMetrics={usageMetrics}
            usageData={usageData}
          />
        );
      case 'activity':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>
                Track your recent analyses and account activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionHistory transactions={transformedTransactions} />
            </CardContent>
          </Card>
        );

      case 'usage':
        return <UsageAnalyticsTab />;

      case 'coupons':
        return <CouponsTab />;

      case 'docs':
        return <DocumentationTab />;

      case 'settings':
        return <SettingsTab />;

      case 'analyse':
        return <AnalysisFlow key={`analysis-flow-${activeTab}`} />;

      case 'manage-analysis':
        return <AnalysisManagement />;

      case 'manage-coupons':
        return <CouponManagement />;

      case 'manage-credits':
        return <CreditManagement />;

      case 'saved-analysis':
        return <SavedAnalysisPage />

      case 'credits':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Credits & Billing</CardTitle>
              <CardDescription>
                Manage your credits and view billing history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <CreditBalanceCard
                  balance={creditBalance.current}
                  nextExpiration={creditBalance.nextExpiration}
                  onTopUp={handleBuyCredits}
                />
                <TransactionHistory transactions={transformedTransactions} />
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const renderSidebar = () => (
    <Sidebar
      isOpen={sidebarOpen}
      toggleSidebar={toggleSidebar}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      {isMobile ? (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="fixed top-4 left-4 lg:hidden z-50"
              size="sm"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            {renderSidebar()}
          </SheetContent>
        </Sheet>
      ) : (
        renderSidebar()
      )}

      {/* Main Content Wrapper */}
      <div
        className={`
          transition-all duration-300 
          ${isMobile ? 'ml-0' : (sidebarOpen ? 'ml-64' : 'ml-20')}
        `}
      >
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center space-x-4 ml-12 lg:ml-0">
                  <Link
                    href="/"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
                  >
                    <div className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                      <Home className="h-5 w-5" />
                      <span className="hidden lg:flex ml-2 font-medium text-sm opacity-100 group-hover:opacity-100 transition-opacity duration-200">
                        Home
                      </span>
                    </div>
                  </Link>
                  <div className="h-6 w-px bg-gray-200" />
                  <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent px-1 py-1 rounded-lg">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                  </h1>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewAnalysis}
                  className="hidden sm:flex"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  New Analysis
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNewAnalysis}
                  className="sm:hidden"
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleBuyCredits}
                  className="hidden sm:flex bg-gradient-to-r from-violet-600 to-blue-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Buy Credits
                </Button>
                <Button
                  size="sm"
                  onClick={handleBuyCredits}
                  className="sm:hidden bg-gradient-to-r from-violet-600 to-blue-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="space-y-6">
            {renderContent()}
          </div>
        </main>
      </div>

      <CreditPurchaseDialog
        isOpen={creditDialogOpen}
        onOpenChange={setCreditDialogOpen}
      />
    </div>
  );
};

export default DashboardPage;