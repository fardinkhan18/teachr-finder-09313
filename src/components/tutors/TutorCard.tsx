import { TutorProfile } from '@/types/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TutorCardProps {
  tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const initials = tutor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        {/* Top Row: Avatar, Name, Code, Status */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={tutor.pictureUrl} alt={tutor.name} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
              {tutor.tutorCode && (
                <Badge variant="secondary" className="text-xs">
                  {tutor.tutorCode}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {tutor.status === 'approved' ? (
                <Badge className="bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  ভেরিফাইড
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  পেন্ডিং
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
          <span>{tutor.university}</span>
          <span>•</span>
          <span>{tutor.department}</span>
          <span>•</span>
          <span>{tutor.session}</span>
          <Badge variant="outline" className="ml-auto">
            {tutor.gender === 'male' ? 'পুরুষ' : 'নারী'}
          </Badge>
          <Badge variant="outline">{tutor.mode}</Badge>
        </div>

        {/* Teaching Grid */}
        <div className="space-y-3 mb-4">
          {tutor.teaching.map((t, idx) => (
            <div key={idx}>
              <div className="text-xs font-medium text-muted-foreground mb-1">
                ক্লাস {t.band}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {t.subjects.map((subject, si) => (
                  <Badge key={si} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        {tutor.education && (
          <div className="border-t pt-3 text-sm space-y-1">
            {tutor.education.school && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">SSC:</span>
                <span className="font-medium">
                  {tutor.education.school.name} • GPA {tutor.education.school.sscGpa}
                </span>
              </div>
            )}
            {tutor.education.college && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">HSC:</span>
                <span className="font-medium">
                  {tutor.education.college.name} • GPA {tutor.education.college.hscGpa}
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          {tutor.expectedSalary && (
            <div className="text-sm">
              <span className="text-muted-foreground">প্রত্যাশিত বেতন:</span>
              <span className="font-semibold text-lg ml-2">
                ৳{tutor.expectedSalary}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/tutor/${tutor.userId}`}>প্রোফাইল</Link>
          </Button>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link to={`/parent/request?preferredTutor=${tutor.userId}`}>
              আবেদন করুন
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
