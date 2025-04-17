
import FilePreviewCard, { UploadedPhoto } from './FilePreviewCard';

interface UploadedPhotosListProps {
  photos: UploadedPhoto[];
  onRemovePhoto: (id: string) => void;
  onPrintPhoto: (photo: UploadedPhoto) => void;
}

const UploadedPhotosList = ({ photos, onRemovePhoto, onPrintPhoto }: UploadedPhotosListProps) => {
  if (photos.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Your Uploaded Photos ({photos.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <FilePreviewCard
            key={photo.id}
            photo={photo}
            type="uploaded"
            onRemove={() => onRemovePhoto(photo.id)}
            onPrint={() => onPrintPhoto(photo)}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadedPhotosList;
