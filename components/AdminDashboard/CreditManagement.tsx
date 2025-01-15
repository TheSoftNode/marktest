import React, { useState } from 'react';
import
{
    Plus,
    Search,
    Loader2,
    Filter,
    DollarSign,
    CreditCard,
    Users,
    TrendingUp
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
import { format } from 'date-fns';
import
{
    useGetPricingTiersQuery,
    useCreatePricingTierMutation,
    useUpdatePricingTierMutation
} from '@/src/redux/features/dashboard/creditsApi';
import { CreatePricingTierDialog } from './CreditDialogs/CreatePricingTierDialog';
import { CreditPricingTier, EditPricingTierFormData } from '@/types/credits';
import { EditPricingTierDialog } from './CreditDialogs/EditPricingTierDialog';
import toast from 'react-hot-toast';

export const CreditManagement = () =>
{
    const [activeTab, setActiveTab] = useState('all');
    const [selectedTierType, setSelectedTierType] = useState<'all' | 'institution' | 'individual'>('all');
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [updatingTierId, setUpdatingTierId] = useState<number | null>(null);

    const { data: pricingTiers, isLoading } = useGetPricingTiersQuery({});
    const [createTier] = useCreatePricingTierMutation();
    const [updateTier] = useUpdatePricingTierMutation();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedTier, setSelectedTier] = useState<CreditPricingTier | null>(null);

    const handleEditTier = (tier: CreditPricingTier) =>
    {
        setSelectedTier(tier);
        setIsEditDialogOpen(true);
    };

    const handleUpdateTier = async (values: {
        min_credits: number;
        max_credits?: number | null;
        price_per_credit: number;
        tier_type: 'institution' | 'individual';
        is_active: boolean;
    }) =>
    {
        if (!selectedTier) return;

        try
        {
            await updateTier({
                tier_id: selectedTier.id,
                data: values
            }).unwrap();
            setIsEditDialogOpen(false);
        } catch (err)
        {
            console.error('Failed to update pricing tier:', err);
            throw err;
        }
    };



    // const handleToggleStatus = async (tier: CreditPricingTier) =>
    // {
    //     try
    //     {
    //         setUpdatingTierId(tier.id);

    //         // If we're activating, first check for potential overlaps
    //         if (!tier.is_active)
    //         {
    //             // Get all active tiers
    //             const activeTiers = pricingTiers?.filter(t =>
    //                 t.is_active && 
    //                 t.id !== tier.id && 
    //                 t.tier_type === tier.tier_type  
    //             ) || [];

    //             console.log('Active Tiers:', activeTiers);

    //             // Check for potential overlaps
    //             const hasOverlap = activeTiers.some(activeTier =>
    //             {
    //                 const activeMax = activeTier.max_credits || Infinity;
    //                 const tierMax = tier.max_credits || Infinity;

    //                 return !(
    //                     tier.min_credits >= (activeMax) ||
    //                     (tierMax) <= activeTier.min_credits
    //                 );
    //             });

    //             if (hasOverlap)
    //             {
    //                 // Show confirmation dialog to user
    //                 const confirmed = window.confirm(
    //                     `This tier overlaps with existing active tiers. Would you like to deactivate overlapping tiers?`
    //                 );

    //                 if (!confirmed)
    //                 {
    //                     setUpdatingTierId(null);
    //                     return;
    //                 }

    //                 // If confirmed, deactivate overlapping tiers first
    //                 for (const activeTier of activeTiers)
    //                 {
    //                     const activeMax = activeTier.max_credits || Infinity;
    //                     const tierMax = tier.max_credits || Infinity;

    //                     if (!(tier.min_credits >= activeMax || tierMax <= activeTier.min_credits))
    //                     {
    //                         await updateTier({
    //                             tier_id: activeTier.id,
    //                             data: {
    //                                 ...activeTier,
    //                                 is_active: false
    //                             }
    //                         }).unwrap();
    //                     }
    //                 }
    //             }
    //         }

    //         // Now proceed with the actual toggle
    //         await updateTier({
    //             tier_id: tier.id,
    //             data: {
    //                 min_credits: tier.min_credits,
    //                 price_per_credit: tier.price_per_credit,
    //                 max_credits: tier.max_credits,
    //                 tier_type: tier.tier_type,
    //                 is_active: !tier.is_active
    //             }
    //         }).unwrap();

    //         toast.success(`Tier successfully ${tier.is_active ? 'deactivated' : 'activated'}`);

    //     } catch (err: any)
    //     {
    //         console.error('Failed to toggle tier status:', err);
    //         toast.error(
    //             err?.data?.non_field_errors?.[0] ||
    //             err?.data?.message ||
    //             'Failed to update tier status'
    //         );
    //     } finally
    //     {
    //         setUpdatingTierId(null);
    //     }
    // };

    // const handleToggleStatus = async (tier: CreditPricingTier) => {
    //     try {
    //         setUpdatingTierId(tier.id);

    //         if (!tier.is_active) {
    //             const activeTiers = pricingTiers?.filter(t =>
    //                 t.is_active && 
    //                 t.id !== tier.id &&
    //                 t.tier_type === tier.tier_type
    //             ) || [];

    //             const hasOverlap = activeTiers.some(activeTier => {
    //                 const activeMax = activeTier.max_credits ? Number(activeTier.max_credits) : Infinity;
    //                 const tierMax = tier.max_credits ? Number(tier.max_credits) : Infinity;
    //                 const activeMin = Number(activeTier.min_credits);
    //                 const tierMin = Number(tier.min_credits);

    //                 return !(tierMin >= activeMax || tierMax <= activeMin);
    //             });

    //             if (hasOverlap) {
    //                 const confirmed = window.confirm(
    //                     `This tier overlaps with existing active ${tier.tier_type} tiers. Would you like to deactivate overlapping tiers?`
    //                 );

    //                 if (!confirmed) {
    //                     setUpdatingTierId(null);
    //                     return;
    //                 }

    //                 for (const activeTier of activeTiers) {
    //                     const activeMax = activeTier.max_credits ? Number(activeTier.max_credits) : Infinity;
    //                     const tierMax = tier.max_credits ? Number(tier.max_credits) : Infinity;
    //                     const activeMin = Number(activeTier.min_credits);
    //                     const tierMin = Number(tier.min_credits);

    //                     if (!(tierMin >= activeMax || tierMax <= activeMin)) {
    //                         await updateTier({
    //                             tier_id: activeTier.id,
    //                             data: {
    //                                 ...activeTier,
    //                                 is_active: false,
    //                                 tier_type: activeTier.tier_type
    //                             }
    //                         }).unwrap();
    //                     }
    //                 }
    //             }
    //         }

    //         await updateTier({
    //             tier_id: tier.id,
    //             data: {
    //                 min_credits: Number(tier.min_credits),
    //                 price_per_credit: Number(tier.price_per_credit),
    //                 max_credits: tier.max_credits ? Number(tier.max_credits) : null,
    //                 is_active: !tier.is_active,
    //                 tier_type: tier.tier_type
    //             }
    //         }).unwrap();

    //         toast.success(`Tier successfully ${tier.is_active ? 'deactivated' : 'activated'}`);

    //     } catch (err: any) {
    //         console.error('Failed to toggle tier status:', err);
    //         toast.error(
    //             err?.data?.non_field_errors?.[0] ||
    //             err?.data?.message ||
    //             'Failed to update tier status'
    //         );
    //     } finally {
    //         setUpdatingTierId(null);
    //     }
    // };

    const handleToggleStatus = async (tier: CreditPricingTier) =>
    {
        try
        {
            setUpdatingTierId(tier.id);

            // If we're activating, first check for potential overlaps
            if (!tier.is_active)
            {
                // Get all active tiers
                const activeTiers = pricingTiers?.filter(t =>
                    t.is_active && t.id !== tier.id
                ) || [];

                console.log('Active Tiers:', activeTiers);

                // Check for potential overlaps
                const hasOverlap = activeTiers.some(activeTier =>
                {
                    const activeMax = activeTier.max_credits || Infinity;
                    const tierMax = tier.max_credits || Infinity;

                    return !(
                        tier.min_credits >= (activeMax) ||
                        (tierMax) <= activeTier.min_credits
                    );
                });

                if (hasOverlap)
                {
                    // Show confirmation dialog to user
                    const confirmed = window.confirm(
                        `This tier overlaps with existing active tiers. Would you like to deactivate overlapping tiers?`
                    );

                    if (!confirmed)
                    {
                        setUpdatingTierId(null);
                        return;
                    }

                    // If confirmed, deactivate overlapping tiers first
                    for (const activeTier of activeTiers)
                    {
                        const activeMax = activeTier.max_credits || Infinity;
                        const tierMax = tier.max_credits || Infinity;

                        if (!(tier.min_credits >= activeMax || tierMax <= activeTier.min_credits))
                        {
                            await updateTier({
                                tier_id: activeTier.id,
                                data: {
                                    ...activeTier,
                                    is_active: false
                                }
                            }).unwrap();
                        }
                    }
                }
            }

            // Now proceed with the actual toggle
            await updateTier({
                tier_id: tier.id,
                data: {
                    min_credits: tier.min_credits,
                    price_per_credit: tier.price_per_credit,
                    max_credits: tier.max_credits,
                    is_active: !tier.is_active
                }
            }).unwrap();

            toast.success(`Tier successfully ${tier.is_active ? 'deactivated' : 'activated'}`);

        } catch (err: any)
        {
            console.error('Failed to toggle tier status:', err);
            toast.error(
                err?.data?.non_field_errors?.[0] ||
                err?.data?.message ||
                'Failed to update tier status'
            );
        } finally
        {
            setUpdatingTierId(null);
        }
    };

    const renderPricingTierCard = (tier: CreditPricingTier) => (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">
                            {tier.max_credits
                                ? `${tier.min_credits} - ${tier.max_credits} Credits`
                                : `${tier.min_credits}+ Credits`}
                        </CardTitle>
                        <CardDescription>
                            €{tier.price_per_credit} per credit
                            <span className="ml-2 text-xs text-violet-600">
                                ({tier.tier_type})
                            </span>
                        </CardDescription>
                    </div>
                    <Badge
                        variant={tier.is_active ? 'secondary' : 'outline'}
                        className="bg-gradient-to-r from-violet-100 to-blue-100 text-violet-700"
                    >
                        {tier.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Price Range</span>
                        <span>
                            €{(tier.min_credits * tier.price_per_credit).toFixed(2)} -
                            {tier.max_credits
                                ? ` €${(tier.max_credits * tier.price_per_credit).toFixed(2)}`
                                : ' No limit'}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Created</span>
                        <span>{format(new Date(tier.created_at), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex justify-end mt-4 space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            // disabled={updatingTierId === tier.id}
                            onClick={() => handleEditTier(tier)}
                            className="border-violet-200 hover:bg-violet-50"
                        >
                            Edit
                        </Button>
                        <Button
                            variant={tier.is_active ? "destructive" : "default"}
                            size="sm"
                            onClick={() => handleToggleStatus(tier)}
                            // disabled={updatingTierId === tier.id}
                            className={tier.is_active ? "" : "bg-gradient-to-r from-violet-600 to-blue-600"}
                        >
                            {/* {tier.is_active ? 'Deactivate' : 'Activate'} */}
                            {updatingTierId === tier.id ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {tier.is_active ? 'Deactivating...' : 'Activating...'}
                                </>
                            ) : (
                                tier.is_active ? 'Deactivate' : 'Activate'
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    const handleCreateTier = async (values: any) =>
    {
        try
        {
            await createTier(values).unwrap();
            toast.success('Pricing tier created successfully');
            setIsCreateDialogOpen(false);
        } catch (err: any)
        {
            toast.error(
                err?.data?.message ||
                'Failed to create pricing tier'
            );
        }
    };

    const filteredTiers = pricingTiers?.filter(tier =>
    {
        // Filter by tier type
        if (selectedTierType !== 'all' && tier.tier_type !== selectedTierType) return false;

        // Filter by active status
        if (activeTab === 'active' && !tier.is_active) return false;
        if (activeTab === 'inactive' && tier.is_active) return false;

        // Filter by search term
        if (searchTerm && !tier.min_credits.toString().includes(searchTerm)) return false;

        return true;
    });


    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Credit Management
                    </h1>
                    <p className="text-sm text-gray-500">Manage credit pricing and tiers</p>
                </div>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Pricing Tier
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-violet-500" />
                            <CardTitle className="text-sm font-medium">Active Tiers</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {pricingTiers?.filter(tier => tier.is_active).length || 0}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-violet-500" />
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-violet-500" />
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">€0.00</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Card>
                <CardContent className="p-6">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                            <TabsList className="bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50">
                                <TabsTrigger
                                    value="all"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    All Tiers
                                </TabsTrigger>
                                <TabsTrigger
                                    value="active"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    Active
                                </TabsTrigger>
                                <TabsTrigger
                                    value="inactive"
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    Inactive
                                </TabsTrigger>
                            </TabsList>
                            <TabsList className="bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50">
                                <TabsTrigger
                                    value="all"
                                    onClick={() => setSelectedTierType('all')}
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    All Types
                                </TabsTrigger>
                                <TabsTrigger
                                    value="individual"
                                    onClick={() => setSelectedTierType('individual')}
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    Individual
                                </TabsTrigger>
                                <TabsTrigger
                                    value="institution"
                                    onClick={() => setSelectedTierType('institution')}
                                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:via-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                                >
                                    Institution
                                </TabsTrigger>
                            </TabsList>

                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Search tiers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <TabsContent value="all" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoading ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    // pricingTiers?.map(tier => (
                                    //     <div key={tier.id}>
                                    //         {renderPricingTierCard(tier)}
                                    //     </div>
                                    // ))
                                    filteredTiers?.map(tier => (
                                        <div key={tier.id}>
                                            {renderPricingTierCard(tier)}
                                        </div>
                                    ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="active" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoading ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    pricingTiers
                                        ?.filter(tier => tier.is_active)
                                        .map(tier => (
                                            <div key={tier.id}>
                                                {renderPricingTierCard(tier)}
                                            </div>
                                        ))
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="inactive" className="mt-0">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {isLoading ? (
                                    <div className="col-span-full flex justify-center py-8">
                                        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
                                    </div>
                                ) : (
                                    pricingTiers
                                        ?.filter(tier => !tier.is_active)
                                        .map(tier => (
                                            <div key={tier.id}>
                                                {renderPricingTierCard(tier)}
                                            </div>
                                        ))
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <CreatePricingTierDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onSubmit={handleCreateTier}
            />

            {selectedTier && (
                <EditPricingTierDialog
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onSubmit={handleUpdateTier}
                    tier={selectedTier}
                />
            )}
        </div>
    );
};