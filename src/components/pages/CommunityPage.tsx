
import { useState } from 'react';
import { Users, MessageCircle, Trophy, TrendingUp, Award, PlusCircle, BarChart2, Lock } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const initialDiscussions = [
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
];

const farmingTips = {
  summer: [
    { tip: "Mulch to retain soil moisture and reduce weed growth.", category: "Soil & Water", author: "Expert Team" },
    { tip: "Choose heat-tolerant crop varieties for better yields.", category: "Crop Selection", author: "Dr. Sharma" },
    { tip: "Scout for pests like spider mites and whiteflies.", category: "Pest Control", author: "AgriTech Labs" },
  ],
  monsoon: [
    { tip: "Ensure proper drainage to prevent waterlogging.", category: "Water Management", author: "Expert Team" },
    { tip: "Plant cover crops to prevent soil erosion.", category: "Soil Health", author: "Dr. Sharma" },
    { tip: "Monitor for fungal diseases in humid conditions.", category: "Disease Control", author: "AgriTech Labs" },
  ],
  winter: [
    { tip: "Use row covers or cloches to protect crops from frost.", category: "Crop Protection", author: "Expert Team" },
    { tip: "Plant garlic and onions for a winter harvest.", category: "Planting", author: "Dr. Sharma" },
    { tip: "Reduce watering frequency as evaporation is lower.", category: "Water Management", author: "AgriTech Labs" },
  ],
};

const allAchievements = [
  { name: "Water Saver", desc: "Saved 1000L+ water this month", icon: "💧", progress: 100, goal: 1000, current: 1000 },
  { name: "Eco Warrior", desc: "50 eco-actions", icon: "🌱", progress: 100, goal: 50, current: 50 },
  { name: "Knowledge Seeker", desc: "25 tips learned", icon: "📚", progress: 100, goal: 25, current: 25 },
  { name: "Community Helper", desc: "Helped 5 other farmers", icon: "🤝", progress: 60, goal: 5, current: 3 },
  { name: "Harvest Master", desc: "Harvested 500kg of produce", icon: "🚜", progress: 20, goal: 500, current: 100 },
  { name: "Pest Control Expert", desc: "Successfully managed 10 pest infestations", icon: "🐞", progress: 0, goal: 10, current: 0 },
];

const CommunityPage = () => {
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [isDiscussionDialogOpen, setIsDiscussionDialogOpen] = useState(false);
  const [isAchievementsDialogOpen, setIsAchievementsDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [tipSeason, setTipSeason] = useState('summer');
  const [poll, setPoll] = useState({
    question: "What's your biggest challenge this season?",
    options: [
      { text: "Pest control", votes: 38 },
      { text: "Water management", votes: 25 },
      { text: "Soil fertility", votes: 18 },
      { text: "Other", votes: 5 },
    ],
    voted: false,
  });

  const handleVote = (optionText) => {
    if (!poll.voted) {
      const newOptions = poll.options.map(o => 
        o.text === optionText ? { ...o, votes: o.votes + 1 } : o
      );
      setPoll({ ...poll, options: newOptions, voted: true });
    }
  };

  const handleSaveDiscussion = () => {
    if (newPostTitle && newPostContent) {
      const newPost = {
        title: newPostTitle,
        author: "You", 
        replies: 0,
        time: "Just now",
      };
      setDiscussions([newPost, ...discussions]);
      setIsDiscussionDialogOpen(false);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  const upcomingAchievements = allAchievements.filter(a => a.progress < 100).slice(0, 2);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Community Hub</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardCard
        title="Community Poll"
        icon={<BarChart2 className="h-6 w-6 text-primary" />}
      >
        <div className="space-y-4">
          <h4 className="font-medium">{poll.question}</h4>
          <div className="space-y-3">
            {poll.options.map((option, index) => {
              const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
              return (
                <div key={index} className="cursor-pointer" onClick={() => handleVote(option.text)}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{option.text}</span>
                    {poll.voted && <span>{percentage.toFixed(0)}%</span>}
                  </div>
                  {poll.voted ? (
                    <Progress value={percentage} className="h-3" />
                  ) : (
                    <div className="h-3 bg-muted rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
          {!poll.voted && <Button className="w-full mt-3" onClick={() => alert("Please select an option to vote.")}>Vote</Button>}
        </div>
      </DashboardCard>

        <DashboardCard
          title="Recent Discussions"
          icon={<MessageCircle className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <Button className="w-full flex items-center gap-2" onClick={() => setIsDiscussionDialogOpen(true)}>
              <PlusCircle className="h-5 w-5" />
              Start a Discussion
            </Button>
            {discussions.map((discussion, index) => (
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
            <Select value={tipSeason} onValueChange={setTipSeason}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            {farmingTips[tipSeason].map((item, index) => (
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
            {upcomingAchievements.map((ach, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-2xl">{ach.icon}</div>
                  <div>
                    <p className="font-medium">{ach.name}</p>
                    <p className="text-xs text-muted-foreground">{ach.desc}</p>
                  </div>
                </div>
                <Progress value={ach.progress} className="h-2" />
                <p className="text-xs text-right mt-1 text-muted-foreground">{ach.current}/{ach.goal}</p>
              </div>
            ))}
            <Button variant="secondary" className="w-full" onClick={() => setIsAchievementsDialogOpen(true)}>
              View All Achievements
            </Button>
          </div>
        </DashboardCard>
      </div>

      <Dialog open={isDiscussionDialogOpen} onOpenChange={setIsDiscussionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Start a New Discussion</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input 
              placeholder="Post Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
            />
            <Textarea 
              placeholder="What do you want to talk about?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows={5}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDiscussionDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveDiscussion}>Post</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAchievementsDialogOpen} onOpenChange={setIsAchievementsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>All Achievements</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {allAchievements.map((ach, index) => (
              <div key={index} className={`p-4 rounded-lg flex items-center gap-4 ${ach.progress === 100 ? 'bg-gradient-primary text-primary-foreground' : 'bg-muted/60'}`}>
                <div className={`text-4xl ${ach.progress < 100 && 'opacity-40'}`}>{ach.icon}</div>
                <div className="flex-1">
                  <p className="font-bold">{ach.name}</p>
                  <p className="text-sm opacity-90">{ach.desc}</p>
                </div>
                {ach.progress < 100 && 
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm">
                    <Lock className="h-6 w-6" />
                  </div>
                }
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommunityPage;
