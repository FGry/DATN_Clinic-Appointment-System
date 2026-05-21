const canUseServiceWorker = 'serviceWorker' in navigator;
if (canUseServiceWorker) {
  if (import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
        console.warn('Service worker registration failed', error);
      });
    });
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      }).catch((error: unknown) => {
        console.warn('Service worker unregister failed', error);
      });
    });
  }
}
