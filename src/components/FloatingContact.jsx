import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

function FloatingContact() {
  const [settings, setSettings] = useState(null);
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data);
      } catch (err) {
        console.warn('Failed to fetch contact settings');
      }
    };
    fetchSettings();
  }, []);

  const rawNumber = settings?.whatsappNumber || settings?.contactPhone || '919876543210'; 
  const cleanNumber = rawNumber.replace(/\D/g, ''); // Remove all non-digits
  const message = encodeURIComponent("Hi, I'm interested in Nano World School admissions.");
  
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
            href={`https://wa.me/${cleanNumber}?text=${message}`}
            target="_blank"
            rel="noreferrer"
            className="floating-btn whatsapp pulse"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => trackConversion('WhatsApp')}
            aria-label="Contact on WhatsApp"
          >
            <img src="/whatsapp.svg" alt="WhatsApp" style={{ width: '100%', height: '100%', padding: '0px' }} />
            <span className="tooltip-text">Chat with us</span>
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
