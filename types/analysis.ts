export interface AnalysisStats {
    thesis: {
        total_analyses: number;
        average_score: number;
    };
    code: {
        total_analyses: number;
        average_score: number;
    };
}

export interface AnalysisType
{
  id: string;
  name: string;
  base_cost: number | string;
  description: string | null;
}

export interface AnalysisByType
{
  type: string;
  count: number;
  total_cost: number;
}

export interface UserAnalytics
{
  total_analyses: number;
  total_cost: number;
  analyses_by_type: AnalysisByType[];
  free_analysis_available: boolean;
}

export interface GlobalAnalytics
{
  total_analyses: number;
  total_cost: number;
  analyses_by_type: {
    analysis_type__name: string;
    count: number;
    total_cost: number;
  }[];
}

export interface Analysis
{
  id: string;
  analysis_type: AnalysisType;
  created_at: string;
  cost: number;
  is_free_analysis: boolean;
  final_cost: number;
}

export interface PerformAnalysisResponse
{
  analysis_id: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
  final_cost: number;
  is_free: boolean;
}

// Base interface for common fields
interface BaseAnalysis {
    user: string;  // User ID
    file_name: string;
    created_at: string;
    updated_at: string;
    analysis_type: 'code' | 'thesis';
    message: string;
    is_archived: boolean;
}

// Thesis Analysis Interface
export interface ThesisAnalysis extends BaseAnalysis {
    // Marking fields
    topic_mark: number;
    literature_mark: number;
    methodology_mark: number;
    structure_mark: number;
    data_representation_mark: number;
    research_findings_mark: number;
    conclusion_mark: number;
    publications_mark: number;
    writing_style_mark: number;
    references_mark: number;
    general_mark: number;

    // Feedback fields
    topic_feedback: string;
    literature_feedback: string;
    methodology_feedback: string;
    structure_feedback: string;
    data_representation_feedback: string;
    research_findings_feedback: string;
    conclusion_feedback: string;
    publications_feedback: string;
    writing_style_feedback: string;
    references_feedback: string;
    general_feedback: string;
}

// Code Analysis Interface
export interface CodeAnalysis extends BaseAnalysis {
    // Marking fields
    readability_mark: number;
    functionality_mark: number;
    efficiency_mark: number;
    error_handling_mark: number;
    modularity_mark: number;

    // Feedback fields
    readability_feedback: string;
    functionality_feedback: string;
    efficiency_feedback: string;
    error_handling_feedback: string;
    modularity_feedback: string;
}
