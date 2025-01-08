import React, { useState } from 'react';
import { Calendar, X, Check, Loader2, AlertCircle } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import { CouponFormData, couponFormSchema } from '@/types/coupon-dialogs';

interface CreateCouponDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: CouponFormData) => Promise<void>;
}

export const CreateCouponDialog = ({
    open,
    onOpenChange,
    onSubmit
}: CreateCouponDialogProps) => {
    const [createStatus, setCreateStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<CouponFormData>({
        resolver: zodResolver(couponFormSchema),
        defaultValues: {
            code: '',
            coupon_type: 'percentage',
            discount_value: 0,
            allowed_user_types: 'lecturer',
            valid_from: format(new Date(), 'yyyy-MM-dd HH:mm'),
            valid_until: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'),
            max_uses: 100,
            is_active: true,
            minimum_credit_amount: 0,
            analysis_types: [],
        }
    });

    const handleSubmit = async (values: CouponFormData) => {
        try {
            setCreateStatus('creating');
            setErrorMessage(null);

            await onSubmit(values);
            setCreateStatus('success');
            setTimeout(() => {
                onOpenChange(false);
                form.reset();
                setCreateStatus('idle');
            }, 1500);
        } catch (err: any) {
            console.error('Failed to create coupon:', err);
            setCreateStatus('error');
            setErrorMessage(
                err?.data?.message ||
                Object.values(err?.data || {}).flat().join(', ') ||
                'Failed to create coupon'
            );
        }
    };

    const renderSubmitButton = () => {
        switch (createStatus) {
            case 'creating':
                return (
                    <Button
                        type="submit"
                        disabled
                        className="bg-gradient-to-r from-violet-600 to-blue-600"
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
                        className="bg-gradient-to-r from-violet-600 to-blue-600"
                    >
                        Try Again
                    </Button>
                );
            default:
                return (
                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-violet-600 to-blue-600"
                    >
                        Create Coupon
                    </Button>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto lg:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-violet-700">Create New Coupon</DialogTitle>
                    <DialogDescription>
                        Create a new discount coupon for users
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid gap-6 lg:grid-cols-2">
                            <div className="space-y-4 lg:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Coupon Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter coupon code"
                                                    {...field}
                                                    className="focus-visible:ring-violet-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="coupon_type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Coupon Type</FormLabel>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger className="focus:ring-violet-500">
                                                            <SelectValue placeholder="Select coupon type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="percentage">Percentage</SelectItem>
                                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                                        <SelectItem value="analysis_count">Analysis Count</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="discount_value"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Discount Value</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        {...field}
                                                        onChange={e => field.onChange(Number(e.target.value))}
                                                        className="focus-visible:ring-violet-500"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="allowed_user_types"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Allowed User Types</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="focus:ring-violet-500">
                                                        <SelectValue placeholder="Select user type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="lecturer">Lecturers Only</SelectItem>
                                                    <SelectItem value="institution">Institutions Only</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="valid_from"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-violet-600" />
                                            <span>Valid From</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value ? new Date(field.value) : null}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        field.onChange(format(date, 'yyyy-MM-dd HH:mm'));
                                                    }
                                                }}
                                                showTimeSelect
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                className="w-full rounded-md border-violet-100 focus:ring-violet-500"
                                                wrapperClassName="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="valid_until"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-violet-600" />
                                            <span>Valid Until</span>
                                        </FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value ? new Date(field.value) : null}
                                                onChange={(date: Date | null) => {
                                                    if (date) {
                                                        field.onChange(format(date, 'yyyy-MM-dd HH:mm'));
                                                    }
                                                }}
                                                showTimeSelect
                                                dateFormat="yyyy-MM-dd HH:mm"
                                                className="w-full rounded-md border-violet-100 focus:ring-violet-500"
                                                minDate={new Date(form.watch('valid_from'))}
                                                wrapperClassName="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="max_uses"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Uses</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                                className="focus-visible:ring-violet-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minimum_credit_amount"
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="lg:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="analysis_types"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Analysis Types</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange([...field.value, value])}
                                                value={field.value[field.value.length - 1]}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="focus:ring-violet-500">
                                                        <SelectValue placeholder="Select analysis types" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="similarity">Similarity Check</SelectItem>
                                                    <SelectItem value="grammar">Grammar Check</SelectItem>
                                                    <SelectItem value="ai_detection">AI Detection</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {field.value.map((type) => (
                                                    <Badge
                                                        key={type}
                                                        variant="secondary"
                                                        className="cursor-pointer bg-violet-50 text-violet-700 hover:bg-violet-100"
                                                        onClick={() => field.onChange(field.value.filter(t => t !== type))}
                                                    >
                                                        {type}
                                                        <X className="ml-1 h-3 w-3" />
                                                    </Badge>
                                                ))}
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

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