import { motion } from "framer-motion";
import { testimonials } from "@/data/mockData";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Wedding":
        return "bg-red-500/20 text-red-300 border-red-500/50";
      case "Pre-Wedding":
        return "bg-pink-500/20 text-pink-300 border-pink-500/50";
      case "Engagement":
        return "bg-rose-500/20 text-rose-300 border-rose-500/50";
      case "Birthday":
        return "bg-purple-500/20 text-purple-300 border-purple-500/50";
      case "Ad Shoot":
        return "bg-blue-500/20 text-blue-300 border-blue-500/50";
      default:
        return "bg-gold/20 text-gold border-gold/50";
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-subtitle mb-3"
          >
            Testimonials
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Words from Our Couples & Clients
          </motion.h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 min-h-[auto] md:min-h-[450px]">
            {visibleTestimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative bg-card p-6 md:p-8 rounded-xl border border-border hover:border-gold/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-gold/10"
              >
                {/* Accent top line */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
                
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-body font-semibold tracking-wide border ${getCategoryColor(t.category)}`}>
                    {t.category}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-heading text-4xl text-gold/40 mb-3 group-hover:text-gold/60 transition-colors duration-300">"</p>
                
                {/* Review Text */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300 line-clamp-4">
                  {t.text}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const isFilled = i < Math.floor(t.rating);
                    const isHalf = i === Math.floor(t.rating) && t.rating % 1 !== 0;
                    
                    return (
                      <div key={i} className="relative">
                        <Star
                          size={16}
                          className={`transition-colors duration-300 ${
                            isFilled
                              ? "fill-gold text-gold group-hover:fill-gold-dark group-hover:text-gold-dark"
                              : "text-gold/20 group-hover:text-gold/40"
                          }`}
                        />
                        {isHalf && (
                          <div className="absolute inset-0 overflow-hidden w-1/2">
                            <Star
                              size={16}
                              className="fill-gold text-gold group-hover:fill-gold-dark group-hover:text-gold-dark transition-colors duration-300"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer with name and event */}
                <div className="border-t border-gold/20 pt-4 group-hover:border-gold/50 transition-colors duration-300 mt-auto">
                  <p className="font-heading text-lg text-gold transition-colors duration-300">{t.name}</p>
                  <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300 mt-1">
                    {t.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-3 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 border border-gold/50 hover:border-gold"
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-3 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 border border-gold/50 hover:border-gold"
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Buttons (below on mobile) */}
        <div className="flex lg:hidden justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrev}
            className="px-6 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 border border-gold/50 hover:border-gold flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Previous
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="px-6 py-2 rounded-lg bg-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 border border-gold/50 hover:border-gold flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`transition-all duration-300 rounded-full ${
                i === currentIndex
                  ? "bg-gold h-3 w-8"
                  : "bg-gold/30 h-3 w-3 hover:bg-gold/50"
              }`}
            />
          ))}
        </div>

        {/* Page Counter */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground tracking-wide">
            Showing <span className="text-gold font-semibold">{currentIndex * itemsPerPage + 1}</span> - <span className="text-gold font-semibold">{Math.min((currentIndex + 1) * itemsPerPage, testimonials.length)}</span> of <span className="text-gold font-semibold">{testimonials.length}</span> testimonials
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
