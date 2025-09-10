import { X, Home, Sprout, Users, HelpCircle, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const NavigationDrawer = ({ isOpen, onClose, onNavigate, currentPage }: NavigationDrawerProps) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'crops', label: 'Crop & Irrigation', icon: Sprout },
    { id: 'community', label: 'Community Hub', icon: Users },
    { id: 'help', label: 'Help Center', icon: HelpCircle },
    { id: 'account', label: 'Manage Account', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 z-50 h-full w-80 bg-card shadow-strong transition-transform">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-primary">
            <h2 className="text-lg font-semibold text-primary-foreground">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-primary-foreground hover:bg-primary-light"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-base h-12"
                  onClick={() => {
                    onNavigate(item.id);
                    onClose();
                  }}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          <Separator />

          {/* Logout */}
          <div className="p-4">
            <Button
              variant="destructive"
              className="w-full justify-start text-base h-12"
              onClick={() => {
                // Handle logout
                onClose();
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationDrawer;