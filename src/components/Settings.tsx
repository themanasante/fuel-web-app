import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
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
import { Plus, Edit, Trash2, Users, Settings as SettingsIcon, Building } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  station: string;
  active: boolean;
}

interface Station {
  id: string;
  name: string;
  location: string;
  manager: string;
  active: boolean;
}

export function Settings() {
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isStationDialogOpen, setIsStationDialogOpen] = useState(false);

  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@fuelstation.com', role: 'Manager', station: 'Station Alpha', active: true },
    { id: '2', name: 'Jane Smith', email: 'jane@fuelstation.com', role: 'Attendant', station: 'Station Alpha', active: true },
    { id: '3', name: 'Mike Johnson', email: 'mike@fuelstation.com', role: 'Admin', station: 'All Stations', active: true }
  ]);

  const [stations, setStations] = useState<Station[]>([
    { id: '1', name: 'Station Alpha', location: 'Downtown', manager: 'John Doe', active: true },
    { id: '2', name: 'Station Beta', location: 'Highway 101', manager: 'Sarah Wilson', active: true }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'attendant',
    station: 'Station Alpha'
  });

  const [defaultPrice, setDefaultPrice] = useState('1.45');

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    const user: User = {
      id: String(users.length + 1),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role.charAt(0).toUpperCase() + newUser.role.slice(1),
      station: newUser.station,
      active: true
    };

    setUsers([...users, user]);
    setIsUserDialogOpen(false);
    setNewUser({ name: '', email: '', role: 'attendant', station: 'Station Alpha' });
    toast.success('User added successfully');
  };

  const handleToggleUser = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
    toast.success('User status updated');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User removed');
  };

  const handleSaveDefaults = () => {
    toast.success('Default settings saved successfully');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-gray-900">Settings & User Management</h1>
        <p className="text-gray-500 mt-1">Configure system settings and manage users</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
              <CardDescription>Add, edit, and manage user accounts</CardDescription>
            </div>
            <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#00796B] hover:bg-[#00695C]">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account with assigned role and permissions
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-name">Full Name</Label>
                    <Input
                      id="user-name"
                      placeholder="John Doe"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-email">Email Address</Label>
                    <Input
                      id="user-email"
                      type="email"
                      placeholder="john@fuelstation.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-role">Role</Label>
                    <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                      <SelectTrigger id="user-role">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="attendant">Attendant / Operator</SelectItem>
                        <SelectItem value="manager">Manager / Supervisor</SelectItem>
                        <SelectItem value="admin">Admin / Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="user-station">Assigned Station</Label>
                    <Select value={newUser.station} onValueChange={(value) => setNewUser({ ...newUser, station: value })}>
                      <SelectTrigger id="user-station">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Station Alpha">Station Alpha</SelectItem>
                        <SelectItem value="Station Beta">Station Beta</SelectItem>
                        <SelectItem value="All Stations">All Stations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddUser} className="w-full bg-[#00796B] hover:bg-[#00695C]">
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Station</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.station}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user.active}
                        onCheckedChange={() => handleToggleUser(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* System Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="w-5 h-5" />
                System Settings
              </CardTitle>
              <CardDescription>Configure default values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-price">Default Fuel Price ($)</Label>
                <Input
                  id="default-price"
                  type="number"
                  step="0.01"
                  value={defaultPrice}
                  onChange={(e) => setDefaultPrice(e.target.value)}
                />
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-backup">Auto Backup</Label>
                  <Switch id="auto-backup" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="two-factor">Two-Factor Auth</Label>
                  <Switch id="two-factor" />
                </div>
              </div>

              <Button onClick={handleSaveDefaults} className="w-full bg-[#00796B] hover:bg-[#00695C]">
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Stations
              </CardTitle>
              <CardDescription>Manage station locations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {stations.map((station) => (
                <div key={station.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-900">{station.name}</span>
                    <Switch checked={station.active} />
                  </div>
                  <p className="text-sm text-gray-500">{station.location}</p>
                  <p className="text-xs text-gray-400 mt-1">Manager: {station.manager}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Station
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Permissions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>Configure what each role can access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="text-gray-900">Attendant / Operator</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">View Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Daily Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Tank Readings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch disabled />
                  <span className="text-gray-600">Manage Prices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch disabled />
                  <span className="text-gray-600">View Reports</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-gray-900">Manager / Supervisor</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">View Dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Daily Operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Manage Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">View Reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch disabled />
                  <span className="text-gray-600">User Management</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-gray-900">Admin / Owner</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Full Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">User Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Price Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">Export Data</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch defaultChecked disabled />
                  <span className="text-gray-600">System Settings</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
