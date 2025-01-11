import { CodeAnalysisResponse, ThesisAnalysisResponse } from "@/types/analysis";

export interface ChartDataItem {
  name: string;
  score: number;
  calculatedScore: number;
  weight: number;
}

export interface AnalysisDetailPageProps {
  analysis: ThesisAnalysisResponse | CodeAnalysisResponse;
  onBack: () => void;
}

export interface ScoreSummaryCardProps {
  chartData: ChartDataItem[];
  actualScore: number;
  totalScore: number;
}

// Helper type for getting marking fields
export type MarkingFields<T> = {
  [K in keyof T]: K extends `${string}_mark` ? T[K] : never;
}[keyof T];

// Helper type for getting feedback fields
export type FeedbackFields<T> = {
  [K in keyof T]: K extends `${string}_feedback` ? T[K] : never;
}[keyof T];