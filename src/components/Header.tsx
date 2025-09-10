import { Menu, Bell, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
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
      </div>
    </header>
  );
};

export default Header;