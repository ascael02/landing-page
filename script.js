function toggleFaq(el) {
  const item = el.parentElement;
  const allItems = document.querySelectorAll('.faq-item');
  allItems.forEach(i => { if (i !== item) i.classList.remove('open'); });
  item.classList.toggle('open');
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const nav = document.querySelector('nav');
const navToggle = document.querySelector('.nav-toggle');
const navMenuLinks = document.querySelectorAll('.nav-links a');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initAutoCarousel(selector, intervalMs = 5000) {
  const track = document.querySelector(selector);
  if (!track) return;

  const isMobile = window.matchMedia('(max-width: 768px)');
  let timer = null;

  const start = () => {
    if (!isMobile.matches) return;
    stop();
    timer = setInterval(() => {
      const step = Math.max(160, Math.floor(track.clientWidth * 0.75));
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = track.scrollLeft + step >= maxScroll - 2 ? 0 : track.scrollLeft + step;
      track.scrollTo({ left: next, behavior: 'smooth' });
    }, intervalMs);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  track.addEventListener('pointerdown', stop);
  track.addEventListener('pointerup', start);
  track.addEventListener('mouseenter', stop);
  track.addEventListener('mouseleave', start);

  isMobile.addEventListener('change', () => {
    if (isMobile.matches) start();
    else stop();
  });

  start();
}

initAutoCarousel('.manifesto-strip', 500);
initAutoCarousel('.trust-logos', 500);
