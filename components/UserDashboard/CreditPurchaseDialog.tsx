
import React, { useState, useEffect } from 'react';
import
{
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Info, DollarSign, CreditCardIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import
{
  useGetPricingTiersQuery,
  useCalculateCreditPriceMutation,
  useRecordPaymentMutation,
  useCreateCheckoutSessionMutation
} from '@/src/redux/features/dashboard/creditsApi';
import
{
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import
{
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaEuroSign } from 'react-icons/fa';
import { useGetMeQuery } from '@/src/redux/features/auth/authApi';

interface CreditPurchaseDialogProps
{
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function CreditPurchaseDialog({
  isOpen: externalIsOpen,
  onOpenChange: externalOnOpenChange,
  trigger
}: CreditPurchaseDialogProps)
{
  const [customCredits, setCustomCredits] = useState<string>("");
  const [purchaseMode, setPurchaseMode] = useState<'package' | 'custom'>('package');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState<string>("0.00");
  const [customRate, setCustomRate] = useState<string>("0.000");
  const [isLoading, setIsLoading] = useState(false);

  const getUserTierType = (userType?: string) =>
  {
    if (!userType) return 'individual';
    return ['student', 'lecturer'].includes(userType.toLowerCase())
      ? 'individual'
      : 'institution';
  };


  // const [recordPayment, { isLoading }] = useRecordPaymentMutation();
  // const { data: pricingTiers, isLoading: isLoadingTiers } = useGetPricingTiersQuery({ is_active: true });
  const { data: userData } = useGetMeQuery();
  const { data: pricingTiers, isLoading: isLoadingTiers } = useGetPricingTiersQuery({
    is_active: true,
    tier_type: getUserTierType(userData?.user?.user_type)
  });
  const [calculatePrice] = useCalculateCreditPriceMutation();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const userTierType = getUserTierType(userData?.user?.user_type);


  useEffect(() => {
    console.log('User Type:', userData?.user?.user_type);
    console.log('Tier Type:', userTierType);
    console.log('Pricing Tiers:', pricingTiers);
}, [userData, userTierType, pricingTiers]);


  const handleOpenChange = (open: boolean) =>
  {
    setIsOpen(open);
    externalOnOpenChange?.(open);
  };


  // Generate credit packages from pricing tiers
  const creditPackages = React.useMemo(() =>
  {
    if (!pricingTiers) return [];

    return pricingTiers.map(tier =>
    {
      const minCredits = tier.min_credits;
      const pricePerCredit = tier.price_per_credit;

      return {
        credits: minCredits,
        price: minCredits * pricePerCredit,
        popular: minCredits === 250,
        description: tier.max_credits
          ? `${tier.min_credits} - ${tier.max_credits} credits`
          : `${tier.min_credits}+ credits`
      };
    });
  }, [pricingTiers]);

  // Set initial selected package
  useEffect(() =>
  {
    if (creditPackages.length > 0 && !selectedPackage)
    {
      setSelectedPackage(creditPackages.find(pkg => pkg.popular) || creditPackages[0]);
    }
  }, [creditPackages]);

  // Update estimated price when custom credits change
  // useEffect(() =>
  // {
  //   const updateEstimatedPrice = async () =>
  //   {
  //     if (purchaseMode === 'custom' && customCredits && parseInt(customCredits) >= 5)
  //     {
  //       try
  //       {
  //         const result = await calculatePrice({ credit_amount: parseInt(customCredits) }).unwrap();
  //         setEstimatedPrice(result.total_price.toFixed(2));
  //         setCustomRate((result.total_price / parseInt(customCredits)).toFixed(3));
  //       } catch (error)
  //       {
  //         console.error('Price calculation error:', error);
  //         setEstimatedPrice("0.00");
  //         setCustomRate("0.000");
  //       }
  //     }
  //     else
  //     {
  //       setEstimatedPrice("0.00");
  //       setCustomRate("0.000");
  //     }
  //   };

  //   updateEstimatedPrice();
  // }, [customCredits, purchaseMode, calculatePrice]);

  // Update estimated price when custom credits change
useEffect(() => {
  const updateEstimatedPrice = async () => {
      if (purchaseMode === 'custom' && customCredits && parseInt(customCredits) >= 5) {
          try {
              const result = await calculatePrice({ 
                  credit_amount: parseInt(customCredits),
                  tier_type: getUserTierType(userData?.user?.user_type)  // Add tier_type
              }).unwrap();
              
              setEstimatedPrice(result.total_price.toFixed(2));
              setCustomRate((result.total_price / parseInt(customCredits)).toFixed(3));
          } catch (error) {
              console.error('Price calculation error:', error);
              setEstimatedPrice("0.00");
              setCustomRate("0.000");
          }
      } else {
          setEstimatedPrice("0.00");
          setCustomRate("0.000");
      }
  };

  updateEstimatedPrice();
}, [customCredits, purchaseMode, calculatePrice, userData?.user?.user_type]);

// Also update handlePurchase to include tier_type in calculation
const handlePurchase = async () => {
  setIsLoading(true);
  try {
      const credits = purchaseMode === 'custom' ?
          parseInt(customCredits) : selectedPackage.credits;
          
      if (purchaseMode === 'custom' && (!credits || credits < 5)) {
          toast.error('Minimum purchase is 5 credits');
          return;
      }

      // Get price calculation with tier_type
      const priceResult = await calculatePrice({ 
          credit_amount: credits,
          tier_type: getUserTierType(userData?.user?.user_type)
      }).unwrap();

      // Create checkout session
      const response = await createCheckoutSession({
          credit_amount: credits,
          dollar_amount: priceResult.total_price,
          tier_type: getUserTierType(userData?.user?.user_type)
      }).unwrap();

      setIsLoading(false);
      window.location.href = response.checkout_url;

  } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to initiate checkout');
      setIsLoading(false);
  }
};

  const handleCustomCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCustomCredits(value);
  };

  // const handlePurchase = async () =>
  // {
  //   try
  //   {
  //     const credits = purchaseMode === 'custom' ? parseInt(customCredits) : selectedPackage.credits;

  //     // Get price calculation from API
  //     const priceResult = await calculatePrice({ credit_amount: credits }).unwrap();

  //     if (purchaseMode === 'custom' && (!credits || credits < 50))
  //     {
  //       toast.error('Minimum purchase is 50 credits');
  //       return;
  //     }

  //     await toast.promise(
  //       recordPayment({
  //         credit_amount: credits,
  //         dollar_amount: priceResult.total_price
  //       }).unwrap(),
  //       {
  //         loading: 'Processing purchase...',
  //         success: `Successfully purchased ${credits} credits!`,
  //         error: 'Failed to process purchase'
  //       }
  //     );

  //     handleOpenChange(false);
  //   } catch (error)
  //   {
  //     console.error('Purchase error:', error);
  //     toast.error('Failed to process purchase');
  //   }
  // };

  //   const handlePurchase = async () => {
  //     setIsLoading(true);
  //     try {
  //         const credits = purchaseMode === 'custom' ? 
  //             parseInt(customCredits) : selectedPackage.credits;

  //         if (purchaseMode === 'custom' && (!credits || credits < 50)) {
  //             toast.error('Minimum purchase is 50 credits');
  //             return;
  //         }

  //         // Get price calculation
  //         const priceResult = await calculatePrice({ 
  //             credit_amount: credits 
  //         }).unwrap();

  //         // Create checkout session
  //         const response = await createCheckoutSession({
  //             credit_amount: credits,
  //             dollar_amount: priceResult.total_price,
  //             tier_type: "individual"
  //         }).unwrap();

  //         setIsLoading(false);
  //         // Redirect to Stripe checkout
  //         window.location.href = response.checkout_url;

  //     } catch (error) {
  //         console.error('Purchase error:', error);
  //         toast.error('Failed to initiate checkout');
  //         setIsLoading(false);
  //     }
  // };

  // const handlePurchase = async () =>
  // {
  //   setIsLoading(true);
  //   try
  //   {
  //     const credits = purchaseMode === 'custom' ?
  //       parseInt(customCredits) : selectedPackage.credits;

  //     if (purchaseMode === 'custom' && (!credits || credits < 50))
  //     {
  //       toast.error('Minimum purchase is 50 credits');
  //       return;
  //     }

  //     // Get price calculation
  //     const priceResult = await calculatePrice({
  //       credit_amount: credits
  //     }).unwrap();

  //     // Create checkout session with user's tier type
  //     const response = await createCheckoutSession({
  //       credit_amount: credits,
  //       dollar_amount: priceResult.total_price,
  //       tier_type: getUserTierType(userData?.user?.user_type)
  //     }).unwrap();

  //     setIsLoading(false);
  //     window.location.href = response.checkout_url;

  //   } catch (error)
  //   {
  //     console.error('Purchase error:', error);
  //     toast.error('Failed to initiate checkout');
  //     setIsLoading(false);
  //   }
  // };


  const getTierTypeMessage = () =>
  {
    const tierType = getUserTierType(userData?.user?.user_type);
    return (
      <div className="text-sm flex items-start gap-2 mt-2">
        <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-violet-500" />
        <p className="text-gray-600">
          You are viewing {tierType} pricing tiers based on your account type.
        </p>
      </div>
    );
  };



  if (isLoadingTiers)
  {
    return (
      <Dialog open={externalIsOpen ?? isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={externalIsOpen ?? isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[98vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Purchase Credits</DialogTitle>
          <DialogDescription>
            Choose a credit package or enter a custom amount
          </DialogDescription>
          {getTierTypeMessage()}
        </DialogHeader>

        <Tabs defaultValue="package" className="w-full" onValueChange={(v) => setPurchaseMode(v as 'package' | 'custom')}>
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-violet-100 via-purple-100 to-blue-100 p-1 rounded-lg">
            <TabsTrigger value="package" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md transition-all data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900">
              Preset Packages
            </TabsTrigger>
            <TabsTrigger value="custom" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-md transition-all data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900">
              Custom Amount
            </TabsTrigger>
          </TabsList>

          <TabsContent value="package" className="space-y-4">
            <div className="grid gap-4 py-4">
              {creditPackages.map((pkg) => (
                <div
                  key={pkg.credits}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${selectedPackage?.credits === pkg.credits
                      ? 'border-violet-600 bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50'
                      : 'border-gray-200 hover:border-purple-300'}
                  `}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.popular && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white px-2 py-1 rounded-full text-xs">
                      Popular
                    </span>
                  )}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{pkg.credits} Credits</h3>
                      <p className="text-sm text-gray-500 mt-1">{pkg.description}</p>
                      <p className="text-sm bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mt-2">
                        €{(pkg.price / pkg.credits).toFixed(3)} per credit
                      </p>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">€{pkg.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Custom Credit Amount
                </CardTitle>
                <CardDescription>Enter the number of credits you'd like to purchase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Number of Credits</label>
                  <div className="relative">
                    <Input
                      type="text"
                      value={customCredits}
                      onChange={handleCustomCreditsChange}
                      className="pl-8 border-violet-200 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Minimum 50 credits"
                    />
                    <CreditCardIcon className="absolute left-2 top-2.5 h-4 w-4 text-violet-500" />
                  </div>
                </div>


                {customCredits && (
                  <div className="p-4 bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50 rounded-lg space-y-2 border border-violet-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate per credit:</span>
                      <span className="font-medium bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        €{customRate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated total:</span>
                      <span className="font-bold text-lg bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        €{estimatedPrice}
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-sm flex items-start gap-2">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0 text-violet-500" />
                  <p className="text-gray-600">
                    Minimum purchase is 10 credits. Final price will be calculated based on the current pricing tier.
                    Payment will be processed securely.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700"
            disabled={isLoading || (purchaseMode === 'custom' && (!customCredits || parseInt(customCredits) < 50))}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <FaEuroSign className="mr-2 h-4 w-4" />
                {purchaseMode === 'custom'
                  ? `Purchase ${customCredits || '0'} Credits for €${estimatedPrice}`
                  : `Purchase ${selectedPackage?.credits || 0} Credits for €${selectedPackage?.price.toFixed(2) || '0.00'}`
                }
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreditPurchaseDialog;