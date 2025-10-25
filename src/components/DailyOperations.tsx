import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { Save, Send, DollarSign } from 'lucide-react';

export function DailyOperations() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    openingMeter: '',
    closingMeter: '',
    unitPrice: '1.45',
    operatorName: 'John Doe',
    notes: ''
  });

  const litresSold = formData.closingMeter && formData.openingMeter
    ? Number(formData.closingMeter) - Number(formData.openingMeter)
    : 0;

  const totalSales = litresSold * Number(formData.unitPrice);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully');
  };

  const handleSubmit = () => {
    toast.success('Day record submitted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900">Daily Operations</h1>
        <p className="text-gray-500 mt-1">Record daily meter readings and sales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Record Entry</CardTitle>
            <CardDescription>Enter today's meter readings and sales data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="operator">Operator Name</Label>
                <Input
                  id="operator"
                  value={formData.operatorName}
                  onChange={(e) => handleChange('operatorName', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openingMeter">Opening Meter Reading</Label>
                <Input
                  id="openingMeter"
                  type="number"
                  placeholder="15420"
                  value={formData.openingMeter}
                  onChange={(e) => handleChange('openingMeter', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingMeter">Closing Meter Reading</Label>
                <Input
                  id="closingMeter"
                  type="number"
                  placeholder="18650"
                  value={formData.closingMeter}
                  onChange={(e) => handleChange('closingMeter', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="litresSold">Litres Sold (Auto-calculated)</Label>
                <Input
                  id="litresSold"
                  type="number"
                  value={litresSold}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitPrice">Unit Price ($)</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleChange('unitPrice', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSales">Total Sales (Auto-calculated)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="totalSales"
                  type="number"
                  value={totalSales.toFixed(2)}
                  disabled
                  className="bg-gray-50"
                />
                <Button variant="outline" size="sm">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Log Price Change
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any relevant notes about today's operations..."
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSaveDraft} variant="outline" className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} className="flex-1 bg-[#00796B] hover:bg-[#00695C]">
                <Send className="w-4 h-4 mr-2" />
                Submit Day Record
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Panel */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Litres Sold</span>
                <span className="text-gray-900">{litresSold.toLocaleString()} L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Unit Price</span>
                <span className="text-gray-900">${formData.unitPrice}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Total Sales</span>
                <span className="text-gray-900">${totalSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-900">Status</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">
                  Draft
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Double-check meter readings for accuracy</li>
                <li>• Price changes are timestamped automatically</li>
                <li>• Drafts are saved locally until submitted</li>
                <li>• Add notes for unusual transactions</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
