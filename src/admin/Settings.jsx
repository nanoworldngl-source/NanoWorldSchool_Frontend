import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Save, Phone, Share2, Loader2, Globe, MapPin, Mail, Monitor, Link as LinkIcon } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';

function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'Nano World School',
    contactEmail: '',
    contactPhone: '',
    whatsappNumber: '',
    address: '',
    logoUrl: '',
    faviconUrl: '',
    seoDescription: '',
    mapEmbedUrl: '',
    announcementText: '',
    announcementActive: false,
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    linkedinUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings');
      if (res.data) setSettings(res.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', settings);
      alert('Settings updated successfully!');
    } catch (err) {
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'contact', label: 'Contact', icon: <Phone size={18} /> },
    { id: 'social', label: 'Social', icon: <Share2 size={18} /> },
    { id: 'branding', label: 'Branding & SEO', icon: <Globe size={18} /> },
    { id: 'announcement', label: 'Announcements', icon: <Monitor size={18} /> }
  ];

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <Loader2 className="animate-spin" size={48} color="var(--color-gold)" />
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Site Settings</h1>
          <p style={{ color: '#64748b' }}>Configure your global website information and active features</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave} 
          className="btn btn-navy" 
          disabled={saving}
          style={{ padding: '1rem 2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
        >
          {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
          Save All Changes
        </motion.button>
      </header>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '1rem 1.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: activeTab === tab.id ? 'var(--color-primary)' : '#94a3b8',
              whiteSpace: 'nowrap',
              position: 'relative',
              transition: 'all 0.3s'
            }}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                style={{ position: 'absolute', bottom: '-0.6rem', left: 0, right: 0, height: '3px', background: 'var(--color-gold)', borderRadius: '3px 3px 0 0' }} 
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="card-premium"
          style={{ padding: '3rem', background: 'white' }}
        >
          {activeTab === 'contact' && (
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="floating-label-group">
                <input type="text" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={16} /> Official Email</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.contactPhone} onChange={e => setSettings({...settings, contactPhone: e.target.value})} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={16} /> Contact Phone</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.whatsappNumber} onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.031 2c-5.506 0-9.969 4.462-9.969 9.969 0 1.763.459 3.42 1.262 4.862l-1.341 4.904 5.021-1.317c1.408.766 3.013 1.206 4.719 1.206 5.507 0 9.969-4.462 9.969-9.969s-4.462-9.969-9.961-9.969zm6.393 14.129c-.279.782-1.629 1.442-2.25 1.536-.563.084-1.294.131-3.666-.848-3.034-1.253-4.992-4.331-5.143-4.531-.152-.201-1.231-1.637-1.231-3.12 0-1.483.774-2.211 1.05-2.513.275-.301.6-.377.799-.377.201 0 .403.001.577.009.183.008.43-.07.674.515.245.586.837 2.036.91 2.187.073.151.122.327.025.527-.099.2-.148.327-.295.498-.148.172-.311.385-.443.516-.148.147-.304.309-.131.606.173.297.771 1.272 1.656 2.059.1.088.195.176.287.256.402.348.65.452.9.57.25.118.4.1.55-.074.15-.173.65-.758.825-1.018.174-.26.349-.219.587-.13.238.089 1.512.713 1.774.843.262.13.437.195.5.305.062.11.062.637-.217 1.419z" />
                  </svg>
                  WhatsApp Number
                </label>
              </div>
              <div className="floating-label-group">
                <textarea rows="3" value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> School Address</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.mapEmbedUrl} onChange={e => setSettings({...settings, mapEmbedUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> Google Maps Embed URL</label>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="floating-label-group">
                <input type="text" value={settings.facebookUrl} onChange={e => setSettings({...settings, facebookUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> Facebook URL</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.instagramUrl} onChange={e => setSettings({...settings, instagramUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> Instagram URL</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.twitterUrl} onChange={e => setSettings({...settings, twitterUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> Twitter URL</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.youtubeUrl} onChange={e => setSettings({...settings, youtubeUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> YouTube URL</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.linkedinUrl} onChange={e => setSettings({...settings, linkedinUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LinkIcon size={16} /> LinkedIn URL</label>
              </div>
            </div>
          )}


          {activeTab === 'branding' && (
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="floating-label-group">
                <input type="text" value={settings.siteName} onChange={e => setSettings({...settings, siteName: e.target.value})} required />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Monitor size={16} /> Site Name</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.logoUrl} onChange={e => setSettings({...settings, logoUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={16} /> School Logo URL</label>
              </div>
              <div className="floating-label-group">
                <input type="text" value={settings.faviconUrl} onChange={e => setSettings({...settings, faviconUrl: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={16} /> Favicon URL</label>
              </div>
              <div className="floating-label-group">
                <textarea rows="4" value={settings.seoDescription} onChange={e => setSettings({...settings, seoDescription: e.target.value})} />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={16} /> SEO Meta Description</label>
              </div>
            </div>
          )}

          {activeTab === 'announcement' && (
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.5rem', background: 'rgba(212, 175, 55, 0.1)', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, color: 'var(--color-primary)' }}>Announcement Bar</h4>
                  <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: '#64748b' }}>Show a prominent message at the top of every page.</p>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    checked={settings.announcementActive} 
                    onChange={e => setSettings({...settings, announcementActive: e.target.checked})} 
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <div className="floating-label-group">
                <textarea 
                  rows="2" 
                  value={settings.announcementText} 
                  onChange={e => setSettings({...settings, announcementText: e.target.value})} 
                  disabled={!settings.announcementActive}
                  placeholder="e.g. Admissions are now open for 2024-25 academic year!"
                />
                <label>Announcement Message</label>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}


export default Settings;

