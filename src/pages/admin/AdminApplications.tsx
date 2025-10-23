import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/common/EmptyState';
import { useApplicants, useShortlist, useHire, useReject } from '@/features/applications/api';
import { mockTutors } from '@/data/mocks';
import { TutorApplication } from '@/types/api';
import { CheckCircle, UserCheck, XCircle, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminApplications() {
  const [postId, setPostId] = useState('');
  const [selectedPostId, setSelectedPostId] = useState('');
  const { data: applications, isLoading } = useApplicants(selectedPostId);
  const shortlist = useShortlist();
  const hire = useHire();
  const reject = useReject();
  const { toast } = useToast();

  const handleSearch = () => {
    setSelectedPostId(postId);
  };

  const handleShortlist = async (appId: string) => {
    try {
      await shortlist.mutateAsync(appId);
      toast({ title: 'সফল', description: 'শর্টলিস্ট করা হয়েছে' });
    } catch (error) {
      toast({ title: 'ত্রুটি', description: 'শর্টলিস্ট করতে সমস্যা হয়েছে', variant: 'destructive' });
    }
  };

  const handleHire = async (appId: string) => {
    try {
      await hire.mutateAsync(appId);
      toast({ title: 'সফল', description: 'নিয়োগ দেওয়া হয়েছে' });
    } catch (error) {
      toast({ title: 'ত্রুটি', description: 'নিয়োগ দিতে সমস্যা হয়েছে', variant: 'destructive' });
    }
  };

  const handleReject = async (appId: string) => {
    try {
      await reject.mutateAsync(appId);
      toast({ title: 'সফল', description: 'প্রত্যাখ্যান করা হয়েছে' });
    } catch (error) {
      toast({ title: 'ত্রুটি', description: 'প্রত্যাখ্যান করতে সমস্যা হয়েছে', variant: 'destructive' });
    }
  };

  const getTutorInfo = (tutorId: string) => {
    return mockTutors.find(t => t.userId === tutorId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">আবেদন ম্যানেজমেন্ট</h2>
        <p className="text-muted-foreground">পোস্ট অনুযায়ী আবেদন দেখুন এবং ম্যানেজ করুন</p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>পোস্ট খুঁজুন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="postId" className="mb-2 block">
                পোস্ট আইডি লিখুন
              </Label>
              <Input
                id="postId"
                placeholder="পোস্ট আইডি (যেমন: post-1)"
                value={postId}
                onChange={e => setPostId(e.target.value)}
              />
            </div>
            <Button
              className="mt-7 bg-emerald-600 hover:bg-emerald-700"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4 mr-2" />
              খুঁজুন
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedPostId && applications && applications.length > 0 ? (
        <DataTable<TutorApplication>
          data={applications}
          columns={[
            {
              header: 'টিউটর',
              accessor: row => {
                const tutor = getTutorInfo(row.tutorId);
                return tutor ? tutor.name : row.tutorId;
              },
            },
            {
              header: 'বিশ্ববিদ্যালয়',
              accessor: row => {
                const tutor = getTutorInfo(row.tutorId);
                return tutor ? tutor.university : '-';
              },
            },
            {
              header: 'ডিপার্টমেন্ট',
              accessor: row => {
                const tutor = getTutorInfo(row.tutorId);
                return tutor ? tutor.department : '-';
              },
            },
            {
              header: 'প্রত্যাশিত বেতন',
              accessor: row => {
                const tutor = getTutorInfo(row.tutorId);
                return tutor?.expectedSalary ? `৳${tutor.expectedSalary}` : '-';
              },
            },
            {
              header: 'স্ট্যাটাস',
              accessor: row => {
                const statusMap = {
                  applied: 'আবেদিত',
                  shortlisted: 'শর্টলিস্টেড',
                  hired: 'নিয়োগপ্রাপ্ত',
                  rejected: 'প্রত্যাখ্যাত',
                  closed: 'বন্ধ',
                };
                return (
                  <Badge
                    variant={
                      row.status === 'hired' ? 'default' :
                      row.status === 'rejected' ? 'destructive' :
                      'outline'
                    }
                  >
                    {statusMap[row.status]}
                  </Badge>
                );
              },
            },
            {
              header: 'অ্যাকশন',
              accessor: row => (
                <div className="flex gap-2">
                  {row.status === 'applied' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShortlist(row._id)}
                      disabled={shortlist.isPending}
                    >
                      <UserCheck className="h-4 w-4 mr-1" />
                      শর্টলিস্ট
                    </Button>
                  )}
                  {(row.status === 'applied' || row.status === 'shortlisted') && (
                    <>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleHire(row._id)}
                        disabled={hire.isPending}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        নিয়োগ
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(row._id)}
                        disabled={reject.isPending}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        প্রত্যাখ্যান
                      </Button>
                    </>
                  )}
                </div>
              ),
            },
          ]}
        />
      ) : selectedPostId && !isLoading ? (
        <EmptyState
          icon={<Search className="h-16 w-16" />}
          title="কোনো আবেদন নেই"
          description="এই পোস্টে কোনো আবেদন পাওয়া যায়নি"
        />
      ) : null}
    </div>
  );
}
