import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const mockData = {
  weather: {
    temperature: "28°C",
    condition: "Sunny",
    rainfall: "2mm",
    aqi: "45 (Good)",
  },
  soilHealth: {
    moisture: 75,
    fertility: 85,
    conditions: "Optimal Conditions",
  },
  cropRecommendations: [
    {
      name: "Heirloom Tomatoes",
      match: "92% Match",
      note: "Ideal for current soil and weather conditions.",
    },
    {
      name: "Sweet Corn",
      match: "85% Match",
      note: "Requires slightly more nitrogen.",
    },
  ],
  irrigationSchedule: {
    nextIrrigation: "Tomorrow, 5 AM",
    zone: "Zone B - Tomato Patch",
    waterUsage: "250L",
    efficiency: "95%",
  },
  greenPoints: {
    total: 1250,
    today: 30,
    rank: 12,
  },
};

app.get('/api/dashboard', (req, res) => {
  res.json(mockData);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
