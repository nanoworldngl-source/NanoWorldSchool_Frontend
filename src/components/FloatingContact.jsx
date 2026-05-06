import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function FloatingContact() {
  const whatsappNumber = '+919876543210'; // Update with real number
  const phoneNumber = '+919876543210';
  
  const trackConversion = (type) => {
    if (window.gtag) {
      window.gtag('event', 'click', {
        'event_category': 'Engagement',
        'event_label': `Floating ${type}`
      });
    }
  };

  return (
    <div className="floating-contact-wrapper">
      <AnimatePresence>
        <div className="floating-contact-container">
          {/* WhatsApp Button */}
          <motion.a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="floating-btn whatsapp"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => trackConversion('WhatsApp')}
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle size={24} />
          </motion.a>

          {/* Call Button */}
          <motion.a
            href={`tel:${phoneNumber}`}
            className="floating-btn call"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => trackConversion('Phone')}
            aria-label="Call Us"
          >
            <Phone size={24} />
          </motion.a>
        </div>

        {/* Quick Enquiry Bar - Visible on Mobile only */}
        <Link
          to="/contact"
          className="mobile-cta-bar"
          onClick={() => trackConversion('Quick Enquiry Bar')}
        >
          <span>Admissions Open 2026-27</span>
          <strong>Enquire Now</strong>
        </Link>
      </AnimatePresence>
    </div>
  );
}

export default FloatingContact;
