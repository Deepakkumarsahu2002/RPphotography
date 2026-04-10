import { motion } from "framer-motion";
import { packages } from "@/data/mockData";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const PackagesPreview = () => (
  <section className="section-padding bg-secondary">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-subtitle mb-3"
        >
          Services
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="section-title"
        >
          Our Packages
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className="group relative bg-card border border-border rounded-xl p-6 md:p-8 overflow-hidden hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
          >
            {/* Accent line */}
            <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
            
            <h3 className="font-heading text-2xl mb-3 group-hover:text-gold transition-colors duration-300">{pkg.name}</h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>
            {pkg.price && (
              <p className="font-heading text-2xl text-gold mb-6">Starting at {pkg.price}</p>
            )}
            
            <Link
              to="/contact"
              className="group/btn inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-body text-foreground border-b border-transparent hover:border-gold transition-all duration-300"
            >
              Enquire Now
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/packages"
          className="group inline-block relative px-8 py-3 border border-gold text-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:text-white"
        >
          <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          <span className="relative">View All Packages</span>
        </Link>
      </div>
    </div>
  </section>
);

export default PackagesPreview;
