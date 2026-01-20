import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { BUSINESS, PHONE_NUMBERS, WHATSAPP_LINKS } from "@/lib/constants";

const HeroSection = () => {
  const features = [
    "Verified Professionals",
    "Same Day Service",
    "Affordable Rates",
    "Coimbatore's Trusted Choice",
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-background" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">
                Serving {BUSINESS.location}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {BUSINESS.name} –{" "}
              <span className="text-gradient">Fast & Reliable</span>{" "}
              Electronic Services
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              One call connects you to trusted AC, TV, electrician, CCTV, and mobile repair professionals in Coimbatore.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {feature}
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.a
                href={`tel:${PHONE_NUMBERS.primary}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-hero-primary"
              >
                <Phone className="w-5 h-5" />
                Call Now: {PHONE_NUMBERS.primary}
              </motion.a>

              <motion.a
                href={WHATSAPP_LINKS.primary}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-whatsapp"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </motion.a>
            </div>

            {/* Secondary Phone */}
            <p className="mt-6 text-sm text-muted-foreground">
              Or call:{" "}
              <a href={`tel:${PHONE_NUMBERS.secondary}`} className="text-primary hover:underline font-medium">
                {PHONE_NUMBERS.secondary}
              </a>
            </p>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="w-80 h-96 bg-gradient-to-br from-primary to-primary/80 rounded-3xl shadow-red p-8 flex flex-col justify-between text-primary-foreground">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                  <p className="text-white/80">
                    Get instant help for all your electronic service needs in Coimbatore
                  </p>
                </div>
                <a
                  href="#booking"
                  className="flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
                >
                  Book a Service <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 bg-card rounded-2xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">500+</p>
                    <p className="text-xs text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-8 -left-8 bg-card rounded-2xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">4.9 Rating</p>
                    <p className="text-xs text-muted-foreground">Customer Reviews</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
