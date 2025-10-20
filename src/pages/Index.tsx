import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Shield, Star, TrendingUp } from 'lucide-react';
import { AppHeader } from '@/components/shell/AppHeader';
import { AppFooter } from '@/components/shell/AppFooter';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10" />
          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Find the Perfect Tutor <br />
                <span className="text-primary">or Student</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect verified university tutors with students across Bangladesh. 
                Quality education, trusted platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild className="w-full sm:w-auto bg-accent hover:bg-accent-hover text-lg h-12 px-8">
                  <Link to="/parent/tutors">
                    <Users className="mr-2 h-5 w-5" />
                    অভিভাবকদের জন্য
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-lg h-12 px-8">
                  <Link to="/tutor">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    টিউটরদের জন্য
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Why Choose Us?</h2>
              <p className="text-muted-foreground">Trusted by thousands of students and tutors</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Verified Tutors</h3>
                <p className="text-muted-foreground">
                  All tutors are verified with university credentials and student IDs
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <Star className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                <p className="text-muted-foreground">
                  Ratings and reviews help you find the best tutor for your needs
                </p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <TrendingUp className="h-12 w-12 text-info mb-4" />
                <h3 className="text-xl font-semibold mb-2">Growing Network</h3>
                <p className="text-muted-foreground">
                  Join thousands of successful tutor-student connections
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">How It Works</h2>
              <p className="text-muted-foreground">Simple steps to get started</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-primary">For Parents</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Browse Tutors</h4>
                      <p className="text-sm text-muted-foreground">Filter by university, subject, area, and more</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Post Requirements</h4>
                      <p className="text-sm text-muted-foreground">Create a tuition post with your needs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Review Applications</h4>
                      <p className="text-sm text-muted-foreground">Get applications from interested tutors</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-accent">For Tutors</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Create Profile</h4>
                      <p className="text-sm text-muted-foreground">Add your credentials and expertise</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold mb-1">Get Verified</h4>
                      <p className="text-sm text-muted-foreground">Admin verifies your university credentials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold mb-1">Apply to Posts</h4>
                      <p className="text-sm text-muted-foreground">Browse and apply to tuition opportunities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">Join our community today</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild className="w-full sm:w-auto">
                <Link to="/auth/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                <Link to="/parent/tutors">Browse Tutors</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
