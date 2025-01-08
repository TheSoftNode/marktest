import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ThesisUploadCardProps
{
    onFileSelect: (file: File) => void;
    onError: (error: string) => void;
}

export const ThesisUploadCard = ({ onFileSelect, onError }: ThesisUploadCardProps) =>
{
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() =>
    {
        window.scrollTo(0, 0);
    }, []);


    const validateFile = (file: File) =>
    {
        if (file.size > 100 * 1024 * 1024)
        {
            onError('File size exceeds 20MB limit');
            return false;
        }

        if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
            .includes(file.type))
        {
            onError('Please upload PDF or Word documents only');
            return false;
        }

        return true;
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const file = e.target.files?.[0];
        if (!file) return;

        if (validateFile(file))
        {
            onFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) =>
    {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) =>
    {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file)
        {
            if (validateFile(file))
            {
                onFileSelect(file);
            }
        }
    };

    return (
        <Card
            className="border-2 border-dashed border-violet-200 bg-white/50 backdrop-blur-sm"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <CardContent className="pt-16 pb-16">
                <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="fileInput"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                />
                <div className="cursor-pointer flex flex-col items-center">
                    <motion.div
                        className="w-20 h-20 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-full flex items-center justify-center mb-6"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                        Upload Your Thesis
                    </h2>
                    <p className="text-gray-600 mb-6 text-center max-w-md">
                        Drag and drop your thesis document here or click to browse
                        <br />
                        <span className="text-sm">PDF or Word documents up to 100MB</span>
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Choose File
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ThesisUploadCard;