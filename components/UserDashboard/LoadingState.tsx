import { Loader2 } from 'lucide-react';

export function DashboardLoadingState() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">Loading your dashboard</h3>
                <p className="text-sm text-gray-500">Please wait while we fetch your data...</p>
            </div>
        </div>
    );
}