import { ThesisAnalysisResponse, CodeAnalysisResponse } from '@/types/analysis';
import { ChartDataItem } from './type';

export const getMarkingFields = (analysis: ThesisAnalysisResponse | CodeAnalysisResponse): Record<string, number> => {
  return Object.entries(analysis).reduce((acc, [key, value]) => {
    if (key.endsWith('_mark') && typeof value === 'number') {
      acc[key.replace('_mark', '')] = value;
    }
    return acc;
  }, {} as Record<string, number>);
};

export const getFeedbackFields = (analysis: ThesisAnalysisResponse | CodeAnalysisResponse): Record<string, string> => {
  return Object.entries(analysis).reduce((acc, [key, value]) => {
    if (key.endsWith('_feedback') && typeof value === 'string') {
      acc[key.replace('_feedback', '')] = value;
    }
    return acc;
  }, {} as Record<string, string>);
};


export const getDefaultWeight = (key: string): number => {
  const weightMap: Record<string, number> = {
    abstract: 0.05,
    introduction: 0.05,
    literature_review: 0.2,
    methodology: 0.1,
    results_findings: 0.25,
    conclusions_recommendations: 0.1,
    references: 0.05,
    // Code analysis weights
    readability: 0.2,
    functionality: 0.2,
    efficiency: 0.2,
    error_handling: 0.2,
    modularity: 0.2,
  };
  
  const normalizedKey = key.toLowerCase().replace(/ /g, '_');
  return weightMap[normalizedKey] || 0.1; 
};

export const createChartData = (marking: Record<string, number>): ChartDataItem[] => {
  return Object.entries(marking)
  .filter(([key]) => key.toLowerCase() !== 'overall')
  .map(([key, value]) => ({
    name: key.replace(/_/g, ' '),
    score: value,
    calculatedScore: value * getDefaultWeight(key),
    weight: getDefaultWeight(key) * 100 
  }));
};

// Update calculateTotalScore to use weights
export const calculateTotalScore = (marking: Record<string, number>): number => {
  return Object.entries(marking)
  .filter(([key]) => key.toLowerCase() !== 'overall')
  .reduce((total, [key, score]) => {
    const weight = getDefaultWeight(key);
    return total + (Number(score) * weight);
  }, 0);
};

// export const calculateTotalScore = (marking: Record<string, number>): number => {
//   const scores = Object.values(marking);
//   if (scores.length === 0) return 0;
//   const total = scores.reduce((sum, score) => sum + score, 0);
//   return (total / (scores.length * 100)) * 100;
// };

// export const createChartData = (marking: Record<string, number>): ChartDataItem[] => {
//   return Object.entries(marking).map(([key, value]) => ({
//     name: key.replace(/_/g, ' '),
//     score: value,
//     calculatedScore: (value / 100) * 100

//   }));
// };