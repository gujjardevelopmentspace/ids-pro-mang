import { DashboardLayout } from "@/components/DashboardLayout";
import { useState, useEffect } from "react";
import { Trophy, Medal, Award, TrendingUp, TrendingDown, BarChart3, PieChart, Target, Clock, CheckCircle, XCircle, Star, Users, Calendar, RefreshCw, Download, Filter, Search, Eye, Crown, Zap, Flame, Shield } from "lucide-react";

const UsersPerformance = () => {
  const [performanceData, setPerformanceData] = useState([
    {
      id: 1,
      name: "AHSAN UL HAQ",
      designation: "Project Manager",
      company: "ABC Construction",
      overallScore: 95,
      projectsCompleted: 12,
      tasksCompleted: 156,
      efficiency: 92,
      quality: 98,
      timeliness: 94,
      collaboration: 96,
      leadership: 97,
      rank: 1,
      badges: ["Top Performer", "Quality Expert", "Team Leader"],
      monthlyGrowth: 8.5,
      achievements: 15,
      streak: 45
    },
    {
      id: 2,
      name: "Sarah Johnson",
      designation: "Quality Inspector",
      company: "Metro Construction",
      overallScore: 92,
      projectsCompleted: 15,
      tasksCompleted: 189,
      efficiency: 89,
      quality: 99,
      timeliness: 88,
      collaboration: 91,
      leadership: 85,
      rank: 2,
      badges: ["Quality Expert", "Detail Oriented"],
      monthlyGrowth: 6.2,
      achievements: 12,
      streak: 32
    },
    {
      id: 3,
      name: "John Smith",
      designation: "Site Engineer",
      company: "XYZ Builders",
      overallScore: 88,
      projectsCompleted: 8,
      tasksCompleted: 134,
      efficiency: 91,
      quality: 85,
      timeliness: 92,
      collaboration: 87,
      leadership: 82,
      rank: 3,
      badges: ["Efficiency Master"],
      monthlyGrowth: 4.8,
      achievements: 9,
      streak: 28
    },
    {
      id: 4,
      name: "Lisa Wilson",
      designation: "Architect",
      company: "Design Studio",
      overallScore: 85,
      projectsCompleted: 10,
      tasksCompleted: 145,
      efficiency: 87,
      quality: 92,
      timeliness: 85,
      collaboration: 89,
      leadership: 88,
      rank: 4,
      badges: ["Creative Genius"],
      monthlyGrowth: 3.5,
      achievements: 8,
      streak: 21
    },
    {
      id: 5,
      name: "Mike Davis",
      designation: "Safety Officer",
      company: "Elite Contractors",
      overallScore: 78,
      projectsCompleted: 6,
      tasksCompleted: 98,
      efficiency: 82,
      quality: 88,
      timeliness: 75,
      collaboration: 85,
      leadership: 79,
      rank: 5,
      badges: ["Safety Champion"],
      monthlyGrowth: 2.1,
      achievements: 6,
      streak: 15
    }
  ]);

  const [filteredData, setFilteredData] = useState(performanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCompany, setFilterCompany] = useState("all");
  const [filterScore, setFilterScore] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [isLoading, setIsLoading] = useState(false);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    averageScore: 0,
    topPerformer: "",
    totalProjects: 0,
    totalTasks: 0,
    averageEfficiency: 0,
    totalAchievements: 0
  });

  const [leaderboardData, setLeaderboardData] = useState({
    topPerformers: [],
    risingStars: [],
    qualityChampions: [],
    efficiencyMasters: []
  });

  const [recentAchievements, setRecentAchievements] = useState([
    { id: 1, user: "AHSAN UL HAQ", achievement: "Completed 10 projects this month", time: "2 hours ago", type: "milestone" },
    { id: 2, user: "Sarah Johnson", achievement: "Achieved 99% quality score", time: "4 hours ago", type: "quality" },
    { id: 3, user: "John Smith", achievement: "Maintained 30-day streak", time: "6 hours ago", type: "consistency" },
    { id: 4, user: "Lisa Wilson", achievement: "Led successful project delivery", time: "8 hours ago", type: "leadership" },
    { id: 5, user: "Mike Davis", achievement: "Zero safety incidents this month", time: "1 day ago", type: "safety" }
  ]);

  const updateMetrics = () => {
    const avgScore = performanceData.reduce((sum, user) => sum + user.overallScore, 0) / performanceData.length;
    const topPerformer = performanceData.reduce((top, user) => user.overallScore > top.overallScore ? user : top);
    const totalProjects = performanceData.reduce((sum, user) => sum + user.projectsCompleted, 0);
    const totalTasks = performanceData.reduce((sum, user) => sum + user.tasksCompleted, 0);
    const avgEfficiency = performanceData.reduce((sum, user) => sum + user.efficiency, 0) / performanceData.length;
    const totalAchievements = performanceData.reduce((sum, user) => sum + user.achievements, 0);

    setPerformanceMetrics({
      averageScore: Math.round(avgScore),
      topPerformer: topPerformer.name,
      totalProjects,
      totalTasks,
      averageEfficiency: Math.round(avgEfficiency),
      totalAchievements
    });

    setLeaderboardData({
      topPerformers: performanceData.slice(0, 3),
      risingStars: performanceData.filter(user => user.monthlyGrowth > 5).slice(0, 3),
      qualityChampions: performanceData.sort((a, b) => b.quality - a.quality).slice(0, 3),
      efficiencyMasters: performanceData.sort((a, b) => b.efficiency - a.efficiency).slice(0, 3)
    });
  };

  const refreshData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setPerformanceData(prev => prev.map(user => ({
        ...user,
        overallScore: Math.min(100, Math.max(0, user.overallScore + Math.floor(Math.random() * 3) - 1)),
        efficiency: Math.min(100, Math.max(0, user.efficiency + Math.floor(Math.random() * 2) - 1)),
        monthlyGrowth: Math.max(0, user.monthlyGrowth + Math.floor(Math.random() * 2) - 1)
      })));
      setIsLoading(false);
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    if (score >= 70) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-yellow-100";
    if (score >= 70) return "bg-orange-100";
    return "bg-red-100";
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Performer": return "bg-yellow-100 text-yellow-700";
      case "Quality Expert": return "bg-green-100 text-green-700";
      case "Team Leader": return "bg-blue-100 text-blue-700";
      case "Detail Oriented": return "bg-purple-100 text-purple-700";
      case "Efficiency Master": return "bg-orange-100 text-orange-700";
      case "Creative Genius": return "bg-pink-100 text-pink-700";
      case "Safety Champion": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'quality': return <Star className="w-4 h-4 text-green-500" />;
      case 'consistency': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'leadership': return <Crown className="w-4 h-4 text-blue-500" />;
      case 'safety': return <Shield className="w-4 h-4 text-red-500" />;
      default: return <Award className="w-4 h-4 text-gray-500" />;
    }
  };

  useEffect(() => {
    let filtered = performanceData.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.designation.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCompany = filterCompany === "all" || user.company.toLowerCase().includes(filterCompany.toLowerCase());
      const matchesScore = filterScore === "all" || 
                          (filterScore === "excellent" && user.overallScore >= 90) ||
                          (filterScore === "good" && user.overallScore >= 80 && user.overallScore < 90) ||
                          (filterScore === "average" && user.overallScore >= 70 && user.overallScore < 80) ||
                          (filterScore === "needs-improvement" && user.overallScore < 70);
      return matchesSearch && matchesCompany && matchesScore;
    });
    setFilteredData(filtered);
  }, [searchTerm, filterCompany, filterScore, performanceData]);

  useEffect(() => {
    updateMetrics();
  }, [performanceData]);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setPerformanceData(prev => prev.map(user => ({
        ...user,
        overallScore: Math.min(100, Math.max(0, user.overallScore + Math.floor(Math.random() * 2) - 1))
      })));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Users Performance</h1>
            <p className="text-muted-foreground mt-2">Track and analyze user performance metrics</p>
          </div>
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <span className="mx-2">&gt;</span>
          <span className="text-foreground font-medium">Users Performance</span>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-2xl font-bold text-blue-500">{performanceMetrics.averageScore}%</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Top Performer</p>
                <p className="text-lg font-bold text-yellow-500">{performanceMetrics.topPerformer}</p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-green-500">{performanceMetrics.totalProjects}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-purple-500">{performanceMetrics.totalTasks}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold text-orange-500">{performanceMetrics.averageEfficiency}%</p>
              </div>
              <Zap className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Achievements</p>
                <p className="text-2xl font-bold text-red-500">{performanceMetrics.totalAchievements}</p>
              </div>
              <Award className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground w-64"
              />
            </div>
            <select 
              value={filterCompany}
              onChange={(e) => setFilterCompany(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Companies</option>
              <option value="abc">ABC Construction</option>
              <option value="metro">Metro Construction</option>
              <option value="xyz">XYZ Builders</option>
              <option value="design">Design Studio</option>
              <option value="elite">Elite Contractors</option>
            </select>
            <select 
              value={filterScore}
              onChange={(e) => setFilterScore(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All Scores</option>
              <option value="excellent">Excellent (90+)</option>
              <option value="good">Good (80-89)</option>
              <option value="average">Average (70-79)</option>
              <option value="needs-improvement">Needs Improvement (&lt;70)</option>
            </select>
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Performance Overview Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">User</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Overall Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Projects</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tasks</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Efficiency</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Quality</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Growth</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Badges</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(user.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.designation}</p>
                          <p className="text-xs text-muted-foreground">{user.company}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              user.overallScore >= 90 ? 'bg-green-500' :
                              user.overallScore >= 80 ? 'bg-yellow-500' :
                              user.overallScore >= 70 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{width: `${user.overallScore}%`}}
                          ></div>
                        </div>
                        <span className={`text-sm font-bold ${getScoreColor(user.overallScore)}`}>
                          {user.overallScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.projectsCompleted}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.tasksCompleted}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.efficiency}%</td>
                    <td className="px-6 py-4 text-sm text-foreground">{user.quality}%</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500">+{user.monthlyGrowth}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.badges.slice(0, 2).map((badge, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(badge)}`}>
                            {badge}
                          </span>
                        ))}
                        {user.badges.length > 2 && (
                          <span className="text-xs text-muted-foreground">+{user.badges.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-muted rounded">
                          <Eye className="w-4 h-4 text-blue-500" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded">
                          <BarChart3 className="w-4 h-4 text-green-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Leaderboards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Performers */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top Performers</h2>
            <div className="space-y-4">
              {leaderboardData.topPerformers.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2">
                    {getRankIcon(user.rank)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.designation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-foreground">{user.overallScore}%</p>
                    <p className="text-xs text-muted-foreground">Overall Score</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rising Stars */}
          <div className="bg-card rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Rising Stars</h2>
            <div className="space-y-4">
              {leaderboardData.risingStars.map((user, index) => (
                <div key={user.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.designation}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">+{user.monthlyGrowth}%</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Achievements</h2>
          <div className="space-y-4">
            {recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 mt-1">
                  {getAchievementIcon(achievement.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{achievement.user}</span> {achievement.achievement}
                  </p>
                  <p className="text-xs text-muted-foreground">{achievement.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPerformance;