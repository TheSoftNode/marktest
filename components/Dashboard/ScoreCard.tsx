import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';


interface ScoreCardProps {
  title: string;
  score: number;
  total: number;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ title, score, total }) => {
  const percentage = (score / total) * 100;
  
  return (
    <Card className="relative overflow-hidden p-3">
      <h3 className="text-gray-600 mb-2 text-lg">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{score}/{total}</p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 left-0 h-1 bg-blue-500"
      />
    </Card>
  );
};