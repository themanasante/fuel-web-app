import { useState } from 'react';
import { SidebarProvider, SidebarInset } from './components/ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { DailyOperations } from './components/DailyOperations';
import { PriceManagement } from './components/PriceManagement';
import { TanksMeters } from './components/TanksMeters';
import { Expenses } from './components/Expenses';
import { Reports } from './components/Reports';
import { Settings } from './components/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  if (!isAuthenticated) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <SidebarInset className="flex-1">
          <main className="p-6 bg-gray-50 min-h-screen">
            {currentView === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
            {currentView === 'operations' && <DailyOperations />}
            {currentView === 'tanks' && <TanksMeters />}
            {currentView === 'pricing' && <PriceManagement />}
            {currentView === 'expenses' && <Expenses />}
            {currentView === 'reports' && <Reports />}
            {currentView === 'settings' && <Settings />}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
