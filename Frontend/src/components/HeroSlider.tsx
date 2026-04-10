import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { heroImages } from "@/data/mockData";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setCurrent((p) => (p - 1 + heroImages.length) % heroImages.length);
  const handleNext = () => setCurrent((p) => (p + 1) % heroImages.length);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[current]}
            alt="Wedding photography"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          {/* ✅ CHANGE 1: bumped from /30 to /55 */}
          <div className="absolute inset-0 bg-foreground/55" />
        </motion.div>
      </AnimatePresence>

      {/* ✅ CHANGE 2: vertical gradient vignette behind text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/10" />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="section-subtitle text-primary-foreground/80 mb-4"
          >
            Wedding Photography
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl text-primary-foreground mb-3 tracking-wide"
          >
            RP Photography
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-heading text-lg md:text-xl text-primary-foreground/80 italic mb-10"
          >
            By Rudra Prasad
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-sm text-primary-foreground/70 font-body tracking-widest mb-8"
          >
            Capturing timeless moments with elegance
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/gallery"
              className="group inline-block relative px-8 py-3 border border-gold-light text-primary-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:border-gold"
            >
              <span className="absolute inset-0 bg-gold/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <span className="relative">View Portfolio</span>
            </Link>
            <Link
              to="/contact"
              className="group inline-block relative px-8 py-3 bg-gold/80 backdrop-blur-sm text-white text-xs uppercase tracking-[0.2em] font-body overflow-hidden shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
              <span className="relative group-hover:text-white">Get in Touch</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile */}
      <div className="absolute inset-y-0 left-0 right-0 hidden md:flex items-center justify-between px-6 pointer-events-none z-20">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-md text-primary-foreground hover:bg-white/20 transition-all duration-300 border border-primary-foreground/20"
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="pointer-events-auto p-2 rounded-full bg-white/10 backdrop-blur-md text-primary-foreground hover:bg-white/20 transition-all duration-300 border border-primary-foreground/20"
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className={`transition-all duration-500 rounded-full ${
              i === current 
                ? "bg-gold h-2 w-8" 
                : "bg-primary-foreground/30 h-2 w-2 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;