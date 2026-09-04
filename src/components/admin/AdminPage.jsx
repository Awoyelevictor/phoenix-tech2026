import { useState } from 'react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // projects | content | messages

  const handleLogin = (e) => {
    e.preventDefault();
    // Simplified client-side auth for now. The backend also needs protection.
    if (password === 'admin123') { // Matches .env for simplicity
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-charcoal p-8 rounded-2xl border border-white/10 w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-textPrimary mb-6 text-center">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-darkBg border border-white/10 rounded-xl text-textPrimary focus:outline-none focus:border-accent"
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-accent text-white rounded-xl font-medium hover:bg-accent/90 transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkBg text-textPrimary p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Nav */}
          <aside className="w-full md:w-64 flex flex-col gap-2">
            {['projects', 'content', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-3 rounded-xl capitalize transition-colors ${
                  activeTab === tab 
                    ? 'bg-accent/20 text-accent font-medium' 
                    : 'text-textSecondary hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-charcoal p-8 rounded-2xl border border-white/10 min-h-[600px]">
            {activeTab === 'projects' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Manage Projects</h2>
                <p className="text-textSecondary mb-8">Add, edit, or remove your portfolio projects here.</p>
                <div className="bg-darkBg p-6 rounded-xl border border-white/5 text-center text-textMuted">
                  Project management UI coming soon. (Requires backend API connection)
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Site Content</h2>
                <p className="text-textSecondary mb-8">Edit your bio, skills, and social links.</p>
                <div className="bg-darkBg p-6 rounded-xl border border-white/5 text-center text-textMuted">
                  Content editor UI coming soon.
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Contact Messages</h2>
                <p className="text-textSecondary mb-8">View messages sent via the contact form.</p>
                <div className="bg-darkBg p-6 rounded-xl border border-white/5 text-center text-textMuted">
                  Message viewer coming soon.
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
