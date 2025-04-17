
import { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadAreaProps {
  onFilesSelected: (files: File[]) => void;
}

const FileUploadArea = ({ onFilesSelected }: FileUploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => 
      file.type.startsWith('image/') || file.type === 'application/pdf'
    );
    
    if (validFiles.length > 0) {
      onFilesSelected(validFiles);
    }
  };

  return (
    <div 
      className={`uploader-container p-8 border-2 border-dashed rounded-lg bg-white flex flex-col items-center justify-center text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Upload className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-xl font-medium mb-2">Upload Your Files</h3>
      <p className="text-gray-500 mb-4">Drag and drop your photos or documents here</p>
      <p className="text-sm text-gray-400 mb-6">Supported formats: JPG, PNG, PDF (max 20MB)</p>
      
      <div className="relative">
        <input 
          type="file" 
          id="photo-file-input"
          multiple 
          accept="image/*,application/pdf" 
          className="hidden"
          onChange={handleFileInput}
        />
        <Button 
          variant="outline" 
          onClick={() => document.getElementById('photo-file-input')?.click()}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default FileUploadArea;
