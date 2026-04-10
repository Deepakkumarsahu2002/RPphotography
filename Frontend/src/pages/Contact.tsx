import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(10, "Valid phone required").max(15),
  occasion: z.string().min(1, "Please select an occasion"),
  date: z.string().min(1, "Please select a date"),
  message: z.string().trim().max(1000).optional(),
});

const occasions = ["Wedding", "Pre-Wedding", "Engagement", "Birthday", "Reception", "Other"];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    occasion: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const text = `Hi, I'm ${encodeURIComponent(form.name)}. I'd like to enquire about ${encodeURIComponent(form.occasion)} photography on ${encodeURIComponent(form.date)}.${form.message ? ` ${encodeURIComponent(form.message)}` : ""}`;

    window.open(`https://wa.me/918093111800?text=${text}`, "_blank");
  };

  const update = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const inputClass =
    "w-full bg-card/50 border border-border px-4 py-3 md:py-3.5 text-sm font-body rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all duration-300 placeholder:text-muted-foreground";

  return (
    <>
      <Navbar />

      <main className="pt-20">
        <section className="section-padding px-4 sm:px-6 md:px-0">
          <div className="max-w-6xl mx-auto">

            {/* Heading */}
            <div className="text-center mb-12 md:mb-16">
              <p className="section-subtitle mb-2 sm:mb-3">Reach Out</p>
              <h1 className="section-title text-3xl sm:text-4xl md:text-5xl">Contact</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 sm:mt-4 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Get in touch with us for inquiries and bookings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">

              {/* FORM */}
              <motion.form
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-5 bg-card/30 p-6 md:p-8 rounded-2xl border border-border/30 backdrop-blur-sm"
              >
                <div className="mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-gold font-semibold">Full Name</label>
                </div>
                <div>
                  <input
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <span>•</span> {errors.name}
                    </p>
                  )}
                </div>

                <div className="mt-6 mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-gold font-semibold">Phone Number</label>
                </div>
                <div>
                  <input
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <span>•</span> {errors.phone}
                    </p>
                  )}
                </div>

                <div className="mt-6 mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-gold font-semibold">Occasion</label>
                </div>
                <div>
                  <select
                    value={form.occasion}
                    onChange={(e) => update("occasion", e.target.value)}
                    className={`${inputClass} ${!form.occasion ? "text-muted-foreground" : ""} cursor-pointer`}
                  >
                    <option value="">Select Occasion</option>
                    {occasions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  {errors.occasion && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <span>•</span> {errors.occasion}
                    </p>
                  )}
                </div>

                <div className="mt-6 mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-gold font-semibold">Event Date</label>
                </div>
                <div>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className={`${inputClass} ${!form.date ? "text-muted-foreground" : ""} cursor-pointer`}
                  />
                  {errors.date && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <span>•</span> {errors.date}
                    </p>
                  )}
                </div>

                <div className="mt-6 mb-2">
                  <label className="text-xs uppercase tracking-[0.15em] text-gold font-semibold">Message (Optional)</label>
                </div>
                <div>
                  <textarea
                    placeholder="Tell us more about your requirements..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    rows={4}
                    className={inputClass}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-8 px-8 py-3 md:py-4 bg-gradient-to-r from-gold to-gold-light text-white text-xs uppercase tracking-[0.2em] font-body font-semibold rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300"
                >
                  Send via WhatsApp
                </motion.button>
              </motion.form>

              {/* INFO SECTION */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 md:space-y-8"
              >
                <div>
                  <p className="section-subtitle mb-6 md:mb-8">Get in Touch</p>

                  <div className="space-y-4 md:space-y-5">

                    {/* Phone */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 p-4 md:p-5 rounded-xl bg-card/30 border border-border/30 hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                        <Phone size={18} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Phone</p>
                        <p className="text-sm sm:text-base space-y-1">
                          <a href="tel:+918093111800" className="block hover:text-gold transition-colors">+91 8093111800</a>
                          <a href="tel:+918018230428" className="block hover:text-gold transition-colors">+91 8018230428</a>
                        </p>
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 p-4 md:p-5 rounded-xl bg-card/30 border border-border/30 hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                        <Mail size={18} className="text-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Email</p>
                        <a href="mailto:rsphotogellary.bnj@gmail.com" className="text-sm sm:text-base hover:text-gold transition-colors break-all">
                          rsphotogellary.bnj@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    {/* Address */}
                    <motion.div 
                      whileHover={{ x: 4 }}
                      className="group flex items-start gap-4 p-4 md:p-5 rounded-xl bg-card/30 border border-border/30 hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex-shrink-0 p-3 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors duration-300">
                        <MapPin size={18} className="text-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Address</p>
                        <p className="text-sm sm:text-base">
                          Gandhinagar 6th Line, Berhampur
                        </p>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* WhatsApp Button */}
                <motion.a
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/918093111800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xs uppercase tracking-[0.2em] font-body font-semibold rounded-lg shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp
                </motion.a>

                {/* Map Placeholder */}
                <div className="w-full h-72 md:h-80 bg-gradient-to-br from-card/50 to-card/30 border border-border rounded-xl overflow-hidden flex items-center justify-center group hover:border-gold/30 transition-all duration-300">
                  <div className="text-center space-y-3">
                    <MapPin size={32} className="mx-auto text-gold/50 group-hover:text-gold/70 transition-colors duration-300" />
                    <p className="text-xs text-muted-foreground uppercase tracking-widest">
                      Location Map
                    </p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;