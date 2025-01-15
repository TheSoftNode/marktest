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
    tier_type: 'institution' | 'individual';
    created_at: string;
    updated_at: string;
}

export interface CreditPriceCalculation
{
    credit_amount: number;
    price_per_credit: number;
    total_price: number;
    tier_type: 'institution' | 'individual';
}

export interface EditPricingTierFormData
{
    min_credits: number;
    max_credits: number | null;
    price_per_credit: number;
    tier_type: 'institution' | 'individual';
    is_active: boolean;
}

export interface CheckoutSession {
    checkout_url: string;
}

export interface PaymentTracking extends Payment {
    stripe_payment_id?: string;
    stripe_session_id?: string;
    status: 'pending' | 'completed' | 'failed';
    tier_type: 'institution' | 'individual';
}
