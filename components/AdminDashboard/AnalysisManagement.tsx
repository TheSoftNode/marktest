import React, { useState } from 'react';
import
{
    Plus,
    Search,
    Loader2,
    AlertCircle,
    Check,
    X,
    Edit,
    ChevronDown
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
import { Textarea } from "@/components/ui/textarea";
import
{
    useGetAnalysisTypesQuery,
    useCreateAnalysisTypeMutation
} from '@/src/redux/features/dashboard/analysisApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import
{
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    base_cost: z.number().min(0, "Base cost must be non-negative"),
    description: z.string().optional()
});


export const AnalysisManagement = () =>
{
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: analysisTypes, isLoading, error } = useGetAnalysisTypesQuery();
    const [createAnalysisType, { isLoading: isCreating }] = useCreateAnalysisTypeMutation();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            base_cost: 0,
            description: ''
        }
    });

    const filteredTypes = React.useMemo(() =>
    {
        if (!analysisTypes) return [];
        return analysisTypes.filter(type =>
            type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            type.description?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [analysisTypes, searchTerm]);

    console.log(filteredTypes);

    const onSubmit = async (values: z.infer<typeof formSchema>) =>
    {
        try
        {
            console.log(values);
            await createAnalysisType(values).unwrap();
            setIsCreateDialogOpen(false);
            form.reset();
        } catch (err)
        {
            console.error('Failed to create analysis type:', err);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-purple-700 to-blue-700 bg-clip-text text-transparent">
                        Analysis Types
                    </h1>
                    <p className="text-sm text-gray-500">Manage and create analysis types</p>
                </div>
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="text-white transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Analysis Type
                </Button>
            </div>

            {/* Search and Stats Cards */}
            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 border-violet-100 hover:border-violet-200 transition-colors">
                    <CardHeader className="pb-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-violet-500" />
                            <Input
                                placeholder="Search analysis types..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8 focus-visible:ring-violet-500 border-violet-100 hover:border-violet-200"
                            />
                        </div>
                    </CardHeader>
                </Card>
                <Card className="border-violet-100 hover:border-violet-200 transition-colors">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold">Total Types</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            {analysisTypes?.length || 0}
                        </div>
                        <p className="text-xs text-violet-500 mt-1">Active analysis types</p>
                    </CardContent>
                </Card>
            </div>

            {/* Analysis Types Table */}
            <Card className="h-fit border-violet-100 hover:border-violet-200 transition-colors">
                <CardHeader>
                    <CardTitle className="text-violet-700">Analysis Types</CardTitle>
                    <CardDescription>
                        All available analysis types and their configurations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex items-center justify-center h-32">
                            <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                        </div>
                    ) : error ? (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                Failed to load analysis types. Please try again.
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <div className="rounded-md border border-violet-100">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gradient-to-r from-violet-50 to-blue-50">
                                        <TableHead className="font-semibold text-violet-700">Name</TableHead>
                                        <TableHead className="font-semibold text-violet-700">Description</TableHead>
                                        <TableHead className="text-right font-semibold text-violet-700">Base Cost</TableHead>
                                        <TableHead className="w-[100px] font-semibold text-violet-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTypes.map((type) => (
                                        <TableRow key={type.id} className="hover:bg-violet-50/50">
                                            <TableCell className="font-medium ">{type.name}</TableCell>
                                            <TableCell className="">{type.description || '-'}</TableCell>
                                            <TableCell className="text-right">
                                                {isNaN(Number(type.base_cost)) ? '0.00' : Number(type.base_cost).toFixed(2)} credits
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-violet-100 hover:text-violet-700">
                                                            <ChevronDown className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="border-violet-100">
                                                        <DropdownMenuItem className="hover:bg-violet-50 hover:text-violet-700 cursor-pointer">
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create Analysis Type Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent className="sm:max-w-[425px] border-violet-200">
                    <DialogHeader>
                        <DialogTitle className="text-violet-700">Create Analysis Type</DialogTitle>
                        <DialogDescription>
                            Add a new type of analysis to the system
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter analysis type name"
                                                {...field}
                                                className="focus-visible:ring-violet-500 border-violet-100"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="base_cost"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Base Cost (Credits)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="0"
                                                {...field}
                                                onChange={e => field.onChange(parseFloat(e.target.value))}
                                                className="focus-visible:ring-violet-500 border-violet-100"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-violet-500">
                                            Cost in credits for this analysis type
                                        </FormDescription>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="">Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter description"
                                                className="resize-none focus-visible:ring-violet-500 border-violet-100"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsCreateDialogOpen(false)}
                                    className="border-violet-200 hover:bg-violet-50 text-violet-700"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isCreating}
                                    className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white"
                                >
                                    {isCreating && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};