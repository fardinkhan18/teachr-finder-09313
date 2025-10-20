import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { Search, FileText, List } from 'lucide-react';

export default function ParentHub() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader
          title="Welcome, Parent"
          description="Find the perfect tutor for your child"
        />

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Search className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Browse Tutors</h3>
            <p className="text-muted-foreground mb-4">
              Search and filter verified tutors by university, subject, and area
            </p>
            <Button asChild className="w-full">
              <Link to="/parent/tutors">Find Tutors</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <FileText className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Post Tuition</h3>
            <p className="text-muted-foreground mb-4">
              Create a tuition request and receive applications from tutors
            </p>
            <Button asChild className="w-full bg-accent hover:bg-accent-hover">
              <Link to="/parent/post-tuition">Post Now</Link>
            </Button>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <List className="h-12 w-12 text-info mb-4" />
            <h3 className="text-xl font-semibold mb-2">My Posts</h3>
            <p className="text-muted-foreground mb-4">
              View and manage your tuition posts and applications
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link to="/parent/my-posts">View Posts</Link>
            </Button>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
