import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { api } from '@/lib/api/client';
import { TutorApplication } from '@/lib/api/types';

export default function TutorApplications() {
  const [applications, setApplications] = useState<TutorApplication[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const result = await api.applications.getMy();
    setApplications(result);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader title="My Applications" description="Track your tuition applications" />
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{app.postGrade}</h3>
                  <p className="text-sm text-muted-foreground">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <StatusBadge status={app.status} type="app" />
              </div>
              {app.expectedRate && <p className="text-sm">Expected Rate: ৳{app.expectedRate}/hr</p>}
              {app.coverNote && <p className="text-sm text-muted-foreground mt-2">{app.coverNote}</p>}
            </Card>
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
