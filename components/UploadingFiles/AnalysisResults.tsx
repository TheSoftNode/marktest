import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalysisResultsProps {
    data: any;
    uploadType: 'thesis' | 'code';
}

export const AnalysisResults = ({ data, uploadType }: AnalysisResultsProps) => {
    if (uploadType === 'code') {
        const { Reason_for_mark_code, marking_code } = data;
        return (
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    Code Analysis Results
                </h2>
                
                {Object.entries(marking_code).map(([category, score]) => (
                    <Card key={category} className="bg-white/80 backdrop-blur-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg capitalize">
                                {category.replace(/_/g, ' ')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Progress value={score as number} className="h-2" />
                                <p className="text-sm text-gray-500">{score as number}%</p>
                                <p className="text-sm text-gray-700">
                                    {Reason_for_mark_code[category]}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    // Thesis analysis results
    const { Reason_for_mark, marking } = data;
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                Thesis Analysis Results
            </h2>
            
            {Object.entries(marking).map(([category, score]) => (
                <Card key={category} className="bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg capitalize">
                            {category.replace(/_/g, ' ')}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Progress value={score as number} className="h-2" />
                            <p className="text-sm text-gray-500">{score as number}%</p>
                            <p className="text-sm text-gray-700">
                                {Reason_for_mark[category]}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};