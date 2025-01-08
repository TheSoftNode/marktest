// import { ActionButtonsProps } from "@/lib/types";
// import { Button } from "../ui/button";
// import { ArrowLeft, Download, Mail, MessageCircleMore, Printer, Save } from "lucide-react";
// import { useSaveAnalysisResultMutation } from '@/src/redux/features/dashboard/analysisApi';
// import toast from 'react-hot-toast';

// const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownload, onPrint, onShare, onBack }) =>
// {
//     const [saveAnalysisResult] = useSaveAnalysisResultMutation();

//     interface TransformedData {
//         analysis_type: 'thesis' | 'code';
//         file_name?: string;
//         marking: Record<string, number>;
//         Reason_for_mark: Record<string, string>;
//       }

//       const handleSave = async (data: any) => {
//         // Helper function to transform keys to lowercase with underscores
//         const transformKeys = (obj: Record<string, any>): Record<string, any> => {
//           return Object.entries(obj).reduce((acc, [key, value]) => {

//             // Convert key to lowercase and replace spaces with underscores
//             const transformedKey = key.toLowerCase().replace(/\s+/g, '_');
//             acc[transformedKey] = value;

//             // If value is a string representing a number, convert it to number
//             if (typeof value === 'string' && !isNaN(Number(value))) {
//               acc[transformedKey] = Number(value);
//             }

//             return acc;
//           }, {} as Record<string, any>);
//         };

//         try {
//           const transformedData: TransformedData = {
//             analysis_type: data.analysis_type,
//             file_name: data.file_name, // Optional
//             marking: transformKeys(data.analysis_type === 'code' ? data.marking_code : data.marking),
//             Reason_for_mark: transformKeys(
//               data.analysis_type === 'code' ? data.Reason_for_mark_code : data.Reason_for_mark
//             ),
//           };

//           // Type-safe way to remove undefined values
//           const cleanedData = Object.fromEntries(
//             Object.entries(transformedData).filter(([_, value]) => value !== undefined)
//           ) as TransformedData;

//           // Example usage with RTK Query mutation
//           const response = await saveAnalysisResult(cleanedData);
//           return response;

//         } catch (error) {
//           console.error('Error saving analysis:', error);
//           throw error;
//         }
//       };

//     return (
//         <div className="flex flex-wrap gap-4 mb-6 relative z-20">
//             <Button
//                 variant="outline"
//                 onClick={() => onBack()}
//                 className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
//             >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back to Upload
//             </Button>
//             <div className="flex-1" />
//             <Button
//                 variant="outline"
//                 onClick={() => onDownload()}
//                 className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
//             >
//                 <Download className="w-4 h-4" />
//                 Download
//             </Button>
//             <Button
//                 variant="outline"
//                 onClick={() => onPrint()}
//                 className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
//             >
//                 <Printer className="w-4 h-4" />
//                 Print
//             </Button>

//             <Button
//                 variant="outline"
//                 onClick={() => onShare('email')}
//                 className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
//             >
//                 <Mail className="w-4 h-4" />
//                 Email
//             </Button>

//             <Button
//                 onClick={handleSave}
//                 className="bg-gradient-to-r z-20 flex items-center gap-2 from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white"
//             >
//                 <Save className="mr-2 h-4 w-4" />
//                 Save Analysis
//             </Button>
//         </div>
//     )
// };

// export default ActionButtons;
"use client";

import { ActionButtonsProps } from "@/lib/types";
import { Button } from "../ui/button";
import { ArrowLeft, Download, Loader2, Mail, MessageCircleMore, Printer, Save } from "lucide-react";
import { useSaveAnalysisResultMutation } from '@/src/redux/features/dashboard/analysisApi';
import toast from 'react-hot-toast';
import { useState } from "react";
import { set } from "date-fns";

interface TransformedData
{
    analysis_type: 'thesis' | 'code';
    file_name?: string;
    marking: Record<string, number>;
    Reason_for_mark: Record<string, string>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onDownload, onPrint, onShare, onBack }) =>
{
    const [saveAnalysisResult] = useSaveAnalysisResultMutation();
    const [saving, setSaving] = useState(false);

    const transformKeys = (obj: Record<string, any>): Record<string, any> =>
    {
        return Object.entries(obj).reduce((acc, [key, value]) =>
        {
            const transformedKey = key.toLowerCase().replace(/\s+/g, '_');
            acc[transformedKey] = value;

            // Convert string numbers to actual numbers
            if (typeof value === 'string' && !isNaN(Number(value)))
            {
                acc[transformedKey] = Number(value);
            }

            return acc;
        }, {} as Record<string, any>);
    };

    const handleSave = async () =>
    {

        setSaving(true);
        try
        {
            // Get data from localStorage
            const analysisData = localStorage.getItem('analysisData');

            if (!analysisData)
            {
                toast.error('No analysis data found');
                return;
            }

            const data = JSON.parse(analysisData);

            const transformedData: TransformedData = {
                analysis_type: data.analysis_type,
                file_name: data.file_name,
                marking: transformKeys(data.analysis_type === 'code' ? data.marking_code : data.marking),
                Reason_for_mark: transformKeys(
                    data.analysis_type === 'code' ? data.Reason_for_mark_code : data.Reason_for_mark
                ),
            };

            // Remove undefined values
            const cleanedData = Object.fromEntries(
                Object.entries(transformedData).filter(([_, value]) => value !== undefined)
            ) as TransformedData;

            console.log('Cleaned data:', cleanedData);

            // Save the analysis
            const response = await saveAnalysisResult(cleanedData).unwrap();

            // Show success message
            toast.success('Analysis saved successfully');

            // Optionally clear the localStorage after successful save
            localStorage.removeItem('analysisData');
            setSaving(false);

        } catch (error)
        {
            console.error('Error saving analysis:', error);
            toast.error('Failed to save analysis');
            setSaving(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6 relative z-20">
            <Button
                variant="outline"
                onClick={onBack}
                className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Upload
            </Button>
            <div className="flex-1" />
            <Button
                variant="outline"
                onClick={onDownload}
                className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
                <Download className="w-4 h-4" />
                Download
            </Button>
            <Button
                variant="outline"
                onClick={onPrint}
                className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
                <Printer className="w-4 h-4" />
                Print
            </Button>
            <Button
                variant="outline"
                onClick={() => onShare('email')}
                className="flex items-center gap-2 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
                <Mail className="w-4 h-4" />
                Email
            </Button>
            <Button
                onClick={handleSave}
                className="bg-gradient-to-r z-20 flex items-center gap-2 from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white"
            >
                {saving ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4" />
                        Saving...
                    </>

                ) : (
                    <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Analysis
                    </>

                )}

            </Button>
        </div>
    );
};

export default ActionButtons;