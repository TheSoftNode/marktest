import React from 'react';
import { motion } from 'framer-motion';
import { ThesisScore } from '@/lib/types';
import { Card } from '../ui/card';
import { staggerContainer } from '@/lib/animation';


interface ScoreBreakdownProps {
  scores: ThesisScore[];
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scores }) => {
  return (
    <Card className='p-4'>
      <h3 className="text-xl font-bold mb-6 text-gray-900">Score Breakdown</h3>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {scores.map((score, index) => (
          <motion.div
            key={index}
            variants={staggerContainer}
            className="flex justify-between items-center"
          >
            <span className="text-gray-600">{score.section}</span>
            <span className="font-semibold text-gray-900">{score.score}</span>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
};