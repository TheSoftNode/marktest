import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ScoreItem
{
    name: string;
    score: number;
    calculatedScore: number;
}

interface ScoreSummaryCardProps
{
    chartData: ScoreItem[];
    actualScore: number;
    totalScore: number;
}

const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({ chartData, actualScore, totalScore }) =>
{
    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-center text-xl font-bold">Score Summary</CardTitle>
            </CardHeader>
         
            <CardContent>
                <div className="space-y-4">
                    <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2">
                        <div>Criterion</div>
                        <div className="text-center">Raw Score</div>
                        <div className="text-center">Calculated Score (100%)</div>
                    </div>
                    {chartData.map((item) => (
                        <div key={item.name} className="grid grid-cols-3 items-center">
                            <div className="font-medium text-gray-700">{item.name}</div>
                            <div className="text-center text-gray-600">{item.score}</div>
                            <div className="text-center text-gray-600">{item.calculatedScore.toFixed(1)}%</div>
                        </div>
                    ))}
                    <div className="grid grid-cols-3 items-center pt-2 border-t font-semibold text-gray-800">
                        <div>Total</div>
                        <div className="text-center">{totalScore}</div>
                        <div className="text-center">{actualScore.toFixed(1)}%</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ScoreSummaryCard;