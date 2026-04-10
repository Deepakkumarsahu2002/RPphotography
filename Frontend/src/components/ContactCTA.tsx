import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import hero3 from "@/assets/hero-3.jpg";

const ContactCTA = () => (
  <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
    <motion.img 
      src={hero3} 
      alt="" 
      className="absolute inset-0 w-full h-full object-cover" 
      initial={{ scale: 1 }}
      whileInView={{ scale: 1.05 }}
      transition={{ duration: 8, ease: "easeInOut" }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30" />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-center px-4 sm:px-6 space-y-4 sm:space-y-6"
    >
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="section-subtitle text-primary-foreground/80"
      >
        Let's Create Something Beautiful
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-heading text-2xl sm:text-4xl md:text-6xl text-primary-foreground leading-tight"
      >
        Your Story Awaits
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Link
          to="/contact"
          className="group inline-block relative px-10 py-4 border border-gold-light text-primary-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:text-white shadow-lg shadow-gold/20 hover:shadow-gold/40"
        >
          <span className="absolute inset-0 bg-gold transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
          <span className="relative">Get in Touch</span>
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default ContactCTA;
