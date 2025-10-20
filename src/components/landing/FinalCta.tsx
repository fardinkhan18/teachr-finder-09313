import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';

export function FinalCta() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary to-primary-hover text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
      
      <div className="container text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">আজই শুরু করুন</h2>
        <p className="text-lg mb-8 opacity-95 max-w-2xl mx-auto">
          শতাধিক টিউটর ও অভিভাবক ইতিমধ্যেই যুক্ত—আপনিও যুক্ত হোন।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary" 
            asChild 
            className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 h-12 px-8"
          >
            <Link to="/parent/tutors">
              <Search className="mr-2 h-5 w-5" />
              টিউটর খুঁজুন
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild 
            className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-primary h-12 px-8"
          >
            <Link to="/parent/post">
              <FileText className="mr-2 h-5 w-5" />
              টিউশন পোস্ট করুন
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
