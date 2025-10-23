import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminUsers, useBanUser, useUnbanUser } from '@/features/admin/api';
import { User } from '@/types/api';
import { Ban, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminUsers() {
  const { data: users, isLoading } = useAdminUsers();
  const banUser = useBanUser();
  const unbanUser = useUnbanUser();
  const { toast } = useToast();

  const handleBan = async (userId: string) => {
    try {
      await banUser.mutateAsync(userId);
      toast({
        title: 'সফল',
        description: 'ইউজার ব্যান করা হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'ব্যান করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  const handleUnban = async (userId: string) => {
    try {
      await unbanUser.mutateAsync(userId);
      toast({
        title: 'সফল',
        description: 'ইউজার আনব্যান করা হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'আনব্যান করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[600px] rounded-2xl" />;
  }

  if (!users) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">ইউজার ম্যানেজমেন্ট</h2>
        <p className="text-muted-foreground">সকল ইউজার দেখুন এবং ম্যানেজ করুন</p>
      </div>

      <DataTable<User>
        data={users}
        columns={[
          {
            header: 'নাম',
            accessor: 'name',
          },
          {
            header: 'ইমেইল',
            accessor: 'email',
          },
          {
            header: 'রোল',
            accessor: (row) => (
              <Badge variant="outline">
                {row.role === 'tutor' ? 'টিউটর' : row.role === 'student' ? 'স্টুডেন্ট' : 'অ্যাডমিন'}
              </Badge>
            ),
          },
          {
            header: 'লিঙ্গ',
            accessor: (row) => row.gender ? (
              <Badge variant="outline">
                {row.gender === 'male' ? 'পুরুষ' : 'নারী'}
              </Badge>
            ) : '-',
          },
          {
            header: 'স্ট্যাটাস',
            accessor: (row) => (
              <Badge variant={row.status === 'active' ? 'default' : 'destructive'}>
                {row.status === 'active' ? 'সক্রিয়' : 'ব্যান'}
              </Badge>
            ),
          },
          {
            header: 'অ্যাকশন',
            accessor: (row) => (
              <div className="flex gap-2">
                {row.status === 'active' ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBan(row.id)}
                    disabled={banUser.isPending}
                  >
                    <Ban className="h-4 w-4 mr-1" />
                    ব্যান
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUnban(row.id)}
                    disabled={unbanUser.isPending}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    আনব্যান
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
