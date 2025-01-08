import React from 'react';
import { Button } from '@/components/ui/button';

interface UploadTypeSelectorProps
{
  uploadType: 'thesis' | 'code';
  onTypeChange: (type: 'thesis' | 'code') => void;
}

export const UploadTypeSelector = ({ uploadType, onTypeChange }: UploadTypeSelectorProps) => (
  <div className="flex gap-4 justify-center mb-6">
    <Button
      variant={uploadType === 'thesis' ? 'default' : 'outline'}
      onClick={() => onTypeChange('thesis')}
      className={uploadType === 'thesis' ? 'bg-gradient-to-r from-violet-600 to-blue-600' : ''}
    >
      Upload Thesis
    </Button>
    <Button
      variant={uploadType === 'code' ? 'default' : 'outline'}
      onClick={() => onTypeChange('code')}
      className={uploadType === 'code' ? 'bg-gradient-to-r from-violet-600 to-blue-600' : ''}
    >
      Upload Code
    </Button>
  </div>
);