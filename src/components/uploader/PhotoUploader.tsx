
import { useState, useCallback } from 'react';
import { Upload, X, Check, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface FileWithPreview extends File {
  preview?: string;
  id?: string;
}

const PhotoUploader = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
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
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload only images or PDF documents.",
        variant: "destructive"
      });
    }
    
    const filesWithPreview = validFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      
      if (file.type.startsWith('image/')) {
        fileWithPreview.preview = URL.createObjectURL(file);
      } else {
        fileWithPreview.preview = '/placeholder.svg'; // Use a placeholder for PDFs
      }
      
      fileWithPreview.id = crypto.randomUUID();
      return fileWithPreview;
    });
    
    setFiles(prev => [...prev, ...filesWithPreview]);
    
    toast({
      title: "Files added",
      description: `${validFiles.length} file(s) added successfully.`,
      variant: "default"
    });
  };

  const removeFile = (id: string) => {
    setFiles(prevFiles => {
      const fileToRemove = prevFiles.find(file => file.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prevFiles.filter(file => file.id !== id);
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`uploader-container p-8 rounded-lg bg-white flex flex-col items-center justify-center text-center ${
          isDragging ? 'border-primary' : 'border-gray-300'
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
          <Button variant="outline" className="relative z-10">
            Browse Files
          </Button>
          <input 
            type="file" 
            multiple 
            accept="image/*,application/pdf" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Uploaded Files ({files.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file) => (
              <div key={file.id} className="relative group photo-card rounded-lg overflow-hidden bg-gray-100">
                {file.preview && file.type?.startsWith('image/') ? (
                  <img 
                    src={file.preview} 
                    alt={file.name}
                    className="w-full aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center bg-gray-200">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => removeFile(file.id!)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-2 truncate text-sm">
                  {file.name.length > 20 
                    ? `${file.name.substring(0, 18)}...` 
                    : file.name}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button variant="secondary" className="mr-2">Cancel</Button>
            <Button>
              <Check className="mr-2 h-4 w-4" />
              Continue to Customize
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
