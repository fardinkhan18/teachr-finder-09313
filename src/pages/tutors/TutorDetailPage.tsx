import { useParams, Link } from 'react-router-dom';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTutor } from '@/features/tutors/api';
import { CheckCircle, Clock, Info } from 'lucide-react';

export default function TutorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: tutor, isLoading } = useTutor(id!);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 container py-8">
          <Skeleton className="h-[600px] rounded-2xl" />
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
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>টিউটর খুঁজে পাওয়া যায়নি</AlertDescription>
          </Alert>
        </main>
        <AppFooter />
      </div>
    );
  }

  const initials = tutor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header Card */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={tutor.pictureUrl} alt={tutor.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">{tutor.name}</h1>
                    {tutor.tutorCode && (
                      <Badge variant="secondary">{tutor.tutorCode}</Badge>
                    )}
                    {tutor.status === 'approved' ? (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        ভেরিফাইড
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        পেন্ডিং
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-muted-foreground">
                    <span>{tutor.university}</span>
                    <span>•</span>
                    <span>{tutor.department}</span>
                    <span>•</span>
                    <span>Session: {tutor.session}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Key Info */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>মূল তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">লিঙ্গ</div>
                  <Badge variant="outline">
                    {tutor.gender === 'male' ? 'পুরুষ' : 'নারী'}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">পদ্ধতি</div>
                  <Badge variant="outline">{tutor.mode}</Badge>
                </div>
                {tutor.expectedSalary && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      প্রত্যাশিত বেতন
                    </div>
                    <div className="text-xl font-semibold">৳{tutor.expectedSalary}</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Teaching */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>পাঠদান</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tutor.teaching.map((t, idx) => (
                  <div key={idx}>
                    <div className="text-sm font-medium text-muted-foreground mb-2">
                      ক্লাস {t.band}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {t.subjects.map((subject, si) => (
                        <Badge key={si} variant="secondary">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          {tutor.education && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>শিক্ষাগত যোগ্যতা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tutor.education.school && (
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">SSC</div>
                        <div className="font-medium">{tutor.education.school.name}</div>
                      </div>
                      <Badge>GPA {tutor.education.school.sscGpa}</Badge>
                    </div>
                  )}
                  {tutor.education.college && (
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">HSC</div>
                        <div className="font-medium">{tutor.education.college.name}</div>
                      </div>
                      <Badge>GPA {tutor.education.college.hscGpa}</Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Notice */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              যোগাযোগের জন্য অ্যাডমিনের মাধ্যমে যোগাযোগ করুন।
            </AlertDescription>
          </Alert>

          {/* CTA */}
          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700"
              asChild
            >
              <Link to={`/parent/request?preferredTutor=${tutor.userId}`}>
                এই টিউটরের জন্য আবেদন করুন
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
