import { CheckCircle2, Zap, Filter, MessageCircle, Sparkles } from 'lucide-react';

const features = [
  {
    icon: CheckCircle2,
    title: "ভেরিফাইড ও বিশ্বস্ত টিউটর",
  },
  {
    icon: Zap,
    title: "দ্রুত ও স্মার্ট ম্যাচিং",
  },
  {
    icon: Filter,
    title: "এরিয়া/সাবজেক্ট/ভার্সিটি অনুযায়ী ফিল্টার",
  },
  {
    icon: MessageCircle,
    title: "স্বচ্ছ যোগাযোগ ও রিভিউ",
  },
  {
    icon: Sparkles,
    title: "আধুনিক, ব্যবহারবান্ধব ইন্টারফেস",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            কেন স্মার্ট টিউটর কানেক্ট?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-white to-emerald-50/30 border shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
