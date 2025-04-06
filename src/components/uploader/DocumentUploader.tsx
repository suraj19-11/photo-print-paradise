
import { useState, useCallback, useEffect } from 'react';
import { Upload, X, Check, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { uploadDocument, getUserDocuments, deleteDocument } from '@/services/documentService';
import { useAuth } from '@/contexts/AuthContext';

interface FileWithPreview extends File {
  preview?: string;
  id?: string;
}

interface UploadedDocument {
  id: string;
  file_name: string;
  file_type: string;
  file_path: string;
  url?: string;
}

const DocumentUploader = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  // Load user's existing documents on component mount
  useEffect(() => {
    const loadUserDocuments = async () => {
      if (user?.id) {
        try {
          const docs = await getUserDocuments(user.id);
          setUploadedDocs(docs);
        } catch (error) {
          console.error('Error loading documents:', error);
          toast({
            title: "Failed to load documents",
            description: "Could not load your existing documents.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadUserDocuments();
  }, [user]);

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
      file.type === 'application/pdf' || 
      file.type === 'application/msword' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'text/plain'
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Invalid file type",
        description: "Please upload only PDF, Word, or text documents.",
        variant: "destructive"
      });
    }
    
    const filesWithPreview = validFiles.map(file => {
      const fileWithPreview = file as FileWithPreview;
      
      // Use different icons based on file type
      fileWithPreview.preview = '/placeholder.svg';
      fileWithPreview.id = crypto.randomUUID();
      return fileWithPreview;
    });
    
    setFiles(prev => [...prev, ...filesWithPreview]);
    
    toast({
      title: "Files added",
      description: `${validFiles.length} document(s) added successfully.`,
      variant: "default"
    });
  };

  const removeFile = (id: string) => {
    setFiles(prevFiles => {
      return prevFiles.filter(file => file.id !== id);
    });
  };

  const handleRemoveUploadedDoc = async (id: string) => {
    if (!user?.id) return;
    
    try {
      await deleteDocument(id, user.id);
      setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
      toast({
        title: "Document deleted",
        description: "Your document has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete the document. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUploadFiles = async () => {
    if (!user?.id || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of files) {
        try {
          const uploadResult = await uploadDocument(file, user.id);
          setUploadedDocs(prev => [uploadResult, ...prev]);
        } catch (error) {
          console.error('Error uploading file:', error);
          toast({
            title: "Upload failed",
            description: `Failed to upload ${file.name}.`,
            variant: "destructive"
          });
        }
      }
      
      // Clear the files state once all are uploaded
      setFiles([]);
      
      toast({
        title: "Upload complete",
        description: "Your documents have been uploaded successfully.",
      });
    } catch (error) {
      console.error('Batch upload error:', error);
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading your files.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-12 w-12 text-gray-400" />;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div 
        className={`uploader-container p-8 border-2 border-dashed rounded-lg bg-white flex flex-col items-center justify-center text-center ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">Upload Your Documents</h3>
        <p className="text-gray-500 mb-4">Drag and drop your documents here</p>
        <p className="text-sm text-gray-400 mb-6">Supported formats: PDF, DOCX, TXT (max 20MB)</p>
        
        <div className="relative">
          <Button variant="outline" className="relative z-10">
            Browse Documents
          </Button>
          <input 
            type="file" 
            multiple 
            accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileInput}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading your documents...</span>
        </div>
      ) : (
        <>
          {/* Added/Selected Files Section */}
          {files.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Files to Upload ({files.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {files.map((file) => (
                  <div key={file.id} className="relative group photo-card rounded-lg overflow-hidden bg-gray-100">
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-200">
                      {getFileIcon(file.type || '')}
                    </div>
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
                <Button variant="secondary" className="mr-2" onClick={() => setFiles([])}>
                  Cancel
                </Button>
                <Button onClick={handleUploadFiles} disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Upload Files
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Already Uploaded Documents Section */}
          {uploadedDocs.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Your Uploaded Documents ({uploadedDocs.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedDocs.map((doc) => (
                  <div key={doc.id} className="relative group photo-card rounded-lg overflow-hidden bg-gray-100">
                    <div className="w-full aspect-square flex items-center justify-center bg-gray-200">
                      {getFileIcon(doc.file_type)}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleRemoveUploadedDoc(doc.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-2 truncate text-sm">
                      {doc.file_name.length > 20 
                        ? `${doc.file_name.substring(0, 18)}...` 
                        : doc.file_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DocumentUploader;
