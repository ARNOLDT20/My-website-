(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
      registrations.forEach(registration => {
        const workerUrl = registration.active?.scriptURL || registration.waiting?.scriptURL || registration.installing?.scriptURL || '';
        if (workerUrl === `${location.origin}/sw.js`) registration.unregister();
      });
    }).catch(() => {});
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    };
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') !== 'true';
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      nav.classList.toggle('is-open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  }

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const serviceCards = [...document.querySelectorAll('.service-card[data-group]')];
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    serviceCards.forEach(card => {
      card.hidden = selected !== 'all' && card.dataset.group !== selected;
    });
  }));

  document.querySelectorAll('[data-contact-message]').forEach(link => {
    const message = link.dataset.contactMessage;
    if (!message) return;
    const url = new URL('https://wa.me/255658206524');
    url.searchParams.set('text', message);
    link.href = url.toString();
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
