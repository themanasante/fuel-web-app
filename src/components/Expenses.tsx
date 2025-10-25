import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { Plus, Upload, DollarSign, TrendingUp } from 'lucide-react';
import { mockExpenses, expenseCategories } from '../lib/mock-data';

export function Expenses() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState(mockExpenses);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'operational' as 'vip' | 'operational'
  });

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const expense = {
      id: String(expenses.length + 1),
      date: new Date().toISOString().split('T')[0],
      description: newExpense.description,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      type: newExpense.type,
      approvedBy: 'Current User'
    };

    setExpenses([expense, ...expenses]);
    setIsDialogOpen(false);
    setNewExpense({ description: '', amount: '', category: '', type: 'operational' });
    toast.success('Expense recorded successfully');
  };

  const vipExpenses = expenses.filter(e => e.type === 'vip');
  const operationalExpenses = expenses.filter(e => e.type === 'operational');
  const totalVIP = vipExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalOperational = operationalExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = totalVIP + totalOperational;

  const ExpenseTable = ({ data }: { data: typeof expenses }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Approved By</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>{expense.date}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>
              <Badge variant="outline">{expense.category}</Badge>
            </TableCell>
            <TableCell>${expense.amount.toFixed(2)}</TableCell>
            <TableCell>{expense.approvedBy}</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Expenses</h1>
          <p className="text-gray-500 mt-1">Track VIP and operational expenses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#00796B] hover:bg-[#00695C]">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Expense</DialogTitle>
              <DialogDescription>
                Add a VIP or operational expense with optional receipt upload
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="expense-type">Expense Type</Label>
                <Select
                  value={newExpense.type}
                  onValueChange={(value: 'vip' | 'operational') => 
                    setNewExpense({ ...newExpense, type: value })
                  }
                >
                  <SelectTrigger id="expense-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vip">VIP Expense</SelectItem>
                    <SelectItem value="operational">Operational Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., VIP Customer - Fleet Account"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receipt">Receipt Upload (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG up to 5MB</p>
                </div>
              </div>

              <Button
                onClick={handleAddExpense}
                className="w-full bg-[#00796B] hover:bg-[#00695C]"
              >
                Record Expense
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">VIP Expenses</CardTitle>
            <DollarSign className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${totalVIP.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">{vipExpenses.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Operational Expenses</CardTitle>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${totalOperational.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">{operationalExpenses.length} transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Expenses</CardTitle>
            <DollarSign className="w-4 h-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-gray-500 mt-1">All categories combined</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Expense Lists */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Records</CardTitle>
          <CardDescription>View and manage all recorded expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="all">All Expenses</TabsTrigger>
              <TabsTrigger value="vip">VIP</TabsTrigger>
              <TabsTrigger value="operational">Operational</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6">
              <ExpenseTable data={expenses} />
            </TabsContent>
            <TabsContent value="vip" className="mt-6">
              <ExpenseTable data={vipExpenses} />
            </TabsContent>
            <TabsContent value="operational" className="mt-6">
              <ExpenseTable data={operationalExpenses} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
