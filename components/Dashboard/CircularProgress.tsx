"use client"

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { ThesisScore } from '@/lib/types';
import { Card } from '../ui/card';

interface CircularProgressProps {
  data: ThesisScore[];
  totalScore: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ data, totalScore }) => {
  const COLORS = ['#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'];
  
  const pieData = data.map((item) => ({
    name: item.section,
    value: item.score,
  }));

  return (
    <Card className="relative aspect-square">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="text-4xl font-bold text-gray-900">{totalScore}</div>
        <div className="text-gray-500">Total Score</div>
      </motion.div>
    </Card>
  );
};