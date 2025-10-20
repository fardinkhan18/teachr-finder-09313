import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Users, CheckCircle2, Zap, Filter } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-emerald-50/50 to-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            মিনিটের মধ্যে খুঁজুন আপনার <br />
            <span className="text-primary">উপযুক্ত টিউটর</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ভার্সিটি, ডিপার্টমেন্ট, সেশন বা সাবজেক্ট অনুযায়ী ভেরিফাইড টিউটর—সব এক জায়গায়। চাইলে আপনার টিউশন রিকুয়েস্টও পোস্ট করতে পারেন।
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              asChild 
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-lg h-12 px-8"
            >
              <Link to="/parent/tutors">
                <Users className="mr-2 h-5 w-5" />
                অভিভাবকদের জন্য
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg h-12 px-8"
            >
              <Link to="/tutor">
                <GraduationCap className="mr-2 h-5 w-5" />
                টিউটরদের জন্য
              </Link>
            </Button>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="secondary" className="text-sm py-2 px-4 bg-white border shadow-sm">
              <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
              ভেরিফাইড প্রোফাইল
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4 bg-white border shadow-sm">
              <Zap className="mr-2 h-4 w-4 text-primary" />
              দ্রুত ম্যাচিং
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4 bg-white border shadow-sm">
              <Filter className="mr-2 h-4 w-4 text-primary" />
              সহজ ফিল্টার
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
