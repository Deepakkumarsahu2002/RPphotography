import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQData: FAQItem[] = [
  {
    question: 'How far in advance should we book?',
    answer:
      'We recommend booking at least 6–8 months in advance, especially during peak wedding season (November to February). Popular dates fill up quickly, so the sooner you reach out, the better we can plan your coverage together.',
  },
  {
    question: 'What areas do you cover?',
    answer:
      'We are based in Odisha and travel Pan-India for weddings. We have covered weddings across Bhubaneswar, Kolkata, Hyderabad, Mumbai, Delhi, and many destination weddings. Travel charges may apply for outstation bookings.',
  },
  {
    question: 'When will we receive our photos and videos?',
    answer:
      'Edited photographs will be delivered within a few days of the event. The highlight film and full wedding video will be carefully crafted and shared at the earliest, depending on our post-production schedule, ensuring the highest quality.',
  },
  {
    question: 'Do you offer customised packages?',
    answer:
      'Absolutely. Every wedding is unique, and so are our packages. Reach out to us with your requirements — number of events, guest count, and duration — and we will craft a tailored package that fits your vision and budget.',
  },
  {
    question: 'Are your prices flexible or negotiable?',
    answer:
      'We understand that every couple has a different budget, and we always try our best to work within it. While our packages are priced to reflect the quality and effort we put in, we are open to honest conversations about what fits your budget — reach out and let us see what we can do for you.',
  },
  {
    question: 'Can we build a custom package based on our specific needs?',
    answer:
      'Absolutely. If our standard packages do not perfectly match your requirements, we can build one from scratch. Just tell us the events you want covered, the number of days, whether you need photos, video, or both, and any add-ons like drone coverage or albums — and we will put together a package just for you.',
  },
  {
    question: 'Is a deposit required to confirm the booking?',
    answer:
      'Yes, a booking advance is required to secure your date on our calendar. The remaining balance is settled closer to the wedding date. All payment terms are discussed transparently before signing the agreement — no hidden charges.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-background to-gold-muted/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-block mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-dark font-semibold">Your Questions</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold-dark to-gold mx-auto"></div>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {FAQData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-gold-muted/30 bg-card hover:border-gold-muted/50 transition-colors rounded-sm overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 md:px-8 flex items-start justify-between gap-4 hover:bg-gold-muted/5 transition-colors group"
                whileHover={{ x: 4 }}
              >
                <span className="text-left">
                  <p className="text-sm md:text-base font-semibold text-foreground group-hover:text-gold-dark transition-colors">
                    {item.question}
                  </p>
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown size={20} className="text-gold-dark" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 md:px-8 bg-gold-muted/5 border-t border-gold-muted/20">
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
