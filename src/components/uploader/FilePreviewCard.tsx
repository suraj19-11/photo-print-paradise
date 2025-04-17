
import { X, Printer, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Photo } from '@/lib/supabase';

export interface FileWithPreview extends File {
  preview?: string;
  id?: string;
}

export interface UploadedPhoto extends Photo {
  url?: string;
}

interface FilePreviewCardProps {
  file?: FileWithPreview;
  photo?: UploadedPhoto;
  onRemove: () => void;
  onPrint?: () => void;
  type: 'pending' | 'uploaded';
}

const FilePreviewCard = ({ file, photo, onRemove, onPrint, type }: FilePreviewCardProps) => {
  const isImage = file ? file.type?.startsWith('image/') : true;
  const name = file ? file.name : photo?.file_name || '';
  const preview = file?.preview || photo?.url || '';

  return (
    <div className="relative group photo-card rounded-lg overflow-hidden bg-gray-100">
      {isImage && preview ? (
        <img 
          src={preview} 
          alt={name}
          className="w-full aspect-square object-cover"
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-gray-200">
          <ImageIcon className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <Button 
          variant="destructive" 
          size="icon" 
          className="h-8 w-8"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
        
        {type === 'uploaded' && onPrint && (
          <Button 
            variant="secondary" 
            size="icon" 
            className="h-8 w-8"
            onClick={onPrint}
          >
            <Printer className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="p-2 truncate text-sm">
        {name.length > 20 
          ? `${name.substring(0, 18)}...` 
          : name}
      </div>
    </div>
  );
};

export default FilePreviewCard;
