import { Users, MessageCircle, Trophy, TrendingUp, Award } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const CommunityPage = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Community Hub</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Green Points Leaderboard"
          icon={<Trophy className="h-6 w-6 text-secondary" />}
          className="bg-gradient-secondary"
        >
          <div className="space-y-3">
            {[
              { rank: 1, name: "Rajesh Kumar", points: 2840, badge: "🥇" },
              { rank: 2, name: "Priya Singh", points: 2650, badge: "🥈" },
              { rank: 3, name: "Ahmed Ali", points: 2420, badge: "🥉" },
              { rank: 12, name: "You", points: 1247, badge: "" },
            ].map((farmer) => (
              <div 
                key={farmer.rank} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  farmer.name === "You" ? "bg-primary/20 border border-primary" : "bg-background/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{farmer.badge}</span>
                    <span className="font-medium">#{farmer.rank}</span>
                  </div>
                  <div>
                    <p className="font-medium">{farmer.name}</p>
                    <p className="text-sm text-muted-foreground">{farmer.points} points</p>
                  </div>
                </div>
                {farmer.name === "You" && (
                  <Badge variant="outline">Your Rank</Badge>
                )}
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Recent Discussions"
          icon={<MessageCircle className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            {[
              {
                title: "Best organic fertilizer for tomatoes?",
                author: "Vikram P.",
                replies: 12,
                time: "2h ago"
              },
              {
                title: "Dealing with aphid infestation",
                author: "Sunita M.",
                replies: 8,
                time: "4h ago"
              },
              {
                title: "Water conservation techniques",
                author: "Rajesh K.",
                replies: 15,
                time: "6h ago"
              }
            ].map((discussion, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <h4 className="font-medium mb-1">{discussion.title}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>by {discussion.author}</span>
                  <div className="flex items-center gap-2">
                    <span>{discussion.replies} replies</span>
                    <span>•</span>
                    <span>{discussion.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full" variant="outline">
              View All Discussions
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Farming Tips"
          icon={<TrendingUp className="h-6 w-6 text-success" />}
        >
          <div className="space-y-3">
            {[
              {
                tip: "Use drip irrigation to save 30-50% water",
                category: "Water Management",
                author: "Expert Team"
              },
              {
                tip: "Companion planting boosts crop yield by 20%",
                category: "Sustainable Farming",
                author: "Dr. Sharma"
              },
              {
                tip: "Monitor soil pH weekly for optimal growth",
                category: "Soil Health",
                author: "AgriTech Labs"
              }
            ].map((item, index) => (
              <div key={index} className="p-3 bg-success/10 border border-success rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <p className="text-sm font-medium mb-1">{item.tip}</p>
                <p className="text-xs text-muted-foreground">by {item.author}</p>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard
          title="Achievements"
          icon={<Award className="h-6 w-6 text-accent" />}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-primary rounded-lg text-primary-foreground">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Water Saver</span>
              </div>
              <p className="text-sm opacity-90">Saved 1000L+ water this month</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-2xl mb-1">🌱</div>
                <p className="text-sm font-medium">Eco Warrior</p>
                <p className="text-xs text-muted-foreground">50 eco-actions</p>
              </div>
              <div className="p-3 bg-muted rounded-lg text-center">
                <div className="text-2xl mb-1">📚</div>
                <p className="text-sm font-medium">Knowledge Seeker</p>
                <p className="text-xs text-muted-foreground">25 tips learned</p>
              </div>
            </div>
            
            <Button variant="secondary" className="w-full">
              View All Achievements
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
};

export default CommunityPage;