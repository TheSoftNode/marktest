import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from 'lucide-react';

interface GradeLevelResult {
  allowed: boolean;
  message: string;
}

interface GradeLevelSelectorProps {
  onLevelSelect: (result: GradeLevelResult) => void;
}

const GradeLevelSelector: React.FC<GradeLevelSelectorProps> = ({ onLevelSelect }) => {
  const handleLowerLevel = () => {
    onLevelSelect({
      allowed: false,
      message: "Please contact your administrator for access to the junior level analysis tools."
    });
  };

  const handleUpperLevel = () => {
    onLevelSelect({
      allowed: true,
      message: ""
    });
  };

  return (
    <Card className="w-full mt-8 bg-gradient-to-br from-violet-50 via-blue-50 to-white border border-violet-200">
      <CardHeader className="space-y-4">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-violet-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
          Select Your Level
        </CardTitle>
        <CardDescription className="text-center text-gray-600 text-lg">
          Choose your level to access the appropriate analysis tools
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center p-8">
        <Button 
          onClick={handleLowerLevel}
          className="w-64 h-16 text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-violet-100 via-purple-100 to-blue-100 text-gray-700 hover:from-violet-200 hover:via-purple-200 hover:to-blue-200 border border-violet-200"
          variant="outline"
        >
          Levels 6 - 7
        </Button>
        <Button 
          onClick={handleUpperLevel}
          className="w-64 h-16 text-lg font-semibold transition-all duration-300 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-700 hover:via-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
        >
          Levels 8 - 9
        </Button>
      </CardContent>
    </Card>
  );
};

export default GradeLevelSelector;