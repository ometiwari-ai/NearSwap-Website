// Simple GA4 loader. Replace the ID below with your GA4 Measurement ID (e.g., G-ABC123DEF4).
// Tip: keep this file cached and stable; only the ID needs to change.

(() => {
  const GA_MEASUREMENT_ID = 'G-09S2YN5XJ4';

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-09S2YN5XJ4') {
    // Analytics not configured yet.
    return;
  }

  // Load gtag.js
  const gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(gtagScript);

  // Initialize
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
})();
