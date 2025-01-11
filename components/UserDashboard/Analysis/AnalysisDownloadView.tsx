
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SummaryCharts from '@/components/AnalysisDashboard/SummaryCharts';
import ScoreSummaryCard from '@/components/AnalysisDashboard/ScoreSummaryCard';
import { getDefaultWeight } from './utils';


interface DownloadViewProps
{
    analysis: any;
    marking: Record<string, number>;
    feedback: Record<string, string>;
    totalScore: number;
    chartData: any[];
}

const AnalysisDownloadView: React.FC<DownloadViewProps> = ({
    analysis,
    marking,
    feedback,
    totalScore,
    chartData,
}) =>
{
    console.log('Download View Values:', {
        marking,
        chartData,
        totalScore,
        weightedTotal: Object.entries(marking).reduce((sum, [key, score]) =>
        {
            const weight = getDefaultWeight(key);
            return sum + (Number(score) * weight);
        }, 0),
        rawTotal: Object.values(marking).reduce((sum, score) => sum + Number(score), 0)
    });

    return (
        <div className="space-y-8 p-8" id="download-content">
            {/* Page 1 - Header and Overview */}
            <div className="page-break-after">
                {/* Header */}
                <Card className={` border border-indigo-100 mb-5`}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                            {analysis.analysis_type === 'code' ? 'Code' : 'Thesis'} Analysis Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">File Name</h3>
                                <p className="text-gray-600">{analysis.file_name}</p>
                            </div>
                            <div>
                                <h3 className="font-medium text-right">Overall Score</h3>
                                <p className="text-2xl font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                                    {Number(totalScore).toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Summary Chart */}
                <div className="mb-8">

                    <SummaryCharts data={chartData} />

                </div>


            </div>

            {/* Page 2 - Detailed Feedback */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Feedback</h2>
                <div className="space-y-6">
                    {Object.entries(marking)
                        .filter(([field]) => field.toLowerCase() !== 'overall')
                        .map(([field, score]) => (
                            <Card key={field} className="border border-gray-200">
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">
                                        <span className="capitalize text-gray-900">{field.replace(/_/g, ' ')}</span>
                                        <span className="text-xl font-bold text-gray-900">{score.toFixed(1)}%</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <h4 className="text-gray-700 font-medium mb-2">Feedback:</h4>
                                        <p className="text-gray-600 whitespace-pre-wrap">{feedback[field]}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                </div>

                {/* Score Summary */}
                <div className="mt-8">
                    <ScoreSummaryCard
                        chartData={chartData}
                        actualScore={totalScore}
                        totalScore={totalScore}
                        isEditing={false}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-gray-500 text-sm mt-8 pt-8 border-t">
                <p>Generated on {new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default AnalysisDownloadView;