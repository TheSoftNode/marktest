import React, { useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UploadProgressProps {
  uploadProgress: number;
  uploadType: 'thesis' | 'code';
  fileName: string;
}

export const UploadProgress = ({ uploadProgress, uploadType, fileName }: UploadProgressProps) =>{
  useEffect(() =>
    {
      window.scrollTo(0, 0);
    }, [])
  
  return (
  <Card className="bg-white/80 backdrop-blur-sm">
    <CardContent className="pt-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <FileText className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium mb-1">Uploading your {uploadType}...</h3>
          <p className="text-sm text-gray-500">{fileName}</p>
          <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
        </div>
      </div>
      <Progress value={uploadProgress} className="h-2" />
    </CardContent>
  </Card>
)
};
