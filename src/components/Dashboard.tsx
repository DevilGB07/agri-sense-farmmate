import { Cloud, Droplets, Sprout, Calendar, Award, Thermometer, Wind, Eye, MapPin } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IrrigationCard from "./IrrigationCard";

const fetchDashboardData = async (location, season) => {
  let url = `/api/dashboard?season=${season}`;
  if (location) {
    url += `&lat=${location.latitude}&lon=${location.longitude}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Dashboard = () => {
  const [location, setLocation] = useState(null);
  const [showAllCrops, setShowAllCrops] = useState(false);
  const [season, setSeason] = useState('summer');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      (error) => {
        console.error("Error getting user location, falling back to default.", error);
        setLocation(false);
      }
    );
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboardData', location, season],
    queryFn: () => fetchDashboardData(location, season),
    enabled: location !== null,
  });

  useEffect(() => {
    if (location !== null) {
      refetch();
    }
  }, [season, refetch, location]);

  if (isLoading || location === null) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  const displayedCrops = showAllCrops ? data.cropRecommendations : data.cropRecommendations.slice(0, 2);

  return (
    <div className="p-4 space-y-6 bg-gradient-earth min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Farm Dashboard</h2>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="monsoon">Monsoon</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Weather & AQI" icon={<Cloud className="h-6 w-6 text-primary" />}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{data.weather.temperature}</span>
              </div>
              <Badge variant="secondary">{data.weather.condition}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="text-lg font-semibold">{data.weather.city}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">Rainfall</p>
                  <p className="font-semibold">{data.weather.rainfall}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">AQI</p>
                  <p className="font-semibold text-success">{data.weather.aqi}</p>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Soil Health" icon={<Eye className="h-6 w-6 text-accent" />}>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Moisture Level</span>
                <span className="font-semibold">{data.soilHealth.moisture}%</span>
              </div>
              <Progress value={data.soilHealth.moisture} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fertility Index</span>
                <span className="font-semibold">{data.soilHealth.fertility}%</span>
              </div>
              <Progress value={data.soilHealth.fertility} className="h-2" />
            </div>
            <Badge variant="outline" className="text-success border-success">
              {data.soilHealth.conditions}
            </Badge>
          </div>
        </DashboardCard>

        <DashboardCard title="AI Crop Recommendations" icon={<Sprout className="h-6 w-6 text-success" />} className="md:col-span-2">
          <div className="space-y-3">
            {displayedCrops.map((crop, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{crop.name}</span>
                  <Badge className="bg-success text-success-foreground">{crop.match}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{crop.note}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => setShowAllCrops(!showAllCrops)}>
              {showAllCrops ? "View Less" : "View All Recommendations"}
            </Button>
          </div>
        </DashboardCard>

        <div className="md:col-span-2">
          <IrrigationCard />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
