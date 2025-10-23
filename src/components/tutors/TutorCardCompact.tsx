import { TutorProfile } from '@/types/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, Clock } from 'lucide-react';

interface TutorCardCompactProps {
  tutor: TutorProfile;
}

export function TutorCardCompact({ tutor }: TutorCardCompactProps) {
  const initials = tutor.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={tutor.pictureUrl} alt={tutor.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold truncate">{tutor.name}</h4>
              {tutor.tutorCode && (
                <Badge variant="secondary" className="text-xs">
                  {tutor.tutorCode}
                </Badge>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              {tutor.university} • {tutor.department}
            </div>
          </div>

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
      </CardContent>
    </Card>
  );
}
