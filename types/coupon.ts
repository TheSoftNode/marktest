export interface Coupon {
    id: string;
    code: string;
    discount_value: number;
    coupon_type: 'analysis_count' | 'percentage' | 'fixed';
    is_active: boolean;
    created_at: string;
    valid_from: string;
    valid_until: string;
    max_uses: number;
    current_uses: number;
    minimum_credit_amount: number;
    analysis_types: string[];
    allowed_user_types: string;
}

export interface SessionCoupon {
    id: string;
    coupon_details: Coupon;
    applied_at: string;
    expires_at: string;
    user: {
        id: string;
        email: string;
        user_type: string;
    };
    status?: 'active' | 'expired' | 'revoked' | 'inactive';
    remaining_analyses?: number | null;
    revoked_info?: {
        revoked_at: string;
        revoked_by: string;
        reason: string;
    } | null;
}

export interface CouponHistory {
    total_coupons: number;
    active_coupons: SessionCoupon[];
    expired_coupons: SessionCoupon[];
    revoked_coupons: SessionCoupon[];
    inactive_coupons: SessionCoupon[];
}
export interface ApplyCouponResponse {
    applied_coupon: SessionCoupon;
    active_coupons: SessionCoupon[];
}

export interface CouponHistory {
    total_coupons: number;
    active_coupons: SessionCoupon[];
    expired_coupons: SessionCoupon[];
    revoked_coupons: SessionCoupon[];
    inactive_coupons: SessionCoupon[];
}

export interface RevokeRequestBody {
    coupon_code?: string;
    user_id?: string;
    revoke_globally?: boolean;
    reason?: string;
}

export interface RevokeResponse {
    message: string;
    revoked_count: number;
    revoked_coupons: SessionCoupon[];
}

export interface AdminAllCouponsResponse {
    summary: {
        total_coupons: number;
        active_coupons: number;
        expired_coupons: number;
        revoked_coupons: number;
        inactive_coupons: number;
    };
    filters_applied: {
        user_id?: string;
        status?: 'all' | 'active' | 'expired' | 'revoked' | 'inactive';
        coupon_type?: 'all' | 'analysis_count' | 'percentage' | 'fixed';
        from_date?: string;
        to_date?: string;
    };
    coupons: Array<{
        coupon_details: Coupon;
        usage_info: {
            total_uses: number;
            active_users: string[];  
            last_used: string | null;
        };
        status: 'active' | 'expired' | 'revoked' | 'inactive';
        revoked_info: {
            revoked_at: string;
            revoked_by: string;  
            reason: string;
        } | null;
    }>;
}

export interface AdminActiveCouponsResponse {
    summary: {
        total_active_users: number;
        total_active_coupons: number;
        coupons_by_type: {
            analysis_count: number;
            percentage: number;
            fixed: number;
        };
    };
    coupons_by_user: {
        user_info: {
            id: string;
            email: string;
            user_type: string;
        };
        coupons: {
            analysis_count: SessionCoupon[];
            percentage: SessionCoupon[];
            fixed: SessionCoupon[];
        };
        total_coupons: number;
    }[];
    all_active_coupons: {
        analysis_count: Coupon[];
        percentage: Coupon[];
        fixed: Coupon[];
    };
}

export interface CouponDetails {
    code: string;
    coupon_type: 'analysis_count' | 'percentage' | 'fixed';
    discount_value: string;
    allowed_user_types: string;
    valid_from: string;
    valid_until: string;
    max_uses: number;
    current_uses: number;
    is_active: boolean;
    minimum_credit_amount: string;
    analysis_types: string[];
  }
  
  export interface RevokedInfo {
    revoked_at: string;
    revoked_by: string;
    reason: string;
  }

  export interface ValidateCouponResponse {
    code: string;
    coupon_type: 'analysis_count' | 'percentage' | 'fixed';
    discount_value: string;
    analysis_types: string[];
    valid_until: string;
    minimum_credit_amount: string;
    discount_type: string;
    status: 'active' | 'pending' | 'expired' | 'revoked' | 'inactive' | 'fully_used';
    is_applicable: boolean;
    validation_message: string;
}
  


