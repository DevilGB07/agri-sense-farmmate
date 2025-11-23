import { Moon, Sun, Bell, Ruler, Smartphone, Info, Globe, Shield, Database } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

const SettingsPage = () => {
    const { theme, setTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const { units, notifications, dataSaver, updateUnits, toggleNotification, toggleDataSaver } = useSettings();

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t('settings')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Appearance & Language */}
                <DashboardCard title={t('appearanceLanguage')} icon={<Globe className="h-6 w-6 text-primary" />}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('appTheme')}</Label>
                                <p className="text-sm text-muted-foreground">{t('selectTheme')}</p>
                            </div>
                            <div className="flex items-center gap-2 border rounded-lg p-1">
                                <Button
                                    variant={theme === 'light' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setTheme('light')}
                                    className="h-8 px-2"
                                >
                                    <Sun className="h-4 w-4 mr-2" /> {t('light')}
                                </Button>
                                <Button
                                    variant={theme === 'dark' ? 'secondary' : 'ghost'}
                                    size="sm"
                                    onClick={() => setTheme('dark')}
                                    className="h-8 px-2"
                                >
                                    <Moon className="h-4 w-4 mr-2" /> {t('dark')}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('language')}</Label>
                                <p className="text-sm text-muted-foreground">{t('selectLanguage')}</p>
                            </div>
                            <Select value={language} onValueChange={(val: any) => setLanguage(val)}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="english">English</SelectItem>
                                    <SelectItem value="hindi">Hindi (हिंदी)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DashboardCard>

                {/* Units & Measurements */}
                <DashboardCard title={t('unitsMeasurements')} icon={<Ruler className="h-6 w-6 text-primary" />}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('temperature')}</Label>
                                <p className="text-sm text-muted-foreground">{t('weatherDisplayUnit')}</p>
                            </div>
                            <Select value={units.system} onValueChange={(val) => updateUnits('system', val)}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="metric">Celsius (°C)</SelectItem>
                                    <SelectItem value="imperial">Fahrenheit (°F)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('landArea')}</Label>
                                <p className="text-sm text-muted-foreground">{t('farmSizeUnit')}</p>
                            </div>
                            <Select value={units.land} onValueChange={(val) => updateUnits('land', val)}>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="acre">Acres</SelectItem>
                                    <SelectItem value="hectare">Hectares</SelectItem>
                                    <SelectItem value="guntha">Guntha</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </DashboardCard>

                {/* Notifications */}
                <DashboardCard title={t('notificationPreferences')} icon={<Bell className="h-6 w-6 text-primary" />}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notif-weather" className="flex-1">{t('weatherAlerts')}</Label>
                            <Switch
                                id="notif-weather"
                                checked={notifications.weather}
                                onCheckedChange={() => toggleNotification('weather')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notif-market" className="flex-1">{t('marketPriceUpdates')}</Label>
                            <Switch
                                id="notif-market"
                                checked={notifications.market}
                                onCheckedChange={() => toggleNotification('market')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notif-community" className="flex-1">{t('communityActivity')}</Label>
                            <Switch
                                id="notif-community"
                                checked={notifications.community}
                                onCheckedChange={() => toggleNotification('community')}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="notif-tips" className="flex-1">{t('farmingTips')}</Label>
                            <Switch
                                id="notif-tips"
                                checked={notifications.tips}
                                onCheckedChange={() => toggleNotification('tips')}
                            />
                        </div>
                    </div>
                </DashboardCard>

                {/* Data & App Info */}
                <DashboardCard title={t('appPreferences')} icon={<Smartphone className="h-6 w-6 text-primary" />}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">{t('dataSaver')}</Label>
                                <p className="text-sm text-muted-foreground">{t('reduceData')}</p>
                            </div>
                            <Switch
                                checked={dataSaver}
                                onCheckedChange={toggleDataSaver}
                            />
                        </div>

                        <div className="pt-4 border-t">
                            <div className="flex items-center gap-2 mb-2">
                                <Info className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{t('aboutApp')}</span>
                            </div>
                            <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('version')}</span>
                                    <span>1.2.0 (Beta)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{t('build')}</span>
                                    <span>2024.05.23</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-4">{t('checkForUpdates')}</Button>
                        </div>
                    </div>
                </DashboardCard>
            </div>
        </div>
    );
};

export default SettingsPage;
