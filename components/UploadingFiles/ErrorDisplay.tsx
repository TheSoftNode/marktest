import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';

interface ErrorDisplayProps {
  error: string;
  onTryAgain: () => void;
}

export const ErrorDisplay = ({ error, onTryAgain }: ErrorDisplayProps) => {
  // Function to determine which emoji to show based on error message
  const getErrorEmoji = (errorMessage: string) => {
    if (errorMessage.toLowerCase().includes('administrator')) {
      return '👨‍🏫';  // Teacher/admin emoji for grade level restriction
    } else if (errorMessage.toLowerCase().includes('file')) {
      return '📁';  // File emoji for file-related errors
    } else if (errorMessage.toLowerCase().includes('upload')) {
      return '⬆️';  // Upload emoji for upload errors
    } else {
      return '⚠️';  // Default warning emoji
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-[28rem]"
      >
        <Card className="border-red-100 bg-white/95">
          <CardContent className="pt-6 pb-8 text-center space-y-6">
            <div className="text-6xl mb-4 animate-bounce">
              {getErrorEmoji(error)}
            </div>
            
            <Alert 
              variant="destructive" 
              className="mb-6 bg-red-50 border-red-200 text-red-800"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-base">
                {error}
              </AlertDescription>
            </Alert>

            <Button
              onClick={onTryAgain}
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 text-white hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 hover:!text-white border-none shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};