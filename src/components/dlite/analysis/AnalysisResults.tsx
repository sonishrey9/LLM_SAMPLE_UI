
import React from 'react';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalysisResultsProps {
  files: File[];
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ files }) => {
  if (files.length === 0) {
    return null;
  }

  // Generate mock analysis results based on file types
  const generateMockSummary = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return "This PDF document appears to be a detailed report containing financial data, charts, and textual analysis. The document is structured with an executive summary, methodology section, findings, and recommendations.";
      case 'doc':
      case 'docx':
        return "This document contains formatted text with headings, paragraphs, and possibly tables or images. The content appears to be a business proposal or technical documentation.";
      case 'txt':
        return "This text file contains plain text without formatting. It appears to be a log file or note with structured content organized in paragraphs.";
      case 'csv':
      case 'xls':
      case 'xlsx':
        return "This spreadsheet contains tabular data with multiple columns and rows. The data appears to be structured as a dataset with numerical values and possibly headers and labels.";
      case 'json':
        return "This JSON file contains structured data in a key-value format. The structure includes nested objects and arrays with various data types.";
      default:
        return "This file has been analyzed but the structure is unclear. Further processing may be needed for detailed insights.";
    }
  };

  const generateMockEntities = (file: File) => {
    const entities = [
      { type: 'Person', names: ['John Smith', 'Jane Doe', 'Michael Brown'] },
      { type: 'Organization', names: ['Acme Corp', 'Global Enterprises', 'Tech Solutions'] },
      { type: 'Location', names: ['New York', 'London', 'Tokyo'] },
      { type: 'Date', names: ['January 15, 2025', 'March 3, 2025', 'December 10, 2024'] },
    ];
    
    // Randomly select a subset of entities
    return entities.filter(() => Math.random() > 0.3);
  };

  const handleDownloadAnalysis = () => {
    // In a real app, this would generate a PDF or other format of the analysis
    alert('Download functionality would be implemented here');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="bg-muted/30 pb-3">
          <CardTitle className="text-md flex items-center gap-2">
            <FileText className="h-5 w-5 text-dlite-600" />
            Analysis Results
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Files Analyzed:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FileText size={14} />
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
          
          <Accordion type="single" collapsible className="border rounded-md">
            {files.map((file, index) => (
              <AccordionItem key={index} value={`file-${index}`}>
                <AccordionTrigger className="px-4 py-3 text-sm hover:bg-muted/30 hover:no-underline">
                  <span className="flex items-center gap-2">
                    <FileText size={16} className="text-dlite-600" />
                    {file.name}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 border-t">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Summary</h4>
                      <p className="text-sm text-muted-foreground">
                        {generateMockSummary(file)}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Entities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {generateMockEntities(file).map((entity, i) => (
                          <div key={i} className="border rounded p-2">
                            <h5 className="text-xs font-medium mb-1">{entity.type}</h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {entity.names.map((name, j) => (
                                <li key={j}>{name}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <Button 
            onClick={handleDownloadAnalysis}
            className="mt-6 w-full bg-dlite-600 hover:bg-dlite-700 flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Complete Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
