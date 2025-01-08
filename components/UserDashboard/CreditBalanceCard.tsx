import React from 'react';
import { CreditCard as CreditCardIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ExpirationInfo {
  credits: number;
  days: number;
}

interface CreditBalanceCardProps {
  balance: number;
  nextExpiration: ExpirationInfo;
  onTopUp?: () => void;
}

export const CreditBalanceCard: React.FC<CreditBalanceCardProps> = ({
  balance,
  nextExpiration,
  onTopUp
}) => (
  <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold">Credit Balance</h3>
      <CreditCardIcon className="h-6 w-6" />
    </div>
    
    <div className="text-4xl font-bold mb-2">
      {balance.toLocaleString()} Credits
    </div>
    
    <div className="text-sm opacity-90">
      Next expiration: {nextExpiration.credits.toLocaleString()} credits in {nextExpiration.days} days
    </div>
    
    <Button 
      onClick={onTopUp}
      className="mt-4 bg-white text-indigo-600 hover:bg-gray-100 transition-colors"
    >
      Top Up Credits
    </Button>
  </div>
);