import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const pricingTierSchema = z.object({
    min_credits: z.number().min(1, 'Minimum credits must be at least 1'),
    max_credits: z.number().nullable().optional(),
    price_per_credit: z.number().min(0.01, 'Price per credit must be at least 0.01'),
    is_active: z.boolean().default(true),
});

type PricingTierFormData = z.infer<typeof pricingTierSchema>;

interface CreatePricingTierDialogProps
{
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: PricingTierFormData) => Promise<void>;
}

export const CreatePricingTierDialog = ({
    open,
    onOpenChange,
    onSubmit
}: CreatePricingTierDialogProps) =>
{
    const [createStatus, setCreateStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<PricingTierFormData>({
        resolver: zodResolver(pricingTierSchema),
        defaultValues: {
            min_credits: 1,
            max_credits: null,
            price_per_credit: 0.50,
            is_active: true,
        }
    });

    const handleSubmit = async (values: PricingTierFormData) =>
    {
        try
        {
            setCreateStatus('creating');
            // setErrorMessage(null);

            await onSubmit(values);
            setCreateStatus('success');

            setTimeout(() =>
            {
                onOpenChange(false);
                form.reset();
                setCreateStatus('idle');
            }, 1500);

        } catch (err: any)
        {
            console.error('Failed to create pricing tier:', err);
            setCreateStatus('idle');
            // setErrorMessage(
            //     err?.data?.message ||
            //     Object.values(err?.data || {}).flat().join(', ') ||
            //     'Failed to create pricing tier'
            // );
        }
    };

    const renderSubmitButton = () =>
    {
        switch (createStatus)
        {
            case 'creating':
                return (
                    <Button
                        type="submit"
                        disabled
                        className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
                    >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                    </Button>
                );
            case 'success':
                return (
                    <Button
                        type="submit"
                        disabled
                        className="bg-green-600"
                    >
                        <Check className="mr-2 h-4 w-4" />
                        Created!
                    </Button>
                );
            case 'error':
                return (
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
                    >
                        Try Again
                    </Button>
                );
            default:
                return (
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
                    >
                        Create Tier
                    </Button>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Create New Pricing Tier
                    </DialogTitle>
                    <DialogDescription>
                        Set up a new credit pricing tier with specific credit ranges and pricing
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
                                                value={field.value || ''}
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
                                            className="focus-visible:ring-violet-500"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Cost per credit in this tier ($)
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
                            {renderSubmitButton()}
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};