
import React, { useState } from 'react';
import { Droplets, Calendar, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const initialZones = [
  { name: 'Zone A', crop: 'Tomatoes', time: '6:00 AM', status: 'Active', statusColor: 'bg-green-500' },
  { name: 'Zone B', crop: 'Peppers', time: '7:30 AM', status: 'Scheduled', statusColor: 'bg-blue-500' },
  { name: 'Zone C', crop: 'Corn', time: 'Manual', status: 'Manual', statusColor: 'bg-gray-400' },
];

const Zone = ({ zone, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [crop, setCrop] = useState(zone.crop);
  const [time, setTime] = useState(zone.time);

  const handleSave = () => {
    onSave({ ...zone, crop, time });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCrop(zone.crop);
    setTime(zone.time);
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-gray-50/70 shadow-sm">
      {isEditing ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">{zone.name}</h3>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" onClick={handleSave}><Check className="h-5 w-5 text-green-600" /></Button>
              <Button size="icon" variant="ghost" onClick={handleCancel}><X className="h-5 w-5 text-red-600" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Crop</label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tomatoes">Tomatoes</SelectItem>
                  <SelectItem value="Peppers">Peppers</SelectItem>
                  <SelectItem value="Corn">Corn</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Watering Time</label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{zone.name}</h3>
            <p className="text-md text-gray-600">{crop}</p>
            <p className="text-sm text-gray-500 mt-2">Next watering: {time}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full text-white ${zone.statusColor}`}>
              {zone.status}
            </span>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>Adjust</Button>
          </div>
        </div>
      )}
    </div>
  );
};

const IrrigationCard = () => {
  const [zones, setZones] = useState(initialZones);

  const handleSave = (updatedZone) => {
    setZones(zones.map(z => (z.name === updatedZone.name ? updatedZone : z)));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex items-center text-lg font-semibold text-green-700 mb-6 border-b pb-4 border-gray-200">
        <Droplets size={22} className="mr-3 text-green-600" />
        <h2 className="text-xl">Irrigation Zones</h2>
      </div>
      <div className="space-y-4">
        {zones.map(zone => <Zone key={zone.name} zone={zone} onSave={handleSave} />)}
      </div>
    </div>
  );
};

export default IrrigationCard;
