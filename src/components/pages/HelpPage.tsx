import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Book, Video, ChevronDown, Search, Edit, Save, X } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const allFaqs = [
  {
    question: "How do I add a new crop to monitor?",
    answer: "From the Dashboard, navigate to the 'My Crops' section and click the 'Add Crop' button. You can then select your crop type, planting date, and other relevant details.",
    category: "Getting Started"
  },
  {
    question: "Why is my soil moisture reading inaccurate?",
    answer: "Inaccurate readings can be caused by improper sensor placement or calibration issues. Ensure the sensor is inserted to the correct depth and recalibrate it through the device settings. Contact support if the issue persists.",
    category: "Troubleshooting"
  },
  {
    question: "How to interpret weather predictions?",
    answer: "Our weather module provides forecasts for temperature, humidity, rainfall, and wind speed. Pay attention to the hourly and daily trends to plan your farming activities like irrigation and pesticide application.",
    category: "Weather"
  },
  {
    question: "Setting up irrigation schedules",
    answer: "In the 'Irrigation' tab, you can create custom schedules based on crop type and soil moisture levels. The system can also suggest optimal watering times based on weather data to conserve water.",
    category: "Irrigation"
  },
  {
    question: "How are Green Points calculated?",
    answer: "Green Points are awarded for sustainable farming practices, such as conserving water, using organic fertilizers, and participating in community discussions. The more sustainable your actions, the more points you earn.",
    category: "Community"
  }
];

const HelpPage = () => {
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    helpline: "1800-AGRI-HELP",
    email: "support@agrienvirosense.com",
  });
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  const filteredFaqs = allFaqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveContact = () => {
    setContactInfo(tempContactInfo);
    setIsEditingContact(false);
  };

  const handleCancelEdit = () => {
    setTempContactInfo(contactInfo);
    setIsEditingContact(false);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Help Center</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <DashboardCard
            title="Search Help Articles"
            icon={<Search className="h-6 w-6 text-primary" />}
          >
            <div className="flex gap-2">
              <Input 
                placeholder="Search for help articles, guides, and tutorials..." 
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>Search</Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Popular searches: <span className="text-primary cursor-pointer">irrigation setup</span>, <span className="text-primary cursor-pointer">crop diseases</span>, <span className="text-primary cursor-pointer">soil testing</span>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard
          title="Frequently Asked Questions"
          icon={<HelpCircle className="h-6 w-6 text-secondary" />}
        >
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.slice(0, 3).map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button variant="secondary" className="w-full mt-4" onClick={() => setIsFaqDialogOpen(true)}>
            View All FAQs
          </Button>
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
          </div>
        </DashboardCard>

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
          action={
            !isEditingContact ? (
              <Button variant="ghost" size="icon" onClick={() => setIsEditingContact(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleSaveContact}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )
          }
        >
          <div className="space-y-4">
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-medium">Helpline</span>
              </div>
              {isEditingContact ? (
                <Input 
                  value={tempContactInfo.helpline}
                  onChange={(e) => setTempContactInfo({...tempContactInfo, helpline: e.target.value})}
                />
              ) : (
                <p className="text-lg font-bold text-primary">{contactInfo.helpline}</p>
              )}
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">Email Support</span>
              </div>
              {isEditingContact ? (
                <Input 
                  value={tempContactInfo.email}
                  onChange={(e) => setTempContactInfo({...tempContactInfo, email: e.target.value})}
                />
              ) : (
                <p className="text-sm font-medium">{contactInfo.email}</p>
              )}
              <p className="text-sm text-muted-foreground">Response in 2-4 hours</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>All Frequently Asked Questions</DialogTitle>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              {allFaqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpPage;
