import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Usb, Thermometer, Droplets, Sprout, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface SensorData {
  temp: number | null;
  humidity: number | null;
}

const HardwareConnectPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [sensorData, setSensorData] = useState<SensorData>({ temp: null, humidity: null });
  const [isReading, setIsReading] = useState(false);
  const [rawLog, setRawLog] = useState<string[]>([]);
  
  const portRef = useRef<any>(null);
  const readerRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      disconnectArduino();
    };
  }, []);

  const connectArduino = async () => {
    try {
      if (!('serial' in navigator)) {
        toast({
          title: "Browser Not Supported",
          description: "Your browser does not support the Web Serial API. Please use Chrome or Edge.",
          variant: "destructive",
        });
        return;
      }

      // Request a port and open a connection
      const port = await (navigator as any).serial.requestPort();
      await port.open({ baudRate: 9600 });
      portRef.current = port;
      
      setIsConnected(true);
      toast({
        title: "Connected!",
        description: "Successfully connected to Arduino.",
      });

      // Start reading
      readLoop(port);
    } catch (error) {
      console.error("Connection error:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to the device. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnectArduino = async () => {
    setIsReading(false);
    isReadingRef.current = false;
    
    if (readerRef.current) {
      try {
        await readerRef.current.cancel();
      } catch (e) {
        console.error("Error cancelling reader:", e);
      }
    }
    
    if (portRef.current) {
      try {
        await portRef.current.close();
      } catch (e) {
        console.error("Error closing port:", e);
      }
    }
    
    setIsConnected(false);
    setSensorData({ temp: null, humidity: null });
  };

  const isReadingRef = useRef(false);

  const readLoop = async (port: any) => {
    isReadingRef.current = true;
    
    while (port.readable && isReadingRef.current) {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();
      readerRef.current = reader;

      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          
          buffer += value;
          const lines = buffer.split('\n');
          
          // Process all complete lines
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            
            // Debugging: show raw data in UI
            if (line.length > 0) {
              setRawLog(prev => {
                const newLogs = [...prev, line].slice(-5); // Keep last 5 lines
                return newLogs;
              });
            }

            if (line.startsWith('{') && line.endsWith('}')) {
              try {
                const data = JSON.parse(line);
                if (data.temp !== undefined && data.humidity !== undefined) {
                  setSensorData({ temp: data.temp, humidity: data.humidity });
                }
              } catch (e) {
                console.error("JSON parse error on line:", line);
              }
            }
          }
          
          // Keep the last incomplete part in the buffer
          buffer = lines[lines.length - 1];
        }
      } catch (error) {
        console.error("Read error:", error);
      } finally {
        reader.releaseLock();
      }
    }
  };

  // Basic Recommendation Engine based on Live Data
  const getRecommendations = () => {
    if (sensorData.temp === null || sensorData.humidity === null) return null;

    const t = sensorData.temp;
    const h = sensorData.humidity;

    let suitable = [];
    let unsuitable = [];

    if (t > 30 && h > 60) {
      suitable = ["Rice", "Sugarcane", "Jute", "Cotton"];
      unsuitable = ["Wheat", "Barley", "Oats"];
    } else if (t > 20 && t <= 30 && h > 40 && h <= 60) {
      suitable = ["Maize", "Soybean", "Tomatoes", "Peanuts"];
      unsuitable = ["Apples", "Cherries"];
    } else if (t >= 10 && t <= 20 && h < 50) {
      suitable = ["Wheat", "Barley", "Mustard", "Chickpeas"];
      unsuitable = ["Rice", "Sugarcane"];
    } else if (t > 35 && h < 30) {
      suitable = ["Sorghum", "Pearl Millet", "Cactus"];
      unsuitable = ["Most standard vegetables", "Rice"];
    } else {
      suitable = ["General vegetables (with controlled irrigation)"];
      unsuitable = ["Extreme weather crops"];
    }

    return { suitable, unsuitable };
  };

  const recs = getRecommendations();

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Usb className="w-6 h-6 text-primary" />
            {t('hardwareSync')}
          </h1>
          <p className="text-muted-foreground">{t('connectArduino')}</p>
        </div>
        {!isConnected ? (
          <Button onClick={connectArduino} className="bg-primary hover:bg-primary-dark">
            <Usb className="w-4 h-4 mr-2" />
            {t('connectArduino')}
          </Button>
        ) : (
          <Button onClick={disconnectArduino} variant="destructive">
            {t('disconnectArduino')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Live Data Card */}
        <Card className="shadow-soft border-primary/20">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              {t('liveSensorData')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Usb className="w-12 h-12 mb-3 opacity-20" />
                <p>{t('deviceNotConnected')}</p>
              </div>
            ) : sensorData.temp === null ? (
              <div className="flex flex-col items-center justify-center py-8 text-primary animate-pulse">
                <p>{t('waitingForData')}</p>
                {rawLog.length > 0 && (
                  <div className="mt-4 w-full text-xs font-mono text-left bg-black/5 p-2 rounded">
                    <p className="font-semibold text-muted-foreground mb-1">Incoming raw data:</p>
                    {rawLog.map((log, i) => (
                      <div key={i} className="text-muted-foreground truncate">{log}</div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl flex flex-col items-center justify-center border border-orange-100 dark:border-orange-900/30">
                  <Thermometer className="w-8 h-8 text-orange-500 mb-2" />
                  <p className="text-sm text-muted-foreground">{t('tempReading')}</p>
                  <h3 className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {sensorData.temp.toFixed(1)}°C
                  </h3>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl flex flex-col items-center justify-center border border-blue-100 dark:border-blue-900/30">
                  <Droplets className="w-8 h-8 text-blue-500 mb-2" />
                  <p className="text-sm text-muted-foreground">{t('humidityReading')}</p>
                  <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {sensorData.humidity.toFixed(1)}%
                  </h3>
                </div>
              </div>
            )}
            
            {/* Debug console for raw data always visible when connected */}
            {isConnected && sensorData.temp !== null && (
              <div className="mt-6 pt-4 border-t w-full text-xs font-mono text-left bg-black/5 p-2 rounded">
                <p className="font-semibold text-muted-foreground mb-1">Raw Arduino Stream:</p>
                {rawLog.map((log, i) => (
                  <div key={i} className="text-muted-foreground truncate">{log}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Recommendations Card */}
        <Card className="shadow-soft border-primary/20">
          <CardHeader className="bg-primary/5 pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              {t('recommendationsBasedOnData')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {!recs ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Sprout className="w-12 h-12 mb-3 opacity-20" />
                <p>{t('waitingForData')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-green-600 flex items-center gap-2 mb-3">
                    <Sprout className="w-4 h-4" />
                    {t('suitableCrops')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recs.suitable.map((crop, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-sm px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-600 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4" />
                    {t('unsuitableCrops')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {recs.unsuitable.map((crop, idx) => (
                      <span key={idx} className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-sm px-3 py-1 rounded-full border border-red-200 dark:border-red-800">
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HardwareConnectPage;
