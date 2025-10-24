import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Video, 
  Settings, 
  Mic, 
  MicOff, 
  VideoIcon, 
  VideoOff, 
  ScreenShare, 
  ScreenShareOff,
  Send,
  Rocket,
  Activity,
  Plus,
  XCircle,
  FileText
} from 'lucide-react';

const RealTimeCollaboration = () => {
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [sessionName, setSessionName] = useState('');
  const [sessionType, setSessionType] = useState<'meeting' | 'workshop' | 'review' | 'planning'>('meeting');
  const [sessionPassword, setSessionPassword] = useState('');
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users] = useState([
    { id: '1', name: 'John Doe', role: 'Project Manager', status: 'online', avatar: '/avatars/john.jpg' },
    { id: '2', name: 'Jane Smith', role: 'Developer', status: 'away', avatar: '/avatars/jane.jpg' }
  ]);

  const createSession = () => {
    console.log('Creating session...');
    setCurrentSession('session-123');
    setConnectionStatus('connected');
  };

  const joinSession = () => {
    console.log('Joining session...');
    setCurrentSession('session-123');
    setConnectionStatus('connected');
  };

  const leaveSession = () => {
    console.log('Leaving session...');
    setCurrentSession(null);
    setConnectionStatus('disconnected');
  };

  const toggleVideo = () => {
    console.log('Toggling video...');
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    console.log('Toggling audio...');
    setIsAudioOn(!isAudioOn);
  };

  const startScreenShare = () => {
    console.log('Starting screen share...');
    setIsScreenSharing(true);
  };

  const stopScreenShare = () => {
    console.log('Stopping screen share...');
    setIsScreenSharing(false);
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      const message = {
        id: Date.now().toString(),
        userId: 'current-user',
        userName: 'You',
        userAvatar: '/avatars/current.jpg',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-background via-background to-primary/5">
      {/* Modern Sidebar */}
      <div className="w-80 bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-xl border-r border-primary/20 flex flex-col shadow-2xl">
        {/* Modern Header */}
        <div className="p-6 border-b border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  Live Collaboration
                </h2>
                <p className="text-xs text-muted-foreground">Real-time workspace</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full shadow-lg ${
                connectionStatus === 'connected' ? 'bg-green-400 animate-pulse' : 
                connectionStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className="text-xs font-medium text-foreground capitalize">{connectionStatus}</span>
            </div>
          </div>
        </div>

        {/* Modern Session Controls */}
        {!currentSession ? (
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                <Plus className="w-4 h-4 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Start Session</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Session Name</label>
                <input
                  type="text"
                  placeholder="Enter session name..."
                  value={sessionName}
                  onChange={(e) => setSessionName(e.target.value)}
                  className="w-full px-4 py-3 border border-primary/20 rounded-xl bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Session Type</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full px-4 py-3 border border-primary/20 rounded-xl bg-background/50 backdrop-blur-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                >
                  <option value="meeting">📋 Meeting</option>
                  <option value="workshop">🔨 Workshop</option>
                  <option value="review">👀 Review</option>
                  <option value="planning">📅 Planning</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password (Optional)</label>
                <input
                  type="password"
                  placeholder="Enter password..."
                  value={sessionPassword}
                  onChange={(e) => setSessionPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-primary/20 rounded-xl bg-background/50 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={createSession}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-medium"
                >
                  <Rocket className="w-4 h-4 inline mr-2" />
                  Create Session
                </button>
                <button
                  onClick={joinSession}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl hover:from-muted/90 hover:to-muted/70 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-medium"
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Join Session
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-primary/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Live Session</h3>
              </div>
              <button
                onClick={leaveSession}
                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors group"
              >
                <XCircle className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            {/* Modern Control Panel */}
            <div className="bg-gradient-to-r from-muted/30 to-muted/20 rounded-xl p-4 border border-primary/10">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={toggleVideo}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isVideoOn 
                      ? 'bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isVideoOn ? <VideoIcon className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span className="text-sm">{isVideoOn ? 'Video On' : 'Video Off'}</span>
                </button>
                
                <button
                  onClick={toggleAudio}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isAudioOn 
                      ? 'bg-gradient-to-r from-green-500 to-green-400 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-red-500 to-red-400 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isAudioOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span className="text-sm">{isAudioOn ? 'Audio On' : 'Audio Off'}</span>
                </button>
                
                <button
                  onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                    isScreenSharing 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-gradient-to-r from-muted to-muted/80 text-foreground shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isScreenSharing ? <ScreenShareOff className="w-4 h-4" /> : <ScreenShare className="w-4 h-4" />}
                  <span className="text-sm">{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
                </button>
                
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 font-medium bg-gradient-to-r from-muted to-muted/80 text-foreground shadow-lg hover:shadow-xl"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Users */}
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Active Users ({users.length})
          </h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                    user.status === 'online' ? 'bg-green-500' : 
                    user.status === 'away' ? 'bg-yellow-500' : 
                    user.status === 'busy' ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Main Content */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
        {/* Modern Top Bar */}
        <div className="h-20 bg-gradient-to-r from-card/95 to-card/80 backdrop-blur-xl border-b border-primary/20 flex items-center justify-between px-8 shadow-lg">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full shadow-lg animate-pulse ${
                connectionStatus === 'connected' ? 'bg-green-400' : 
                connectionStatus === 'connecting' ? 'bg-yellow-400' : 'bg-red-400'
              }`}></div>
              <div>
                <span className="text-lg font-semibold text-foreground">
                  {currentSession ? 'Live Session' : 'No Active Session'}
                </span>
                {currentSession && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">Session: {sessionName || 'Unnamed'}</span>
                    <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium">
                      {sessionType}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowParticipants(!showParticipants)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                showParticipants 
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                  : 'bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-lg'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">Participants</span>
            </button>
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
                showChat 
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                  : 'bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-lg'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chat</span>
            </button>
            <button 
              onClick={() => setShowDocuments(!showDocuments)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                showDocuments 
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg' 
                  : 'bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-lg'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm">Documents</span>
            </button>
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium bg-gradient-to-r from-muted to-muted/80 text-foreground hover:shadow-lg"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Settings</span>
            </button>
          </div>
        </div>

        {/* Modern Video Grid */}
        <div className="flex-1 flex">
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col">
            {currentSession ? (
              <div className="flex-1 p-6">
                {/* Modern Video Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-full">
                  {/* Local Video Placeholder */}
                  <div className="relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-lg font-semibold text-foreground">Your Video</p>
                        <p className="text-sm text-muted-foreground">{isVideoOn ? 'Camera On' : 'Camera Off'}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-xl font-medium">
                      You {isVideoOn ? '' : '(Video Off)'}
                    </div>
                    {isScreenSharing && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-sm px-3 py-2 rounded-xl font-medium shadow-lg">
                        <ScreenShare className="w-4 h-4 inline mr-1" />
                        Screen Sharing
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-green-400 text-white text-xs px-2 py-1 rounded-lg font-medium">
                      Live
                    </div>
                  </div>

                  {/* Remote Video Placeholders */}
                  {users.map((user) => (
                    <div key={user.id} className="relative bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden border border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                      <div className="w-full h-full bg-gradient-to-br from-muted/50 to-muted/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl font-bold text-primary">{user.name.charAt(0)}</span>
                          </div>
                          <p className="text-lg font-semibold text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.role}</p>
                        </div>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-xl font-medium">
                        {user.name}
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full shadow-lg ${
                          user.status === 'online' ? 'bg-green-400 animate-pulse' : 
                          user.status === 'away' ? 'bg-yellow-400 animate-pulse' : 'bg-red-400'
                        }`}></div>
                        <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-lg font-medium">
                          {user.status}
                        </span>
                      </div>
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xs px-2 py-1 rounded-lg font-medium">
                        Live
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
                <div className="text-center max-w-md mx-auto p-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Video className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Ready to Collaborate?
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Start a live session to collaborate with your team in real-time. Share screens, chat, and work together seamlessly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={createSession}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-medium"
                    >
                      <Rocket className="w-4 h-4" />
                      Start Session
                    </button>
                    <button
                      onClick={joinSession}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-muted to-muted/80 text-foreground rounded-xl hover:from-muted/90 hover:to-muted/70 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-medium"
                    >
                      <Users className="w-4 h-4" />
                      Join Session
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modern Side Panels */}
          {showChat && (
            <div className="w-80 border-l border-primary/20 bg-gradient-to-b from-card/95 to-card/80 backdrop-blur-xl flex flex-col shadow-2xl">
              {/* Modern Chat Header */}
              <div className="p-6 border-b border-primary/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Live Chat</h3>
                </div>
              </div>

              {/* Modern Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex gap-4 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center shadow-lg">
                      <span className="text-sm font-semibold text-primary">{message.userName.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-semibold text-foreground">{message.userName}</span>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-lg">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl p-3 border border-primary/10 shadow-sm group-hover:shadow-md transition-all duration-200">
                        <div className="text-sm text-foreground">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modern Message Input */}
              <div className="p-6 border-t border-primary/10 bg-gradient-to-r from-muted/30 to-muted/20">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 bg-background/50 backdrop-blur-sm border border-primary/20 rounded-xl text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-200"
                  />
                  <button 
                    onClick={sendMessage}
                    className="p-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeCollaboration;