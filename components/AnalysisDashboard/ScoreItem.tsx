import { ScoreItemProps } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ScoreItem: React.FC<ScoreItemProps> = ({ 
    label, 
    score,
    reason, 
    calculatedScore 
}) => {
return (
    <Card className="mb-4 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardHeader className="pb-2">
            <CardTitle className="flex justify-between flex-wrap gap-3 items-center">
                <span className="text-lg font-semibold capitalize">
                    {label}
                </span>
                <div className="flex items-center md:flex-row flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Score:</span>
                        <span className="text-sm font-medium">{score}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            Calculated Score: {calculatedScore.toFixed(1)}%
                        </span>
                        <div className="w-16 h-2 rounded-full bg-gradient-to-r from-violet-200 to-blue-200">
                            <div 
                                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-blue-600"
                                style={{ width: `${calculatedScore}%` }}
                            />
                        </div>
                    </div>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-700 mt-2">{reason}</p>
        </CardContent>
    </Card>
)};

export default ScoreItem;
