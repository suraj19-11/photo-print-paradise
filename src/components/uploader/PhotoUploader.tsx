
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { uploadPhoto, getUserPhotos, deletePhoto } from '@/services/photoService';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PrintOptions from '@/components/products/PrintOptions';
import FileUploadArea from './FileUploadArea';
import PendingFilesList from './PendingFilesList';
import UploadedPhotosList from './UploadedPhotosList';
import { FileWithPreview, UploadedPhoto } from './FilePreviewCard';

const PhotoUploader = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
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

  const handleFilesSelected = (newFiles: File[]) => {
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
      <FileUploadArea onFilesSelected={handleFilesSelected} />

      {isLoading ? (
        <div className="mt-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading your photos...</span>
        </div>
      ) : (
        <>
          <PendingFilesList 
            files={files}
            removeFile={removeFile}
            onUpload={handleUploadFiles}
            isUploading={isUploading}
            onCancelAll={() => setFiles([])}
          />

          <UploadedPhotosList 
            photos={uploadedPhotos}
            onRemovePhoto={handleRemoveUploadedPhoto}
            onPrintPhoto={handlePrintPhoto}
          />
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
