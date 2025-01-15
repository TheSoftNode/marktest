// import React, { useEffect, useState } from 'react';
// import { Loader2, AlertCircle, Check } from 'lucide-react';
// import
// {
//     Dialog,
//     DialogContent,
//     DialogDescription,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter,
// } from "@/components/ui/dialog";
// import
// {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { CreditPricingTier } from '@/types/credits';

// const editPricingTierSchema = z.object({
//     min_credits: z.number().min(1, 'Minimum credits must be at least 1'),
//     max_credits: z.number().nullable().optional(),
//     price_per_credit: z.number().min(0.01, 'Price per credit must be at least 0.01'),
//     is_active: z.boolean(),
// });

// type EditPricingTierFormData = z.infer<typeof editPricingTierSchema>;

// interface EditPricingTierDialogProps
// {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     onSubmit: (values: {
//         min_credits: number;
//         max_credits?: number | null;
//         price_per_credit: number;
//         is_active: boolean;
//     }) => Promise<void>;
//     tier: CreditPricingTier;
// }

// export const EditPricingTierDialog = ({
//     open,
//     onOpenChange,
//     onSubmit,
//     tier
// }: EditPricingTierDialogProps) =>
// {
//     const [updateStatus, setUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);


//     const form = useForm<EditPricingTierFormData>({
//         resolver: zodResolver(editPricingTierSchema),
//         defaultValues: {
//             min_credits: Number(tier.min_credits),
//             max_credits: tier.max_credits ? Number(tier.max_credits) : null,
//             price_per_credit: Number(tier.price_per_credit),
//             is_active: tier.is_active
//         }
//     });

//     useEffect(() =>
//     {
//         form.reset({
//             min_credits: Number(tier.min_credits),
//             max_credits: tier.max_credits ? Number(tier.max_credits) : null,
//             price_per_credit: Number(tier.price_per_credit),
//             is_active: tier.is_active
//         });
//     }, [tier, form.reset]);

//     const handleSubmit = async (values: EditPricingTierFormData) =>
//     {
//         try
//         {
//             setUpdateStatus('updating');
//             setErrorMessage(null);

//             await onSubmit(values);
//             setUpdateStatus('success');
//             setTimeout(() =>
//             {
//                 onOpenChange(false);
//                 setUpdateStatus('idle');
//             }, 1500);
//         } catch (err: any)
//         {
//             setUpdateStatus('error');
//             setErrorMessage(
//                 err?.data?.message ||
//                 Object.values(err?.data || {}).flat().join(', ') ||
//                 'Failed to update pricing tier'
//             );
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-[600px]">
//                 <DialogHeader>
//                     <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
//                         Edit Pricing Tier
//                     </DialogTitle>
//                     <DialogDescription>
//                         Modify the credit pricing tier settings
//                     </DialogDescription>
//                 </DialogHeader>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
//                         <div className="grid gap-6 grid-cols-2">
//                             <FormField
//                                 control={form.control}
//                                 name="min_credits"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Minimum Credits</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="number"
//                                                 {...field}
//                                                 onChange={e => field.onChange(Number(e.target.value))}
//                                                 className="focus-visible:ring-violet-500"
//                                             />
//                                         </FormControl>
//                                         <FormDescription>
//                                             Starting credit amount for this tier
//                                         </FormDescription>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="max_credits"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Maximum Credits (Optional)</FormLabel>
//                                         <FormControl>
//                                             <Input
//                                                 type="number"
//                                                 {...field}
//                                                 value={field.value ?? ''}
//                                                 onChange={e =>
//                                                 {
//                                                     const value = e.target.value;
//                                                     field.onChange(value === '' ? null : Number(value));
//                                                 }}
//                                                 className="focus-visible:ring-violet-500"
//                                                 placeholder="Leave empty for unlimited"
//                                             />
//                                         </FormControl>
//                                         <FormDescription>
//                                             Upper limit for this tier (optional)
//                                         </FormDescription>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />
//                         </div>

//                         <FormField
//                             control={form.control}
//                             name="price_per_credit"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Price per Credit</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type="number"
//                                             step="0.01"
//                                             {...field}
//                                             onChange={e => field.onChange(Number(e.target.value))}
//                                             value={field.value || ''}
//                                             className="focus-visible:ring-violet-500"
//                                         />
//                                     </FormControl>
//                                     <FormDescription>
//                                         Cost per credit in this tier ($)
//                                     </FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="is_active"
//                             render={({ field }) => (
//                                 <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
//                                     <div className="space-y-0.5">
//                                         <FormLabel>Active Status</FormLabel>
//                                         <FormDescription>
//                                             Make this pricing tier available immediately
//                                         </FormDescription>
//                                     </div>
//                                     <FormControl>
//                                         <Switch
//                                             checked={field.value}
//                                             onCheckedChange={field.onChange}
//                                         />
//                                     </FormControl>
//                                 </FormItem>
//                             )}
//                         />

//                         {errorMessage && (
//                             <Alert variant="destructive">
//                                 <AlertCircle className="h-4 w-4" />
//                                 <AlertDescription>{errorMessage}</AlertDescription>
//                             </Alert>
//                         )}


//                         <DialogFooter className="gap-2">
//                             <Button
//                                 type="button"
//                                 variant="outline"
//                                 onClick={() => onOpenChange(false)}
//                                 className="border-violet-200 hover:bg-violet-50"
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 type="submit"
//                                 disabled={updateStatus === 'updating'}
//                                 className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
//                             >
//                                 {updateStatus === 'updating' ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Updating...
//                                     </>
//                                 ) : updateStatus === 'success' ? (
//                                     <>
//                                         <Check className="mr-2 h-4 w-4" />
//                                         Updated!
//                                     </>
//                                 ) : (
//                                     'Update Tier'
//                                 )}
//                             </Button>
//                         </DialogFooter>
//                     </form>
//                 </Form>
//             </DialogContent>
//         </Dialog>
//     );
// };

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, Check } from 'lucide-react';
import
    {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
        DialogFooter,
    } from "@/components/ui/dialog";
import
    {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditPricingTier } from '@/types/credits';

const editPricingTierSchema = z.object({
    min_credits: z.number().min(1, 'Minimum credits must be at least 1'),
    max_credits: z.number().nullable().optional(),
    price_per_credit: z.number().min(0.01, 'Price per credit must be at least 0.01'),
    is_active: z.boolean(),
    tier_type: z.enum(['institution', 'individual'])
});

type EditPricingTierFormData = z.infer<typeof editPricingTierSchema>;

interface EditPricingTierDialogProps
{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: {
        min_credits: number;
        max_credits?: number | null;
        price_per_credit: number;
        is_active: boolean;
        tier_type: 'institution' | 'individual';
    }) => Promise<void>;
    tier: CreditPricingTier;
}

export const EditPricingTierDialog = ({
    open,
    onOpenChange,
    onSubmit,
    tier
}: EditPricingTierDialogProps) =>
{
    const [updateStatus, setUpdateStatus] = useState<'idle' | 'updating' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<EditPricingTierFormData>({
        resolver: zodResolver(editPricingTierSchema),
        defaultValues: {
            min_credits: Number(tier.min_credits),
            max_credits: tier.max_credits ? Number(tier.max_credits) : null,
            price_per_credit: Number(tier.price_per_credit),
            is_active: tier.is_active,
            tier_type: tier.tier_type
        }
    });

    useEffect(() =>
    {
        form.reset({
            min_credits: Number(tier.min_credits),
            max_credits: tier.max_credits ? Number(tier.max_credits) : null,
            price_per_credit: Number(tier.price_per_credit),
            is_active: tier.is_active,
            tier_type: tier.tier_type
        });
    }, [tier, form.reset]);

    const handleSubmit = async (values: EditPricingTierFormData) =>
    {
        try
        {
            setUpdateStatus('updating');
            setErrorMessage(null);

            await onSubmit(values);
            setUpdateStatus('success');
            setTimeout(() =>
            {
                onOpenChange(false);
                setUpdateStatus('idle');
            }, 1500);
        } catch (err: any)
        {
            setUpdateStatus('error');
            setErrorMessage(
                err?.data?.message ||
                Object.values(err?.data || {}).flat().join(', ') ||
                'Failed to update pricing tier'
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] sm:max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Edit Pricing Tier
                    </DialogTitle>
                    <DialogDescription>
                        Modify the credit pricing tier settings
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid gap-6 grid-cols-2">
                            <FormField
                                control={form.control}
                                name="min_credits"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Minimum Credits</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                                className="focus-visible:ring-violet-500"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Starting credit amount for this tier
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="max_credits"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Credits (Optional)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={e =>
                                                {
                                                    const value = e.target.value;
                                                    field.onChange(value === '' ? null : Number(value));
                                                }}
                                                className="focus-visible:ring-violet-500"
                                                placeholder="Leave empty for unlimited"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Upper limit for this tier (optional)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="price_per_credit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price per Credit</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...field}
                                            onChange={e => field.onChange(Number(e.target.value))}
                                            value={field.value || ''}
                                            className="focus-visible:ring-violet-500"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Cost per credit in this tier (€)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tier_type"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Tier Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                            value={field.value}
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="individual" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Individuals
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0">
                                                <FormControl>
                                                    <RadioGroupItem value="institution" />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    Institutions
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormDescription>
                                        Select whether this tier is for individual users or institutions
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Active Status</FormLabel>
                                        <FormDescription>
                                            Make this pricing tier available immediately
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {errorMessage && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="border-violet-200 hover:bg-violet-50"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={updateStatus === 'updating'}
                                className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
                            >
                                {updateStatus === 'updating' ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : updateStatus === 'success' ? (
                                    <>
                                        <Check className="mr-2 h-4 w-4" />
                                        Updated!
                                    </>
                                ) : (
                                    'Update Tier'
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};