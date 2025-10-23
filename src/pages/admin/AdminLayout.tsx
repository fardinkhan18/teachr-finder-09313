import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, UserCheck, FileText, ClipboardList, Phone } from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
  { to: '/admin/users', label: 'ইউজার', icon: Users },
  { to: '/admin/tutor-approvals', label: 'টিউটর অনুমোদন', icon: UserCheck },
  { to: '/admin/post-approvals', label: 'পোস্ট অনুমোদন', icon: FileText },
  { to: '/admin/applications', label: 'আবেদন', icon: ClipboardList },
  { to: '/admin/contacts', label: 'যোগাযোগ', icon: Phone },
];

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex-1 container py-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="space-y-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to;
                return (
                  <Button
                    key={item.to}
                    variant={isActive ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    asChild
                  >
                    <Link to={item.to}>
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-4">
            <Outlet />
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
