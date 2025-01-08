import React from 'react';
import { Book, FileText, Code, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DocSectionProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}

interface FAQ {
  q: string;
  a: string;
}

interface CreditPackage {
  name: string;
  credits: number;
  price: number;
}

interface AnalysisType {
  name: string;
  credits: number;
  description?: string;
}

const DocSection: React.FC<DocSectionProps> = ({ icon: Icon, title, description, children }) => (
  <Card className="mb-8">
    <CardHeader>
      <div className="flex items-center">
        <Icon className="h-6 w-6 mr-2 text-indigo-600" />
        <CardTitle className="text-xl">{title}</CardTitle>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const DocumentationTab: React.FC = () => {
  const analysisTypes: AnalysisType[] = [
    {
      name: "Basic document analysis",
      credits: 5,
      description: "General analysis with basic feedback"
    },
    {
      name: "Advanced analysis",
      credits: 10,
      description: "Detailed feedback with in-depth suggestions"
    },
    {
      name: "Premium analysis",
      credits: 20,
      description: "Expert review with comprehensive feedback"
    }
  ];

  const creditPackages: CreditPackage[] = [
    { name: "Starter Pack", credits: 50, price: 25 },
    { name: "Professional Pack", credits: 200, price: 90 },
    { name: "Enterprise Pack", credits: 500, price: 200 }
  ];

  const faqs: FAQ[] = [
    {
      q: "How accurate is the analysis?",
      a: "Our system maintains 95%+ accuracy across all types of documents and analyses."
    },
    {
      q: "What happens if I run out of credits?",
      a: "You'll need to purchase more credits to continue using the service. We offer various packages to suit your needs."
    },
    {
      q: "Can I get a refund for unused credits?",
      a: "Credits are non-refundable but they don't expire for 12 months from the purchase date."
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader className="flex flex-row items-center space-y-0">
          <Book className="h-8 w-8 mr-3 text-indigo-600" />
          <div>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>Learn how to use our document analysis system</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <DocSection
        icon={FileText}
        title="Getting Started"
        description="Learn the basics of using our document analysis system"
      >
        <div className="space-y-4">
          <div className="ml-4 border-l-2 border-indigo-200 pl-4">
            <h4 className="font-medium mb-2">1. Upload Your Document</h4>
            <p className="text-gray-600">
              Click the "New Analysis" button and select your document. We support PDF, 
              Word, and plain text files up to 50MB.
            </p>
          </div>
          <div className="ml-4 border-l-2 border-indigo-200 pl-4">
            <h4 className="font-medium mb-2">2. Select Analysis Type</h4>
            <p className="text-gray-600">
              Choose the type of analysis you need - plagiarism check, grammar review, 
              or content evaluation.
            </p>
          </div>
          <div className="ml-4 border-l-2 border-indigo-200 pl-4">
            <h4 className="font-medium mb-2">3. Review Results</h4>
            <p className="text-gray-600">
              Once analysis is complete, you'll receive detailed results and suggestions 
              for improvement.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        icon={Code}
        title="Credits System"
        description="Understanding how credits work and how to manage them"
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Credit Usage</h4>
            <div className="grid gap-3">
              {analysisTypes.map((type, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">{type.name}</h5>
                    {type.description && (
                      <p className="text-sm text-gray-600">{type.description}</p>
                    )}
                  </div>
                  <span className="text-indigo-600 font-semibold">{type.credits} credits</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Credit Packages</h4>
            <div className="grid gap-3">
              {creditPackages.map((pack, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">{pack.name}</h5>
                    <p className="text-sm text-gray-600">{pack.credits} credits</p>
                  </div>
                  <span className="text-green-600 font-semibold">${pack.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        icon={HelpCircle}
        title="FAQs"
        description="Common questions and answers about our service"
      >
        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DocSection>
    </div>
  );
};