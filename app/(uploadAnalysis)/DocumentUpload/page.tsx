"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadTypeSelector } from '@/components/UploadingFiles/UploadTypeSelector';
import CodeUploadSection from '@/components/UploadingFiles/CodeUploadSection';
import ThesisUploadCard from '@/components/UploadingFiles/ThesisUploadCard';
import { UploadProgress } from '@/components/UploadingFiles/UploadProgress';
import { UploadComplete } from '@/components/UploadingFiles/UploadComplete';
import { AnalysisProgress } from '@/components/UploadingFiles/AnalysisProgress';
import { ErrorDisplay } from '@/components/UploadingFiles/ErrorDisplay';
import AnalysisDashboard from '@/components/AnalysisDashboard/AnalysisDashboard';

type UploadState = 'upload' | 'uploading' | 'uploadComplete' | 'analyzing' | 'complete' | 'error';
type UploadType = 'thesis' | 'code';


const ThesisAnalysisFlow = () =>
{
    const [currentState, setCurrentState] = useState<UploadState>('upload');
    const [uploadType, setUploadType] = useState<UploadType>('thesis');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [analysisData, setAnalysisData] = useState<any>(null);

    const simulateProgress = (
        setProgress: (progress: number) => void,
        onComplete: () => void,
        interval = 50
    ) =>
    {
        let progress = 0;
        const timer = setInterval(() =>
        {
            progress += 2;
            setProgress(progress);
            if (progress >= 100)
            {
                clearInterval(timer);
                onComplete();
            }
        }, interval);
    };

    const onBack = () =>{
        setCurrentState('upload');
    }

    const handleFileUpload = (file: File) =>
    {
        setSelectedFile(file);
        setCurrentState('uploading');
        simulateProgress(
            setUploadProgress,
            () => setCurrentState('uploadComplete')
        );
    };

    const handleCodeFileUpload = (data: { type: string; content: File | string; preview: string }) =>
    {
        if (data.content instanceof File)
        {
            handleFileUpload(data.content);
        }
    };

    const handleStartAnalysis = (result: any) =>
    {
        setAnalysisResult(result);
        setCurrentState('analyzing');
    };

    // Add a new handler for analysis completion
    const handleAnalysisComplete = () =>
    {
        const storedData = localStorage.getItem('analysisData');
        if (storedData)
        {
            setAnalysisData(JSON.parse(storedData));
            setAnalysisResult(JSON.parse(storedData));
            setCurrentState('complete');
        }
    };

    const handleError = (errorMessage: string) =>
    {
        setError(errorMessage);
        setCurrentState('error');
    };

    const resetUpload = () =>
    {
        setCurrentState('upload');
        setUploadProgress(0);
        // setAnalysisProgress(0);
        setSelectedFile(null);
        setError('');
    };

    return (
        <>
            <div className="min-h-screen pt-20 bg-gradient-to-br from-violet-50 via-blue-50 to-white">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                <AnimatePresence mode="wait">
                    {currentState === 'complete' && analysisResult ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <AnalysisDashboard 
                                data={analysisData}
                                uploadType={uploadType}
                                onBack={onBack}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="container mx-auto px-4 py-16 max-w-3xl relative"
                        >
                            {currentState === 'upload' && (
                                <>
                                    <UploadTypeSelector
                                        uploadType={uploadType}
                                        onTypeChange={setUploadType}
                                    />
                                    {uploadType === 'thesis' ? (
                                        <ThesisUploadCard
                                            onFileSelect={handleFileUpload}
                                            onError={handleError}
                                        />
                                    ) : (
                                        <CodeUploadSection
                                            onSubmit={handleCodeFileUpload}
                                            onError={handleError}
                                        />
                                    )}
                                </>
                            )}

                            {currentState === 'uploading' && (
                                <UploadProgress
                                    uploadProgress={uploadProgress}
                                    uploadType={uploadType}
                                    fileName={selectedFile?.name || ''}
                                />
                            )}

                            {currentState === 'uploadComplete' && selectedFile && (
                                <UploadComplete
                                    fileName={selectedFile.name}
                                    file={selectedFile}
                                    onUploadAgain={resetUpload}
                                    onStartAnalysis={handleStartAnalysis}
                                    uploadType={uploadType}
                                />
                            )}

                            {currentState === 'analyzing' && (
                                <AnalysisProgress
                                    uploadType={uploadType}
                                    onAnalysisComplete={handleAnalysisComplete}
                                />
                            )}

                            {currentState === 'error' && (
                                <ErrorDisplay
                                    error={error}
                                    onTryAgain={resetUpload}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default ThesisAnalysisFlow;