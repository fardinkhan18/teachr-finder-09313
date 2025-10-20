import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star, CheckCircle2 } from 'lucide-react';
import { featuredTutors } from '@/data/landing';

export function FeaturedTutors() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-emerald-50/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            এই সপ্তাহের নির্বাচিত ভেরিফাইড টিউটর
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
          {featuredTutors.map((tutor) => (
            <Card 
              key={tutor.id}
              className="p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {tutor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
                    {tutor.verified && (
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {tutor.university} • {tutor.department}
                  </p>
                  <p className="text-xs text-muted-foreground">সেশন: {tutor.session}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {tutor.subjects.map((subject, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold text-sm">{tutor.rating}</span>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                  asChild
                >
                  <Link to={`/parent/tutors/${tutor.id}`}>
                    প্রোফাইল দেখুন
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/parent/tutors">
              সব টিউটর দেখুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
