import React from 'react';
import { DollarSign, History } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Badge } from '../ui/badge';

type TransactionType = 'credit' | 'debit';

interface Transaction
{
  id: string;
  type: TransactionType;
  title: string;
  date: string;
  credit_amount: number;
  dollar_amount: number;
  description: string;
  status?: string;
}

interface TransactionHistoryProps
{
  transactions: Transaction[];
  className?: string;
}

interface TransactionIconProps
{
  type: TransactionType;
  className?: string;
}

const TransactionIcon: React.FC<TransactionIconProps> = ({ type, className }) =>
{
  if (type === 'credit')
  {
    return <DollarSign className={cn("h-8 w-8 text-green-500", className)} />;
  }
  return <History className={cn("h-8 w-8 text-blue-500", className)} />;
};

const getTransactionColor = (type: TransactionType): string =>
{
  return type === 'credit' ? 'text-green-600' : 'text-red-600';
};

const formatAmount = (type: TransactionType, amount: number): string =>
{
  return `${type === 'credit' ? '+' : '-'}${amount.toLocaleString()} credits`;
};

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({
  transactions,
  className
}) =>
{
  if (!transactions.length)
  {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No transactions to display</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-medium text-lg">Recent Transactions</h4>
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <TransactionIcon
                type={transaction.type}
                className="mr-3"
              />
              <div>
                <div className="font-medium">{transaction.title}</div>
                <div className="text-sm text-gray-500">{transaction.date}</div>
                <Badge
                  variant={
                    transaction.status === 'completed' ? 'secondary' :
                      transaction.status === 'pending' ? 'outline' :
                        'destructive'
                  }
                  className={`
    ${transaction.status === 'completed' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 hover:bg-gradient-to-r hover:from-green-200 hover:to-emerald-200' :
                      transaction.status === 'pending' ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-amber-700 hover:bg-gradient-to-r hover:from-yellow-200 hover:to-amber-200' :
                        'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 hover:bg-gradient-to-r hover:from-red-200 hover:to-rose-200'
                    }
  `}
                >
                  {(transaction.status ?? '').charAt(0).toUpperCase() + (transaction.status ?? '').slice(1)}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <div className={cn(
                "font-medium",
                getTransactionColor(transaction.type)
              )}>
                {formatAmount(transaction.type, transaction.credit_amount)}
              </div>
              <div className="text-sm text-gray-500">
                {transaction.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};