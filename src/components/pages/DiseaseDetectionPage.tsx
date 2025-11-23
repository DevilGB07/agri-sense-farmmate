import { useState } from 'react';
import { Upload, Camera, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import DashboardCard from "../DashboardCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

const DiseaseDetectionPage = () => {
    const { t } = useLanguage();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            setResult(null);
        }
    };

    const analyzeImage = () => {
        if (!selectedImage) return;

        setIsAnalyzing(true);
        // Simulate AI Analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            // Mock Result
            setResult({
                disease: "Early Blight",
                confidence: 92,
                severity: "Moderate",
                treatment: [
                    "Remove infected leaves immediately.",
                    "Apply copper-based fungicide.",
                    "Improve air circulation around plants."
                ]
            });
        }, 3000);
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">{t('cropDiseaseDetection')}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard title={t('uploadImage')} icon={<Camera className="h-6 w-6 text-primary" />}>
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:bg-muted/50 transition-colors relative">
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleImageUpload}
                            />
                            {selectedImage ? (
                                <img src={selectedImage} alt="Uploaded" className="max-h-64 mx-auto rounded-md object-contain" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Upload className="h-10 w-10" />
                                    <p>{t('clickToUpload')}</p>
                                    <p className="text-xs">{t('supportsFormats')}</p>
                                </div>
                            )}
                        </div>

                        <Button
                            className="w-full"
                            onClick={analyzeImage}
                            disabled={!selectedImage || isAnalyzing}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t('analyzing')}
                                </>
                            ) : (
                                t('analyzeCrop')
                            )}
                        </Button>
                    </div>
                </DashboardCard>

                {result && (
                    <DashboardCard title={t('analysisResult')} icon={<CheckCircle className="h-6 w-6 text-success" />}>
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-destructive flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5" />
                                        {result.disease}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">{t('severity')}: <span className="font-medium text-foreground">{result.severity}</span></p>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-bold text-primary">{result.confidence}%</span>
                                    <p className="text-xs text-muted-foreground">{t('confidence')}</p>
                                </div>
                            </div>

                            <Progress value={result.confidence} className="h-2" />

                            <div className="space-y-2">
                                <h4 className="font-medium">{t('recommendedTreatment')}:</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                    {result.treatment.map((step: string, index: number) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-md text-xs text-muted-foreground">
                                {t('disclaimer')}
                            </div>
                        </div>
                    </DashboardCard>
                )}
            </div>
        </div>
    );
};

export default DiseaseDetectionPage;
