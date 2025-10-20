import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StatusBadge } from '@/components/common/StatusBadge';
import { TutorProfile } from '@/lib/api/types';
import { MapPin, Star, DollarSign } from 'lucide-react';

interface TutorCardProps {
  tutor: TutorProfile;
}

export function TutorCard({ tutor }: TutorCardProps) {
  const initials = tutor.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="p-6 hover:shadow-card transition-shadow">
      <div className="flex items-start space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={tutor.avatarUrl} alt={tutor.fullName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-lg">{tutor.fullName}</h3>
              <p className="text-sm text-muted-foreground">
                {tutor.university} • {tutor.department} • {tutor.session}
              </p>
            </div>
            <StatusBadge status={tutor.verify} type="verify" />
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {tutor.subjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="text-xs">
                {subject}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{tutor.areas.join(', ')}</span>
            </div>
            <StatusBadge status={tutor.mode} type="mode" />
            {tutor.hourlyRate && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>৳{tutor.hourlyRate}/hr</span>
              </div>
            )}
          </div>

          {tutor.verify === 'APPROVED' && tutor.ratingAvg && (
            <div className="flex items-center gap-1 text-sm mb-3">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{tutor.ratingAvg.toFixed(1)}</span>
              <span className="text-muted-foreground">
                ({tutor.ratingCount} reviews)
              </span>
            </div>
          )}

          <Button asChild size="sm" className="w-full sm:w-auto">
            <Link to={`/parent/tutors/${tutor.id}`}>View Profile</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
