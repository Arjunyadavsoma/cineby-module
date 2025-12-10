// injector/inject.js
(function(){
  // Example: keyboard shortcuts, remove elements dynamically, fix player UI
  // Remove signup banners
  const removeSelectors = ['.cookie-banner', '.modal-signup', '.ads'];
  removeSelectors.forEach(s => {
    document.querySelectorAll(s).forEach(el => el.remove());
  });

  // Add a "Toggle Dark" button
  const btn = document.createElement('button');
  btn.textContent = 'Toggle Dark';
  btn.style.position = 'fixed';
  btn.style.right = '12px';
  btn.style.bottom = '12px';
  btn.style.zIndex = 9999;
  btn.onclick = ()=> document.documentElement.classList.toggle('module-dark');
  document.body.appendChild(btn);

  // Example: override player autoplay or remove inline trackers.
  // document.querySelectorAll('script[src*="tracker"]').forEach(s=>s.remove());
})();
