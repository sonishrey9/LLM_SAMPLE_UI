
import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleFiles = (newFiles: File[]) => {
    // Validate file types
    const validFiles = newFiles.filter(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      const validExtensions = ['pdf', 'doc', 'docx', 'txt', 'csv', 'xls', 'xlsx', 'json'];
      return extension && validExtensions.includes(extension);
    });
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file(s)",
        description: "Some files were rejected. Please upload PDF, DOC, TXT, CSV, XLS, or JSON files.",
        variant: "destructive"
      });
    }
    
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          onFilesUploaded(files);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* File upload area */}
      <div
        className={`dlite-file-dropzone ${dragActive ? 'dlite-file-dropzone-active' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx,.json"
        />
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-1">Drop files here</h3>
          <p className="text-gray-500 text-sm mb-4">or click to browse</p>
          <p className="text-xs text-gray-400">
            Supported formats: PDF, DOC, TXT, CSV, XLS, JSON
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="bg-background border rounded-lg p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-1">
            <FileText size={16} className="text-dlite-600" />
            Selected Files ({files.length})
          </h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-muted/30 p-2 rounded">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <FileText size={14} />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile(index);
                  }}
                >
                  <X size={14} />
                </Button>
              </li>
            ))}
          </ul>

          {uploading ? (
            <div className="mt-4 space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-xs text-center text-gray-500">
                Uploading... {uploadProgress}%
              </p>
            </div>
          ) : (
            <Button
              className="mt-4 w-full bg-dlite-600 hover:bg-dlite-700"
              onClick={handleUpload}
            >
              Analyze Files
            </Button>
          )}
        </div>
      )}
      
      {files.length === 0 && !uploading && (
        <div className="bg-muted/30 border rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <AlertCircle size={16} />
            <span>No files selected</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
