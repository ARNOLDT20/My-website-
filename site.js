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

  const serviceButtons = [...document.querySelectorAll('[data-filter]')];
  const serviceCards = [...document.querySelectorAll('.service-card[data-group]')];
  serviceButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    serviceButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    serviceCards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.group !== selected; });
  }));

  const projectButtons = [...document.querySelectorAll('[data-project-filter]')];
  const projectCards = [...document.querySelectorAll('[data-project-card]')];
  projectButtons.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.projectFilter;
    projectButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.projectCategory !== selected; });
  }));

  const insightCards = [...document.querySelectorAll('[data-insight-card]')];
  const insightFilters = [...document.querySelectorAll('[data-insight-filter]')];
  const search = document.querySelector('[data-insight-search]');
  const results = document.querySelector('[data-insight-results]');
  const emptyState = document.querySelector('[data-insight-empty]');
  let selectedTopic = 'all';
  const filterInsights = () => {
    if (!insightCards.length) return;
    const query = (search?.value || '').trim().toLocaleLowerCase();
    let visible = 0;
    insightCards.forEach(card => {
      const topicMatches = selectedTopic === 'all' || card.dataset.topic === selectedTopic;
      const text = `${card.dataset.search || ''} ${card.textContent || ''}`.toLocaleLowerCase();
      const queryMatches = !query || text.includes(query);
      card.hidden = !(topicMatches && queryMatches);
      if (!card.hidden) visible += 1;
    });
    if (results) results.textContent = `Showing ${visible} ${visible === 1 ? 'guide' : 'guides'}`;
    if (emptyState) emptyState.hidden = visible !== 0;
  };
  insightFilters.forEach(button => button.addEventListener('click', () => {
    selectedTopic = button.dataset.insightFilter || 'all';
    insightFilters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    filterInsights();
  }));
  search?.addEventListener('input', filterInsights);

  document.querySelectorAll('[data-contact-message]').forEach(link => {
    const message = link.dataset.contactMessage;
    if (!message) return;
    const number = link.dataset.contactNumber || '255627417402';
    if (!/^\d{8,15}$/.test(number)) return;
    const url = new URL(`https://wa.me/${number}`);
    url.searchParams.set('text', message);
    link.href = url.toString();
  });

  const previewDialog = document.querySelector('#project-preview');
  const previewFrame = document.querySelector('#project-preview-frame');
  const previewTitle = document.querySelector('#project-preview-title');
  const previewOpenLink = document.querySelector('#project-preview-open');
  const previewClose = document.querySelector('[data-close-project-preview]');
  const allowedPreviewHosts = new Set([
    'blaze-movie-hub.vercel.app',
    'blazelearn-pro.vercel.app',
    'blazepay-gateway-iota.vercel.app',
    'bothost.t20tech.site'
  ]);
  const resetPreview = () => {
    if (previewFrame) previewFrame.removeAttribute('src');
  };
  if (previewDialog && previewFrame && previewTitle && previewOpenLink) {
    document.querySelectorAll('[data-project-preview]').forEach(button => button.addEventListener('click', () => {
      let url;
      try { url = new URL(button.dataset.previewUrl || ''); } catch { return; }
      if (url.protocol !== 'https:' || !allowedPreviewHosts.has(url.hostname)) return;
      previewTitle.textContent = button.dataset.previewTitle || 'Project preview';
      previewOpenLink.href = url.href;
      previewFrame.title = `${previewTitle.textContent} live preview; interactive forms are disabled`;
      previewFrame.src = url.href;
      if (typeof previewDialog.showModal === 'function') previewDialog.showModal();
      else window.open(url.href, '_blank', 'noopener,noreferrer');
      previewClose?.focus();
    }));
    previewClose?.addEventListener('click', () => previewDialog.close());
    previewDialog.addEventListener('close', resetPreview);
    previewDialog.addEventListener('click', event => {
      if (event.target === previewDialog) previewDialog.close();
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
