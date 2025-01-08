import { z } from 'zod';

// export const couponFormSchema = z.object({
//   code: z.string().min(3, "Code must be at least 3 characters"),
//   coupon_type: z.enum(['analysis_count', 'percentage', 'fixed']),
//   discount_value: z.string().min(1, "Discount value is required"),
//   allowed_user_types: z.string(),
//   valid_from: z.string(),
//   valid_until: z.string(),
//   max_uses: z.number().min(1, "Maximum uses must be at least 1"),
//   minimum_credit_amount: z.string(),
//   analysis_types: z.array(z.string()),
// });

export const couponFormSchema = z.object({
    code: z.string().min(3, "Code must be at least 3 characters"),
    coupon_type: z.enum(['analysis_count', 'percentage', 'fixed']),
    discount_value: z.number().min(0, "Discount value must be non-negative"),
    allowed_user_types: z.enum(['lecturer', 'institution']),
    valid_from: z.string().regex(
        /^(\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?|\d{2}-\d{2}-\d{4}|\d{2}\/\d{2}\/\d{4})$/,
        "Invalid date format. Use YYYY-MM-DD, YYYY-MM-DD HH:mm, DD-MM-YYYY, or DD/MM/YYYY"
    ),
    valid_until: z.string().regex(
        /^(\d{4}-\d{2}-\d{2}( \d{2}:\d{2})?|\d{2}-\d{2}-\d{4}|\d{2}\/\d{2}\/\d{4})$/,
        "Invalid date format. Use YYYY-MM-DD, YYYY-MM-DD HH:mm, DD-MM-YYYY, or DD/MM/YYYY"
    ),
    max_uses: z.number().min(1, "Maximum uses must be at least 1"),
    is_active: z.boolean().default(true),
    minimum_credit_amount: z.number().min(0, "Minimum credit amount must be non-negative"),
    analysis_types: z.array(z.string()).min(1, "Select at least one analysis type")
});

export type CouponFormData = z.infer<typeof couponFormSchema>;