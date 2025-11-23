import { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { User, Settings, Globe, Bell, Shield, Edit } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const AccountPage = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Profile State
  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh@example.com",
    location: "Punjab, India",
    farmSize: "5.2 acres"
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(profile);

  // Fetch profile from Firestore on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!db) {
        console.error("Firestore db is not initialized");
        return;
      }
      try {
        const docRef = doc(db, "users", "demo-user");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as any);
        } else {
          // If no document exists, create one with default data
          await setDoc(docRef, profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match.");
      return;
    }
    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    // In a real app, you would handle the password change logic here
    alert("Password changed successfully!");
    setIsChangePasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const { toast } = useToast();

  const handleSaveProfile = async () => {
    console.log("Attempting to save profile...", editForm);
    if (!db) {
      console.error("Database connection failed: db object is undefined");
      toast({
        title: "Connection Error",
        description: "Database connection failed. Cannot save. Please check your internet connection or Firebase configuration.",
        variant: "destructive",
      });
      return;
    }
    try {
      console.log("Writing to Firestore...");
      await setDoc(doc(db, "users", "demo-user"), editForm);
      console.log("Profile saved successfully to Firestore");
      setProfile(editForm);
      setIsEditingProfile(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: `Failed to save profile: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      });
    }
  };

  const handleEditClick = () => {
    setEditForm(profile);
    setIsEditingProfile(true);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t('manageAccount')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title={t('profileInformation')}
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
                <h3 className="font-semibold text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">Farmer ID: AGR001234</p>
                <Badge className="mt-1 bg-success text-success-foreground">
                  {t('verifiedFarmer')}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">{t('phoneNumber')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{profile.phone}</span>
                  <Button variant="ghost" size="sm" onClick={handleEditClick}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">{t('email')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{profile.email}</span>
                  <Button variant="ghost" size="sm" onClick={handleEditClick}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">{t('farmLocation')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{profile.location}</span>
                  <Button variant="ghost" size="sm" onClick={handleEditClick}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">{t('farmSize')}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{profile.farmSize}</span>
                  <Button variant="ghost" size="sm" onClick={handleEditClick}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title={t('languageSettings')}
          icon={<Globe className="h-6 w-6 text-accent" />}
        >
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t('primaryLanguage')}</label>
              <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">{t('secondaryLanguage')}</label>
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
                  <p className="font-medium text-sm">{t('voiceCommands')}</p>
                  <p className="text-xs text-muted-foreground">{t('enableVoice')}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title={t('notificationPreferences')}
          icon={<Bell className="h-6 w-6 text-secondary" />}
        >
          <div className="space-y-4">
            {[
              {
                title: t('weatherAlerts'),
                description: t('severeWeather'),
                enabled: true
              },
              {
                title: t('irrigationReminders'),
                description: t('wateringSchedule'),
                enabled: true
              },
              {
                title: t('cropHealthUpdates'),
                description: t('diseaseAlerts'),
                enabled: true
              },
              {
                title: t('marketPriceUpdates'),
                description: t('dailyCommodity'),
                enabled: false
              },
              {
                title: t('communityActivity'),
                description: t('forumDiscussions'),
                enabled: false
              },
              {
                title: t('greenPointsUpdates'),
                description: t('achievementUpdates'),
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
          title={t('privacySecurity')}
          icon={<Shield className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-3 bg-success/10 border border-success rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-success text-sm">{t('accountSecurity')}</p>
                  <p className="text-xs text-muted-foreground">{t('yourAccountSecure')}</p>
                </div>
                <Badge className="bg-success text-success-foreground">✓ {t('verified')}</Badge>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{t('twoFactor')}</p>
                  <p className="text-xs text-muted-foreground">{t('addExtraSecurity')}</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{t('dataSharing')}</p>
                  <p className="text-xs text-muted-foreground">{t('shareData')}</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{t('locationServices')}</p>
                  <p className="text-xs text-muted-foreground">{t('forWeather')}</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="sm" onClick={() => setIsChangePasswordDialogOpen(true)}>
                {t('changePassword')}
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                {t('downloadData')}
              </Button>
              <Button variant="destructive" className="w-full" size="sm">
                {t('deleteAccount')}
              </Button>
            </div>
          </div>
        </DashboardCard>
      </div>

      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('changePassword')}</DialogTitle>
            <DialogDescription>
              Enter your current password and new password to update it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              id="currentPassword"
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChangePasswordDialogOpen(false)}>{t('cancel')}</Button>
            <Button onClick={handlePasswordChange}>{t('saveChanges')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingProfile} onOpenChange={setIsEditingProfile}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('edit')} {t('profileInformation')}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="edit-name">{t('profileInformation')}</label>
              <Input
                id="edit-name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-phone">{t('phoneNumber')}</label>
              <Input
                id="edit-phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-email">{t('email')}</label>
              <Input
                id="edit-email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-location">{t('farmLocation')}</label>
              <Input
                id="edit-location"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="edit-size">{t('farmSize')}</label>
              <Input
                id="edit-size"
                value={editForm.farmSize}
                onChange={(e) => setEditForm({ ...editForm, farmSize: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingProfile(false)}>{t('cancel')}</Button>
            <Button onClick={handleSaveProfile}>{t('saveChanges')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountPage;
