import { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Search, Filter, MapPin } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Realistic Mock Data for Indian Mandis
const marketData = [
    { id: 1, crop: "Onion (Red)", market: "Lasalgaon, Nashik", price: 2450, change: 120, trend: "up", date: "2024-05-20" },
    { id: 2, crop: "Tomato (Hybrid)", market: "Kolar, Karnataka", price: 1800, change: -50, trend: "down", date: "2024-05-20" },
    { id: 3, crop: "Wheat (Lokwan)", market: "Khanna, Punjab", price: 2275, change: 0, trend: "stable", date: "2024-05-20" },
    { id: 4, crop: "Cotton (Medium)", market: "Rajkot, Gujarat", price: 7200, change: 150, trend: "up", date: "2024-05-20" },
    { id: 5, crop: "Soybean", market: "Indore, MP", price: 4800, change: -100, trend: "down", date: "2024-05-20" },
    { id: 6, crop: "Potato (Jyoti)", market: "Agra, UP", price: 1450, change: 20, trend: "up", date: "2024-05-20" },
    { id: 7, crop: "Rice (Basmati)", market: "Karnal, Haryana", price: 3800, change: 0, trend: "stable", date: "2024-05-20" },
    { id: 8, crop: "Maize", market: "Davangere, Karnataka", price: 1950, change: 40, trend: "up", date: "2024-05-20" },
    { id: 9, crop: "Grapes (Thompson)", market: "Pimpalgaon, Nashik", price: 6500, change: -200, trend: "down", date: "2024-05-20" },
    { id: 10, crop: "Pomegranate (Bhagwa)", market: "Nashik, Nashik", price: 8200, change: 100, trend: "up", date: "2024-05-20" },
    { id: 11, crop: "Tomato (Desi)", market: "Pimpalgaon, Nashik", price: 1600, change: 50, trend: "up", date: "2024-05-20" },
    { id: 12, crop: "Bajra", market: "Yeola, Nashik", price: 2100, change: 0, trend: "stable", date: "2024-05-20" },
];

const MarketPage = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMarket, setSelectedMarket] = useState("all");

    const filteredData = marketData.filter(item => {
        const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesMarket = selectedMarket === "all" || item.market.includes(selectedMarket);
        return matchesSearch && matchesMarket;
    });

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">{t('marketPrices')}</h2>
                    <p className="text-muted-foreground">{t('realTimePrices')}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-success/10 text-success border-success">
                        {t('liveUpdates')}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{t('lastUpdated')}: Today, 10:00 AM</span>
                </div>
            </div>

            <StaggerContainer className="space-y-6">
                <StaggerItem>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t('searchCrops')}
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                            <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder={t('filterByMarket')} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">{t('allMarkets')}</SelectItem>
                                <SelectItem value="Nashik">Nashik</SelectItem>
                                <SelectItem value="Punjab">Punjab</SelectItem>
                                <SelectItem value="Karnataka">Karnataka</SelectItem>
                                <SelectItem value="Gujarat">Gujarat</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </StaggerItem>

                <StaggerItem>
                    <DashboardCard title={t('commodityPrices')} icon={<TrendingUp className="h-6 w-6 text-primary" />}>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('crop')}</TableHead>
                                        <TableHead>{t('market')}</TableHead>
                                        <TableHead className="text-right">{t('price')}</TableHead>
                                        <TableHead className="text-right">{t('change')}</TableHead>
                                        <TableHead className="text-center">{t('trend')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                                {t('noCropsFound')}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredData.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="font-medium">{item.crop}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <MapPin className="h-3 w-3" />
                                                        {item.market}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right font-bold">₹{item.price}</TableCell>
                                                <TableCell className={`text-right ${item.trend === 'up' ? 'text-success' : item.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'}`}>
                                                    {item.trend === 'up' ? '+' : ''}{item.change}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {item.trend === 'up' && <TrendingUp className="h-4 w-4 text-success mx-auto" />}
                                                    {item.trend === 'down' && <TrendingDown className="h-4 w-4 text-destructive mx-auto" />}
                                                    {item.trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground mx-auto" />}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </DashboardCard>
                </StaggerItem>
            </StaggerContainer>
        </div>
    );
};

export default MarketPage;
