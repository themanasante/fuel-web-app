import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { toast } from 'sonner@2.0.3';
import { Gauge, Droplet, TrendingDown, RefreshCw } from 'lucide-react';
import { mockTanks } from '../lib/mock-data';

export function TanksMeters() {
  const [tanks, setTanks] = useState(mockTanks);
  const [editingTank, setEditingTank] = useState<string | null>(null);

  const handleUpdateTank = (tankId: string, field: string, value: number) => {
    setTanks(tanks.map(tank => {
      if (tank.id === tankId) {
        const updated = { ...tank, [field]: value };
        if (field === 'closingReading' || field === 'refillVolume') {
          updated.currentLevel = updated.closingReading + (updated.refillVolume || 0);
        }
        return updated;
      }
      return tank;
    }));
  };

  const handleSave = (tankId: string) => {
    setEditingTank(null);
    toast.success('Tank readings updated successfully');
  };

  const getTankStatus = (percentage: number) => {
    if (percentage >= 70) return { color: 'bg-green-600', label: 'Good' };
    if (percentage >= 40) return { color: 'bg-yellow-600', label: 'Moderate' };
    return { color: 'bg-red-600', label: 'Low' };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Tanks & Meters</h1>
          <p className="text-gray-500 mt-1">Monitor tank levels and record readings</p>
        </div>
        <Button variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Readings
        </Button>
      </div>

      {/* Tank Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tanks.map((tank) => {
          const percentage = (tank.currentLevel / tank.capacity) * 100;
          const status = getTankStatus(percentage);
          const volumeUsed = tank.openingReading - tank.closingReading;

          return (
            <Card key={tank.id} className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-2 h-full ${status.color}`}></div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-[#00796B]" />
                  {tank.name}
                </CardTitle>
                <CardDescription>Capacity: {tank.capacity.toLocaleString()} L</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Current Level</span>
                    <span className="text-sm">
                      <span className="text-gray-900">{percentage.toFixed(0)}%</span>
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs text-white ${status.color}`}>
                        {status.label}
                      </span>
                    </span>
                  </div>
                  <Progress value={percentage} className="h-3" />
                  <p className="text-xs text-gray-500 mt-1">
                    {tank.currentLevel.toLocaleString()} L remaining
                  </p>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Volume Used Today</span>
                    <span className="text-gray-900 flex items-center gap-1">
                      <TrendingDown className="w-3 h-3 text-red-600" />
                      {volumeUsed.toLocaleString()} L
                    </span>
                  </div>
                  {tank.refillVolume && tank.refillVolume > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Refill Added</span>
                      <span className="text-green-600">+{tank.refillVolume.toLocaleString()} L</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Tank Readings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Tank Readings & Updates
          </CardTitle>
          <CardDescription>Record opening/closing readings and refills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {tanks.map((tank) => (
            <div key={tank.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-gray-900">{tank.name}</h3>
                {editingTank === tank.id ? (
                  <Button
                    onClick={() => handleSave(tank.id)}
                    size="sm"
                    className="bg-[#00796B] hover:bg-[#00695C]"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    onClick={() => setEditingTank(tank.id)}
                    variant="outline"
                    size="sm"
                  >
                    Edit
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`opening-${tank.id}`}>Opening Reading (L)</Label>
                  <Input
                    id={`opening-${tank.id}`}
                    type="number"
                    value={tank.openingReading}
                    onChange={(e) => handleUpdateTank(tank.id, 'openingReading', Number(e.target.value))}
                    disabled={editingTank !== tank.id}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`closing-${tank.id}`}>Closing Reading (L)</Label>
                  <Input
                    id={`closing-${tank.id}`}
                    type="number"
                    value={tank.closingReading}
                    onChange={(e) => handleUpdateTank(tank.id, 'closingReading', Number(e.target.value))}
                    disabled={editingTank !== tank.id}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`refill-${tank.id}`}>Refill Volume (L)</Label>
                  <Input
                    id={`refill-${tank.id}`}
                    type="number"
                    value={tank.refillVolume || 0}
                    onChange={(e) => handleUpdateTank(tank.id, 'refillVolume', Number(e.target.value))}
                    disabled={editingTank !== tank.id}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Current Level (L)</Label>
                  <Input
                    type="number"
                    value={tank.currentLevel}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="pt-3 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Volume Used:</span>
                    <span className="ml-2 text-gray-900">
                      {(tank.openingReading - tank.closingReading).toLocaleString()} L
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Capacity:</span>
                    <span className="ml-2 text-gray-900">{tank.capacity.toLocaleString()} L</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fill Level:</span>
                    <span className="ml-2 text-gray-900">
                      {((tank.currentLevel / tank.capacity) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Space Available:</span>
                    <span className="ml-2 text-gray-900">
                      {(tank.capacity - tank.currentLevel).toLocaleString()} L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
