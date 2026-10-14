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
  const previewNotice = document.querySelector('#project-preview-notice');
  const previewOpenLink = document.querySelector('#project-preview-open');
  const previewClose = document.querySelector('[data-close-project-preview]');
  const allowedPreviewHosts = new Set([
    'blaze-movie-hub.vercel.app',
    'blazelearn-pro.vercel.app',
    'blazepay-gateway-iota.vercel.app',
    'bothost.t20tech.site',
    'assistant.t20tech.site',
    'whatsapbot-development-course.vercel.app'
  ]);
  const defaultPreviewSandbox = 'allow-scripts allow-same-origin';
  const defaultPreviewNotice = 'Other project previews block form submits, pop-ups, and top-level navigation. Don’t enter passwords or payment details.';
  const assistantPreviewNotice = 'T20-CLASSIC AI is hosted separately. Prompts you send are processed by assistant.t20tech.site; don’t share passwords, private, or financial details.';
  const coursePreviewNotice = 'Guest course preview. Progress, likes, and comments stay in this browser until Supabase is connected; avoid sharing private information.';
  const resetPreview = () => {
    if (previewFrame) {
      previewFrame.removeAttribute('src');
      previewFrame.setAttribute('sandbox', defaultPreviewSandbox);
      previewFrame.title = 'Live project preview; forms, pop-ups, and top-level navigation are blocked';
    }
    if (previewNotice) previewNotice.textContent = defaultPreviewNotice;
  };
  if (previewDialog && previewFrame && previewTitle && previewOpenLink) {
    document.querySelectorAll('[data-project-preview]').forEach(button => button.addEventListener('click', () => {
      let url;
      try { url = new URL(button.dataset.previewUrl || ''); } catch { return; }
      if (url.protocol !== 'https:' || !allowedPreviewHosts.has(url.hostname)) return;
      const isAssistantPreview = url.hostname === 'assistant.t20tech.site';
      const isCoursePreview = url.hostname === 'whatsapbot-development-course.vercel.app';
      previewTitle.textContent = button.dataset.previewTitle || 'Project preview';
      previewOpenLink.href = url.href;
      previewFrame.setAttribute('sandbox', isAssistantPreview ? `${defaultPreviewSandbox} allow-forms` : defaultPreviewSandbox);
      previewFrame.title = isAssistantPreview
        ? 'T20-CLASSIC AI chat preview; prompts you send go to assistant.t20tech.site'
        : isCoursePreview
        ? 'WHATSAPBOT DEVELOPMENT COURSE guest preview; progress and comments are browser-local until Supabase is connected'
        : `${previewTitle.textContent} live preview; form submits, pop-ups, and top-level navigation are blocked`;
      if (previewNotice) previewNotice.textContent = isAssistantPreview ? assistantPreviewNotice : isCoursePreview ? coursePreviewNotice : defaultPreviewNotice;
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
