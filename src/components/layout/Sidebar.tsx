
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Library, Users, Calendar, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Auto collapse on mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  // Auto collapse on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [location.pathname, isMobile]);

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Books', icon: Library, href: '/books' },
    { name: 'Members', icon: Users, href: '/members' },
    { name: 'Loans', icon: Calendar, href: '/loans' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ];

  return (
    <aside 
      className={cn(
        'fixed left-0 h-screen flex flex-col bg-sidebar transition-all duration-300 ease-in-out z-30 border-r border-sidebar-border/50',
        collapsed ? 'w-[70px]' : 'w-[240px]'
      )}
    >
      <div className="flex-grow overflow-y-auto py-6 px-4">
        <div className="flex items-center mb-8 px-2">
          {!collapsed && (
            <span className="text-xl font-semibold text-sidebar-foreground ml-2">Librarify</span>
          )}
        </div>
        
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                'flex items-center px-2 py-3 rounded-md transition-all duration-200 group',
                isActive 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className={cn(
                'flex-shrink-0 h-5 w-5 transition-transform',
                collapsed ? 'mx-auto' : 'mr-3'
              )} />
              {!collapsed && <span>{item.name}</span>}
              {collapsed && (
                <span className="absolute left-full ml-2 rounded-md px-2 py-1 bg-popover text-sm opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none z-50 whitespace-nowrap shadow-md">
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-sidebar-border/50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex justify-center"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
