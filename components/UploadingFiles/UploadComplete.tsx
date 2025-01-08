import React, { useEffect, useState } from 'react';
import { Check, RefreshCw, Loader2, Tag, AlertCircle, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import
{
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import
{
    usePerformAnalysisMutation,
    useGetUserAnalyticsQuery,
    useGetAnalysisTypesQuery
} from '@/src/redux/features/dashboard/analysisApi';
import { useGetUserCouponHistoryQuery, useValidateCouponMutation } from '@/src/redux/features/dashboard/couponApi';
import { useApplyCouponMutation } from '@/src/redux/features/dashboard/dashboardApi';
import { useRecordUsageMutation } from '@/src/redux/features/dashboard/creditsApi';

interface UploadCompleteProps
{
    fileName: string;
    file: File;
    onUploadAgain: () => void;
    onStartAnalysis: (result: any) => void;
    uploadType: 'thesis' | 'code';
}


export const UploadComplete = ({
    fileName,
    file,
    onUploadAgain,
    onStartAnalysis,
    uploadType
}: UploadCompleteProps) =>
{
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');
    const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [finalCost, setFinalCost] = useState<number | null>(null);
    const [originalCost, setOriginalCost] = useState<number | null>(null);


    const { data: userAnalytics } = useGetUserAnalyticsQuery();
    const { data: activeCouponsData } = useGetUserCouponHistoryQuery();
    const { data: analysisTypes } = useGetAnalysisTypesQuery();
    const [validateCoupon] = useValidateCouponMutation();
    


    const currentAnalysisType = React.useMemo(() =>
    {
        if (!analysisTypes) return null;
        return analysisTypes.find(type =>
            uploadType === 'thesis' ? type.name.toLowerCase().includes('thesis') :
                type.name.toLowerCase().includes('code')
        );
    }, [analysisTypes, uploadType]);

    useEffect(() =>
    {
        if (currentAnalysisType)
        {
            const cost = Number(currentAnalysisType.base_cost);
            setOriginalCost(cost);
            setFinalCost(cost);
        }
    }, [currentAnalysisType]);

    // Initialize state from active coupons
    useEffect(() =>
    {
        window.scrollTo(0, 0);

        if (activeCouponsData?.active_coupons?.length && !showCouponInput)
        {
            const latestCoupon = activeCouponsData.active_coupons.reduce((latest, current) =>
            {
                return new Date(latest.applied_at) > new Date(current.applied_at) ? latest : current;
            });

            setCouponCode(latestCoupon.coupon_details.code);

            const value = latestCoupon.coupon_details.discount_value;
            switch (latestCoupon.coupon_details.coupon_type)
            {
                case 'percentage':
                    setCouponDiscount(parseFloat(value.toString()));
                    break;
                case 'fixed':
                    setCouponDiscount(parseFloat(value.toString()));
                    break;
                case 'analysis_count':
                    setCouponDiscount(100); // Free analysis
                    break;
            }
        }
    }, [activeCouponsData, showCouponInput]);

    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const value = e.target.value.toUpperCase();
        setCouponCode(value);
        setCouponError('');
        if (value)
        {
            handleCouponValidation(value);
        } else
        {
            setCouponDiscount(0);
        }
    };

    const handleCouponValidation = async (code: string) =>
    {
        if (!code) return;

        setIsValidatingCoupon(true);
        setCouponError('');

        try
        {
            const result = await validateCoupon({ code }).unwrap();

            if (result.is_applicable)
            {
                // Extract the numeric value from discount_type (e.g., "20% off" -> 20)
                if (result.coupon_type === 'percentage')
                {
                    setCouponDiscount(parseFloat(result.discount_value));
                } else
                {
                    setCouponDiscount(0); // Handle other coupon types as needed
                }
            } else
            {
                setCouponError(result.validation_message);
                setCouponDiscount(0);
            }
        } catch (error: any)
        {
            setCouponError(error.data?.error || 'Error validating coupon');
            setCouponDiscount(0);
        } finally
        {
            setIsValidatingCoupon(false);
        }
    };


    const calculateFinalCost = () =>
    {
        if (userAnalytics?.free_analysis_available) return 0;

        // Get the base cost from the current analysis type
        const baseCost = originalCost || 0;

        // If there's a coupon discount, apply it based on coupon type
        if (couponCode && couponDiscount > 0)
        {
            // Check active coupon's type from active coupons data
            const activeCoupon = activeCouponsData?.active_coupons?.find(
                coupon => coupon.coupon_details.code === couponCode
            );

            if (activeCoupon)
            {
                switch (activeCoupon.coupon_details.coupon_type)
                {
                    case 'percentage':
                        if (couponDiscount === 100) return 0;
                        return baseCost * (1 - couponDiscount / 100);

                    case 'fixed':
                        // Ensure we don't go below 0
                        return Math.max(0, baseCost - couponDiscount);

                    case 'analysis_count':
                        return 0; // Free analysis

                    default:
                        return baseCost;
                }
            }
        }

        // If no discount, return original cost
        return baseCost;
    };

    const handleUseDifferentCoupon = () =>
    {
        setShowCouponInput(true);
        setCouponCode('');
        setCouponDiscount(0);
    };

    const transformResponseData = (data: any, type: 'thesis' | 'code') =>
    {
        const parseKeyValuePairs = (input: string) =>
        {
            return input
                .slice(1, -1)
                .split("][")
                .reduce((acc: Record<string, string>, item: string) =>
                {
                    const [key, value] = item.split(" ,");
                    acc[key.trim()] = value.trim();
                    return acc;
                }, {});
        };

        if (type === 'code')
        {
            return {
                analysis_type: "code",
                Reason_for_mark_code: parseKeyValuePairs(data.Reason_for_mark_code),
                marking_code: parseKeyValuePairs(data.marking_code),
                message_code: data.message_code
            };
        } else if (type === 'thesis')
        {
            return {
                analysis_type: "thesis",
                Reason_for_mark: parseKeyValuePairs(data.Reason_for_mark),
                marking: parseKeyValuePairs(data.marking),
                message: data.message
            };
        }
        return data;
    };


    const handleSubmitForAnalysis = async () =>
    {
        setShowConfirmDialog(false);
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 3000));
        onStartAnalysis(null);

        try
        {
            if (!file)
            {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            console.log('Uploading file for analysis:', file);


            const response = await axios.post('https://easemark-upload-check.onrender.com/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            const transformedData = transformResponseData(response.data, uploadType);

            console.log('Analysis data:', transformedData);

            localStorage.setItem('analysisData', JSON.stringify(transformedData));

            setIsSubmitting(false);


        } catch (error: any)
        {
            console.error('Error submitting file for analysis:', error);
            setCouponError(
                error?.data?.error === "database is locked"
                    ? "System is busy, please try again in a moment"
                    : error?.data?.error || 'Error performing analysis'
            );
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(false);
    };

    return (
        <>
            <Card className="bg-white/95 backdrop-blur-sm border-indigo-100">
                <CardContent className="pt-6 pb-6 space-y-6">
                    {/* Upload Status */}
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mr-4">
                            <Check className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-1 text-gray-900">Upload Complete</h3>
                            <p className="text-sm text-gray-500 truncate">{fileName}</p>
                        </div>
                    </div>

                    {/* Free Analysis Notice or Coupon Section */}
                    {userAnalytics?.free_analysis_available ? (
                        <Alert className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100">
                            <Check className="h-4 w-4 text-emerald-600" />
                            <AlertDescription>
                                <h4 className="font-medium text-emerald-800 mb-1">
                                    Your First Analysis is Free!
                                </h4>
                                <p className="text-sm text-emerald-600">
                                    Enjoy your complimentary first-time analysis. Subsequent analyses will require credits or coupons.
                                </p>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="space-y-3">
                            {activeCouponsData?.active_coupons?.length && !showCouponInput ? (
                                <div className="p-4 bg-violet-50 rounded-lg border border-violet-100">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-violet-800 mb-1">
                                                Active Coupon Applied
                                            </p>
                                            <p className="text-sm text-violet-600">
                                                {couponCode} ({couponDiscount}% discount)
                                            </p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleUseDifferentCoupon}
                                            className="text-violet-600 hover:text-violet-700 hover:bg-violet-100"
                                        >
                                            <X className="h-4 w-4 mr-1" />
                                            Change
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Label htmlFor="couponCode" className="text-sm font-medium text-gray-700">
                                        Have a coupon code?
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="couponCode"
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={handleCouponChange}
                                            className="pl-9"
                                            disabled={isSubmitting}
                                        />
                                        <Tag className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        {isValidatingCoupon && (
                                            <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-violet-600" />
                                        )}
                                    </div>
                                    {couponError && (
                                        <p className="text-sm text-red-500 flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4" />
                                            {couponError}
                                        </p>
                                    )}
                                    {couponDiscount > 0 && (
                                        <p className="text-sm text-violet-600 flex items-center gap-2">
                                            <Check className="h-4 w-4" />
                                            {couponDiscount}% discount will be applied
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 border-gray-200 hover:bg-gray-50 text-gray-700"
                            onClick={onUploadAgain}
                            disabled={isSubmitting}
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Upload Again
                        </Button>
                        <Button
                            className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm"
                            onClick={() => setShowConfirmDialog(true)}
                            // onClick={() => handleSubmitForAnalysis}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Start Analysis'
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {userAnalytics?.free_analysis_available
                                ? 'Confirm Free Analysis'
                                : 'Confirm Analysis'
                            }
                        </DialogTitle>
                        <DialogDescription>
                            {userAnalytics?.free_analysis_available
                                ? 'You are about to use your one-time free analysis'
                                : 'Please review the analysis details below'
                            }
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-3">
                            {userAnalytics?.free_analysis_available ? (
                                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    This is your one-time free analysis. Future analyses will require credits or coupons.
                                </div>
                            ) : (
                                <>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Base Cost:</span>
                                        <span className="font-medium">
                                            {originalCost || 0} credits
                                        </span>
                                    </div>

                                    {couponDiscount > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-indigo-600">Discount Applied:</span>
                                            <span className="font-medium text-indigo-600">-{couponDiscount}%</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                        <span className="font-medium">Final Cost:</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {calculateFinalCost()} credits
                                        </span>
                                    </div>

                                    {!couponCode && (
                                        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                            No coupon applied. You can still add a coupon to get a discount.
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setShowConfirmDialog(false)}
                            className="sm:flex-1 border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmitForAnalysis}
                            className="sm:flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-sm"
                        >
                            {userAnalytics?.free_analysis_available
                                ? 'Start Free Analysis'
                                : 'Proceed with Analysis'
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

