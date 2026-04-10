import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) => (
  <AnimatePresence>
    {images.length > 0 && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-foreground/98 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Close button */}
        <motion.button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-gold hover:text-gold-light z-10 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={28} />
        </motion.button>

        {/* Previous button */}
        <motion.button 
          onClick={(e) => { e.stopPropagation(); onPrev(); }} 
          className="absolute left-4 md:left-8 text-gold hover:text-gold-light z-10 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={36} />
        </motion.button>

        {/* Next button */}
        <motion.button 
          onClick={(e) => { e.stopPropagation(); onNext(); }} 
          className="absolute right-4 md:right-8 text-gold hover:text-gold-light z-10 p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={36} />
        </motion.button>

        {/* Main image */}
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Image counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gold text-sm font-body tracking-wide"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>

        {/* Keyboard hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-6 right-6 text-gold/50 text-xs font-body tracking-wide hidden md:block"
        >
          Press ESC or click to close
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default Lightbox;
