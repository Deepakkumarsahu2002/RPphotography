import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FeaturedGallery = () => {
  const [images, setImages] = useState<any[]>([]);

  // 🔥 Fetch images from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/images`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  // 🔥 Take first 6 images
  const featured = images.slice(0, 6);

  return (
    <section className="section-padding px-4 sm:px-6 md:px-0 bg-gradient-to-b from-secondary to-background">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-subtitle mb-3"
          >
            Portfolio
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Moments Captured
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {featured.map((img, i) => (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group overflow-hidden rounded-lg aspect-square cursor-pointer"
            >
              <img
                src={img.url}   // 🔥 important change
                alt="featured"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 ring-1 ring-gold/30 group-hover:ring-gold transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/gallery"
            className="group inline-block relative px-8 py-3 border border-gold text-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative">View Full Gallery</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedGallery;