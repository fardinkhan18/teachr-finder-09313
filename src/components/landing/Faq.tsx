import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "কীভাবে টিউশন পোস্ট করবো?",
    answer: "সহজ ফর্মে ক্লাস, সাবজেক্ট, লোকেশন ও বাজেট দিন।",
  },
  {
    question: "ভেরিফিকেশন কীভাবে হয়?",
    answer: "টিউটর প্রোফাইলে শিক্ষাগত তথ্য যাচাই করে 'ভেরিফাইড' ব্যাজ দেওয়া হয় (ডেমো)।",
  },
  {
    question: "কি ফি লাগে?",
    answer: "ডেমো সংস্করণে কোনো ফি নেই; ভবিষ্যতে ঘোষিত হবে।",
  },
  {
    question: "আমি কি অনলাইন ক্লাস পাবো?",
    answer: "জি, অনলাইন/অফলাইন/হাইব্রিড—সব মোড সমর্থিত।",
  },
];

export function Faq() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">প্রশ্নোত্তর</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-xl px-6 bg-white shadow-sm"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
