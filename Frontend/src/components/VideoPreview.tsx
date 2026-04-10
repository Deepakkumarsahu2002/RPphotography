import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react";
import { useState, useEffect } from "react";

const VideoPreview = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

  // 🔥 Fetch videos from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/videos`)
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(err => console.error("Error fetching videos:", err));
  }, []);

  // 🔥 Take first 3 videos
  const featured = videos.slice(0, 3);

  // Extract YouTube ID from URL
  const getYoutubeId = (url: string) => {
    if (!url) return "";
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : url;
  };

  return (
    <section className="section-padding px-4 sm:px-6 md:px-0 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-subtitle mb-3"
          >
            Cinematic Stories
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Our Films & Highlights
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((video, i) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden rounded-xl cursor-pointer"
              onMouseEnter={() => setHoveredId(video._id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setSelectedVideo(video)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                {/* Play button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={hoveredId === video._id ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="p-4 rounded-full bg-gold/90 hover:bg-gold transition-colors duration-300 shadow-lg shadow-gold/30">
                    <Play size={32} className="text-white fill-white" />
                  </div>
                </motion.div>

                {/* Border on hover */}
                <div className="absolute inset-0 ring-2 ring-gold/0 group-hover:ring-gold transition-all duration-300 rounded-xl" />
              </div>

              {/* Content */}
              <div className="bg-card border border-t-0 border-border group-hover:border-gold/50 transition-all duration-300 p-4 md:p-6 rounded-b-xl">
                <h3 className="font-heading text-base md:text-lg mb-2 text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/gallery"
            className="group inline-block relative px-8 py-3 border border-gold text-foreground text-xs uppercase tracking-[0.2em] font-body overflow-hidden transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative">Watch All Videos</span>
          </Link>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Close button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedVideo(null);
              }}
              className="absolute top-6 right-6 text-gold hover:text-gold-light z-10 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={28} />
            </motion.button>

            {/* Video Player */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              {/* Title */}
              <h2 className="text-white text-2xl font-heading mb-4 text-center">{selectedVideo.title}</h2>

              {/* Video Container */}
              <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-2xl">
                {/* YouTube Embed */}
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYoutubeId(selectedVideo.videoUrl || selectedVideo.youtubeId)}?autoplay=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Description */}
              {selectedVideo.description && (
                <p className="text-gray-300 text-center mt-6 text-sm md:text-base">
                  {selectedVideo.description}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoPreview;
