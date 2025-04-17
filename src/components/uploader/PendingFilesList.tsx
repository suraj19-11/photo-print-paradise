
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FilePreviewCard, { FileWithPreview } from './FilePreviewCard';

interface PendingFilesListProps {
  files: FileWithPreview[];
  removeFile: (id: string) => void;
  onUpload: () => void;
  isUploading: boolean;
  onCancelAll: () => void;
}

const PendingFilesList = ({ files, removeFile, onUpload, isUploading, onCancelAll }: PendingFilesListProps) => {
  if (files.length === 0) return null;
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Files to Upload ({files.length})</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {files.map((file) => (
          <FilePreviewCard
            key={file.id}
            file={file}
            type="pending"
            onRemove={() => removeFile(file.id!)}
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <Button variant="secondary" className="mr-2" onClick={onCancelAll}>
          Cancel
        </Button>
        <Button onClick={onUpload} disabled={isUploading}>
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
  );
};

export default PendingFilesList;
