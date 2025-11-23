
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// --- Seasonal Data Simulation ---
const seasonalData = {
  summer: {
    weather: { temperature: 35, condition: "Sunny", rainfall: 0, aqi: "3 (Moderate)" },
    soil: { moisture: 40, fertility: 75, conditions: "Needs Frequent Watering" },
    crops: ["Pomegranate", "Grapes", "Mango", "Cotton", "Sorghum (Jowar)", "Groundnut", "Cashew"],
  },
  monsoon: {
    weather: { temperature: 28, condition: "Rainy", rainfall: 25, aqi: "1 (Good)" },
    soil: { moisture: 85, fertility: 80, conditions: "High Humidity, Watch for Fungus" },
    crops: ["Rice", "Sugarcane", "Soybean", "Turmeric", "Coconut", "Banana", "Onion"],
  },
  winter: {
    weather: { temperature: 22, condition: "Clear", rainfall: 0, aqi: "2 (Fair)" },
    soil: { moisture: 60, fertility: 85, conditions: "Excellent for Growth" },
    crops: ["Wheat", "Gram (Chickpea)", "Tur (Pigeon Pea)", "Nagpur Orange", "Onion", "Tomato", "Grapes"],
  },
};

// --- Integration with a real weather API ---
const OPENWEATHER_API_KEY = '5044b05ecc5ffbeeb726327694e8c09f';
const FALLBACK_CITY = "Nashik,IN";

async function getWeatherData(lat, lon, season) {
  // Add some random variance to make it feel more alive
  const variance = (Math.random() * 4) - 2; // +/- 2 degrees
  const fallbackWeather = {
    ...seasonalData[season].weather,
    temperature: Math.round(seasonalData[season].weather.temperature + variance),
    city: FALLBACK_CITY
  };

  if (OPENWEATHER_API_KEY === 'YOUR_API_KEY_HERE' || !OPENWEATHER_API_KEY) {
    console.log("Using fallback weather data with simulated variance.");
    return fallbackWeather;
  }

  try {
    let city = FALLBACK_CITY;
    let latitude = lat;
    let longitude = lon;

    if (!latitude || latitude === 'undefined' || !longitude || longitude === 'undefined') {
      const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${FALLBACK_CITY}&limit=1&appid=${OPENWEATHER_API_KEY}`);
      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) throw new Error(`Fallback city '${FALLBACK_CITY}' not found`);
      latitude = geoData[0].lat;
      longitude = geoData[0].lon;
    } else {
      const reverseGeoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`);
      const reverseGeoData = await reverseGeoResponse.json();
      if (reverseGeoData && reverseGeoData.length > 0) {
        city = `${reverseGeoData[0].name}, ${reverseGeoData[0].country}`;
      }
    }

    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`);
    const weatherData = await weatherResponse.json();
    if (weatherData.cod !== 200) throw new Error(weatherData.message);

    const aqiResponse = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`);
    const aqiData = await aqiResponse.json();
    const aqiValue = aqiData.list[0].main.aqi;
    const aqiText = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

    // Override with seasonal data for more predictable demonstration
    const seasonalWeather = seasonalData[season].weather;
    return {
      temperature: seasonalWeather.temperature,
      condition: seasonalWeather.condition,
      rainfall: seasonalWeather.rainfall,
      aqi: seasonalWeather.aqi,
      city: city,
    };

  } catch (error) {
    console.error("Error fetching real-time weather data:", error.message);
    return { ...fallbackWeather, city: FALLBACK_CITY };
  }
}

function getSoilHealthData(season) {
  return seasonalData[season].soil;
}

function getAICropRecommendations(season, weatherData, soilHealthData) {
  const recommendedCrops = seasonalData[season].crops;
  const allCrops = [
    { name: "Grapes", idealTemp: 25, idealMoisture: 60 }, { name: "Pomegranate", idealTemp: 27, idealMoisture: 55 },
    { name: "Onion", idealTemp: 22, idealMoisture: 65 }, { name: "Sugarcane", idealTemp: 28, idealMoisture: 80 },
    { name: "Cotton", idealTemp: 26, idealMoisture: 60 }, { name: "Soybean", idealTemp: 25, idealMoisture: 65 },
    { name: "Sorghum (Jowar)", idealTemp: 27, idealMoisture: 50 }, { name: "Tomato", idealTemp: 24, idealMoisture: 70 },
    { name: "Rice", idealTemp: 28, idealMoisture: 85 }, { name: "Banana", idealTemp: 26, idealMoisture: 75 },
    { name: "Mango", idealTemp: 27, idealMoisture: 60 }, { name: "Cashew", idealTemp: 26, idealMoisture: 65 },
    { name: "Nagpur Orange", idealTemp: 25, idealMoisture: 55 }, { name: "Wheat", idealTemp: 22, idealMoisture: 65 },
    { name: "Tur (Pigeon Pea)", idealTemp: 27, idealMoisture: 55 }, { name: "Gram (Chickpea)", idealTemp: 23, idealMoisture: 50 },
    { name: "Groundnut", idealTemp: 26, idealMoisture: 60 }, { name: "Turmeric", idealTemp: 27, idealMoisture: 75 },
    { name: "Coconut", idealTemp: 28, idealMoisture: 80 },
  ].filter(c => recommendedCrops.includes(c.name));

  const recommendations = allCrops.map(crop => {
    const tempDiff = Math.abs(weatherData.temperature - crop.idealTemp);
    const moistureDiff = Math.abs(soilHealthData.moisture - crop.idealMoisture);
    const match = Math.max(0, 100 - (tempDiff * 2) - (moistureDiff * 1.5));
    return { ...crop, match: Math.round(match) };
  });

  recommendations.sort((a, b) => b.match - a.match);
  const topCrops = recommendations.slice(0, 10);

  return topCrops.map(crop => ({
    name: crop.name,
    match: `${crop.match}% Match`,
    note: `Thrives in ${season} conditions. Ideal for ${weatherData.condition.toLowerCase()} weather and ${soilHealthData.moisture}% soil moisture.`
  }));
}

function getAdvancedIrrigationSchedule(season) {
  if (season === 'monsoon') {
    return [{ zone: "All Zones", cropType: "N/A", growthStage: "N/A", recommendationReason: "Sufficient rainfall. No irrigation required.", nextIrrigation_mm: 0 }];
  }
  const schedules = {
    summer: [
      { zone: "Zone A", cropType: "Pomegranate", growthStage: "Fruiting", recommendationReason: "High heat requires frequent watering.", nextIrrigation_mm: 20 },
      { zone: "Zone B", cropType: "Cotton", growthStage: "Boll Formation", recommendationReason: "Critical water need during boll development.", nextIrrigation_mm: 25 },
    ],
    winter: [
      { zone: "Zone C", cropType: "Wheat", growthStage: "Tillering", recommendationReason: "Cool weather reduces evaporation, but regular watering is key.", nextIrrigation_mm: 15 },
      { zone: "Zone D", cropType: "Onion", growthStage: "Bulb Formation", recommendationReason: "Consistent moisture needed for bulb development.", nextIrrigation_mm: 10 },
    ]
  };
  return schedules[season] || [];
}

app.get('/api/dashboard', async (req, res) => {
  const { lat, lon, season = 'summer' } = req.query;

  const weatherData = await getWeatherData(lat, lon, season);
  const soilHealthData = getSoilHealthData(season);
  const cropRecommendations = getAICropRecommendations(season, weatherData, soilHealthData);
  const irrigationSchedule = getAdvancedIrrigationSchedule(season);

  const formattedWeatherData = {
    ...weatherData,
    temperature: `${weatherData.temperature}°C`,
    rainfall: `${weatherData.rainfall}mm`,
  };

  const responseData = {
    weather: formattedWeatherData,
    soilHealth: soilHealthData,
    cropRecommendations: cropRecommendations,
    irrigationSchedule: irrigationSchedule,
  };

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
