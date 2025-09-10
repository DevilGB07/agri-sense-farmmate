import { Sprout, Droplets, Calendar, TrendingUp } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const CropsPage = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Crop & Irrigation Recommendations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Current Season Crops"
          icon={<Sprout className="h-6 w-6 text-success" />}
        >
          <div className="space-y-4">
            {[
              { name: "Tomatoes", match: 96, status: "Excellent", color: "success" },
              { name: "Bell Peppers", match: 89, status: "Very Good", color: "success" },
              { name: "Corn", match: 78, status: "Good", color: "secondary" },
              { name: "Wheat", match: 65, status: "Fair", color: "warning" },
            ].map((crop) => (
              <div key={crop.name} className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{crop.name}</span>
                  <Badge variant={crop.color === "success" ? "default" : "secondary"}>
                    {crop.match}% Match
                  </Badge>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Suitability</span>
                  <span className="font-semibold">{crop.status}</span>
                </div>
                <Progress value={crop.match} className="h-2" />
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Irrigation Zones"
          icon={<Droplets className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            {[
              { zone: "Zone A", crop: "Tomatoes", next: "6:00 AM", status: "active" },
              { zone: "Zone B", crop: "Peppers", next: "7:30 AM", status: "scheduled" },
              { zone: "Zone C", crop: "Corn", next: "Manual", status: "manual" },
            ].map((zone) => (
              <div key={zone.zone} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium">{zone.zone}</span>
                    <p className="text-sm text-muted-foreground">{zone.crop}</p>
                  </div>
                  <Badge 
                    variant={zone.status === "active" ? "default" : "outline"}
                    className={zone.status === "active" ? "bg-success" : ""}
                  >
                    {zone.status === "active" ? "Active" : zone.status === "scheduled" ? "Scheduled" : "Manual"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Next watering: {zone.next}</span>
                  <Button variant="outline" size="sm">
                    Adjust
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Growth Tracking"
          icon={<TrendingUp className="h-6 w-6 text-accent" />}
        >
          <div className="space-y-4">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <h4 className="font-medium text-secondary-foreground mb-2">Tomato Yield Prediction</h4>
              <p className="text-2xl font-bold text-secondary-foreground">2,340 kg</p>
              <p className="text-sm text-secondary-foreground/70">Expected harvest in 45 days</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Growth Rate</p>
                <p className="font-semibold text-success">+12% above avg</p>
              </div>
              <div className="p-2 bg-muted rounded">
                <p className="text-muted-foreground">Health Score</p>
                <p className="font-semibold text-success">94/100</p>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Smart Recommendations"
          icon={<Calendar className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-3">
            <div className="p-3 bg-primary/10 border border-primary rounded-lg">
              <h4 className="font-medium text-primary mb-1">Today's Action</h4>
              <p className="text-sm">Apply organic fertilizer to Zone A tomatoes</p>
            </div>
            
            <div className="p-3 bg-warning/10 border border-warning rounded-lg">
              <h4 className="font-medium text-warning mb-1">Weather Alert</h4>
              <p className="text-sm">Rain expected tomorrow - delay irrigation</p>
            </div>
            
            <div className="p-3 bg-success/10 border border-success rounded-lg">
              <h4 className="font-medium text-success mb-1">Harvest Ready</h4>
              <p className="text-sm">Bell peppers in Zone B ready for harvest</p>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default CropsPage;