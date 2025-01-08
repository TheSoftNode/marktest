"use client"
import { ChartDataItem, COLORS } from "@/lib/types";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import renderActiveShape from "./renderActiveShape";
import { useWindowSize } from "@/hooks/useWindowSize";



const SummaryCharts: React.FC<{ data: ChartDataItem[] }> = ({ data }) =>
{
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const { width } = useWindowSize();

    // Calculate radius based on screen width
    const calculateRadius = () =>
    {
        if (width < 640)
        { // mobile
            return {
                inner: 60,
                outer: 90
            };
        } else if (width < 768)
        { // tablet
            return {
                inner: 90,
                outer: 120
            };
        } else
        { // desktop
            return {
                inner: 120,
                outer: 160
            };
        }
    };

    const radius = calculateRadius();


    const onPieEnter = (_: any, index: number) =>
    {
        setActiveIndex(index);
    };

    return (
        <div className="grid grid-cols-1 gap-4 pb-5">

            <Card className="bg-white/90 backdrop-blur-sm px-2 sm:px-5 py-4 min-h-[800px] sm:min-h-[600px] lg:min-h-[550px]">
                <CardHeader>
                    <CardTitle>Score Distribution (Pie Chart)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data}
                                    innerRadius={radius.inner}
                                    outerRadius={radius.outer}
                                    dataKey="calculatedScore"
                                    onMouseEnter={onPieEnter}
                                >
                                    {data.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    content={({ payload }: any) => (
                                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                                            {payload.map((entry: any, index: number) => (
                                                <div
                                                    key={`legend-${index}`}
                                                    className="flex items-center cursor-pointer"
                                                    onMouseEnter={() => setActiveIndex(index)}
                                                >
                                                    <div
                                                        className="w-3 h-3 rounded-full mr-2"
                                                        style={{
                                                            background: COLORS[index % COLORS.length],
                                                            transform: activeIndex === index ? 'scale(1.2)' : 'scale(1)',
                                                            transition: 'transform 0.3s ease'
                                                        }}
                                                    />
                                                    <span className="text-gray-600 text-sm">{entry.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
//                             </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SummaryCharts;

