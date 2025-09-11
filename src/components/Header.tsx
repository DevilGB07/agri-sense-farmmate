import { Menu, Bell, Leaf, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, show a toast or notification to the user
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-primary shadow-medium">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Hamburger Menu */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-primary-foreground hover:bg-primary-light"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* App Name/Logo */}
        <div className="flex items-center gap-2">
          <Leaf className="h-8 w-8 text-secondary" />
          <h1 className="text-xl font-bold text-primary-foreground">
            AgriEnviroSense AI
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-light"
            >
              <Bell className="h-6 w-6" />
            </Button>
            <Badge className="absolute -right-1 -top-1 h-5 w-5 p-0 bg-secondary text-xs text-secondary-foreground">
              3
            </Badge>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-light"
            aria-label="Log out"
          >
            <LogOut className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
