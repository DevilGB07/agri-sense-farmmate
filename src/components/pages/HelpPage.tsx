import { HelpCircle, MessageCircle, Phone, Mail, Book, Video } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HelpPage = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Help Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard
          title="Quick Help"
          icon={<MessageCircle className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary rounded-lg">
              <h4 className="font-medium text-primary mb-2">Voice Assistant</h4>
              <p className="text-sm mb-3">Ask questions in your local language</p>
              <Button className="w-full" variant="secondary">
                🎤 Start Voice Chat
              </Button>
            </div>
            
            <div className="p-4 bg-success/10 border border-success rounded-lg">
              <h4 className="font-medium text-success mb-2">Live Chat Support</h4>
              <p className="text-sm mb-3">Get instant help from our experts</p>
              <Button className="w-full" variant="outline">
                💬 Start Chat
              </Button>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Contact Support"
          icon={<Phone className="h-6 w-6 text-accent" />}
        >
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">Helpline</span>
              </div>
              <p className="text-lg font-bold text-primary">1800-AGRI-HELP</p>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">Email Support</span>
              </div>
              <p className="text-sm font-medium">support@agrienvirosense.com</p>
              <p className="text-sm text-muted-foreground">Response in 2-4 hours</p>
            </div>
            
            <Button className="w-full" variant="outline">
              Submit Support Ticket
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Frequently Asked Questions"
          icon={<HelpCircle className="h-6 w-6 text-secondary" />}
        >
          <div className="space-y-3">
            {[
              {
                question: "How do I add a new crop to monitor?",
                category: "Getting Started"
              },
              {
                question: "Why is my soil moisture reading inaccurate?",
                category: "Troubleshooting"
              },
              {
                question: "How to interpret weather predictions?",
                category: "Weather"
              },
              {
                question: "Setting up irrigation schedules",
                category: "Irrigation"
              }
            ].map((faq, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm mb-1">{faq.question}</p>
                    <Badge variant="outline" className="text-xs">
                      {faq.category}
                    </Badge>
                  </div>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
            <Button variant="secondary" className="w-full">
              View All FAQs
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Learning Resources"
          icon={<Book className="h-6 w-6 text-success" />}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-secondary-foreground" />
                <span className="font-medium text-secondary-foreground">Video Tutorials</span>
              </div>
              <p className="text-sm text-secondary-foreground/80 mb-3">
                Learn with step-by-step guides
              </p>
              <Button variant="outline" size="sm" className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                Watch Now
              </Button>
            </div>
            
            <div className="space-y-2">
              {[
                "Setting up your farm profile",
                "Understanding soil health reports",
                "Optimizing irrigation schedules",
                "Reading weather predictions"
              ].map((tutorial, index) => (
                <div key={index} className="p-2 bg-muted rounded flex items-center justify-between">
                  <span className="text-sm">{tutorial}</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.floor(Math.random() * 10) + 2} min
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <div className="md:col-span-2">
          <DashboardCard
            title="Search Help Articles"
            icon={<Book className="h-6 w-6 text-primary" />}
          >
            <div className="flex gap-2">
              <Input 
                placeholder="Search for help articles, guides, and tutorials..." 
                className="flex-1"
              />
              <Button>Search</Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Popular searches: <span className="text-primary cursor-pointer">irrigation setup</span>, <span className="text-primary cursor-pointer">crop diseases</span>, <span className="text-primary cursor-pointer">soil testing</span>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;