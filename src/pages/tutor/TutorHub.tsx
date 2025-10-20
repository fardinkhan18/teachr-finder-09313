import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { User, FileText, Briefcase } from 'lucide-react';

export default function TutorHub() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader
          title="Welcome, Tutor"
          description="Manage your profile and find tuition opportunities"
        />

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <User className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">My Profile</h3>
            <p className="text-muted-foreground mb-4">
              Update your credentials, subjects, and availability
            </p>
            <Button asChild className="w-full">
              <Link to="/tutor/profile">Edit Profile</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Browse Posts</h3>
            <p className="text-muted-foreground mb-4">
              Find tuition opportunities that match your expertise
            </p>
            <Button asChild className="w-full bg-accent hover:bg-accent-hover">
              <Link to="/tutor/posts">Find Opportunities</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Briefcase className="h-12 w-12 text-info mb-4" />
            <h3 className="text-xl font-semibold mb-2">My Applications</h3>
            <p className="text-muted-foreground mb-4">
              Track the status of your tuition applications
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link to="/tutor/applications">View Applications</Link>
            </Button>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
