import { useGetBalanceQuery, useGetTransactionHistoryQuery } from '@/src/redux/features/dashboard/creditsApi';
import { Transaction } from '@/types/credits';
import { format, subDays } from 'date-fns';

export const useOverviewData = () => {
    const { data: balanceData, isLoading: isBalanceLoading } = useGetBalanceQuery();
    
    const { data: transactionHistory, isLoading: isTransactionLoading } = useGetTransactionHistoryQuery({
        start_date: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        end_date: format(new Date(), 'yyyy-MM-dd')
    });

    const formatTransactionData = (transactions: Transaction[] = []) => {
        return transactions.map(transaction => ({
            id: `${transaction.time_of_use}-${transaction.transaction_type}`,
            type: transaction.amount > 0 ? 'credit' : 'debit' as 'credit' | 'debit',
            title: transaction.transaction_type === 'payment' ? 'Credit Purchase' : 'Analysis Usage',
            date: format(new Date(transaction.time_of_use), 'dd MMM yyyy'),
            amount: Math.abs(transaction.amount),
            description: transaction.transaction_type === 'payment' 
                ? 'Credits added to account'
                : 'Credits used for analysis'
        }));
    };

    const calculateUsageMetrics = (transactions: Transaction[] = []) => {
        const thisMonth = transactions.filter(t => 
            new Date(t.time_of_use).getMonth() === new Date().getMonth()
        );
        
        const lastMonth = transactions.filter(t => 
            new Date(t.time_of_use).getMonth() === new Date().getMonth() - 1
        );

        const thisMonthUsage = thisMonth.filter(t => t.transaction_type === 'usage').length;
        const lastMonthUsage = lastMonth.filter(t => t.transaction_type === 'usage').length;
        
        return {
            currentMonth: thisMonthUsage,
            trend: thisMonthUsage - lastMonthUsage
        };
    };

    const generateUsageData = (transactions: Transaction[] = []) => {
        const usageByDate = new Map();
        
        transactions.forEach(transaction => {
            const date = format(new Date(transaction.time_of_use), 'd MMM');
            if (!usageByDate.has(date)) {
                usageByDate.set(date, { date, analyses: 0, credits: 0 });
            }
            
            const entry = usageByDate.get(date);
            if (transaction.transaction_type === 'usage') {
                entry.analyses += 1;
                entry.credits += Math.abs(transaction.amount);
            }
        });

        return Array.from(usageByDate.values());
    };

    const totalAnalyses = transactionHistory?.filter(t => t.transaction_type === 'usage').length || 0;
    const totalCost = transactionHistory?.reduce((acc, t) => 
        t.transaction_type === 'usage' ? acc + Math.abs(t.amount) : acc, 0
    ) || 0;

    return {
        isLoading: isBalanceLoading || isTransactionLoading,
        creditBalance: {
            current: balanceData?.credit_balance || 0,
            nextExpiration: {
                credits: 0, // This would need to be fetched from a separate API if needed
                days: 30
            }
        },
        transactions: formatTransactionData(transactionHistory),
        usageData: generateUsageData(transactionHistory),
        analytics: {
            total_analyses: totalAnalyses,
            total_cost: totalCost,
            analyses_by_type: [], // This would need to be fetched from a separate API if needed
            free_analysis_available: false
        },
        usageMetrics: calculateUsageMetrics(transactionHistory)
    };
};
