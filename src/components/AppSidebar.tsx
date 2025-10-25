import {
  LayoutDashboard,
  FileText,
  Gauge,
  DollarSign,
  Receipt,
  BarChart3,
  Settings,
  Droplet,
  LogOut
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from './ui/sidebar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: FileText, label: 'Daily Operations', id: 'operations' },
  { icon: Gauge, label: 'Tanks & Meters', id: 'tanks' },
  { icon: DollarSign, label: 'Price Management', id: 'pricing' },
  { icon: Receipt, label: 'Expenses', id: 'expenses' },
  { icon: BarChart3, label: 'Reports', id: 'reports' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AppSidebar({ currentView, onNavigate, onLogout }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00796B] to-[#001E2B] rounded-lg flex items-center justify-center">
            <Droplet className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Fuel Manager</h2>
            <p className="text-xs text-gray-500">Station Alpha</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.id)}
                    isActive={currentView === item.id}
                    className={currentView === item.id ? 'bg-[#00796B] text-white hover:bg-[#00695C] hover:text-white' : ''}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onLogout}>
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
