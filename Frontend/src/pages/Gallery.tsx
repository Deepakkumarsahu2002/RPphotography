import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeVideo, setActiveVideo] = useState<any | null>(null); // 🔥 NEW

  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/images`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/videos`)
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))
  ];

  const filtered = activeCategory === "All"
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="pt-20">

        {/* Image Gallery */}
        <section className="section-padding px-4 sm:px-6 md:px-0">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <p className="section-subtitle mb-2 sm:mb-3">Portfolio</p>
              <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">Gallery</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto">
                Explore our collection of timeless moments and beautiful stories
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs uppercase tracking-[0.15em] font-body px-4 md:px-6 py-2 md:py-2.5 rounded-lg transition-all duration-300 border font-medium ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-gold to-gold-light text-white border-gold shadow-lg shadow-gold/30"
                      : "bg-card/50 text-foreground border-border/30 hover:border-gold/50 hover:bg-card/80"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <div className="columns-2 md:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
              {filtered.map((img, i) => (
                <motion.div
                  key={img._id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-lg cursor-pointer break-inside-avoid"
                  onClick={() => setLightboxIndex(i)}
                >
                  <img
                    src={img.url}
                    alt="gallery"
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110 ring-1 ring-border/20 group-hover:ring-gold/30 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* Video Section */}
<section className="section-padding px-4 sm:px-6 md:px-0 bg-secondary">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-12 md:mb-16">
      <p className="section-subtitle mb-2 sm:mb-3 tracking-[0.2em]">Cinematic</p>
      <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">Wedding Films</h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {videos.map((video, i) => (
        <motion.div
          key={video._id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="group cursor-pointer"
          onClick={() => setActiveVideo(video)}
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-card/60 backdrop-blur-md hover:border-gold/50 shadow-sm hover:shadow-2xl transition-all duration-500">

            {/* Thumbnail */}
            <div className="aspect-video overflow-hidden bg-black">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition duration-500" />

            {/* Play Button */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-2xl shadow-gold/30 group-hover:shadow-gold/50 transition-all duration-300">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <h3 className="text-white font-heading text-base md:text-lg tracking-wide line-clamp-2 group-hover:text-gold transition-colors duration-300">
                {video.title}
              </h3>
            </div>

          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

</main>

<Footer />

{/* Image Lightbox */}
{lightboxIndex !== null && (
  <Lightbox
    images={filtered.map(img => ({ src: img.url, alt: "gallery" }))}
    currentIndex={lightboxIndex}
    onClose={() => setLightboxIndex(null)}
    onPrev={() =>
      setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length)
    }
    onNext={() =>
      setLightboxIndex((lightboxIndex + 1) % filtered.length)
    }
  />
)}

{/* 🔥 VIDEO LIGHTBOX POPUP (UPGRADED) */}
{activeVideo && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
    onClick={() => setActiveVideo(null)}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setActiveVideo(null)}
        className="absolute -top-12 right-0 text-gold hover:text-gold-light text-sm uppercase tracking-[0.3em] font-semibold transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
      >
        ✕ Close
      </motion.button>

      {/* Title */}
      <p className="text-white text-center font-heading text-lg md:text-xl mb-6 md:mb-8 tracking-wide">
        {activeVideo.title}
      </p>

      {/* Video */}
      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-gold/30">
        <iframe
          src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
          title={activeVideo.title}
          allowFullScreen
          allow="autoplay; encrypted-media"
          className="w-full h-full"
        />
      </div>
    </motion.div>
  </motion.div>
)}
    </>
  );
};

export default Gallery;