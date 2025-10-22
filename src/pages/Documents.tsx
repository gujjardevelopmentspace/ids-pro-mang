import { DashboardLayout } from "@/components/DashboardLayout";
import { Plus, Search, FileText, CheckCircle, Clock, Download, Edit, Trash2, Filter, Upload, Share2, Star, Eye, Archive, FolderOpen, FileImage, FileVideo, FileAudio, FileSpreadsheet, FileCode, Users, Calendar, Tag, Lock, Unlock } from "lucide-react";
import { useState } from "react";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const documents = [
    {
      id: "1",
      name: "Project Blueprint v2.3.pdf",
      type: "pdf",
      size: "2.4 MB",
      status: "approved",
      category: "design",
      uploadedBy: "John Doe",
      uploadedAt: "2024-01-15",
      lastModified: "2024-01-20",
      tags: ["blueprint", "design", "v2.3"],
      isStarred: true,
      isLocked: false,
      downloadCount: 15
    },
    {
      id: "2",
      name: "Meeting Notes - Sprint Planning.docx",
      type: "docx",
      size: "1.2 MB",
      status: "pending",
      category: "meeting",
      uploadedBy: "Sarah Johnson",
      uploadedAt: "2024-01-18",
      lastModified: "2024-01-19",
      tags: ["meeting", "sprint", "planning"],
      isStarred: false,
      isLocked: false,
      downloadCount: 8
    },
    {
      id: "3",
      name: "System Architecture Diagram.png",
      type: "png",
      size: "3.1 MB",
      status: "approved",
      category: "design",
      uploadedBy: "Mike Chen",
      uploadedAt: "2024-01-16",
      lastModified: "2024-01-18",
      tags: ["architecture", "diagram", "system"],
      isStarred: true,
      isLocked: true,
      downloadCount: 23
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="w-5 h-5 text-red-500" />;
      case "docx": return <FileText className="w-5 h-5 text-blue-500" />;
      case "png": case "jpg": case "jpeg": return <FileImage className="w-5 h-5 text-green-500" />;
      case "mp4": case "avi": return <FileVideo className="w-5 h-5 text-purple-500" />;
      case "mp3": case "wav": return <FileAudio className="w-5 h-5 text-orange-500" />;
      case "xlsx": case "csv": return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case "js": case "ts": case "html": case "css": return <FileCode className="w-5 h-5 text-yellow-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500/20 text-green-500 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      case "rejected": return "bg-red-500/20 text-red-500 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-500 border-gray-500/30";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Modern Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-ids-cyan/10 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                Documents Management
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground mb-4">
              Advanced file management with collaboration features and real-time synchronization
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Live Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Team Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-ids-cyan" />
                <span className="text-muted-foreground">Secure Storage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Toolbar */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-xl bg-background text-foreground w-64 focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-xl bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="all">All Categories</option>
              <option value="design">Design</option>
              <option value="meeting">Meeting</option>
              <option value="technical">Technical</option>
              <option value="legal">Legal</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
              <Upload className="w-4 h-4" />
              Upload
            </button>
          </div>
        </div>

        {/* Document Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">24</div>
                <div className="text-sm text-muted-foreground">Total Files</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">18</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">6</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Starred</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modern Document List/Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">Documents</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{documents.length} files</span>
              <span>•</span>
              <span>{selectedFiles.length} selected</span>
            </div>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {documents.map((doc) => (
                <div key={doc.id} className="group bg-card rounded-2xl p-4 shadow-card hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        {getFileIcon(doc.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">{doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {doc.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      {doc.isLocked && <Lock className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{doc.downloadCount} downloads</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{doc.uploadedBy}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>{doc.lastModified}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 2 && (
                        <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded-md">
                          +{doc.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Download className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-2xl shadow-card border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Size</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Uploaded By</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Modified</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {documents.map((doc) => (
                      <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center">
                              {getFileIcon(doc.type)}
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{doc.name}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {doc.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                                {doc.isLocked && <Lock className="w-3 h-3 text-red-500" />}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.type.toUpperCase()}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.size}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.uploadedBy}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{doc.lastModified}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-muted-foreground" />
                            </button>
                            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Documents;