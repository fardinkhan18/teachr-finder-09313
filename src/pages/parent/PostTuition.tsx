import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { SectionHeader } from '@/components/shell/SectionHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { api } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const postSchema = z.object({
  grade: z.string().min(1, 'Grade is required'),
  subjects: z.string().min(1, 'At least one subject is required'),
  mode: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
  area: z.string().optional(),
  schedule: z.string().optional(),
  budgetMin: z.string().optional(),
  budgetMax: z.string().optional(),
  note: z.string().optional(),
});

type PostForm = z.infer<typeof postSchema>;

const grades = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'SSC', 'HSC'];
const areas = ['Dhanmondi', 'Uttara', 'Mirpur', 'Banani', 'Mohammadpur', 'Gulshan', 'Bashundhara'];

export default function PostTuition() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PostForm>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      mode: 'ONLINE',
      subjects: searchParams.get('prefillSubject') || '',
      area: searchParams.get('prefillArea') || '',
    },
  });

  const mode = watch('mode');

  const onSubmit = async (data: PostForm) => {
    setIsLoading(true);
    try {
      await api.parents.createPost({
        grade: data.grade,
        subjects: data.subjects.split(',').map((s) => s.trim()).filter(Boolean),
        mode: data.mode,
        area: data.area,
        schedule: data.schedule,
        budgetMin: data.budgetMin ? parseInt(data.budgetMin) : undefined,
        budgetMax: data.budgetMax ? parseInt(data.budgetMax) : undefined,
        note: data.note,
      });

      toast({
        title: 'Success!',
        description: 'Your tuition post has been created',
      });

      navigate('/parent/my-posts');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create post',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/parent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Post Tuition Request"
            description="Fill in your requirements and receive applications from qualified tutors"
          />

          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="grade">Grade / Class *</Label>
                <Select onValueChange={(v) => setValue('grade', v)}>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && (
                  <p className="text-sm text-destructive mt-1">{errors.grade.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subjects">Subjects *</Label>
                <Input
                  id="subjects"
                  placeholder="Math, Physics, Chemistry (comma-separated)"
                  {...register('subjects')}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter subjects separated by commas
                </p>
                {errors.subjects && (
                  <p className="text-sm text-destructive mt-1">{errors.subjects.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="mode">Tuition Mode *</Label>
                <Select value={mode} onValueChange={(v: any) => setValue('mode', v)}>
                  <SelectTrigger id="mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ONLINE">Online</SelectItem>
                    <SelectItem value="OFFLINE">Offline</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="area">Area</Label>
                <Select onValueChange={(v) => setValue('area', v)} defaultValue={searchParams.get('prefillArea') || ''}>
                  <SelectTrigger id="area">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Not specified</SelectItem>
                    {areas.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  placeholder="e.g., 3 days/week, evenings"
                  {...register('schedule')}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetMin">Budget Min (৳)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="400"
                    {...register('budgetMin')}
                  />
                </div>
                <div>
                  <Label htmlFor="budgetMax">Budget Max (৳)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="800"
                    {...register('budgetMax')}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="note">Additional Notes</Label>
                <Textarea
                  id="note"
                  placeholder="Any additional requirements or preferences..."
                  rows={4}
                  {...register('note')}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Post'}
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
