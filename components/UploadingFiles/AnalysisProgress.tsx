import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle } from 'lucide-react';

interface AnalysisProgressProps
{
    uploadType: 'thesis' | 'code';
    onAnalysisComplete: () => void;
}

const ANALYSIS_PHASES = {
    thesis: [
        'Extracting document content...',
        'Analyzing structure and format...',
        'Evaluating content quality...',
        'Assessing research methodology...',
        'Reviewing literature citations...',
        'Checking writing style...',
        'Generating detailed feedback...'
    ],
    code: [
        'Parsing code structure...',
        'Analyzing code readability...',
        'Checking code functionality...',
        'Evaluating code efficiency...',
        'Assessing error handling...',
        'Reviewing code modularity...',
        'Generating code analysis report...'
    ]
} as const;

export const AnalysisProgress = ({
    uploadType,
    onAnalysisComplete
}: AnalysisProgressProps) =>
{
    const [progress, setProgress] = useState(0);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const phases = ANALYSIS_PHASES[uploadType];
    const currentPhaseIndex = Math.floor((progress / 100) * phases.length);
    const displayPhase = phases[Math.min(currentPhaseIndex, phases.length - 1)];

    const checkAnalysisResult = useCallback(() =>
    {
        const analysisData = localStorage.getItem('analysisData');
        if (analysisData && !analysisComplete)
        {
            setAnalysisComplete(true);
            // Continue progress for 30 more seconds after API response
            setTimeout(() =>
            {
                onAnalysisComplete();
            }, 30000);
        }
    }, [onAnalysisComplete, analysisComplete]);

    useEffect(() =>
    {
        let progressTimer: NodeJS.Timeout;
        let checkTimer: NodeJS.Timeout;

        // Start progress immediately
        progressTimer = setInterval(() =>
        {
            setProgress(prev =>
            {
                // Slow down progress as it gets higher
                const increment = prev < 70 ? 1 : 0.2;
                return Math.min(prev + increment, 95);
            });
        }, 200);

        // Check for analysis result every second
        checkTimer = setInterval(checkAnalysisResult, 1000);

        return () =>
        {
            clearInterval(progressTimer);
            clearInterval(checkTimer);
        };
    }, [checkAnalysisResult]);

    return (
        <div className="text-center">
            <motion.div
                className="w-24 h-24 mx-auto mb-6 rounded-full border-4 border-violet-500 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h2 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Analyzing Your {uploadType === 'thesis' ? 'Submission' : 'Code'}
            </h2>
            <p className="text-gray-600 mb-8 italic">
                {displayPhase}
            </p>
            <Card className="bg-white/80 backdrop-blur-sm mb-6">
                <CardContent className="py-4">
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-gray-500 mt-2">
                        {Math.round(progress)}% complete
                    </p>
                </CardContent>
            </Card>
            <div className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 shadow-sm">
                <AlertCircle className="w-4 h-4 mr-2 text-violet-600" />
                <p className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Please keep this window open during analysis
                </p>
            </div>
        </div>
    );
};