import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import photographerPortrait from "@/assets/photographer-portrait.jpg";

const achievements = [
  { number: "100+", label: "Weddings Captured" },
  { number: "10+", label: "Years of Experience" },
  { number: "10K+", label: "Photos Delivered" },
  { number: "100+", label: "5-Star Reviews" },
];

const About = () => (
  <>
    <Navbar />
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding px-4 sm:px-6 md:px-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group overflow-hidden rounded-2xl"
            >
              <img 
                src={photographerPortrait} 
                alt="Rudra Prasad" 
                className="w-full object-cover aspect-square md:aspect-auto transition-transform duration-700 group-hover:scale-105" 
                width={800} 
                height={1000} 
              />
              <div className="absolute inset-0 ring-1 ring-gold/30 group-hover:ring-gold transition-all duration-300 rounded-2xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <p className="section-subtitle mb-2 sm:mb-3">About</p>
              <h1 className="section-title text-3xl sm:text-4xl md:text-4xl">RP PHOTOGRAPHY</h1>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  At RP Opulence Photography, we believe that every moment tells a story one that deserves to be captured with elegance, creativity, and precision. With over 10 years of professional experience in the photography industry, we have built a reputation for delivering exceptional visual storytelling that reflects both emotion and artistry.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our journey has been defined by passion, innovation, and a commitment to excellence. Over the years, we have had the privilege of working with a diverse range of clients, capturing everything from timeless wedding moments to high-end portraits and cinematic shoots. Our work has also been recognized with multiple awards and accolades, highlighting our dedication to quality and creativity.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  At RP Opulence Photography, we use the latest equipment and advanced techniques to ensure every shot meets the highest professional standards. Our team focuses on understanding each client's vision and transforming it into stunning visuals that leave a lasting impression.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We don't just take photographs—we create experiences, preserve memories, and deliver art that speaks for itself.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your moments, our masterpiece.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding px-4 sm:px-6 md:px-0 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {achievements.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center p-6 md:p-8 bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl hover:border-gold/30 transition-all duration-300 group"
              >
                <p className="font-heading text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 text-gold group-hover:text-gold-light transition-colors duration-300">{a.number}</p>
                <p className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground">{a.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding px-4 sm:px-6 md:px-0">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-8">
          <div>
            <p className="section-subtitle mb-2 sm:mb-3">Philosophy</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">The Art of Storytelling</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Photography is the art of freezing time, capturing the essence of human emotion and connection. At RP Opulence Photography, we believe every image tells a story—a story of love, joy, triumph, and the beauty of life's fleeting moments.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Through our lens, we weave narratives that resonate deeply, blending technical mastery with creative vision. We use advanced techniques, from cinematic lighting to editorial composition, to create visuals that not only document events but also evoke feelings and memories that last a lifetime.
            </p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="section-padding px-4 sm:px-6 md:px-0 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 md:mb-16">
            <p className="section-subtitle mb-2 sm:mb-3">Recognition</p>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">Awards & Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Best Wedding Photographer — Eastern India, 2024",
              "Featured in Wedding Sutra Magazine",
              "Top 50 Wedding Photographers — WedMeGood",
              "India's Best Emerging Photographer — WPAI 2023",
            ].map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-card/50 to-card/30 border border-border/30 p-6 md:p-8 rounded-xl hover:border-gold/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-500" />
                <p className="text-sm sm:text-base text-foreground font-heading">{award}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default About;
