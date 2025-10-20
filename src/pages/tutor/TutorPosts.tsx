import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { TuitionPostCard } from '@/components/cards/TuitionPostCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api/client';
import { TuitionPost } from '@/lib/api/types';
import { useToast } from '@/hooks/use-toast';

export default function TutorPosts() {
  const [posts, setPosts] = useState<TuitionPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [expectedRate, setExpectedRate] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const result = await api.parents.getPosts({ status: 'OPEN' });
    setPosts(result.items);
  };

  const handleApply = async () => {
    try {
      await api.applications.create({
        postId: selectedPost!,
        expectedRate: expectedRate ? parseInt(expectedRate) : undefined,
        coverNote,
      });
      toast({ title: 'Success', description: 'Application submitted' });
      setSelectedPost(null);
      setExpectedRate('');
      setCoverNote('');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <SectionHeader title="Browse Tuition Posts" description="Find opportunities that match your expertise" />
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <TuitionPostCard
              key={post.id}
              post={post}
              action={
                <Dialog open={selectedPost === post.id} onOpenChange={(open) => !open && setSelectedPost(null)}>
                  <DialogTrigger asChild>
                    <Button className="w-full" onClick={() => setSelectedPost(post.id)}>Apply</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Apply to Tuition</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Expected Rate (৳/hr)</Label>
                        <Input type="number" value={expectedRate} onChange={(e) => setExpectedRate(e.target.value)} />
                      </div>
                      <div>
                        <Label>Cover Note</Label>
                        <Textarea rows={4} value={coverNote} onChange={(e) => setCoverNote(e.target.value)} />
                      </div>
                      <Button onClick={handleApply} className="w-full">Submit Application</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              }
            />
          ))}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
