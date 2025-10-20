import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturedTutors } from '@/components/landing/FeaturedTutors';
import { WhyChooseUs } from '@/components/landing/WhyChooseUs';
import { Testimonials } from '@/components/landing/Testimonials';
import { FinalCta } from '@/components/landing/FinalCta';
import { Faq } from '@/components/landing/Faq';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      
      <main className="flex-1">
        <Hero />
        <Separator className="hidden md:block" />
        <HowItWorks />
        <Separator className="hidden md:block" />
        <FeaturedTutors />
        <Separator className="hidden md:block" />
        <WhyChooseUs />
        <Separator className="hidden md:block" />
        <Testimonials />
        <Separator className="hidden md:block" />
        <FinalCta />
        <Faq />
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
