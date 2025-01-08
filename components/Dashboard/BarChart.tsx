"use client"

import { ThesisScore } from '@/lib/types';
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';

interface BarChartProps {
  data: ThesisScore[];
}

export const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    name: item.section,
    score: item.score,
  }));

  return (
    <Card className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            angle={-45} 
            textAnchor="end" 
            height={80} 
            tick={{ fill: '#6B7280', fontSize: 12 }}
          />
          <YAxis tick={{ fill: '#6B7280' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Bar 
            dataKey="score" 
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </Card>
  );
};