
import { useState, useCallback, useEffect } from 'react';
import { Upload, X, Check, Image as ImageIcon, Loader2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { uploadPhoto, getUserPhotos, deletePhoto } from '@/services/photoService';
import { useAuth } from '@/contexts/AuthContext';
import { Photo } from '@/lib/supabase';
import PrintOptions from '@/components/products/PrintOptions';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface FileWithPreview extends File {
  preview?: string;
  id?: string;
}

interface UploadedPhoto extends Photo {
  url?: string;
}

const PhotoUploader = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedPhoto | null>(null);
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const { user } = useAuth();

  // Load user's existing photos on component mount
  useEffect(() => {
    const loadUserPhotos = async () => {
      if (user?.id) {
        try {
          const photos = await getUserPhotos(user.id);
          console.log("Loaded photos:", photos);
          setUploadedPhotos(photos);
        } catch (error) {
          console.error('Error loading photos:', error);
          toast({
            title: "Failed to load photos",
            description: "Could not load your existing photos.",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadUserPhotos();
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

  const handleRemoveUploadedPhoto = async (id: string) => {
    if (!user?.id) return;
    
    try {
      await deletePhoto(id, user.id);
      setUploadedPhotos(prev => prev.filter(photo => photo.id !== id));
      toast({
        title: "Photo deleted",
        description: "Your photo has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast({
        title: "Delete failed",
        description: "Could not delete the photo. Please try again.",
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
          const uploadResult = await uploadPhoto(file, user.id);
          setUploadedPhotos(prev => [uploadResult, ...prev]);
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
        description: "Your files have been uploaded successfully.",
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

  const handlePrintPhoto = (photo: UploadedPhoto) => {
    setSelectedPhoto(photo);
    setIsPrintDialogOpen(true);
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

      {isLoading ? (
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading your photos...</span>
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

          {/* Already Uploaded Photos Section */}
          {uploadedPhotos.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Your Uploaded Photos ({uploadedPhotos.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {uploadedPhotos.map((photo) => (
                  <div key={photo.id} className="relative group photo-card rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={photo.url} 
                      alt={photo.file_name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleRemoveUploadedPhoto(photo.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handlePrintPhoto(photo)}
                      >
                        <Printer className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="p-2 truncate text-sm">
                      {photo.file_name.length > 20 
                        ? `${photo.file_name.substring(0, 18)}...` 
                        : photo.file_name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent className="max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">Print Photo</h3>
              {selectedPhoto && (
                <div>
                  <div className="rounded-md overflow-hidden border mb-4">
                    <img 
                      src={selectedPhoto.url} 
                      alt={selectedPhoto.file_name}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    {selectedPhoto.file_name}
                  </p>
                </div>
              )}
            </div>
            <div>
              <PrintOptions 
                selectedFile={selectedPhoto || undefined}
                fileType="photo"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoUploader;
