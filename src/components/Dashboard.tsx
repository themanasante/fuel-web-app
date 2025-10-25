import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { DollarSign, Droplet, TrendingUp, Receipt, PlayCircle, FileCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklySalesData, mockTanks } from '../lib/mock-data';

interface DashboardProps {
  onNavigate: (view: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const todayStats = {
    litresSold: 3230,
    revenue: 4683.5,
    expenses: 850,
    netBalance: 3833.5
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Today's overview and quick actions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate('operations')} className="bg-[#00796B] hover:bg-[#00695C]">
            <PlayCircle className="w-4 h-4 mr-2" />
            Continue Today's Record
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Total Litres Sold</CardTitle>
            <Droplet className="w-4 h-4 text-[#00796B]" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{todayStats.litresSold.toLocaleString()} L</div>
            <p className="text-xs text-gray-500 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-[#00796B]" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${todayStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Expenses</CardTitle>
            <Receipt className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${todayStats.expenses.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">VIP + Operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-gray-600">Net Balance</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">${todayStats.netBalance.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Revenue - Expenses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Sales Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Sales Trend</CardTitle>
            <CardDescription>Litres sold over the past 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="litres"
                  stroke="#00796B"
                  strokeWidth={2}
                  dot={{ fill: '#00796B', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tank Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Tank Levels</CardTitle>
            <CardDescription>Current capacity status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockTanks.map((tank) => {
              const percentage = (tank.currentLevel / tank.capacity) * 100;
              return (
                <div key={tank.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{tank.name}</span>
                    <span className="text-gray-500">{percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-gray-500">
                    {tank.currentLevel.toLocaleString()} / {tank.capacity.toLocaleString()} L
                  </p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('reports')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-[#00796B]" />
              View Reports
            </CardTitle>
            <CardDescription>
              Access daily summaries, analytics, and export data
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onNavigate('expenses')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#00796B]" />
              Review Expenses
            </CardTitle>
            <CardDescription>
              Approve pending expenses and review spending
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
