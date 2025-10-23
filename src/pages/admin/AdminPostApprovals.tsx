import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/common/EmptyState';
import { usePendingPosts, useApprovePost, useClosePost } from '@/features/posts/api';
import { CheckCircle, XCircle, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminPostApprovals() {
  const { data: posts, isLoading } = usePendingPosts();
  const approvePost = useApprovePost();
  const closePost = useClosePost();
  const { toast } = useToast();

  const handleApprove = async (postId: string) => {
    try {
      await approvePost.mutateAsync(postId);
      toast({
        title: 'সফল',
        description: 'পোস্ট অনুমোদিত হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'অনুমোদন করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  const handleClose = async (postId: string) => {
    try {
      await closePost.mutateAsync(postId);
      toast({
        title: 'সফল',
        description: 'পোস্ট বন্ধ করা হয়েছে',
      });
    } catch (error) {
      toast({
        title: 'ত্রুটি',
        description: 'বন্ধ করতে সমস্যা হয়েছে',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState
        icon={<FileText className="h-16 w-16" />}
        title="কোনো পেন্ডিং পোস্ট নেই"
        description="সব পোস্ট অনুমোদিত হয়েছে"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">পোস্ট অনুমোদন</h2>
        <p className="text-muted-foreground">পেন্ডিং টিউশন পোস্ট দেখুন এবং অনুমোদন করুন</p>
      </div>

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post._id} className="rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{post.subject}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{post.area}</Badge>
                    <Badge variant="outline">{post.mode}</Badge>
                    <Badge>৳{post.budget}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleApprove(post._id)}
                    disabled={approvePost.isPending}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    অনুমোদন
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleClose(post._id)}
                    disabled={closePost.isPending}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    বন্ধ করুন
                  </Button>
                </div>
              </div>
            </CardHeader>
            {post.details && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.details}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
