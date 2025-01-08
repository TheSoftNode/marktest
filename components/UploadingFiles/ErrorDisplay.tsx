// ErrorDisplay.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorDisplayProps {
  error: string;
  onTryAgain: () => void;
}

export const ErrorDisplay = ({ error, onTryAgain }: ErrorDisplayProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center"
  >
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
    <Button
      onClick={onTryAgain}
      variant="outline"
      size="lg"
    >
      Try Again
    </Button>
  </motion.div>
);