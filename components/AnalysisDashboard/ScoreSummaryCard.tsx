import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";

interface ScoreItem
{
    id?: string;
    name: string;
    score: number;
    calculatedScore: number;
    weight: number;
}

interface ScoreSummaryCardProps
{
    chartData: ScoreItem[];
    actualScore: number;
    totalScore: number;
    isEditing?: boolean;
    onScoreChange?: (name: string, score: string) => void;
    onWeightChange?: (name: string, weight: number) => void;
}


const ScoreSummaryCard: React.FC<ScoreSummaryCardProps> = ({
    chartData,
    actualScore,
    totalScore,
    isEditing = false,
    onScoreChange,
}) =>
{
    const capitalizeFirstWord = (str: string) =>
    {
        const words = str.split(' ');
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        return words.join(' ');
    };

    const totalWeight = chartData
        .filter(item => item.name !== 'overall')
        .reduce((sum, item) => sum + (item.weight / 100), 0);

    return (
        <Card className="w-full border border-indigo-100">
            <CardHeader className="bg-gradient-to-r from-violet-100 to-indigo-100 pb-6 border-b border-violet-200">
                <CardTitle className="text-center text-2xl font-bold text-violet-800">
                    Score Summary
                </CardTitle>
            </CardHeader>
            <CardHeader className="bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-100 pb-6">
                <CardTitle className="text-center text-xl font-bold">
                    <span className='text-indigo-800 mr-3'>Total score (out of 100):</span>
                    <span className='text-violet-800'>
                        {totalWeight <= 0.8
                            ? ((actualScore * 0.2) + actualScore).toFixed(1)
                            : actualScore.toFixed(1)
                        }%
                    </span>
                    {/* <span className='text-violet-800'>{((actualScore * 0.2) + actualScore).toFixed(1)}%</span> */}
                </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-4 font-semibold text-gray-800 border-b border-gray-200 pb-3 px-4">
                        <div className="text-base">Criterion</div>
                        <div className="text-center text-base">Raw Score</div>
                        <div className="text-center text-base">Weight</div>
                        <div className="text-center text-base">Weighted Score <br />
                            <span className='text-sm'>
                                {totalWeight <= 0.8
                                    ? "(out of 80%)"
                                    : "(out of 100%)"
                                }
                                
                            </span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {chartData
                            .filter((item) => item.name !== 'overall')
                            .map((item, index) => (
                                <div
                                    key={item.id || `${item.name}-${index}`}
                                    className="grid grid-cols-4 items-center gap-6 hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
                                >
                                    <div className="font-medium text-gray-900 text-base">
                                        {capitalizeFirstWord(item.name)}
                                    </div>
                                    <div className="text-center text-gray-800">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                value={item.score}
                                                onChange={(e) => onScoreChange?.(item.name, e.target.value)}
                                                min="0"
                                                max="100"
                                                className="w-28 mx-auto text-center border-gray-200 focus:border-indigo-400 focus:ring-indigo-300"
                                            />
                                        ) : (
                                            <span className="text-base">{item.score.toFixed(1)}</span>
                                        )}
                                    </div>
                                    <div className="text-center text-gray-800">
                                        {isEditing ? (
                                            <Input
                                                type="number"
                                                value={item.weight / 100}
                                                disabled
                                                readOnly
                                                className="w-28 mx-auto text-center border-none bg-transparent cursor-default disabled:opacity-100"
                                            />
                                        ) : (
                                            <span className="text-base">{item.weight / 100}</span>
                                        )}
                                    </div>
                                    <div className="text-center text-gray-800 text-base">
                                        {((item.score * item.weight) / 100).toFixed(1)}%
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-6 mt-4 border-t border-gray-200 font-semibold bg-gray-50 px-4 py-4 rounded-lg">
                        <div className="text-indigo-700 text-lg">Total</div>
                        <div className="text-center text-gray-800 text-lg">{totalScore.toFixed(1)}</div>
                        {/* <div className="text-center text-gray-800 text-lg">0.8</div> */}
                        <div className="text-center text-gray-800 text-lg">{totalWeight.toFixed(1)}</div>
                        <div className="text-center font-bold text-lg">
                            {/* <div className="text-center font-bold text-lg bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> */}
                            {actualScore.toFixed(1)}%
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export default ScoreSummaryCard;