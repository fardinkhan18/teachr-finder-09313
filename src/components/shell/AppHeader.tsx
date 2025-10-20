import { Link } from 'react-router-dom';
import { GraduationCap, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockHandlers } from '@/lib/api/client';

export function AppHeader() {
  const currentUser = mockHandlers.getCurrentUser();

  const handleLogout = async () => {
    await mockHandlers.logout();
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">Smart Tutor Connect</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/parent/tutors" className="transition-colors hover:text-primary">
            অভিভাবকদের জন্য
          </Link>
          <Link to="/tutor" className="transition-colors hover:text-primary">
            টিউটরদের জন্য
          </Link>
          {currentUser?.role === 'ADMIN' && (
            <Link to="/admin/tutors" className="transition-colors hover:text-primary">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {currentUser ? (
            <>
              <div className="hidden md:flex items-center space-x-2 text-sm">
                <User className="h-4 w-4" />
                <span className="text-muted-foreground">{currentUser.email}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="bg-accent hover:bg-accent-hover">
                <Link to="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
