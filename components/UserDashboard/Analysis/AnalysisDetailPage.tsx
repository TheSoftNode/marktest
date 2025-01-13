import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Trash2, Loader2, Download } from 'lucide-react';
import
{
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SummaryCharts from '@/components/AnalysisDashboard/SummaryCharts';
import ScoreSummaryCard from '@/components/AnalysisDashboard/ScoreSummaryCard';
import { AnalysisDetailPageProps, ChartDataItem } from './type';
import { useUpdateAnalysisMutation } from '@/src/redux/features/dashboard/analysisApi';
import { calculateTotalScore, createChartData, getDefaultWeight, getFeedbackFields, getMarkingFields } from './utils';
import { useDeleteAnalysisMutation } from '@/src/redux/features/dashboard/analysisApi';
import { toast } from 'react-hot-toast';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AnalysisDownloadView from './AnalysisDownloadView';

const AnalysisDetailPage: React.FC<AnalysisDetailPageProps> = ({ analysis, onBack }) =>
{
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState(analysis);
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [deleteAnalysis, { isLoading: isDeleting }] = useDeleteAnalysisMutation();


  const marking = getMarkingFields(editedData);
  const feedback = getFeedbackFields(editedData);
  const totalScore = calculateTotalScore(marking);

  console.log('Detail Page Values:', {
    marking,
    chartData,
    totalScore,
    weightedTotal: Object.entries(marking).reduce((sum, [key, score]) =>
    {
      const weight = getDefaultWeight(key);
      return sum + (Number(score) * weight);
    }, 0),
    rawTotal: Object.values(marking).reduce((sum, score) => sum + Number(score), 0)
  });

  const [updateAnalysis, { isLoading: isSaving }] = useUpdateAnalysisMutation();

  useEffect(() =>
  {
    const marking = getMarkingFields(editedData);
    setChartData(createChartData(marking));
  }, [editedData]);

  const handleEdit = (): void =>
  {
    setIsEditing(true);
  };

  const handleSave = async (): Promise<void> =>
  {
    try
    {
      await updateAnalysis({
        analysis_id: editedData.id,
        analysis_type: editedData.analysis_type,
        data: editedData
      }).unwrap();
      toast.success('Analysis updated successfully');
      setIsEditing(false);
    } catch (error)
    {
      console.error('Error updating analysis:', error);
    }
  };

  const handleScoreChange = (field: string, value: string): void =>
  {
    setEditedData(prev => ({
      ...prev,
      [`${field}_mark`]: Number(value)
    }));
  };

  const handleFeedbackChange = (field: string, value: string): void =>
  {
    setEditedData(prev => ({
      ...prev,
      [`${field}_feedback`]: value
    }));
  };

  const handleDelete = async () =>
  {
    try
    {
      // Show loading state immediately
      setIsDeleteDialogOpen(false);

      // Navigate back first (better UX)
      onBack();

      // Then perform deletion
      await deleteAnalysis({
        analysis_id: editedData.id,
        analysis_type: editedData.analysis_type
      }).unwrap();

      // Show success message
      toast.success('Analysis deleted successfully');

    } catch (error)
    {
      console.error('Error deleting analysis:', error);
      toast.error('Failed to delete analysis');
    }
  };

  // const handleDownload = async () =>
  // {
  //   try
  //   {
  //     const content = document.getElementById('download-content');
  //     if (!content) return;

  //     const canvas = await html2canvas(content, {
  //       scale: 2,
  //       backgroundColor: '#ffffff',
  //       windowWidth: content.scrollWidth,
  //       windowHeight: content.scrollHeight
  //     });

  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save(`${editedData.file_name}-analysis.pdf`);
  //   } catch (error)
  //   {
  //     console.error('Error generating PDF:', error);
  //   }
  // };

  // Add or modify state:

  const handleDownload = async () =>
  {
    try
    {
      const content = document.getElementById('download-content');
      if (!content) return;

      const canvas = await html2canvas(content, {
        scale: 2,
        backgroundColor: '#ffffff',
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const totalPages = Math.ceil(imgHeight * ratio / pdfHeight);

      for (let page = 0; page < totalPages; page++)
      {
        if (page > 0)
        {
          pdf.addPage();
        }

        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          -(page * pdfHeight),
          imgWidth * ratio,
          imgHeight * ratio
        );
      }

      pdf.save(`${editedData.file_name}-analysis.pdf`);
    } catch (error)
    {
      console.error('Error generating PDF:', error);
    }
  };

  const totalWeight = Object.entries(marking)
    .filter(([key]) => key.toLowerCase() !== 'overall')
    .reduce((sum, [key]) => sum + getDefaultWeight(key), 0);


  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {!isEditing && (
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-violet-600 to-blue-600 text-white"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleEdit}
              >
                Edit Analysis
              </Button>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>


      {/* Content */}
      <div className="space-y-6">
        {/* Header Card */}

        <Card className={`${!isEditing ? "hidden" : ""} border border-indigo-100`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {editedData.analysis_type === 'code' ? 'Code' : 'Thesis'} Analysis Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">File Name</h3>
                <p className="text-gray-600">{editedData.file_name}</p>
              </div>
              <div>
                <h3 className="font-bold text-right">Overall Score (
                  <span className='text-indigo-600'>
                    out of 100%
                  </span>
                  )
                </h3>
                <p className="text-2xl font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {/* {((Number(totalScore) * 0.2) + (Number(totalScore))).toFixed(1)}% */}
                  {totalWeight <= 0.8
                    ? ((Number(totalScore) * 0.2) + Number(totalScore)).toFixed(1)
                    : totalScore.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>


        <div className={`${!isEditing ? "hidden" : ""} border border-indigo-100`}>
          <SummaryCharts data={chartData} />
        </div>



        {!isEditing ? (
          <div className="space-y-6"> {/* Changed to vertical layout */}
            {/* Analysis View */}
            <div className="w-full">
              {/* <div className="w-full bg-white/90 backdrop-blur-sm rounded-lg border border-indigo-100"> */}
              <AnalysisDownloadView
                analysis={editedData}
                marking={marking}
                feedback={feedback}
                // totalScore={totalScore}
                totalScore={
                  Object.entries(marking)
                    .filter(([key]) => key.toLowerCase() !== 'overall')
                    .reduce((sum, [_, score]) => sum + score, 0)
                }
                // totalScore={Object.values(marking).reduce((sum, score) => sum + score, 0)}
                chartData={chartData}
              />
            </div>

            {/* Score Summary - Full Width */}
            <div className="w-full hidden">
              <ScoreSummaryCard
                chartData={chartData}
                actualScore={totalScore}
                // totalScore={totalScore}
                // totalScore={Object.values(marking).reduce((sum, score) => sum + score, 0)}
                totalScore={
                  Object.entries(marking)
                    .filter(([key]) => key.toLowerCase() !== 'overall')
                    .reduce((sum, [_, score]) => sum + score, 0)
                }
                isEditing={isEditing}
                onScoreChange={handleScoreChange}
              // onWeightChange={handleWeightChange}
              />
            </div>

            {/* Hidden download content */}
            <div className="hidden">
              <div id="download-content">
                <AnalysisDownloadView
                  analysis={editedData}
                  marking={marking}
                  feedback={feedback}
                  totalScore={
                    Object.entries(marking)
                      .filter(([key]) => key.toLowerCase() !== 'overall')
                      .reduce((sum, [_, score]) => sum + score, 0)
                  }
                  // totalScore={totalScore}
                  // totalScore={Object.values(marking).reduce((sum, score) => sum + score, 0)}
                  chartData={chartData}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6"> {/* Changed to vertical layout */}
            {/* Editing Form */}
            <div className="w-full space-y-6">
              {Object.entries(marking)
                .filter(([field]) => field.toLowerCase() !== 'overall')
                .map(([field, score]) => (
                  <Card key={field} className="bg-white/90 backdrop-blur-sm border border-indigo-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold capitalize text-indigo-700">
                        {field.replace(/_/g, ' ')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Score</label>
                        <Input
                          type="number"
                          value={score}
                          onChange={(e) => handleScoreChange(field, e.target.value)}
                          disabled={!isEditing}
                          min="0"
                          max="100"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Feedback</label>
                        <Textarea
                          value={feedback[field]}
                          onChange={(e) => handleFeedbackChange(field, e.target.value)}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            {/* Score Summary - Full Width */}
            <div className="w-full">
              <ScoreSummaryCard
                chartData={chartData}
                actualScore={totalScore}
                // totalScore={totalScore}
                totalScore={
                  Object.entries(marking)
                    .filter(([key]) => key.toLowerCase() !== 'overall')
                    .reduce((sum, [_, score]) => sum + score, 0)
                }
                // totalScore={
                //   Object.values(marking)
                //   .reduce((sum, score) => sum + score, 0)
                // }
                isEditing={isEditing}
                onScoreChange={handleScoreChange}
              />
            </div>
          </div>
        )}
      </div>



      {/* Delete Confirmation Dialog */}
      {/* <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
              {
                // Add delete logic here
                onBack();
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your analysis.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AnalysisDetailPage;