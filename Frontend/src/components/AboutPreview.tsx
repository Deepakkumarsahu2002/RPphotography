import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import photographerPortrait from "@/assets/photographer-portrait.jpg";

const AboutPreview = () => (
  <section className="section-padding bg-secondary">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative overflow-hidden rounded-xl"
        >
          <img src={photographerPortrait} alt="Rudra Prasad" loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" width={800} height={1000} />
          <div className="absolute inset-0 ring-1 ring-gold/30 group-hover:ring-gold transition-all duration-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-subtitle mb-3">The Artist</p>
          <h2 className="section-title mb-6">Rudra Prasad</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            With over 5 years of experience in wedding and portrait photography, I believe every love story deserves to be told with artistry and authenticity.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            My approach blends cinematic storytelling with candid emotion — creating images that feel as timeless as the moments they capture.
          </p>
          <Link
            to="/about"
            className="group inline-block relative px-8 py-3 border border-gold text-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:text-white mb-8"
          >
            <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative">Read More</span>
          </Link>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { stat: '50+', label: 'Weddings' },
              { stat: '6+', label: 'Years Exp.' },
              { stat: '5K+', label: 'Photos' },
              { stat: '100+', label: '5-Star' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
                className="text-center group"
              >
                <p className="text-lg md:text-xl font-heading font-bold text-gold-dark group-hover:text-gold transition-colors">
                  {item.stat}
                </p>
                <p className="text-[11px] md:text-xs text-muted-foreground uppercase tracking-[0.08em]">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutPreview;
