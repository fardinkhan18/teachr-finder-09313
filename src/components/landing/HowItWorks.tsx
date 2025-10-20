import { Card } from '@/components/ui/card';
import { FileText, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: "রিকুয়েস্ট পোস্ট করুন",
    description: "ক্লাস, সাবজেক্ট, লোকেশন ও বাজেট লিখে সহজ ফর্ম পূরণ করুন।",
  },
  {
    icon: Users,
    title: "টিউটররা আবেদন করবে",
    description: "ম্যাচিং টিউটররা আপনার রিকুয়েস্ট দেখে আবেদন পাঠাবে।",
  },
  {
    icon: CheckCircle,
    title: "পছন্দ করুন ও শুরু করুন",
    description: "প্রোফাইল দেখে পছন্দ করুন, কথা বলে ক্লাস শুরু করুন।",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">কীভাবে কাজ করে</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
