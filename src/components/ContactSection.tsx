import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { BUSINESS, PHONE_NUMBERS, WHATSAPP_LINKS } from "@/lib/constants";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full mb-4">
              Contact Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              Get in Touch with{" "}
              <span className="text-primary">{BUSINESS.name}</span>
            </h2>
            <p className="text-lg text-background/70 mb-8">
              Ready to get your electronics fixed? Call us now or send a WhatsApp message for instant assistance. We serve all areas in Coimbatore.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">Phone Numbers</p>
                  <a href={`tel:${PHONE_NUMBERS.primary}`} className="text-background/70 hover:text-primary transition-colors block">
                    {PHONE_NUMBERS.primary}
                  </a>
                  <a href={`tel:${PHONE_NUMBERS.secondary}`} className="text-background/70 hover:text-primary transition-colors block">
                    {PHONE_NUMBERS.secondary}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">WhatsApp</p>
                  <a
                    href={WHATSAPP_LINKS.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-background/70 hover:text-emerald-400 transition-colors"
                  >
                    Chat with us instantly
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">Service Area</p>
                  <p className="text-background/70">{BUSINESS.serviceArea}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-background/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-background" />
                </div>
                <div>
                  <p className="font-semibold text-lg mb-1">Business Hours</p>
                  <p className="text-background/70">{BUSINESS.hours}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Call Card */}
            <a
              href={`tel:${PHONE_NUMBERS.primary}`}
              className="group bg-primary hover:bg-primary/90 rounded-2xl p-8 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/70 text-sm mb-2">Call Now</p>
                  <p className="text-primary-foreground text-2xl md:text-3xl font-bold">
                    {PHONE_NUMBERS.primary}
                  </p>
                </div>
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 text-primary-foreground" />
                </div>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a
              href={WHATSAPP_LINKS.primary}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-emerald-600 hover:bg-emerald-500 rounded-2xl p-8 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm mb-2">WhatsApp Us</p>
                  <p className="text-white text-2xl md:text-3xl font-bold">
                    Chat Instantly
                  </p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </a>

            {/* Book Online Card */}
            <a
              href="#booking"
              className="group bg-background/10 hover:bg-background/20 border border-background/20 rounded-2xl p-8 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-background/70 text-sm mb-2">Prefer Online?</p>
                  <p className="text-background text-2xl md:text-3xl font-bold">
                    Book a Service
                  </p>
                </div>
                <div className="w-16 h-16 bg-background/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-3xl">📋</span>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
