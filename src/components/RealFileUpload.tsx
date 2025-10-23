import { useState, useRef, useCallback } from 'react';
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  Video, 
  Music, 
  Archive, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Download, 
  Eye, 
  Trash2, 
  Share2, 
  Copy, 
  MoreVertical,
  Plus,
  Folder,
  FolderOpen,
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { fileApi, handleApiError } from '../services/realApi';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  projectId?: string;
  folderId?: string;
  tags: string[];
  description?: string;
  isPublic: boolean;
  downloadCount: number;
  lastAccessed?: string;
}

interface FileUploadProps {
  projectId?: string;
  folderId?: string;
  onUploadComplete?: (files: UploadedFile[]) => void;
  onFileSelect?: (file: UploadedFile) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in MB
  showPreview?: boolean;
}

const RealFileUpload = ({
  projectId,
  folderId,
  onUploadComplete,
  onFileSelect,
  multiple = true,
  accept = "*/*",
  maxSize = 100, // 100MB default
  showPreview = true
}: FileUploadProps) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [dragActive, setDragActive] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showFolders, setShowFolders] = useState(false);
  const [folders, setFolders] = useState<Array<{ id: string; name: string; parentId?: string }>>([]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Load files on component mount
  const loadFiles = useCallback(async () => {
    try {
      const uploadedFiles = await fileApi.getFiles(projectId);
      setFiles(uploadedFiles);
    } catch (error) {
      console.error('Error loading files:', error);
      handleApiError(error);
    }
  }, [projectId]);

  // Load files when component mounts or projectId changes
  useState(() => {
    loadFiles();
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFiles = async (fileList: File[]) => {
    const validFiles = fileList.filter(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSize}MB.`);
        return false;
      }
      // Check file type if accept is specified
      if (accept !== "*/*") {
        const acceptedTypes = accept.split(',').map(type => type.trim());
        const fileType = file.type;
        const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
        
        const isAccepted = acceptedTypes.some(type => 
          type === fileType || 
          type === fileExtension ||
          (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '')))
        );
        
        if (!isAccepted) {
          alert(`File ${file.name} is not an accepted file type.`);
          return false;
        }
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    const uploadedFiles: UploadedFile[] = [];

    for (const file of validFiles) {
      try {
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const response = await fileApi.uploadFile(file, projectId);
        
        const uploadedFile: UploadedFile = {
          id: response.fileId,
          name: response.name,
          size: response.size,
          type: file.type,
          url: response.url,
          uploadedAt: new Date().toISOString(),
          uploadedBy: 'current-user', // This should come from auth context
          projectId,
          folderId,
          tags: [],
          isPublic: false,
          downloadCount: 0
        };

        uploadedFiles.push(uploadedFile);
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        
        // Remove progress after a delay
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[file.name];
            return newProgress;
          });
        }, 2000);

      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
        handleApiError(error);
      }
    }

    setFiles(prev => [...prev, ...uploadedFiles]);
    setUploading(false);
    
    if (onUploadComplete) {
      onUploadComplete(uploadedFiles);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFileClick = (file: UploadedFile) => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  const handleFileDownload = async (file: UploadedFile) => {
    try {
      const blob = await fileApi.downloadFile(file.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      handleApiError(error);
    }
  };

  const handleFileDelete = async (fileId: string) => {
    try {
      await fileApi.deleteFile(fileId);
      setFiles(prev => prev.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Error deleting file:', error);
      handleApiError(error);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-6 h-6 text-blue-500" />;
    if (fileType.startsWith('video/')) return <Video className="w-6 h-6 text-purple-500" />;
    if (fileType.startsWith('audio/')) return <Music className="w-6 h-6 text-green-500" />;
    if (fileType.includes('pdf') || fileType.includes('document')) return <FileText className="w-6 h-6 text-red-500" />;
    if (fileType.includes('zip') || fileType.includes('rar')) return <Archive className="w-6 h-6 text-orange-500" />;
    return <File className="w-6 h-6 text-gray-500" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || file.type.startsWith(filterType);
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="w-full h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">File Manager</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Upload Files
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="all">All Types</option>
            <option value="image/">Images</option>
            <option value="video/">Videos</option>
            <option value="audio/">Audio</option>
            <option value="application/pdf">PDFs</option>
            <option value="text/">Documents</option>
            <option value="application/zip">Archives</option>
          </select>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [sort, order] = e.target.value.split('-');
              setSortBy(sort as 'name' | 'date' | 'size');
              setSortOrder(order as 'asc' | 'desc');
            }}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="size-desc">Largest First</option>
            <option value="size-asc">Smallest First</option>
          </select>
        </div>
      </div>

      {/* Upload Area */}
      <div
        ref={dropRef}
        className={`m-4 p-8 border-2 border-dashed rounded-lg text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-lg font-medium text-foreground mb-2">
          {dragActive ? 'Drop files here' : 'Drag and drop files here'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          or click to browse files
        </p>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Choose Files
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileInput}
          className="hidden"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Maximum file size: {maxSize}MB
        </p>
      </div>

      {/* Upload Progress */}
      {uploading && Object.keys(uploadProgress).length > 0 && (
        <div className="px-4 py-2 bg-muted">
          <div className="text-sm font-medium text-foreground mb-2">Uploading files...</div>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="mb-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
                <span className="truncate">{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Files Grid/List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <File className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No files found</p>
            <p className="text-muted-foreground">Upload some files to get started</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'
            : 'space-y-2'
          }>
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className={`group relative bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-200 cursor-pointer ${
                  viewMode === 'grid' ? 'p-4' : 'p-3 flex items-center gap-3'
                }`}
                onClick={() => handleFileClick(file)}
              >
                {viewMode === 'grid' ? (
                  <>
                    <div className="flex items-center justify-center mb-3">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-foreground text-sm mb-1 truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatFileSize(file.size)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground text-sm truncate" title={file.name}>
                        {file.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)} • {formatDate(file.uploadedAt)}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {file.downloadCount} downloads
                    </div>
                  </>
                )}

                {/* File Actions */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileDownload(file);
                      }}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFileDelete(file.id);
                      }}
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RealFileUpload;
