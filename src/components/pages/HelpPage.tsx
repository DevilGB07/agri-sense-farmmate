import { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, Book, Video, ChevronDown, Search, Edit, Save, X } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

const HelpPage = () => {
  const { t } = useLanguage();
  const [isFaqDialogOpen, setIsFaqDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    helpline: "1800-AGRI-HELP",
    email: "support@agrienvirosense.com",
  });
  const [tempContactInfo, setTempContactInfo] = useState(contactInfo);

  const allFaqs = [
    {
      question: t('faq1_q'),
      answer: t('faq1_a'),
      category: "Getting Started"
    },
    {
      question: t('faq2_q'),
      answer: t('faq2_a'),
      category: "Troubleshooting"
    },
    {
      question: t('faq3_q'),
      answer: t('faq3_a'),
      category: "Weather"
    },
    {
      question: t('faq4_q'),
      answer: t('faq4_a'),
      category: "Irrigation"
    },
    {
      question: t('faq5_q'),
      answer: t('faq5_a'),
      category: "Community"
    }
  ];

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
      <h2 className="text-2xl font-bold text-foreground">{t('helpCenter')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <DashboardCard
            title={t('searchHelp')}
            icon={<Search className="h-6 w-6 text-primary" />}
          >
            <div className="flex gap-2">
              <Input
                placeholder={t('searchPlaceholder')}
                className="flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button>Search</Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              {t('popularSearches')}: <span className="text-primary cursor-pointer">irrigation setup</span>, <span className="text-primary cursor-pointer">crop diseases</span>, <span className="text-primary cursor-pointer">soil testing</span>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard
          title={t('faq')}
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
            {t('viewAllFaq')}
          </Button>
        </DashboardCard>

        <DashboardCard
          title={t('learningResources')}
          icon={<Book className="h-6 w-6 text-success" />}
        >
          <div className="space-y-3">
            <div className="p-3 bg-gradient-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5 text-secondary-foreground" />
                <span className="font-medium text-secondary-foreground">{t('videoTutorials')}</span>
              </div>
              <p className="text-sm text-secondary-foreground/80 mb-3">
                {t('learnWithGuides')}
              </p>
              <Button variant="outline" size="sm" className="text-secondary-foreground border-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                {t('watchNow')}
              </Button>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title={t('quickHelp')}
          icon={<MessageCircle className="h-6 w-6 text-primary" />}
        >
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary rounded-lg">
              <h4 className="font-medium text-primary mb-2">{t('voiceAssistant')}</h4>
              <p className="text-sm mb-3">{t('askInLocal')}</p>
              <Button className="w-full" variant="secondary">
                🎤 {t('startVoiceChat')}
              </Button>
            </div>

            <div className="p-4 bg-success/10 border border-success rounded-lg">
              <h4 className="font-medium text-success mb-2">{t('liveChat')}</h4>
              <p className="text-sm mb-3">{t('getInstantHelp')}</p>
              <Button className="w-full" variant="outline">
                💬 {t('startChat')}
              </Button>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title={t('contactSupport')}
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
                <span className="font-medium">{t('helpline')}</span>
              </div>
              {isEditingContact ? (
                <Input
                  value={tempContactInfo.helpline}
                  onChange={(e) => setTempContactInfo({ ...tempContactInfo, helpline: e.target.value })}
                />
              ) : (
                <p className="text-lg font-bold text-primary">{contactInfo.helpline}</p>
              )}
              <p className="text-sm text-muted-foreground">{t('available247')}</p>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-medium">{t('emailSupport')}</span>
              </div>
              {isEditingContact ? (
                <Input
                  value={tempContactInfo.email}
                  onChange={(e) => setTempContactInfo({ ...tempContactInfo, email: e.target.value })}
                />
              ) : (
                <p className="text-sm font-medium">{contactInfo.email}</p>
              )}
              <p className="text-sm text-muted-foreground">{t('responseTime')}</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <Dialog open={isFaqDialogOpen} onOpenChange={setIsFaqDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t('allFaq')}</DialogTitle>
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
