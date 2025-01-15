'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function PaymentCancelledPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error('Payment was cancelled.');
    const timer = setTimeout(() => {
      router.push('/Dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 pb-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-red-50 p-3">
              <XCircle className="h-12 w-12 text-red-500" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-red-600">
            Payment Cancelled
          </h1>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Your credit purchase was not completed.
            </p>
            <p className="text-sm text-gray-500">
              You can try again or contact support if you need assistance.
            </p>
          </div>

          <div className="animate-pulse flex justify-center pt-4">
            <div className="h-2 w-2 bg-red-300 rounded-full mx-1"></div>
            <div className="h-2 w-2 bg-red-400 rounded-full mx-1 animate-pulse delay-100"></div>
            <div className="h-2 w-2 bg-red-500 rounded-full mx-1 animate-pulse delay-200"></div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-red-200 hover:bg-red-50"
            onClick={() => router.push('/Dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Credits
          </Button>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600"
            onClick={() => router.push('/Dashboard')}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}