export interface ActivityItem {
    id: string;
    type: 'analysis' | 'purchase' | 'warning' | 'coupon';
    title: string;
    description: string;
    timestamp: string;
    status?: 'completed' | 'pending' | 'failed';
    metadata?: Record<string, any>;
}

export interface CreditTransaction {
    id: string;
    type: 'credit_purchase' | 'analysis_usage' | 'coupon_credit' | 'expiry';
    amount: number;
    date: string;
    description: string;
    cost?: number;
    metadata?: Record<string, any>;
}

export interface UsageStats {
    totalAnalyses: number;
    availableCredits: number;
    activeCoupons: number;
    monthlyUsage: number;
    lastAnalysis?: string;
    recentPurchase?: string;
}

export interface AnalyticsData {
    usageByMonth: Array<{
        month: string;
        analyses: number;
    }>;
    subjectDistribution: Array<{
        subject: string;
        percentage: number;
    }>;
    analysisTypes: Array<{
        type: string;
        percentage: number;
    }>;
}