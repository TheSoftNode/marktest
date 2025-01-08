import React, { useState, useRef, useEffect } from 'react';
import { Code, Eye, X, FileCode } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CodeUploadSectionProps {
  onSubmit: (data: { type: string; content: File | string; preview: string }) => void;
  onError?: (error: string) => void;
}

const CodeUploadSection: React.FC<CodeUploadSectionProps> = ({ onSubmit, onError }) => {
  const [codeText, setCodeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() =>
    {
      window.scrollTo(0, 0);
    }, [])
  

  const ALLOWED_EXTENSIONS = ['.html', '.css', '.js', '.py', '.json', '.yml', '.yaml', '.ipynb'];
  const MAX_CODE_LENGTH = 50000; 

  const LANGUAGE_EXTENSIONS = {
    'HTML': '.html',
    'CSS': '.css', 
    'JavaScript': '.js',
    'Python': '.py',
    'JSON': '.json',
    'YAML': '.yml',
    'Jupyter Notebook': '.ipynb'
  };

  const CODE_VALIDATORS = {
    'HTML': (code: string) => /^\s*<!DOCTYPE\s+html|<html\s*>|<head>|<body>/i.test(code) || 
                                /\s*<\w+(\s+\w+=['"]\w+['"])*\s*>/.test(code),
    'CSS': (code: string) => /^\s*[a-z0-9\s]*\{[^}]*\}/.test(code) || 
                              /^\s*@(media|keyframes|import|font-face)/.test(code),
    'JavaScript': (code: string) => /^(const|let|var)\s+\w+\s*=|function\s*\w*\s*\(|\(\)\s*=>\s*\{|class\s+\w+/.test(code),
    'Python': (code: string) => /^\s*def\s+\w+\s*\(|import\s+\w+|class\s+\w+:/.test(code),
    'JSON': (code: string) => {
      try {
        JSON.parse(code);
        return true;
      } catch {
        return false;
      }
    },
    'YAML': (code: string) => /^[a-zA-Z0-9_-]+\s*:/.test(code),
    'Jupyter Notebook': (code: string) => code.includes('"cells":') && code.includes('"metadata":')
  };

  const validateFile = (file: File) => {
    const extension = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      const errorMessage = `Invalid file type. Allowed types: ${ALLOWED_EXTENSIONS.join(', ')}`;
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    }
    if (file.size > 20 * 1024 * 1024) {
      const errorMessage = 'File size exceeds 20MB limit';
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    }
    return true;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    if (!file) return;
    
    if (validateFile(file)) {
      setSelectedFile(file);
      const text = await file.text();
      setPreview(text);
    }
  };

  const handleCodePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setError('');
    if (text.length > MAX_CODE_LENGTH) {
      const errorMessage = `Code length exceeds ${MAX_CODE_LENGTH} characters`;
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }
    setCodeText(text);
    setPreview(text);
  };

  const validatePastedCode = () => {
    if (!selectedLanguage) {
      const errorMessage = 'Please select a language for the pasted code';
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    }

    const validator = CODE_VALIDATORS[selectedLanguage as keyof typeof CODE_VALIDATORS];
    const isValidCode = validator(codeText.trim());

    if (!isValidCode) {
      const errorMessage = `The pasted code does not appear to be valid ${selectedLanguage} code`;
      setError(errorMessage);
      onError?.(errorMessage);
      return false;
    }

    return true;
  };

  const createFileFromPastedCode = () => {
    if (!validatePastedCode()) return null;

    const extension = LANGUAGE_EXTENSIONS[selectedLanguage as keyof typeof LANGUAGE_EXTENSIONS];
    const fileName = `pasted_code${extension}`;

    // Create a File object from the pasted text
    const file = new File([codeText], fileName, { type: 'text/plain' });
    return file;
  };

  const handleSubmit = () => {
    if (activeTab === 'upload' && !selectedFile) {
      const errorMessage = 'Please select a file first';
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }
    if (activeTab === 'paste' && !codeText.trim()) {
      const errorMessage = 'Please paste some code first';
      setError(errorMessage);
      onError?.(errorMessage);
      return;
    }

    if (activeTab === 'paste') {
      const pastedCodeFile = createFileFromPastedCode();
      if (!pastedCodeFile) return;
      
      onSubmit({
        type: 'upload', // Change to upload type
        content: pastedCodeFile,
        preview
      });
    } else {
      onSubmit({
        type: activeTab,
        content: activeTab === 'upload' ? (selectedFile as File) : codeText,
        preview
      });
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setCodeText('');
    setPreview('');
    setError('');
    setSelectedLanguage('');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      // Ensure we're in the upload tab
      setActiveTab('upload');
      
      if (validateFile(file)) {
        setSelectedFile(file);
        const text = await file.text();
        setPreview(text);
      }
    }
  };

  return (
    <Card 
      className="border-2 border-dashed border-violet-200 bg-white/50 backdrop-blur-sm mt-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upload">Upload Code File</TabsTrigger>
            <TabsTrigger value="paste">Paste Code</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-0">
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept={ALLOWED_EXTENSIONS.join(',')}
                onChange={handleFileSelect}
                className="hidden"
                id="codeFileInput"
                ref={fileInputRef}
              />
              <motion.div
                className="w-16 h-16 bg-gradient-to-tr from-violet-500 to-blue-500 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current?.click()}
              >
                <FileCode className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-sm text-gray-600 mb-2 text-center">
                Accepted formats: {ALLOWED_EXTENSIONS.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mb-4 text-center">
                Drag and drop your code file here or click to browse
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mb-4"
              >
                Choose Code File
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="paste" className="mt-0">
            <div className="mb-4">
              <Select 
                value={selectedLanguage} 
                onValueChange={setSelectedLanguage}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Code Language" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(LANGUAGE_EXTENSIONS).map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang} {LANGUAGE_EXTENSIONS[lang as keyof typeof LANGUAGE_EXTENSIONS]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <textarea
              className="w-full h-48 p-4 rounded-lg border border-gray-200 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 resize-none bg-white/90"
              placeholder="Paste your code here..."
              value={codeText}
              onChange={handleCodePaste}
            />
            <p className="text-sm text-gray-500 mt-1">
              Maximum {MAX_CODE_LENGTH.toLocaleString()} characters
            </p>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {preview && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" /> Preview
              </h3>
              <Button variant="ghost" size="sm" onClick={clearSelection}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <ScrollArea className="h-48 rounded-lg border bg-gray-50">
              <pre className="p-4 text-sm">
                {preview}
              </pre>
            </ScrollArea>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
            disabled={!preview || (activeTab === 'paste' && !selectedLanguage)}
          >
            <Code className="w-4 h-4 mr-2" />
            Submit Code for Analysis
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CodeUploadSection;

