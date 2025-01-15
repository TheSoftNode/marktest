'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { CheckCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    toast.success('Payment successful! Credits have been added to your account.');
    const timer = setTimeout(() => {
      router.push('/credits');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 pb-8 text-center space-y-4">
          <div className="flex justify-center">
            <div className="rounded-full bg-gradient-to-r from-violet-100 to-blue-100 p-3">
              <CheckCircle className="h-12 w-12 text-violet-600" />
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          
          <div className="space-y-2">
            <p className="text-gray-600">
              Your credits have been added to your account successfully.
            </p>
            <p className="text-sm text-gray-500">
              You will be redirected to the credits page shortly.
            </p>
          </div>

          <div className="animate-pulse flex justify-center pt-4">
            <div className="h-2 w-2 bg-violet-600 rounded-full mx-1"></div>
            <div className="h-2 w-2 bg-purple-600 rounded-full mx-1 animate-pulse delay-100"></div>
            <div className="h-2 w-2 bg-blue-600 rounded-full mx-1 animate-pulse delay-200"></div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-violet-200 hover:bg-violet-50"
            onClick={() => router.push('/Dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Credits
          </Button>
          <Button
            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600"
            onClick={() => router.push('/Dashboard')}
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

