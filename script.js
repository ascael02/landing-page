function toggleFaq(el) {
  const item = el.parentElement;
  const allItems = document.querySelectorAll('.faq-item');

  allItems.forEach(i => {
    if (i !== item) {
      i.classList.remove('open');
      const btn = i.querySelector('.faq-question');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  const isOpen = item.classList.toggle('open');
  el.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
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

  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      nav.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('#form-feedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    formFeedback.className = 'form-feedback';

    const fullName = contactForm.querySelector('#full-name');
    const email = contactForm.querySelector('#email');
    const need = contactForm.querySelector('#need');

    if (!fullName.value.trim() || !email.value.trim() || !need.value) {
      formFeedback.textContent = 'Merci de remplir les champs obligatoires.';
      formFeedback.classList.add('error');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!emailOk) {
      formFeedback.textContent = 'Merci de renseigner une adresse email valide.';
      formFeedback.classList.add('error');
      return;
    }

    formFeedback.textContent = 'Merci, votre demande est prête. Nous vous répondrons sous 24h ouvrées.';
    formFeedback.classList.add('success');
    contactForm.reset();
  });
}

function initAutoCarousel(selector, intervalMs = 5000) {
  const track = document.querySelector(selector);
  if (!track) return;

  const isMobile = window.matchMedia('(max-width: 768px)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let timer = null;

  const start = () => {
    if (!isMobile.matches || prefersReducedMotion.matches) return;
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

  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) stop();
    else start();
  });

  start();
}

initAutoCarousel('.manifesto-strip', 5000);
initAutoCarousel('.trust-logos', 5000);
