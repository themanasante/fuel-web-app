import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { Plus, TrendingUp } from 'lucide-react';
import { mockPriceChanges } from '../lib/mock-data';

export function PriceManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [priceChanges, setPriceChanges] = useState(mockPriceChanges);
  const [newChange, setNewChange] = useState({
    product: 'Diesel',
    oldPrice: '1.45',
    newPrice: '',
    reason: ''
  });

  const handleAddPriceChange = () => {
    if (!newChange.newPrice || !newChange.reason) {
      toast.error('Please fill in all fields');
      return;
    }

    const change = {
      id: String(priceChanges.length + 1),
      date: new Date().toISOString().split('T')[0],
      product: newChange.product,
      oldPrice: Number(newChange.oldPrice),
      newPrice: Number(newChange.newPrice),
      changedBy: 'Current User',
      reason: newChange.reason
    };

    setPriceChanges([change, ...priceChanges]);
    setIsDialogOpen(false);
    setNewChange({ product: 'Diesel', oldPrice: newChange.newPrice, newPrice: '', reason: '' });
    toast.success('Price change recorded successfully');
  };

  const currentPrice = priceChanges[0]?.newPrice || 1.45;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Price Management</h1>
          <p className="text-gray-500 mt-1">Track and manage fuel price changes</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00796B] hover:bg-[#00695C]">
              <Plus className="w-4 h-4 mr-2" />
              Add Price Change
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Price Change</DialogTitle>
              <DialogDescription>
                All price changes are timestamped and logged for tracking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  value={newChange.product}
                  onChange={(e) => setNewChange({ ...newChange, product: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPrice">Current Price ($)</Label>
                  <Input
                    id="oldPrice"
                    type="number"
                    step="0.01"
                    value={newChange.oldPrice}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPrice">New Price ($)</Label>
                  <Input
                    id="newPrice"
                    type="number"
                    step="0.01"
                    placeholder="1.50"
                    value={newChange.newPrice}
                    onChange={(e) => setNewChange({ ...newChange, newPrice: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Change</Label>
                <Textarea
                  id="reason"
                  placeholder="e.g., Market price adjustment, Supplier increase..."
                  value={newChange.reason}
                  onChange={(e) => setNewChange({ ...newChange, reason: e.target.value })}
                  rows={3}
                />
              </div>
              <Button
                onClick={handleAddPriceChange}
                className="w-full bg-[#00796B] hover:bg-[#00695C]"
              >
                Record Price Change
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Price Card */}
      <Card className="bg-gradient-to-br from-[#00796B] to-[#001E2B] text-white">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Current Price
          </CardTitle>
          <CardDescription className="text-gray-200">
            Active fuel price per litre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-white">${currentPrice.toFixed(2)}</div>
          <p className="text-sm text-gray-200 mt-1">Last updated: {priceChanges[0]?.date}</p>
        </CardContent>
      </Card>

      {/* Price History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Price Change History</CardTitle>
          <CardDescription>Complete log of all price adjustments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Old Price</TableHead>
                <TableHead>New Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Changed By</TableHead>
                <TableHead>Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceChanges.map((change) => {
                const difference = change.newPrice - change.oldPrice;
                const percentChange = ((difference / change.oldPrice) * 100).toFixed(1);
                const isIncrease = difference > 0;

                return (
                  <TableRow key={change.id}>
                    <TableCell>{change.date}</TableCell>
                    <TableCell>{change.product}</TableCell>
                    <TableCell>${change.oldPrice.toFixed(2)}</TableCell>
                    <TableCell>${change.newPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={isIncrease ? 'text-red-600' : 'text-green-600'}>
                        {isIncrease ? '+' : ''}{difference.toFixed(2)} ({percentChange}%)
                      </span>
                    </TableCell>
                    <TableCell>{change.changedBy}</TableCell>
                    <TableCell className="max-w-xs truncate">{change.reason}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
