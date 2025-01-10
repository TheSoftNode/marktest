import React, { useState } from 'react';
import { format } from 'date-fns';
import { Search, Filter, FileText, Code, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetMyAnalysisHistoryQuery } from '@/src/redux/features/dashboard/analysisApi';

const SavedAnalysisPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  
  const { data: analysesData, isLoading, error } = useGetMyAnalysisHistoryQuery();

  console.log(analysesData);


  const filteredAnalyses = React.useMemo(() => {
    if (!analysesData) return [];
    
    // Combine thesis and code arrays
    const allAnalyses = [...analysesData.thesis, ...analysesData.code];
    
    return allAnalyses
      .filter(analysis => {
        const matchesSearch = analysis.file_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === 'all' || analysis.analysis_type === typeFilter;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      });
  }, [analysesData, searchTerm, typeFilter, sortBy]);


  const getAnalysisBadgeColor = (type: string) => {
    return type === 'thesis' 
      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200' 
      : 'bg-gradient-to-r from-violet-50 to-blue-50 text-violet-700 border border-violet-200';
  };

  const getOverallMarkColor = (mark: number) => {
    if (mark >= 70) return 'text-emerald-600';
    if (mark >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-6 border-red-200">
          <p className="text-red-500">Error loading analyses. Please try again later.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Header with gradient background */}
        <div className="relative rounded-lg bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 p-6 text-white">
          <div className="absolute inset-0 bg-white/5 rounded-lg backdrop-blur-sm"></div>
          <div className="relative">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Saved Analysis</h1>
            <p className="text-violet-100">View and manage your collection of analyses</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-indigo-100">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-indigo-400" />
                <Input
                  placeholder="Search analyses..."
                  className="pl-8 border-indigo-200 focus:border-indigo-400 focus:ring-indigo-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] border-indigo-200">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="thesis">Thesis</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] border-indigo-200">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Analysis Table */}
        <Card className="border-indigo-100">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-violet-50 to-indigo-50 hover:from-violet-100 hover:to-indigo-100">
                  <TableHead className="text-indigo-600">File Name</TableHead>
                  <TableHead className="text-indigo-600">Type</TableHead>
                  <TableHead className="text-indigo-600">Overall Mark</TableHead>
                  <TableHead className="text-indigo-600">Date</TableHead>
                  <TableHead className="text-indigo-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5).fill(0).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[60px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredAnalyses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100">
                          <FileText className="h-6 w-6 text-indigo-600" />
                        </div>
                        <p className="text-indigo-600 font-medium">No analyses found</p>
                        <p className="text-indigo-400 text-sm">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAnalyses.map((analysis) => (
                    <TableRow 
                      key={analysis.created_at} 
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-indigo-50/50 transition-colors"
                    >
                      <TableCell className="font-medium text-indigo-900">{analysis.file_name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getAnalysisBadgeColor(analysis.analysis_type)}>
                          {analysis.analysis_type === 'thesis' ? (
                            <FileText className="mr-1 h-3 w-3" />
                          ) : (
                            <Code className="mr-1 h-3 w-3" />
                          )}
                          {analysis.analysis_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-medium ${getOverallMarkColor(analysis.overall_mark)}`}>
                          {analysis.overall_mark}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm text-indigo-600">
                          <Calendar className="mr-1 h-3 w-3" />
                          {format(new Date(analysis.created_at ?? 0), 'MMM dd, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            >
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-indigo-600 focus:text-indigo-700 focus:bg-indigo-50">
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-rose-600 focus:text-rose-700 focus:bg-rose-50">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavedAnalysisPage;