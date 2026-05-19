const canUseServiceWorker = 'serviceWorker' in navigator;
const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);

if (canUseServiceWorker && (import.meta.env.PROD || isLocalhost)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
      console.warn('Service worker registration failed', error);
    });
  });
}
