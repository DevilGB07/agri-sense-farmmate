import { Cloud, Droplets, Sprout, Calendar, Award, Thermometer, Wind, Eye } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import weatherImage from "@/assets/weather-dashboard.jpg";
import soilImage from "@/assets/soil-health.jpg";
import cropImage from "@/assets/crop-recommendations.jpg";
import irrigationImage from "@/assets/irrigation-schedule.jpg";
import { useQuery } from "@tanstack/react-query";

const fetchDashboardData = async () => {
  const response = await fetch("/api/dashboard");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['dashboardData'], queryFn: fetchDashboardData });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-earth min-h-screen">
      <h2 className="text-2xl font-bold text-foreground mb-6">Farm Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weather Card */}
        <DashboardCard
          title="Weather & AQI"
          icon={<Cloud className="h-6 w-6 text-primary" />}
          image={weatherImage}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{data.weather.temperature}</span>
              </div>
              <Badge variant="secondary">{data.weather.condition}</Badge>
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

        {/* Soil Health Card */}
        <DashboardCard
          title="Soil Health"
          icon={<Eye className="h-6 w-6 text-accent" />}
          image={soilImage}
        >
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

        {/* Crop Recommendations */}
        <DashboardCard
          title="AI Crop Recommendations"
          icon={<Sprout className="h-6 w-6 text-success" />}
          image={cropImage}
        >
          <div className="space-y-3">
            {data.cropRecommendations.map((crop, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{crop.name}</span>
                  <Badge className="bg-success text-success-foreground">{crop.match}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {crop.note}
                </p>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              View All Recommendations
            </Button>
          </div>
        </DashboardCard>

        {/* Irrigation Schedule */}
        <DashboardCard
          title="Irrigation Schedule"
          icon={<Calendar className="h-6 w-6 text-primary" />}
          image={irrigationImage}
        >
          <div className="space-y-4">
            <div className="p-3 bg-secondary/10 border border-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-secondary" />
                <span className="font-medium">Next Irrigation</span>
              </div>
              <p className="text-lg font-bold text-secondary">{data.irrigationSchedule.nextIrrigation}</p>
              <p className="text-sm text-muted-foreground">{data.irrigationSchedule.zone}</p>
            </div>
            
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Water Usage (This Week)</span>
                <span className="font-semibold">{data.irrigationSchedule.waterUsage}</span>
              </div>
              <div className="flex justify-between">
                <span>Efficiency Score</span>
                <span className="font-semibold text-success">{data.irrigationSchedule.efficiency}</span>
              </div>
            </div>
            
            <Button variant="secondary" className="w-full">
              Adjust Schedule
            </Button>
          </div>
        </DashboardCard>
      </div>

      {/* Green Points Section */}
      <DashboardCard
        title="Green Points"
        icon={<Award className="h-6 w-6 text-secondary" />}
        className="bg-gradient-secondary"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-secondary-foreground">{data.greenPoints.total}</p>
            <p className="text-secondary-foreground/70">Total Eco-Points</p>
          </div>
          <div className="text-right">
            <Badge className="bg-success text-success-foreground mb-2">
              +{data.greenPoints.today} Today
            </Badge>
            <p className="text-sm text-secondary-foreground/70">
              Rank #{data.greenPoints.rank} in Community
            </p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
};

export default Dashboard;
