import { Link } from "react-router-dom";
import { Instagram, Youtube, Mail, Facebook, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/rp_photography_123", label: "Instagram" },
    { icon: Youtube, href: "https://youtube.com/@rpphotography-800", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/rs.rudra.564357/", label: "Facebook" },
    { icon: Mail, href: "mailto:rsphotogellary.bnj@gmail.com", label: "Email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-black border-t-2 border-gold">
      <div className="absolute inset-0 opacity-30 pointer-events-none hidden md:block">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="font-heading text-2xl mb-4 text-white">
              RP <span className="text-gold">Photography</span>
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed tracking-wide mb-6">
              Capturing timeless moments with elegance and artistry. By Rudra Prasad.
            </p>
            
            {/* Social Icons - Below Brand */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-white transition-all duration-300 border border-gold/50 hover:border-gold"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4 font-600">Quick Links</p>
            <div className="flex flex-col gap-3">
              {["Home", "About", "Gallery", "Packages", "Contact"].map((l) => (
                <Link
                  key={l}
                  to={l === "Home" ? "/" : `/${l.toLowerCase()}`}
                  className="group text-sm text-gray-300 hover:text-gold transition-colors tracking-wide flex items-center gap-2"
                >
                  <span className="w-0 h-0.5 bg-gold group-hover:w-3 transition-all duration-300" />
                  {l}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6 font-600">Contact</p>

            {/* Contact Details */}
            <div className="space-y-4">

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <Mail size={15} className="text-gold mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <a
                  href="mailto:rsphotogellary.bnj@gmail.com"
                  className="text-sm text-gray-300 hover:text-gold transition-colors tracking-wide break-all"
                >
                  rsphotogellary.bnj@gmail.com
                </a>
              </div>

              {/* Phone 1 */}
              <div className="flex items-start gap-3 group">
                <Phone size={15} className="text-gold mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <a
                  href="tel:+918093111800"
                  className="text-sm text-gray-300 hover:text-gold transition-colors tracking-wide"
                >
                  +91 8093111800
                </a>
              </div>

              {/* Phone 2 */}
              <div className="flex items-start gap-3 group">
                <Phone size={15} className="text-gold mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <a
                  href="tel:+918018230428"
                  className="text-sm text-gray-300 hover:text-gold transition-colors tracking-wide"
                >
                  +91 8018230428
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 group">
                <MapPin size={15} className="text-gold mt-1 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <p className="text-sm text-gray-300 leading-relaxed tracking-wide">
                  Gandhinagar 6th Line,<br />
                  Berhampur
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div 
          className="border-t border-gold/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-gray-400 tracking-wide">
            © 2026 RP Photography. All rights reserved. Designed by Deepak.
          </p>

          <Link
            to="/admin"
            className="text-[10px] text-gray-500 hover:text-gold transition-colors tracking-wider"
          >
            Admin
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;