import { TutorCardCompact } from '@/components/tutors/TutorCardCompact';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { usePendingTutors, useApproveTutor, useRejectTutor } from '@/features/tutors/api';
import { CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminTutorApprovals() {
  const { data: tutors, isLoading } = usePendingTutors();
  const approveTutor = useApproveTutor();
  const rejectTutor = useRejectTutor();
  const { toast } = useToast();

  const handleApprove = async (userId: string) => {
    try {
      await approveTutor.mutateAsync(userId);
      toast({
        title: 'সফল',
        description: 'টিউটর অনুমোদিত হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'অনুমোদন করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  const handleReject = async (userId: string) => {
    try {
      await rejectTutor.mutateAsync(userId);
      toast({
        title: 'সফল',
        description: 'টিউটর প্রত্যাখ্যান করা হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'প্রত্যাখ্যান করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!tutors || tutors.length === 0) {
    return (
      <EmptyState
        icon={<UserCheck className="h-16 w-16" />}
        title="কোনো পেন্ডিং টিউটর নেই"
        description="সব টিউটর অনুমোদিত হয়েছে"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">টিউটর অনুমোদন</h2>
        <p className="text-muted-foreground">পেন্ডিং টিউটর প্রোফাইল দেখুন এবং অনুমোদন করুন</p>
      </div>

      <div className="space-y-4">
        {tutors.map(tutor => (
          <div key={tutor.userId} className="flex items-center gap-4">
            <div className="flex-1">
              <TutorCardCompact tutor={tutor} />
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-emerald-600 hover:bg-emerald-700"
                onClick={() => handleApprove(tutor.userId)}
                disabled={approveTutor.isPending}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                অনুমোদন
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleReject(tutor.userId)}
                disabled={rejectTutor.isPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                প্রত্যাখ্যান
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
