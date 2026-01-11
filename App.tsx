import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Receipt, MessageSquare, Settings, LogOut, Menu, X, CreditCard, Globe } from 'lucide-react';
import Dashboard from './components/Dashboard';
import NudgeGenerator from './components/NudgeGenerator';
import Invoices from './components/Invoices';
import { GlobalMap } from './components/GlobalMap';
import { LoadingScreen } from './components/LoadingScreen';
import { LoginScreen } from './components/LoginScreen';

type View = 'dashboard' | 'invoices' | 'nudges' | 'settings' | 'map';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    const session = localStorage.getItem('swift_session');
    const user = localStorage.getItem('swift_current_user');
    
    if (session === 'true' && user) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    const user = localStorage.getItem('swift_current_user');
    if (user) setCurrentUser(JSON.parse(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('swift_session');
    localStorage.removeItem('swift_current_user');
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const renderView = () => {
    switch(currentView) {
      case 'dashboard': return <Dashboard />;
      case 'invoices': return <Invoices />;
      case 'nudges': return <NudgeGenerator />;
      case 'map': return <GlobalMap />;
      default: return <div className="text-center py-20 text-zinc-500">Em construção...</div>;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 group overflow-hidden ${
        currentView === view 
          ? 'text-white font-semibold' 
          : 'text-zinc-400 hover:text-white'
      }`}
    >
      {/* Active State Background with Glow */}
      {currentView === view && (
        <div className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] z-0" />
      )}
      
      {/* Hover State Background */}
      {currentView !== view && (
        <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
      )}

      <Icon className={`relative z-10 w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${currentView === view ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`} />
      <span className="relative z-10">{label}</span>
      
      {/* Active Indicator Dot */}
      {currentView === view && (
        <div className="absolute right-3 w-1.5 h-1.5 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] animate-pulse" />
      )}
    </button>
  );

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen bg-black text-white flex overflow-hidden font-sans selection:bg-white selection:text-black transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* === AMBIENT BACKGROUND EFFECTS === */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Top Left Blob */}
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-zinc-800/20 rounded-full blur-[120px] animate-blob mix-blend-screen" />
          {/* Bottom Right Blob */}
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-zinc-900/30 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
          {/* Center Subtle Blob */}
          <div className="absolute top-[20%] left-[30%] w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] animate-pulse-slow mix-blend-overlay" />
        </div>
        
        {/* Noise Texture Overlay - Background layer */}
        <div className="bg-noise" />

        {!isAuthenticated ? (
          // RENDER LOGIN SCREEN IF NOT AUTHENTICATED
          <div className="relative z-10 w-full overflow-y-auto">
            <LoginScreen onLogin={handleLogin} />
          </div>
        ) : (
          // RENDER DASHBOARD IF AUTHENTICATED
          <>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <aside className={`
              fixed lg:static inset-y-0 left-0 z-50 w-72 h-full bg-zinc-950/80 backdrop-blur-2xl lg:backdrop-blur-xl border-r border-white/5 p-6 flex flex-col transition-transform duration-300
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
              <div className="flex items-center justify-between lg:justify-start space-x-3 mb-10 px-2">
                <div className="flex items-center space-x-3">
                  <div className="relative w-8 h-8 bg-gradient-to-br from-white to-zinc-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <CreditCard className="w-5 h-5 text-black" />
                  </div>
                  <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">SwiftCollect</span>
                </div>
                {/* Mobile Close Button */}
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2 overflow-y-auto">
                <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
                <NavItem view="map" icon={Globe} label="Mapa Global" />
                <NavItem view="invoices" icon={Receipt} label="Faturas & Links" />
                <NavItem view="nudges" icon={MessageSquare} label="Régua de Nudges IA" />
                <NavItem view="settings" icon={Settings} label="Configurações" />
              </nav>

              <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/5 mb-4 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-500 to-zinc-700 flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-white/20 transition-all uppercase text-white shrink-0">
                    {currentUser?.name?.substring(0,2) || 'US'}
                  </div>
                  <div className="ml-3 overflow-hidden">
                    <div className="text-sm font-medium truncate">{currentUser?.name || 'Usuário'}</div>
                    <div className="text-xs text-zinc-500 truncate">{currentUser?.email || 'user@swift.com'}</div>
                  </div>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-4 py-2 text-zinc-500 hover:text-red-400 transition-colors w-full group"
                >
                  <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
              {/* Header (Mobile Only) */}
              <header className="lg:hidden h-16 border-b border-white/10 flex items-center justify-between px-4 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-white to-zinc-400 rounded-md flex items-center justify-center">
                    <CreditCard className="w-3 h-3 text-black" />
                  </div>
                  <span className="font-bold text-sm">SwiftCollect</span>
                </div>
                <button onClick={() => setIsSidebarOpen(true)} className="p-2 -mr-2 text-zinc-300 hover:text-white">
                  <Menu className="w-6 h-6" />
                </button>
              </header>

              {/* Scrollable Area */}
              <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative scroll-smooth w-full">
                <div className="relative z-10 max-w-7xl mx-auto pb-20 lg:pb-0">
                    {renderView()}
                </div>
              </div>
            </main>
          </>
        )}

      </div>
    </>
  );
};

export default App;