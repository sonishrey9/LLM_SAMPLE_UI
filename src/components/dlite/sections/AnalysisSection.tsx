
import React, { useState } from 'react';
import FileUploader from '../analysis/FileUploader';
import AnalysisResults from '../analysis/AnalysisResults';

const AnalysisSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const handleFilesUploaded = (files: File[]) => {
    // Simulate processing time
    setIsAnalyzing(true);
    setTimeout(() => {
      setUploadedFiles(files);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  return (
    <section className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="dlite-heading mb-4">Upload Files for Analysis</h2>
          <FileUploader onFilesUploaded={handleFilesUploaded} />
        </div>
        
        <div>
          <h2 className="dlite-heading mb-4">Analysis Results</h2>
          
          {isAnalyzing ? (
            <div className="border rounded-lg p-8 text-center">
              <div className="inline-block p-4 mb-4">
                <div className="w-10 h-10 border-4 border-dlite-200 border-t-dlite-600 rounded-full animate-spin"></div>
              </div>
              <p className="text-muted-foreground">Analyzing your files...</p>
            </div>
          ) : uploadedFiles.length > 0 ? (
            <AnalysisResults files={uploadedFiles} />
          ) : (
            <div className="border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                No analysis results yet. Upload files to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnalysisSection;
