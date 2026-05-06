import { useEffect } from 'react';

/**
 * SEO COMPONENT
 * Dynamically updates page metadata for search engines and social media
 */
function SEO({ title, description, keywords, image = '/favicon.jpeg', type = 'website' }) {
  const siteName = 'Nano World School';
  const fullTitle = `${title} | ${siteName}`;
  const defaultDescription = 'Nano World School - Think Deep. Speak Bold. A premium holistic educational institution focused on experiential learning and leadership.';
  const currentUrl = window.location.href;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // 2. Update Meta Tags Helper
    const updateMeta = (name, content, attr = 'name') => {
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Standard Meta
    updateMeta('description', description || defaultDescription);
    updateMeta('keywords', keywords || 'Nano World School, Preschool, Primary School, Hyderabad, Holistic Education, Leadership, Experiential Learning');

    // Open Graph
    updateMeta('og:title', fullTitle, 'property');
    updateMeta('og:description', description || defaultDescription, 'property');
    updateMeta('og:image', image, 'property');
    updateMeta('og:url', currentUrl, 'property');
    updateMeta('og:type', type, 'property');
    updateMeta('og:site_name', siteName, 'property');

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description || defaultDescription);
    updateMeta('twitter:image', image);

    // Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

  }, [title, description, keywords, image, type, currentUrl, fullTitle]);

  return null;
}

export default SEO;
