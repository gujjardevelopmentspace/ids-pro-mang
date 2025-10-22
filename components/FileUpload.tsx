import { useState, useCallback, useRef } from 'react';
import { Upload, X, File, FileText, Image as ImageIcon, Video, Music, Archive, CheckCircle, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  preview?: string;
  error?: string;
}

interface FileUploadProps {
  onUpload?: (files: File[]) => Promise<void>;
  maxSize?: number; // in MB
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export const FileUpload = ({
  onUpload,
  maxSize = 10, // 10MB default
  accept = '*',
  multiple = true,
  maxFiles = 10,
}: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8 text-blue-500" />;
    if (type.startsWith('video/')) return <Video className="w-8 h-8 text-purple-500" />;
    if (type.startsWith('audio/')) return <Music className="w-8 h-8 text-pink-500" />;
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-8 h-8 text-yellow-500" />;
    return <File className="w-8 h-8 text-gray-500" />;
  };

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSize}MB limit`;
    }
    return null;
  };

  const createFilePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
        ));

        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, status: 'success' as const } : f
          ));
          resolve();
        }
      }, 200);
    });
  };

  const processFiles = async (fileList: FileList | File[]) => {
    const filesArray = Array.from(fileList);
    
    if (!multiple && filesArray.length > 1) {
      alert('Only one file allowed');
      return;
    }

    if (files.length + filesArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles: UploadedFile[] = [];

    for (const file of filesArray) {
      const error = validateFile(file);
      const preview = await createFilePreview(file);
      
      const uploadedFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: error ? 'error' : 'uploading',
        preview,
        error,
      };

      newFiles.push(uploadedFile);
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Start upload simulation for valid files
    for (const uploadedFile of newFiles) {
      if (uploadedFile.status === 'uploading') {
        await simulateUpload(uploadedFile.id);
      }
    }

    // Call onUpload callback if provided
    if (onUpload) {
      const validFiles = filesArray.filter((_, index) => !newFiles[index].error);
      if (validFiles.length > 0) {
        try {
          await onUpload(validFiles);
        } catch (err) {
          console.error('Upload failed:', err);
        }
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAll = () => {
    setFiles([]);
  };

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer
          ${isDragging 
            ? 'border-primary bg-primary/10' 
            : 'border-border hover:border-primary hover:bg-muted/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className={`w-12 h-12 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isDragging ? 'Drop files here' : 'Drag & drop files here'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse from your computer
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Max size: {maxSize}MB</span>
            <span>•</span>
            <span>Max files: {maxFiles}</span>
          </div>
        </div>
      </div>

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">
              Uploaded Files ({files.length})
            </h4>
            <button
              onClick={clearAll}
              className="text-xs text-destructive hover:text-destructive/80 transition-colors"
            >
              Clear all
            </button>
          </div>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-card border border-border rounded-lg p-4 transition-all hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  {/* Preview or Icon */}
                  <div className="flex-shrink-0">
                    {file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      getFileIcon(file.type)
                    )}
                  </div>

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h5 className="text-sm font-medium text-foreground truncate">
                          {file.name}
                        </h5>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      {/* Status Icon */}
                      <div className="flex items-center gap-2">
                        {file.status === 'success' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {file.status === 'error' && (
                          <AlertCircle className="w-5 h-5 text-destructive" />
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.progress} className="h-1" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Uploading... {file.progress}%
                        </p>
                      </div>
                    )}

                    {/* Error Message */}
                    {file.status === 'error' && file.error && (
                      <p className="text-xs text-destructive mt-2">{file.error}</p>
                    )}

                    {/* Success Message */}
                    {file.status === 'success' && (
                      <p className="text-xs text-green-500 mt-2">Upload complete</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

