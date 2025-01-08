import React, { useState } from 'react';
import
{
    Plus,
    Search,
    Loader2,
    Filter,
    Users,
    Clock,
    Check,
    ChevronDown,
    X
} from 'lucide-react';
import
{
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import
{
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SessionCoupon } from '@/types/coupon';
import
{
    useGetAdminAllCouponsQuery,
    useGetAdminActiveCouponsQuery,
    useCreateCouponMutation,
    useRevokeCouponMutation,
} from '@/src/redux/features/dashboard/couponApi';
import { format, parseISO } from 'date-fns';
import { CouponFormData } from '@/types/coupon-dialogs';
import { CreateCouponDialog } from './CouponDialogs/CreateCouponDialog';
import { RevokeCouponDialog } from './CouponDialogs/RevokeCouponDialog';

export const CouponManagement = () =>
{
    const [activeTab, setActiveTab] = useState('all');
    const [filters, setFilters] = useState({});
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null);
    const [revokeReason, setRevokeReason] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // API Queries
    const { data: allCoupons, isLoading: isLoadingAll } = useGetAdminAllCouponsQuery(filters);
    const { data: activeCoupons, isLoading: isLoadingActive } = useGetAdminActiveCouponsQuery({});

    console.log('allCoupons:', allCoupons);

    const [createCoupon] = useCreateCouponMutation();
    const [revokeCoupon] = useRevokeCouponMutation();

    // Handlers
    const handleCreateCoupon = async (values: CouponFormData) =>
    {
        try
        {
            await createCoupon(values).unwrap();
            setIsCreateDialogOpen(false);
        } catch (err)
        {
            console.error('Failed to create coupon:', err);
        }
    };

    const handleRevokeCoupon = async () =>
    {
        if (!selectedCoupon) return;

        try
        {
            await revokeCoupon({
                coupon_code: selectedCoupon,
                reason: revokeReason,
            }).unwrap();
            setIsRevokeDialogOpen(false);
            setSelectedCoupon(null);
            setRevokeReason('');
        } catch (err)
        {
            console.error('Failed to revoke coupon:', err);
        }
    };

    // const renderCouponCard = (couponData: { coupon_details: any, status: string, usage_info?: any }) => (
    //     <Card key={couponData.coupon_details.id} className="hover:shadow-md transition-shadow">
    //         <CardHeader className="pb-3">
    //             <div className="flex justify-between items-start">
    //                 <div>
    //                     <CardTitle className="text-lg">{couponData.coupon_details.code}</CardTitle>
    //                     <CardDescription>
    //                         {couponData.coupon_details.coupon_type === 'percentage' && `${couponData.coupon_details.discount_value}% off`}
    //                         {couponData.coupon_details.coupon_type === 'fixed' && `$${couponData.coupon_details.discount_value} off`}
    //                         {couponData.coupon_details.coupon_type === 'analysis_count' && `${couponData.coupon_details.discount_value} free analyses`}
    //                     </CardDescription>
    //                 </div>
    //                 <Badge
    //                     variant={
    //                         couponData.status === 'active' ? 'secondary' :
    //                             couponData.status === 'expired' ? 'outline' :
    //                                 couponData.status === 'revoked' ? 'destructive' : 'secondary'
    //                     }
    //                     className="flex items-center gap-1"
    //                 >
    //                     {couponData.status === 'active' && <Check className="h-3 w-3" />}
    //                     {couponData.status}
    //                 </Badge>
    //             </div>
    //         </CardHeader>
    //         <CardContent className="space-y-2">
    //             <div className="flex justify-between text-sm">
    //                 <span className="text-muted-foreground">Uses</span>
    //                 <span>{couponData.usage_info ? `${couponData.usage_info.total_uses}/${couponData.coupon_details.max_uses}` :
    //                     `${couponData.coupon_details.current_uses}/${couponData.coupon_details.max_uses}`}</span>
    //             </div>
    //             <div className="flex justify-between text-sm">
    //                 <span className="text-muted-foreground flex items-center">
    //                     <Clock className="h-4 w-4 mr-1" />
    //                     Expires
    //                 </span>
    //                 <span>{format(parseISO(couponData.coupon_details.expires_at), 'MMM dd, yyyy')}</span>
    //             </div>
    //             {couponData.status === 'active' && (
    //                 <div className="flex justify-end mt-4">
    //                     <Button
    //                         variant="destructive"
    //                         size="sm"
    //                         onClick={() =>
    //                         {
    //                             setSelectedCoupon(couponData.coupon_details.code);
    //                             setIsRevokeDialogOpen(true);
    //                         }}
    //                     >
    //                         Revoke
    //                     </Button>
    //                 </div>
    //             )}
    //         </CardContent>
    //     </Card>
    // );

    const renderCouponCard = (couponData: { coupon_details: any, status: string, usage_info?: any }) => (
        <Card key={couponData.coupon_details.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{couponData.coupon_details.code}</CardTitle>
                        <CardDescription>
                            {couponData.coupon_details.coupon_type === 'percentage' && `${couponData.coupon_details.discount_value}% off`}
                            {couponData.coupon_details.coupon_type === 'fixed' && `$${couponData.coupon_details.discount_value} off`}
                            {couponData.coupon_details.coupon_type === 'analysis_count' && `${couponData.coupon_details.discount_value} free analyses`}
                        </CardDescription>
                    </div>
                    <Badge
                        variant={
                            couponData.status === 'active' ? 'secondary' :
                                couponData.status === 'expired' ? 'outline' :
                                    couponData.status === 'revoked' ? 'destructive' : 'secondary'
                        }
                        className="flex items-center gap-1"
                    >
                        {couponData.status === 'active' && <Check className="h-3 w-3" />}
                        {couponData.status}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uses</span>
                    <span>{couponData.usage_info ? `${couponData.usage_info.total_uses}/${couponData.coupon_details.max_uses}` :
                        `${couponData.coupon_details.current_uses}/${couponData.coupon_details.max_uses}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Expires
                    </span>
                    <span>
                        {couponData.coupon_details.expires_at ?
                            format(parseISO(couponData.coupon_details.expires_at), 'MMM dd, yyyy') :
                            'No expiration'}
                    </span>
                </div>
                {couponData.status === 'active' && (
                    <div className="flex justify-end mt-4">
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                            {
                                setSelectedCoupon(couponData.coupon_details.code);
                                setIsRevokeDialogOpen(true);
                            }}
                        >
                            Revoke
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );


    const filteredCoupons = React.useMemo(() =>
    {
        if (!allCoupons?.coupons) return [];
        return allCoupons.coupons.filter(coupon =>
            coupon.coupon_details.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [allCoupons, searchTerm]);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-violet-700">Coupon Management</h1>
                    <p className="text-sm text-gray-500">Create and manage discount coupons</p>
                </div>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="hover:bg-gray-950 bg-gray-900"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Coupon
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allCoupons?.summary.total_coupons || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-violet-500" />
                            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeCoupons?.summary.total_active_users || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Active Coupons</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{allCoupons?.summary.active_coupons || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs and Filters */}
            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <TabsList className="bg-violet-50">
                                <TabsTrigger
                                    value="all"
                                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                                >
                                    All Coupons
                                </TabsTrigger>
                                <TabsTrigger
                                    value="active"
                                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                                >
                                    Active
                                </TabsTrigger>
                                <TabsTrigger
                                    value="expired"
                                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                                >
                                    Expired
                                </TabsTrigger>
                                <TabsTrigger
                                    value="revoked"
                                    className="data-[state=active]:bg-violet-600 data-[state=active]:text-white"
                                >
                                    Revoked
                                </TabsTrigger>
                            </TabsList>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                    <Input
                                        placeholder="Search coupons..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8"
                                    />
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[200px]">
                                        <DropdownMenuItem>All Types</DropdownMenuItem>
                                        <DropdownMenuItem>Percentage</DropdownMenuItem>
                                        <DropdownMenuItem>Fixed Amount</DropdownMenuItem>
                                        <DropdownMenuItem>Analysis Count</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoadingAll ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : filteredCoupons.map(coupon => (
                                    <div key={coupon.coupon_details.code}>
                                        {renderCouponCard({
                                            coupon_details: {
                                                ...coupon.coupon_details,
                                                expires_at: coupon.coupon_details.valid_until
                                            },
                                            status: coupon.status,
                                            usage_info: coupon.usage_info
                                        })}
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent value="active" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoadingActive ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    Object.entries(activeCoupons?.all_active_coupons || {}).map(([type, coupons]) =>
                                        coupons.map(coupon => (
                                            <div key={coupon.code}>
                                                {renderCouponCard({
                                                    coupon_details: {
                                                        ...coupon,
                                                        expires_at: coupon.valid_until
                                                    },
                                                    status: 'active'
                                                })}
                                            </div>
                                        ))
                                    )
                                )}
                            </div>

                        </TabsContent>

                        <TabsContent value="expired" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoadingActive ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    Object.entries(activeCoupons?.all_active_coupons || {}).map(([type, coupons]) =>
                                        coupons.map(coupon => (
                                            <div key={coupon.code}>
                                                {renderCouponCard({
                                                    coupon_details: {
                                                        ...coupon,
                                                        expires_at: coupon.valid_until
                                                    },
                                                    status: 'expired'
                                                })}
                                            </div>
                                        ))
                                    )
                                )}
                            </div>

                        </TabsContent>

                        <TabsContent value="revoked" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoadingActive ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    Object.entries(activeCoupons?.all_active_coupons || {}).map(([type, coupons]) =>
                                        coupons.map(coupon => (
                                            <div key={coupon.code}>
                                                {renderCouponCard({
                                                    coupon_details: {
                                                        ...coupon,
                                                        expires_at: coupon.valid_until
                                                    },
                                                    status: 'revoked'
                                                })}
                                            </div>
                                        ))
                                    )
                                )}
                            </div>

                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>

            {/* Dialogs */}
            <CreateCouponDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleCreateCoupon}
            />

            <RevokeCouponDialog
                open={isRevokeDialogOpen}
                onOpenChange={setIsRevokeDialogOpen}
                onRevoke={handleRevokeCoupon}
                revokeReason={revokeReason}
                onReasonChange={setRevokeReason}
                selectedCouponCode={selectedCoupon}
            />
        </div>
    );
};