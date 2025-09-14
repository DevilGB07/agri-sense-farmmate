
import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// New season-specific data
const seasonalCropData = {
  summer: [
    { name: 'Tomatoes', match: 96 },
    { name: 'Bell Peppers', match: 89 },
    { name: 'Corn', match: 78 },
    { name: 'Pomegranate', match: 92 },
  ],
  monsoon: [
    { name: 'Rice', match: 95 },
    { name: 'Soybean', match: 88 },
    { name: 'Sugarcane', match: 82 },
    { name: 'Turmeric', match: 75 },
  ],
  winter: [
    { name: 'Wheat', match: 98 },
    { name: 'Mustard', match: 91 },
    { name: 'Gram (Chickpea)', match: 85 },
    { name: 'Onion', match: 80 },
  ]
};

const ProgressBar = ({ value }) => (
    <div className="w-full bg-yellow-300 rounded-full h-2 my-1">
        <div 
            className="h-2 rounded-full bg-green-600" 
            style={{ width: `${value}%` }}
        ></div>
    </div>
);

const RecommendationCard = () => {
  const [season, setSeason] = useState('summer');
  const cropData = seasonalCropData[season];

  const getSuitability = (match) => {
    if (match > 95) return { label: 'Excellent', className: 'text-green-700' };
    if (match > 85) return { label: 'Very Good', className: 'text-green-600' };
    if (match > 75) return { label: 'Good', className: 'text-yellow-600' };
    return { label: 'Fair', className: 'text-yellow-500' };
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Crop & Irrigation Recommendations</h2>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger className="w-[180px] bg-gray-50 border-gray-200 text-gray-900 rounded-lg">
            <SelectValue placeholder="Select Season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summer">Summer</SelectItem>
            <SelectItem value="monsoon">Monsoon</SelectItem>
            <SelectItem value="winter">Winter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center text-lg font-semibold text-green-700 mb-6 border-b pb-4 border-gray-200">
        <Sprout size={22} className="mr-3 text-green-600" />
        <h3 className="text-xl">Current Season Crops</h3>
      </div>
      
      <div className="space-y-5">
        {cropData.map((crop) => {
          const suitability = getSuitability(crop.match);
          return (
            <div key={crop.name} className="p-4 border rounded-lg bg-gray-50/70">
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg font-bold text-gray-700">{crop.name}</span>
                <span className={'text-sm font-bold py-1 px-3 rounded-full bg-orange-100 text-orange-800'}>
                  {crop.match}% Match
                </span>
              </div>
              <ProgressBar value={crop.match} />
              <div className="flex justify-between items-center text-xs mt-2 text-gray-500 px-1">
                <span>Suitability</span>
                <span className={`font-semibold ${suitability.className}`}>{suitability.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendationCard;
