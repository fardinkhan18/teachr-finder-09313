import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api/client';
import { TutorProfile } from '@/lib/api/types';
import { MapPin, Star, DollarSign, GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';

export default function TutorDetail() {
  const { id } = useParams<{ id: string }>();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadTutor();
    }
  }, [id]);

  const loadTutor = async () => {
    setIsLoading(true);
    try {
      const result = await api.tutors.get(id!);
      setTutor(result);
    } catch (error) {
      console.error('Failed to load tutor', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 container py-8">
          <Skeleton className="h-96 rounded-xl" />
        </main>
        <AppFooter />
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 container py-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Tutor not found</h2>
            <Button asChild>
              <Link to="/parent/tutors">Back to Tutors</Link>
            </Button>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  const initials = tutor.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/parent/tutors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tutors
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-start space-x-6 mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={tutor.avatarUrl} alt={tutor.fullName} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{tutor.fullName}</h1>
                      <div className="flex items-center space-x-2 text-muted-foreground mb-3">
                        <GraduationCap className="h-5 w-5" />
                        <span>
                          {tutor.university} • {tutor.department} • {tutor.session}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={tutor.verify} type="verify" />
                  </div>

                  {tutor.verify === 'APPROVED' && tutor.ratingAvg && (
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-lg font-semibold">{tutor.ratingAvg.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({tutor.ratingCount} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-primary" />
                    Subjects
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-sm">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                {tutor.bio && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mode</p>
                  <StatusBadge status={tutor.mode} type="mode" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Areas</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <p className="text-sm">{tutor.areas.join(', ')}</p>
                  </div>
                </div>

                {tutor.hourlyRate && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Hourly Rate</p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg font-semibold">৳{tutor.hourlyRate}/hour</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Interested?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Create a tuition post with your requirements and this tutor can apply
              </p>
              <Button asChild className="w-full bg-accent hover:bg-accent-hover">
                <Link
                  to={`/parent/post-tuition?prefillSubject=${tutor.subjects[0]}&prefillArea=${tutor.areas[0]}`}
                >
                  Request This Tutor
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
