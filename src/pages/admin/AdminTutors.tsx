import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/common/StatusBadge';
import { api } from '@/lib/api/client';
import { TutorProfile, VerifyStatus } from '@/lib/api/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminTutors() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    const result = await api.admin.getAllTutors();
    setTutors(result);
  };

  const handleVerify = async (tutorId: string, status: VerifyStatus) => {
    await api.admin.updateVerify(tutorId, status);
    toast({ title: 'Updated', description: 'Verification status updated' });
    loadTutors();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader title="Tutor Verification" description="Manage tutor verification status" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell>{tutor.fullName}</TableCell>
                <TableCell>{tutor.university}</TableCell>
                <TableCell>{tutor.department}</TableCell>
                <TableCell><StatusBadge status={tutor.verify} type="verify" /></TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" onClick={() => handleVerify(tutor.id, 'APPROVED')}>Approve</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleVerify(tutor.id, 'REJECTED')}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <AppFooter />
    </div>
  );
}
