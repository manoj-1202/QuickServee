import { motion } from "framer-motion";
import { Snowflake, Tv, Zap, Camera, Smartphone, Settings, ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

const iconMap = {
  Snowflake,
  Tv,
  Zap,
  Camera,
  Smartphone,
  Settings,
};

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-4">
            Our Services
          </span>
          <h2 className="section-title text-foreground mb-4">
            Expert Solutions for All Your{" "}
            <span className="text-primary">Electronic Needs</span>
          </h2>
          <p className="section-subtitle mx-auto">
            From AC repairs to mobile fixes, QuickServe connects you with verified professionals for every electronic service.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-card group h-full">
                  <div className="service-card-icon">
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-foreground mb-3">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {service.description}
                  </p>
                  <a
                    href="#booking"
                    className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
                  >
                    Book Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a href="#booking">
            <Button size="lg" className="gap-2">
              View All Services & Book Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
