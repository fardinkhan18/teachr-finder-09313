import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from '@/components/common/StatusBadge';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { TuitionPost } from '@/lib/api/types';
import { FileText, Calendar, Plus } from 'lucide-react';

export default function MyPosts() {
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const result = await api.parents.getMyPosts();
      setPosts(result);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader
          title="My Tuition Posts"
          description="View and manage your tuition requests"
          action={
            <Button asChild className="bg-accent hover:bg-accent-hover">
              <Link to="/parent/post-tuition">
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Link>
            </Button>
          }
        />

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold">{post.grade}</h3>
                      <StatusBadge status={post.status} type="post" />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.subjects.map((subject) => (
                        <Badge key={subject} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <StatusBadge status={post.mode} type="mode" />
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                  {post.area && (
                    <div>
                      <span className="font-medium">Area:</span> {post.area}
                    </div>
                  )}
                  {post.schedule && (
                    <div>
                      <span className="font-medium">Schedule:</span> {post.schedule}
                    </div>
                  )}
                  {(post.budgetMin || post.budgetMax) && (
                    <div>
                      <span className="font-medium">Budget:</span> ৳{post.budgetMin || 0} - ৳{post.budgetMax || 0}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {post.note && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.note}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{post.applicationsCount || 0}</span> applications
                  </div>
                  <Button size="sm" variant="outline">
                    View Applications
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FileText className="h-16 w-16" />}
            title="No posts yet"
            description="Create your first tuition post to receive applications from tutors"
            action={
              <Button asChild>
                <Link to="/parent/post-tuition">Create Post</Link>
              </Button>
            }
          />
        )}
      </main>
      <AppFooter />
    </div>
  );
}
