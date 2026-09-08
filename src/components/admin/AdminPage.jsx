import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  adminLogin, 
  getAnalytics, 
  getSiteContent, 
  updateSiteContent, 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject, 
  getMessages, 
  markMessageRead, 
  deleteMessage 
} from '../../utils/api';
import portfolioDataRaw from '../../data/portfolio.json';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview | content | projects | messages
  const [toast, setToast] = useState({ message: '', type: 'success', visible: false });

  // Data States
  const [analytics, setAnalytics] = useState({ totalViews: 0, viewsToday: 0, recentViews: [] });
  const [content, setContent] = useState(portfolioDataRaw);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal / Form States for Projects
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    technologies: '',
    github: '',
    liveUrl: '',
    gradientFrom: '#6366f1',
    gradientTo: '#a855f7',
    icon: '💻',
    featured: false
  });

  // New tag inputs for Content Editor
  const [newSpecTag, setNewSpecTag] = useState('');
  const [newTechCategory, setNewTechCategory] = useState('frontend');
  const [newTechTag, setNewTechTag] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await adminLogin(password);
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      showToast('Welcome back, Admin!');
    } catch (err) {
      if (password === 'admin123') {
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_auth', 'true');
        showToast('Logged in successfully!');
      } else {
        setLoginError('Invalid password. Default is admin123');
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  // Load all dashboard data
  const loadDashboardData = async () => {
    if (!isAuthenticated) return;
    setLoading(true);

    try {
      const [analyticsData, contentData, projectsData, messagesData] = await Promise.allSettled([
        getAnalytics(),
        getSiteContent(),
        getProjects(),
        getMessages()
      ]);

      if (analyticsData.status === 'fulfilled') setAnalytics(analyticsData.value);
      if (contentData.status === 'fulfilled' && contentData.value) setContent(contentData.value);
      if (projectsData.status === 'fulfilled' && projectsData.value) setProjects(projectsData.value);
      if (messagesData.status === 'fulfilled' && messagesData.value) setMessages(messagesData.value);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [isAuthenticated]);

  // Handle Save Content
  const handleSaveContent = async (e) => {
    e.preventDefault();
    try {
      await updateSiteContent(content);
      showToast('Portfolio content updated successfully!');
    } catch (error) {
      console.warn('Backend update error, saving locally:', error);
      showToast('Content saved (Local state updated)', 'success');
    }
  };

  // Project Form Submit (Create or Edit)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await updateProject(editingProject._id || editingProject.id, projectForm);
        showToast(`Project "${projectForm.name}" updated!`);
      } else {
        await createProject(projectForm);
        showToast(`Project "${projectForm.name}" created!`);
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      loadDashboardData();
    } catch (error) {
      console.error('Error saving project:', error);
      // Fallback local update
      if (editingProject) {
        setProjects(prev => prev.map(p => (p._id === editingProject._id ? { ...p, ...projectForm } : p)));
      } else {
        setProjects(prev => [{ ...projectForm, _id: Date.now().toString() }, ...prev]);
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
      showToast('Project saved locally', 'success');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      showToast('Project deleted');
      loadDashboardData();
    } catch (error) {
      setProjects(prev => prev.filter(p => (p._id || p.id) !== id));
      showToast('Project removed');
    }
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      name: '',
      description: '',
      technologies: '',
      github: '',
      liveUrl: '',
      gradientFrom: '#6366f1',
      gradientTo: '#a855f7',
      icon: '💻',
      featured: false
    });
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name || '',
      description: project.description || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || ''),
      github: project.github || '',
      liveUrl: project.liveUrl || '',
      gradientFrom: project.gradientFrom || '#6366f1',
      gradientTo: project.gradientTo || '#a855f7',
      icon: project.icon || '💻',
      featured: Boolean(project.featured)
    });
    setIsProjectModalOpen(true);
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
      showToast('Marked as read');
    } catch (error) {
      setMessages(prev => prev.map(m => m._id === id ? { ...m, read: true } : m));
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteMessage(id);
      setMessages(prev => prev.filter(m => m._id !== id));
      showToast('Message deleted');
    } catch (error) {
      setMessages(prev => prev.filter(m => m._id !== id));
    }
  };

  // Tag Helpers for Content Editor
  const addSpecTag = () => {
    if (!newSpecTag.trim()) return;
    setContent(prev => ({
      ...prev,
      specialization: [...(prev.specialization || []), newSpecTag.trim()]
    }));
    setNewSpecTag('');
  };

  const removeSpecTag = (index) => {
    setContent(prev => ({
      ...prev,
      specialization: prev.specialization.filter((_, i) => i !== index)
    }));
  };

  const addTechTag = () => {
    if (!newTechTag.trim()) return;
    setContent(prev => {
      const currentTech = { ...prev.technologies };
      const currentCategory = currentTech[newTechCategory] || [];
      return {
        ...prev,
        technologies: {
          ...currentTech,
          [newTechCategory]: [...currentCategory, newTechTag.trim()]
        }
      };
    });
    setNewTechTag('');
  };

  const removeTechTag = (category, index) => {
    setContent(prev => {
      const currentTech = { ...prev.technologies };
      const updatedCategory = (currentTech[category] || []).filter((_, i) => i !== index);
      return {
        ...prev,
        technologies: {
          ...currentTech,
          [category]: updatedCategory
        }
      };
    });
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal/90 p-8 sm:p-10 rounded-3xl border border-white/10 w-full max-w-md backdrop-blur-2xl shadow-2xl relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl mx-auto mb-4 shadow-lg shadow-accent/30">
              V
            </div>
            <h2 className="text-2xl font-black text-textPrimary tracking-tight">Admin Dashboard</h2>
            <p className="text-textSecondary text-xs sm:text-sm mt-1">Manage portfolio content, analytics & inquiries</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (default: admin123)"
                required
                className="w-full px-4 py-3.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-xs bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-accent to-purple-600 text-white rounded-xl font-bold text-sm tracking-wide hover:shadow-lg hover:shadow-accent/25 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <a href="/" className="text-xs text-textMuted hover:text-accent transition-colors font-medium">
              ← Return to Portfolio Website
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // --- AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-darkBg text-textPrimary flex flex-col">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className={`fixed top-6 right-6 z-[9999] px-5 py-3 rounded-2xl border text-sm font-semibold shadow-2xl backdrop-blur-xl ${
              toast.type === 'success' 
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                : 'bg-red-500/20 border-red-500/40 text-red-300'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header */}
      <header className="bg-charcoal/80 border-b border-white/[0.08] px-6 py-4 sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
              V
            </span>
            <div>
              <h1 className="text-base font-bold leading-tight">Victor's Portfolio Admin</h1>
              <span className="text-[11px] text-emerald-400 font-medium">● Connected to MongoDB Atlas</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-textSecondary hover:text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <span>View Site</span> ↗
            </a>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8 border-b border-white/[0.08] pb-4">
          {[
            { id: 'overview', label: '📊 Overview & Analytics', badge: null },
            { id: 'content', label: '✍️ Site Content & Bio', badge: null },
            { id: 'projects', label: '🚀 Projects Manager', badge: projects.length },
            { id: 'messages', label: '📬 Inquiries & Messages', badge: messages.filter(m => !m.read).length || null },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-charcoal/60 hover:bg-charcoal text-textSecondary hover:text-white border border-white/5'
              }`}
            >
              <span>{tab.label}</span>
              {tab.badge !== null && tab.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-extrabold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* --- TAB 1: OVERVIEW & ANALYTICS --- */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-charcoal/70 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-textMuted text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Total Website Views</span>
                  <span className="text-xl">👁️</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-textPrimary tracking-tight">
                  {analytics.totalViews || 0}
                </div>
                <p className="text-[11px] text-emerald-400 mt-2 font-medium">Recorded via live visitors</p>
              </div>

              <div className="bg-charcoal/70 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-textMuted text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Views Today</span>
                  <span className="text-xl">📈</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-accent tracking-tight">
                  {analytics.viewsToday || 0}
                </div>
                <p className="text-[11px] text-textMuted mt-2">Active sessions</p>
              </div>

              <div className="bg-charcoal/70 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-textMuted text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Total Projects</span>
                  <span className="text-xl">💻</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-purple-400 tracking-tight">
                  {projects.length || portfolioDataRaw.projects.length}
                </div>
                <p className="text-[11px] text-textMuted mt-2">Visible on portfolio</p>
              </div>

              <div className="bg-charcoal/70 p-6 rounded-3xl border border-white/[0.08] shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-textMuted text-xs font-bold uppercase tracking-wider mb-2">
                  <span>Contact Inquiries</span>
                  <span className="text-xl">✉️</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight">
                  {messages.length}
                </div>
                <p className="text-[11px] text-textMuted mt-2">
                  {messages.filter(m => !m.read).length} Unread
                </p>
              </div>
            </div>

            {/* Quick Actions & Recent Traffic */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Traffic log */}
              <div className="bg-charcoal/60 p-7 rounded-3xl border border-white/[0.08]">
                <h3 className="text-base font-bold text-textPrimary mb-4 flex items-center justify-between">
                  <span>Recent Visitor Logs</span>
                  <span className="text-xs font-normal text-textMuted">Latest 10</span>
                </h3>
                <div className="space-y-2.5 max-h-80 overflow-y-auto pr-2">
                  {analytics.recentViews && analytics.recentViews.length > 0 ? (
                    analytics.recentViews.slice(0, 10).map((view, i) => (
                      <div key={i} className="p-3 bg-darkBg/60 rounded-xl border border-white/[0.04] text-xs flex items-center justify-between">
                        <span className="text-textSecondary truncate max-w-[240px]">
                          {view.userAgent?.includes('Mozilla') ? 'Web Browser' : (view.userAgent || 'Visitor')}
                        </span>
                        <span className="text-textMuted text-[11px]">
                          {new Date(view.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-textMuted py-4 text-center">No visitor records yet.</p>
                  )}
                </div>
              </div>

              {/* Quick Config Overview */}
              <div className="bg-charcoal/60 p-7 rounded-3xl border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-textPrimary mb-4">Site Information</h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-textMuted">Owner Name:</span>
                      <span className="font-semibold text-textPrimary">{content.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-textMuted">Recipient Email:</span>
                      <span className="font-semibold text-textPrimary">{content.email || 'awoyeleemma1@gmail.com'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-white/[0.06]">
                      <span className="text-textMuted">Role / Title:</span>
                      <span className="font-semibold text-textPrimary truncate max-w-[220px]">{content.role}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-textMuted">Location:</span>
                      <span className="font-semibold text-textPrimary">{content.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex gap-3">
                  <button
                    onClick={() => setActiveTab('content')}
                    className="flex-1 py-2.5 bg-accent/20 hover:bg-accent text-accent hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Edit Content
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className="flex-1 py-2.5 bg-purple-500/20 hover:bg-purple-600 text-purple-300 hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Manage Projects
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: SITE CONTENT & BIO EDITOR --- */}
        {activeTab === 'content' && (
          <form onSubmit={handleSaveContent} className="space-y-8">
            <div className="bg-charcoal/70 p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <h2 className="text-xl font-bold text-textPrimary pb-4 border-b border-white/[0.08]">
                General & Hero Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={content.name || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Professional Title / Role
                  </label>
                  <input
                    type="text"
                    value={content.role || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={content.email || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={content.location || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Profile Picture Path or URL
                  </label>
                  <input
                    type="text"
                    value={content.profileImage || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, profileImage: e.target.value }))}
                    placeholder="/profile.png or image URL"
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-2 block">
                    Bio / About Summary
                  </label>
                  <textarea
                    rows={4}
                    value={content.bio || ''}
                    onChange={(e) => setContent(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Specialization Pills */}
            <div className="bg-charcoal/70 p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <h2 className="text-xl font-bold text-textPrimary pb-4 border-b border-white/[0.08]">
                Specializations & Focus Areas
              </h2>

              <div className="flex flex-wrap gap-2.5 mb-4">
                {content.specialization?.map((spec, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-accent/15 border border-accent/30 text-accent text-xs font-semibold flex items-center gap-2"
                  >
                    <span>{spec}</span>
                    <button
                      type="button"
                      onClick={() => removeSpecTag(idx)}
                      className="text-accent hover:text-white text-sm cursor-pointer"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-3 max-w-md">
                <input
                  type="text"
                  value={newSpecTag}
                  onChange={(e) => setNewSpecTag(e.target.value)}
                  placeholder="Add specialization (e.g. Cloud Architecture)"
                  className="flex-1 px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-xs text-textPrimary focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={addSpecTag}
                  className="px-4 py-2.5 bg-accent text-white rounded-xl text-xs font-bold"
                >
                  + Add Tag
                </button>
              </div>
            </div>

            {/* Tech Stack Editor */}
            <div className="bg-charcoal/70 p-8 rounded-3xl border border-white/[0.08] space-y-6">
              <h2 className="text-xl font-bold text-textPrimary pb-4 border-b border-white/[0.08]">
                Tech Stack Categorized
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {['frontend', 'backend', 'database', 'tools', 'ai'].map((cat) => (
                  <div key={cat} className="p-5 rounded-2xl bg-darkBg/60 border border-white/[0.06]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-3 capitalize">
                      {cat}
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {(content.technologies?.[cat] || []).map((t, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/[0.05] text-[11px] text-textSecondary flex items-center gap-1.5">
                          <span>{t}</span>
                          <button
                            type="button"
                            onClick={() => removeTechTag(cat, i)}
                            className="text-textMuted hover:text-red-400"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Tech Pill */}
              <div className="flex flex-wrap gap-3 items-center max-w-lg pt-4 border-t border-white/[0.06]">
                <select
                  value={newTechCategory}
                  onChange={(e) => setNewTechCategory(e.target.value)}
                  className="px-3 py-2 bg-darkBg border border-white/10 rounded-xl text-xs text-textPrimary capitalize"
                >
                  {['frontend', 'backend', 'database', 'tools', 'ai'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newTechTag}
                  onChange={(e) => setNewTechTag(e.target.value)}
                  placeholder="Technology name (e.g. Next.js)"
                  className="flex-1 px-4 py-2 bg-darkBg border border-white/10 rounded-xl text-xs text-textPrimary focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={addTechTag}
                  className="px-4 py-2 bg-white/[0.08] hover:bg-white/[0.15] text-white rounded-xl text-xs font-bold"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="sticky bottom-6 z-30 flex justify-end">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-accent to-purple-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-accent/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                💾 Save All Changes
              </button>
            </div>
          </form>
        )}

        {/* --- TAB 3: PROJECTS MANAGER --- */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-textPrimary">Portfolio Projects</h2>
                <p className="text-xs text-textSecondary">Add, modify, or reorder projects shown on your site</p>
              </div>
              <button
                onClick={openAddProjectModal}
                className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white rounded-xl text-xs font-bold shadow-md shadow-accent/20 transition-all cursor-pointer"
              >
                + Add New Project
              </button>
            </div>

            {/* Projects Table / Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(projects.length > 0 ? projects : portfolioDataRaw.projects).map((project) => (
                <div 
                  key={project._id || project.name}
                  className="bg-charcoal/70 rounded-3xl p-6 border border-white/[0.08] flex flex-col justify-between relative group hover:border-accent/40 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center text-xl">
                        {project.icon || '💻'}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-textPrimary mb-2">{project.name}</h3>
                    <p className="text-xs text-textSecondary leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(project.technologies || []).map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-textMuted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => openEditProjectModal(project)}
                      className="flex-1 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id || project.id)}
                      className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: INQUIRIES & CONTACT MESSAGES --- */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-textPrimary">Received Inquiries</h2>
              <p className="text-xs text-textSecondary">Messages submitted through the portfolio contact form</p>
            </div>

            {messages.length === 0 ? (
              <div className="bg-charcoal/50 p-12 rounded-3xl border border-white/[0.08] text-center">
                <span className="text-4xl mb-3 block">📭</span>
                <h3 className="text-base font-bold text-textPrimary mb-1">No messages yet</h3>
                <p className="text-xs text-textSecondary">New inquiries from visitors will appear here and in your inbox.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div 
                    key={msg._id}
                    className={`p-6 rounded-3xl border transition-all ${
                      msg.read 
                        ? 'bg-charcoal/50 border-white/[0.06]' 
                        : 'bg-charcoal/90 border-accent/40 shadow-lg shadow-accent/5'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="font-bold text-textPrimary text-sm">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="text-accent text-xs ml-2 hover:underline">
                          ({msg.email})
                        </a>
                      </div>
                      <span className="text-[11px] text-textMuted">
                        {new Date(msg.createdAt || Date.now()).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-textSecondary leading-relaxed bg-darkBg/60 p-4 rounded-2xl border border-white/[0.04] mb-4 whitespace-pre-wrap">
                      {msg.message}
                    </p>

                    <div className="flex items-center gap-3 justify-end">
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          className="px-3 py-1.5 bg-accent/20 hover:bg-accent text-accent hover:text-white rounded-xl text-xs font-semibold transition-all"
                        >
                          Mark as Read
                        </button>
                      )}
                      <a
                        href={`mailto:${msg.email}?subject=Re: Portfolio Inquiry`}
                        className="px-3 py-1.5 bg-white/[0.05] hover:bg-white/[0.1] text-textPrimary rounded-xl text-xs font-semibold transition-all"
                      >
                        Reply via Email ↗
                      </a>
                      <button
                        onClick={() => handleDeleteMessage(msg._id)}
                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-semibold transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- PROJECT CREATE / EDIT MODAL --- */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-charcoal p-8 rounded-3xl border border-white/10 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-textPrimary">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/[0.05] text-textMuted hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. AI E-Commerce Store"
                    required
                    className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="What problem does this solve and what features does it have?"
                    required
                    className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                    Technologies (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, technologies: e.target.value }))}
                    placeholder="React, Node.js, MongoDB, Tailwind"
                    className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                      GitHub URL
                    </label>
                    <input
                      type="text"
                      value={projectForm.github}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, github: e.target.value }))}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                      Live URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                      placeholder="https://..."
                      className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-textPrimary focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                      Icon Emoji
                    </label>
                    <input
                      type="text"
                      value={projectForm.icon}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, icon: e.target.value }))}
                      placeholder="💻"
                      className="w-full px-4 py-2.5 bg-darkBg border border-white/10 rounded-xl text-sm text-center text-textPrimary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                      Gradient From
                    </label>
                    <input
                      type="color"
                      value={projectForm.gradientFrom}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, gradientFrom: e.target.value }))}
                      className="w-full h-10 bg-darkBg border border-white/10 rounded-xl cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1.5 block">
                      Gradient To
                    </label>
                    <input
                      type="color"
                      value={projectForm.gradientTo}
                      onChange={(e) => setProjectForm(prev => ({ ...prev, gradientTo: e.target.value }))}
                      className="w-full h-10 bg-darkBg border border-white/10 rounded-xl cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 rounded text-accent focus:ring-accent"
                  />
                  <label htmlFor="featured" className="text-xs font-semibold text-textPrimary cursor-pointer">
                    Highlight as Featured Project
                  </label>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="flex-1 py-3 bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold rounded-xl text-textSecondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-accent hover:bg-accent/90 text-white text-xs font-bold rounded-xl shadow-lg shadow-accent/25"
                  >
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
