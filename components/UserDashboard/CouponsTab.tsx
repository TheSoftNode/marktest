import React, { useState } from 'react';
import { Gift, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SessionCoupon } from '@/types/coupon';
import { useGetUserCouponHistoryQuery, useApplyCouponMutation } from '@/src/redux/features/dashboard/couponApi';

interface UIFormattedCoupon
{
  code: string;
  description: string;
  status: 'active' | 'expired' | 'pending' | 'revoked';
  discount: string;
  validUntil: string;
  analysisTypes?: string[];
  minimumAmount?: string;
  remainingAnalyses?: number | null;
}

interface CouponCardProps
{
  coupon: UIFormattedCoupon;
  onUse?: (code: string) => void;
}

type StatusColorMap = {
  [K in UIFormattedCoupon['status']]: string;
};

const statusColors: StatusColorMap = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  pending: 'bg-yellow-100 text-yellow-800',
  revoked: 'bg-gray-100 text-gray-800'
};

const CouponCard: React.FC<CouponCardProps> = ({ coupon, onUse }) =>
{
  const getStatusColor = (status: UIFormattedCoupon['status']): string =>
  {
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleUseClick = () =>
  {
    onUse?.(coupon.code);
  };

  const statusIcon = {
    active: <CheckCircle className="h-4 w-4 mr-2 text-green-600" />,
    pending: <Clock className="h-4 w-4 mr-2 text-yellow-600" />,
    expired: <AlertCircle className="h-4 w-4 mr-2 text-red-600" />,
    revoked: <AlertCircle className="h-4 w-4 mr-2 text-gray-600" />
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm transition-all duration-200 hover:shadow-md border border-gray-200 overflow-hidden hover:border-violet-200">
      {/* Decorative gradient line at top */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500"></div> */}

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center">
          {statusIcon[coupon.status]}
          <span className={`px-3 py-1 rounded-full  text-xs font-medium tracking-wide ${getStatusColor(coupon.status)}`}>
            {coupon.status.charAt(0).toUpperCase() + coupon.status.slice(1)}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex flex-col">
            <h3 className="text-sm font-extrabold tracking-tight mb-2">{coupon.code}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{coupon.description}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-colors group-hover:bg-violet-50/50">
            <Gift className="h-5 w-5 text-violet-600" />
            <div>
              <span className="text-sm font-medium text-gray-900">Discount</span>
              <p className="text-sm text-gray-600">{coupon.discount}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-colors group-hover:bg-purple-50/50">
            <Clock className="h-5 w-5 text-purple-600" />
            <div>
              <span className="text-sm font-medium text-gray-900">Valid Until</span>
              <p className="text-sm text-gray-600">{coupon.validUntil}</p>
            </div>
          </div>

          {coupon.remainingAnalyses !== undefined && coupon.remainingAnalyses !== null && (
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 transition-colors group-hover:bg-blue-50/50">
              <CheckCircle className="h-5 w-5 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-900">Remaining Analyses</span>
                <p className="text-sm text-gray-600">{coupon.remainingAnalyses}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        {coupon.status === 'active' && (
          <div className="pt-2">
            <Button
              className="w-full h-11 font-medium shadow-sm transition-all duration-200 hover:shadow hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200"
              variant="outline"
              onClick={handleUseClick}
            >
              Use Coupon
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const transformCouponData = (sessionCoupon: SessionCoupon): UIFormattedCoupon =>
{
  const { coupon_details, status, remaining_analyses } = sessionCoupon;

  const now = new Date();
  const validFrom = new Date(coupon_details.valid_from);
  // const validFrom = new Date("2025-02-01T00:00:00.000Z");
  const validUntil = new Date(coupon_details.valid_until);

  // Use backend status but check for pending
  let displayStatus: UIFormattedCoupon['status'] = status as UIFormattedCoupon['status'] || 'pending';
  if (validFrom > now)
  {
    displayStatus = 'pending';
  }

  // Format discount display
  const formatDiscount = (type: string, value: string): string =>
  {
    switch (type)
    {
      case 'percentage':
        return `${value}% off`;
      case 'fixed':
        return `$${value} off`;
      case 'analysis_count':
        return `${value} free analyses`;
      default:
        return `${value} off`;
    }
  };

  // Create description parts
  const descriptionParts = [
    formatDiscount(coupon_details.coupon_type, coupon_details.discount_value.toString()),
    Number(coupon_details.minimum_credit_amount) !== 0 &&
    `Min. amount: $${coupon_details.minimum_credit_amount}`,
    remaining_analyses !== null &&
    `Remaining: ${remaining_analyses}`,
    coupon_details.analysis_types?.length &&
    `For: ${coupon_details.analysis_types.join(', ')}`
  ].filter(Boolean);

  return {
    code: coupon_details.code,
    description: descriptionParts.join(' • '),
    status: displayStatus,
    discount: formatDiscount(coupon_details.coupon_type, coupon_details.discount_value.toString()),
    validUntil: validUntil.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    analysisTypes: coupon_details.analysis_types,
    minimumAmount: coupon_details.minimum_credit_amount.toString(),
    remainingAnalyses: remaining_analyses
  };
};

export const CouponsTab: React.FC = () =>
{
  const [redeemCode, setRedeemCode] = useState<string>('');
  const [applyCoupon] = useApplyCouponMutation();
  const { data: historyData, isLoading } = useGetUserCouponHistoryQuery();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRedeemCode = async () =>
  {
    if (!redeemCode.trim())
    {
      return;
    }

    try
    {
      setError(null);
      setSuccess(null);
      const result = await applyCoupon({ code: redeemCode }).unwrap();
      setRedeemCode('');
      setSuccess(`Successfully redeemed coupon: ${redeemCode}`);
    } catch (err: any)
    {
      setError(err.data?.error || 'Failed to redeem coupon');
      setSuccess(null);
    }
  };

  const handleUseCoupon = async (code: string) =>
  {
    try
    {
      setError(null);
      setSuccess(null);
      const result = await applyCoupon({ code }).unwrap();
      setSuccess(`Successfully applied coupon: ${code}`);
    } catch (err: any)
    {
      setError(err.data?.error || 'Failed to apply coupon');
      setSuccess(null);
    }
  };

  const allCoupons: UIFormattedCoupon[] = React.useMemo(() =>
  {
    if (!historyData) return [];

    const processedCoupons = [
      ...(historyData.active_coupons || []),
      ...(historyData.expired_coupons || []),
      ...(historyData.revoked_coupons || []),
      ...(historyData.inactive_coupons || [])
    ].map(transformCouponData);

    return processedCoupons;
  }, [historyData]);

  if (isLoading)
  {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Loading coupons...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Redeem Coupon</CardTitle>
          <CardDescription>Enter your coupon code to redeem special offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter coupon code"
              value={redeemCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRedeemCode(e.target.value)}
              className="flex-1"
              maxLength={20}
              onKeyDown={(e) =>
              {
                if (e.key === 'Enter')
                {
                  handleRedeemCode();
                }
              }}
            />
            <Button onClick={handleRedeemCode}>
              Redeem
            </Button>
          </div>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mt-4 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">{success}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className='h-fit'>
          <CardHeader>
            <CardTitle className="flex items-center text-violet-900">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              Active Coupons
            </CardTitle>
            <CardDescription>Your currently available coupons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allCoupons
              .filter(coupon => coupon.status === 'active' || coupon.status === 'pending')
              .map((coupon, index) => (
                <CouponCard
                  key={`active-${coupon.code}-${index}`}
                  coupon={coupon}
                  onUse={handleUseCoupon}
                />
              ))}
            {!allCoupons.some(coupon => coupon.status === 'active' || coupon.status === 'pending') && (
              <p className="text-gray-500 text-sm">No active coupons available</p>
            )}
          </CardContent>
        </Card>

        <Card className='h-fit'>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 mr-2 text-yellow-600" />
              Expired & Revoked
            </CardTitle>
            <CardDescription>Expired and revoked coupon codes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {allCoupons
              .filter(coupon => coupon.status === 'expired' || coupon.status === 'revoked')
              .map((coupon, index) => (
                <CouponCard
                  key={`inactive-${coupon.code}-${index}`}
                  coupon={coupon}
                />
              ))}
            {!allCoupons.some(coupon => coupon.status === 'expired' || coupon.status === 'revoked') && (
              <p className="text-gray-500 text-sm">No expired or revoked coupons</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Alert variant="default" className="bg-blue-50 border-blue-200">
        <AlertCircle className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Pro Tip</AlertTitle>
        <AlertDescription className="text-blue-700">
          Follow us on social media to get notified about new coupon codes and special offers!
        </AlertDescription>
      </Alert>
    </div>
  );
};