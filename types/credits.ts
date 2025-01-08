export interface Usage
{
    id: number;
    user_email: string;
    credit_usage: number;
    time_of_use: string;
}

export interface Payment
{
    id: number;
    user_email: string;
    credit_amount: number;
    dollar_amount: number;
    time_of_use: string;
}

export interface Balance
{
    id: number;
    user_email: string;
    credit_balance: number;
    time_of_use: string;
}

export interface Transaction
{
    transaction_type: 'usage' | 'payment';
    credit_amount: number;
    dollar_amount: number;
    time_of_use: string;
    balance_after: number;
}

export interface CreditUsageResponse
{
    total_usage: number;
    usage_history: Usage[];
}


export interface CreditPricingTier
{
    id: number;
    min_credits: number;
    max_credits: number | null;
    price_per_credit: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreditPriceCalculation
{
    credit_amount: number;
    price_per_credit: number;
    total_price: number;
}

export interface EditPricingTierFormData
{
    min_credits: number;
    max_credits: number | null;
    price_per_credit: number;
    is_active: boolean;
}
