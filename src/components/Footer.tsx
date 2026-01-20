import { Phone, MessageCircle, MapPin } from "lucide-react";
import { BUSINESS, PHONE_NUMBERS, WHATSAPP_LINKS, SERVICES } from "@/lib/constants";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-qs-gray-900 text-qs-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">Q</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                {BUSINESS.name}
              </span>
            </div>
            <p className="text-qs-gray-500 mb-4">
              {BUSINESS.tagline}. One call connects you to trusted electronic service professionals.
            </p>
            <div className="flex gap-3">
              <a
                href={`tel:${PHONE_NUMBERS.primary}`}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={WHATSAPP_LINKS.primary}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a href="#services" className="text-qs-gray-500 hover:text-primary transition-colors">
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-qs-gray-500 hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-qs-gray-500 hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#booking" className="text-qs-gray-500 hover:text-primary transition-colors">
                  Book a Service
                </a>
              </li>
              <li>
                <a href="#contact" className="text-qs-gray-500 hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${PHONE_NUMBERS.primary}`} className="text-qs-gray-500 hover:text-white transition-colors block">
                    {PHONE_NUMBERS.primary}
                  </a>
                  <a href={`tel:${PHONE_NUMBERS.secondary}`} className="text-qs-gray-500 hover:text-white transition-colors block">
                    {PHONE_NUMBERS.secondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-qs-gray-500">{BUSINESS.serviceArea}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-qs-gray-500 text-sm">
              © {currentYear} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="text-qs-gray-500 text-sm">
              Serving {BUSINESS.location} with trusted electronic services.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
