import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function ThankYou() {
  useEffect(() => {
    // Trigger Google Ads conversion event
    if (window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-18131244863/pjKCCOjB1aUcEL-u08VD'
      });
    }
  }, []);

  return (
    <motion.main 
      className="thank-you-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a192f 0%, #112240 100%)',
        padding: '2rem'
      }}
    >
      <div className="container">
        <motion.div 
          className="thank-you-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
            style={{ marginBottom: '2rem', display: 'inline-block' }}
          >
            <CheckCircle size={80} color="#64ffda" strokeWidth={1.5} />
          </motion.div>

          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            fontFamily: 'var(--font-heading)',
            color: 'white',
            fontWeight: '700'
          }}>
            Thank You!
          </h1>
          
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255, 255, 255, 0.7)', 
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Your admission enquiry has been successfully received. <br />
            Our admissions team will review your details and contact you within 24-48 hours.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-navy" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#64ffda', color: '#0a192f', border: 'none' }}>
              <Home size={20} /> Return Home
            </Link>
            <Link to="/academics" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Explore Academics <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}

export default ThankYou;
