import { User, Settings, Globe, Bell, Shield, Edit } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const AccountPage = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Manage Account</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Profile Information"
          icon={<User className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                  RK
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">Rajesh Kumar</h3>
                <p className="text-muted-foreground">Farmer ID: AGR001234</p>
                <Badge className="mt-1 bg-success text-success-foreground">
                  Verified Farmer
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Phone Number</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">+91 98765 43210</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Email</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">rajesh@example.com</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Farm Location</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Punjab, India</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Farm Size</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">5.2 acres</span>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Language Settings"
          icon={<Globe className="h-6 w-6 text-accent" />}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Language</label>
              <Select defaultValue="hindi">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                  <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                  <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                  <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                  <SelectItem value="gujarati">ગુજરાતી (Gujarati)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Secondary Language</label>
              <Select defaultValue="english">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="punjabi">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Voice Commands</p>
                  <p className="text-xs text-muted-foreground">Enable voice input in selected language</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Notification Preferences"
          icon={<Bell className="h-6 w-6 text-secondary" />}
        >
          <div className="space-y-4">
            {[
              { 
                title: "Weather Alerts", 
                description: "Severe weather and rain predictions",
                enabled: true 
              },
              { 
                title: "Irrigation Reminders", 
                description: "Watering schedule notifications",
                enabled: true 
              },
              { 
                title: "Crop Health Updates", 
                description: "Disease alerts and recommendations",
                enabled: true 
              },
              { 
                title: "Market Price Updates", 
                description: "Daily commodity price changes",
                enabled: false 
              },
              { 
                title: "Community Activity", 
                description: "Forum discussions and replies",
                enabled: false 
              },
              { 
                title: "Green Points Updates", 
                description: "Achievement and ranking updates",
                enabled: true 
              }
            ].map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{setting.title}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Privacy & Security"
          icon={<Shield className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-3 bg-success/10 border border-success rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-success text-sm">Account Security</p>
                  <p className="text-xs text-muted-foreground">Your account is secure</p>
                </div>
                <Badge className="bg-success text-success-foreground">✓ Verified</Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Data Sharing</p>
                  <p className="text-xs text-muted-foreground">Share anonymous data for research</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Location Services</p>
                  <p className="text-xs text-muted-foreground">For weather and local recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm">
                Change Password
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Download My Data
              </Button>
              <Button variant="destructive" className="w-full" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default AccountPage;