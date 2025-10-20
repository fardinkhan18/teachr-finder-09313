import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { StatusBadge } from '@/components/common/StatusBadge';
import { api } from '@/lib/api/client';
import { useToast } from '@/hooks/use-toast';
import { TutorProfile as Profile } from '@/lib/api/types';
import { ArrowLeft, Loader2 } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  university: z.string().min(1, 'University is required'),
  department: z.string().min(1, 'Department is required'),
  session: z.string().min(1, 'Session is required'),
  subjects: z.string().min(1, 'At least one subject is required'),
  mode: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
  areas: z.string().min(1, 'At least one area is required'),
  hourlyRate: z.string().optional(),
  bio: z.string().optional(),
  avatarUrl: z.string().optional(),
});

type ProfileForm = z.infer<typeof profileSchema>;

const universities = ['RUET', 'BUET', 'DU', 'KUET'];
const departments = ['CSE', 'EEE', 'ME', 'CE', 'Physics', 'Math'];
const sessions = ['2018-19', '2019-20', '2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
const areasList = ['Dhanmondi', 'Uttara', 'Mirpur', 'Banani', 'Mohammadpur', 'Gulshan', 'Bashundhara'];

export default function TutorProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      mode: 'ONLINE',
    },
  });

  const mode = watch('mode');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsFetching(true);
    try {
      const result = await api.tutors.getMyProfile();
      if (result) {
        setProfile(result);
        // Populate form
        setValue('fullName', result.fullName);
        setValue('university', result.university);
        setValue('department', result.department);
        setValue('session', result.session);
        setValue('subjects', result.subjects.join(', '));
        setValue('mode', result.mode);
        setValue('areas', result.areas.join(', '));
        setValue('hourlyRate', result.hourlyRate?.toString() || '');
        setValue('bio', result.bio || '');
        setValue('avatarUrl', result.avatarUrl || '');
      }
    } catch (error) {
      console.error('Failed to load profile', error);
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true);
    try {
      await api.tutors.upsertProfile({
        fullName: data.fullName,
        university: data.university,
        department: data.department,
        session: data.session,
        subjects: data.subjects.split(',').map((s) => s.trim()).filter(Boolean),
        mode: data.mode,
        areas: data.areas.split(',').map((a) => a.trim()).filter(Boolean),
        hourlyRate: data.hourlyRate ? parseInt(data.hourlyRate) : undefined,
        bio: data.bio,
        avatarUrl: data.avatarUrl,
      });

      toast({
        title: 'Success!',
        description: 'Your profile has been updated',
      });

      navigate('/tutor');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 container py-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/tutor">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Hub
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Tutor Profile"
            description="Complete your profile to start receiving tuition opportunities"
          />

          {profile && (
            <Card className="p-4 mb-6 bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Verification Status</p>
                  <p className="text-xs text-muted-foreground">
                    {profile.verify === 'PENDING' && 'Your profile is under review'}
                    {profile.verify === 'APPROVED' && 'Your profile is verified'}
                    {profile.verify === 'REJECTED' && 'Verification was rejected'}
                  </p>
                </div>
                <StatusBadge status={profile.verify} type="verify" />
              </div>
            </Card>
          )}

          <Card className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input id="fullName" {...register('fullName')} />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">University *</Label>
                  <Select onValueChange={(v) => setValue('university', v)} defaultValue={profile?.university}>
                    <SelectTrigger id="university">
                      <SelectValue placeholder="Select university" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.university && (
                    <p className="text-sm text-destructive mt-1">{errors.university.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select onValueChange={(v) => setValue('department', v)} defaultValue={profile?.department}>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((d) => (
                        <SelectItem key={d} value={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.department && (
                    <p className="text-sm text-destructive mt-1">{errors.department.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="session">Session *</Label>
                <Select onValueChange={(v) => setValue('session', v)} defaultValue={profile?.session}>
                  <SelectTrigger id="session">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.session && (
                  <p className="text-sm text-destructive mt-1">{errors.session.message}</p>
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
                    <SelectItem value="HYBRID">Hybrid (Both)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="areas">Areas *</Label>
                <Input
                  id="areas"
                  placeholder="Dhanmondi, Uttara (comma-separated)"
                  {...register('areas')}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Available areas: {areasList.join(', ')}
                </p>
                {errors.areas && (
                  <p className="text-sm text-destructive mt-1">{errors.areas.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (৳)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  placeholder="500"
                  {...register('hourlyRate')}
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell parents about your teaching experience and expertise..."
                  rows={4}
                  {...register('bio')}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
