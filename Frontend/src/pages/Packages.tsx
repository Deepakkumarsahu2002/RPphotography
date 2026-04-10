import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { packages } from "@/data/mockData";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const Packages = () => (
  <>
    <Navbar />
    <main className="pt-20">
      <section className="section-padding px-4 sm:px-6 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="section-subtitle mb-2 sm:mb-3">Services</p>
            <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">Packages</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-3xl mx-auto leading-relaxed">
              Every package is thoughtfully crafted and tailored to your unique needs and vision. Custom packages available upon request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-card to-card/50 border border-border hover:border-gold/50 p-6 md:p-8 rounded-2xl hover-lift flex flex-col overflow-hidden transition-all duration-300"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
                
                <h3 className="font-heading text-2xl md:text-3xl mb-3 text-foreground group-hover:text-gold transition-colors duration-300">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>

                <div className="flex-1 mb-8">
                  <p className="text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-4">What's Included</p>
                  <ul className="space-y-3">
                    {pkg.includes.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <div className="mt-1 flex-shrink-0">
                          <Check size={16} className="text-gold" />
                        </div>
                        <span className="text-foreground/90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.price && (
                  <div className="mb-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
                    <p className="text-xs uppercase tracking-[0.15em] text-gold font-semibold mb-1">Starting Price</p>
                    <p className="font-heading text-2xl md:text-3xl text-gold">{pkg.price}</p>
                  </div>
                )}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className="block text-center px-6 md:px-8 py-3 md:py-3.5 bg-gradient-to-r from-gold to-gold-light text-white text-xs uppercase tracking-[0.2em] font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                  >
                    Enquire Now
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
    <Footer />
  </>
);

export default Packages;
