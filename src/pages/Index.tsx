import { useState } from "react";
// AgriEnviroSense AI - Smart Farming Dashboard
import Header from "@/components/Header";
import NavigationDrawer from "@/components/NavigationDrawer";
import Dashboard from "@/components/Dashboard";
import CropsPage from "@/components/pages/CropsPage";
import CommunityPage from "@/components/pages/CommunityPage";
import HelpPage from "@/components/pages/HelpPage";
import AccountPage from "@/components/pages/AccountPage";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'crops':
        return <CropsPage />;
      case 'community':
        return <CommunityPage />;
      case 'help':
        return <HelpPage />;
      case 'account':
        return <AccountPage />;
      case 'settings':
        return (
          <div className="p-4">
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
            <p className="text-muted-foreground mt-4">Settings page coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setIsMenuOpen(true)} />
      
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <main className="pb-4">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
