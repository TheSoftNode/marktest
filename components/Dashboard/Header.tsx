import React from 'react';
import { motion } from 'framer-motion';
import { FiShare2, FiDownload } from 'react-icons/fi';
import { fadeIn } from '@/lib/animation';

interface HeaderProps {
  aiPercentage: number;
  onShare: () => void;
  onDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ aiPercentage, onShare, onDownload }) => {
  return (
    <motion.div 
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          Here is the final report of the Thesis Uploaded!
        </h1>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">AI used in the assignment</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {aiPercentage}%
          </span>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button
          onClick={onShare}
          className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors duration-200"
        >
          <FiShare2 className="w-5 h-5 mr-2" />
          Share
        </button>
        <button
          onClick={onDownload}
          className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FiDownload className="w-5 h-5 mr-2" />
          Download Report
        </button>
      </div>
    </motion.div>
  );
};