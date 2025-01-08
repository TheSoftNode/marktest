import React from 'react';
import { motion } from 'framer-motion';
import { LiteratureReviewTip } from '@/lib/types';
import { Card } from '../ui/card';
import { staggerContainer } from '@/lib/animation';

interface LiteratureReviewTipsProps {
  tips: LiteratureReviewTip[];
}

export const LiteratureReviewTips: React.FC<LiteratureReviewTipsProps> = ({ tips }) => {
  return (
    <Card className='p-4'>
      <h3 className="text-xl font-bold mb-6 text-gray-900">Literature Review Tips</h3>
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            variants={staggerContainer}
            className="border-b border-gray-100 pb-4 last:border-b-0"
          >
            <h4 className="font-semibold mb-2 text-gray-800">
              {tip.id}. {tip.title}
            </h4>
            <p className="text-gray-600 italic text-sm">
              "{tip.description}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Card>
  );
};