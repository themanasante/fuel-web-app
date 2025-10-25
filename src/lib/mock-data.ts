// Mock data for the fuel management app

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'attendant' | 'manager' | 'admin';
  stationId: string;
}

export interface DailyRecord {
  id: string;
  date: string;
  openingMeter: number;
  closingMeter: number;
  litresSold: number;
  unitPrice: number;
  totalSales: number;
  operatorName: string;
  notes?: string;
}

export interface PriceChange {
  id: string;
  date: string;
  product: string;
  oldPrice: number;
  newPrice: number;
  changedBy: string;
  reason: string;
}

export interface Tank {
  id: string;
  name: string;
  capacity: number;
  currentLevel: number;
  openingReading: number;
  closingReading: number;
  refillVolume?: number;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'vip' | 'operational';
  approvedBy?: string;
}

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@fuelstation.com',
  role: 'manager',
  stationId: 'station-1'
};

export const mockDailyRecords: DailyRecord[] = [
  {
    id: '1',
    date: '2025-10-20',
    openingMeter: 15420,
    closingMeter: 18650,
    litresSold: 3230,
    unitPrice: 1.45,
    totalSales: 4683.5,
    operatorName: 'John Doe',
    notes: 'Normal operations'
  }
];

export const mockPriceChanges: PriceChange[] = [
  {
    id: '1',
    date: '2025-10-18',
    product: 'Diesel',
    oldPrice: 1.42,
    newPrice: 1.45,
    changedBy: 'Admin User',
    reason: 'Market price adjustment'
  },
  {
    id: '2',
    date: '2025-10-15',
    product: 'Diesel',
    oldPrice: 1.38,
    newPrice: 1.42,
    changedBy: 'Admin User',
    reason: 'Supplier price increase'
  }
];

export const mockTanks: Tank[] = [
  {
    id: '1',
    name: 'Tank A - Diesel',
    capacity: 50000,
    currentLevel: 32500,
    openingReading: 35000,
    closingReading: 32500,
    refillVolume: 0
  },
  {
    id: '2',
    name: 'Tank B - Premium',
    capacity: 40000,
    currentLevel: 28000,
    openingReading: 30000,
    closingReading: 28000,
    refillVolume: 0
  },
  {
    id: '3',
    name: 'Tank C - Regular',
    capacity: 45000,
    currentLevel: 38000,
    openingReading: 40000,
    closingReading: 38000,
    refillVolume: 0
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2025-10-20',
    description: 'VIP Customer - Fleet Account',
    amount: 450,
    category: 'VIP Sales',
    type: 'vip',
    approvedBy: 'Manager'
  },
  {
    id: '2',
    date: '2025-10-20',
    description: 'Maintenance - Pump Repair',
    amount: 120,
    category: 'Maintenance',
    type: 'operational',
    approvedBy: 'Manager'
  },
  {
    id: '3',
    date: '2025-10-19',
    description: 'Utilities - Electricity',
    amount: 280,
    category: 'Utilities',
    type: 'operational',
    approvedBy: 'Manager'
  }
];

export const weeklySalesData = [
  { day: 'Mon', litres: 2800, revenue: 4060 },
  { day: 'Tue', litres: 3100, revenue: 4495 },
  { day: 'Wed', litres: 2950, revenue: 4277.5 },
  { day: 'Thu', litres: 3350, revenue: 4857.5 },
  { day: 'Fri', litres: 3600, revenue: 5220 },
  { day: 'Sat', litres: 3230, revenue: 4683.5 },
  { day: 'Sun', litres: 2900, revenue: 4205 }
];

export const expenseCategories = [
  'VIP Sales',
  'Maintenance',
  'Utilities',
  'Supplies',
  'Salaries',
  'Transport',
  'Other'
];
