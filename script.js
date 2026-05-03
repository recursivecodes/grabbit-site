/* ===================================================
   GRABBIT — script.js
   =================================================== */

/* ---------- Nav scroll state ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- Parallax ---------- */
const parallaxBg    = document.getElementById('parallaxBg');
const featParallax  = document.getElementById('featParallax');
const sourceParallax = document.getElementById('sourceParallax');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${y * 0.35}px)`;
  }

  if (featParallax) {
    const rect = featParallax.closest('.features').getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      featParallax.style.transform = `translateY(${(progress - 0.5) * 60}px)`;
    }
  }

  if (sourceParallax) {
    const rect = sourceParallax.closest('.source-parallax-wrap').getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      sourceParallax.style.transform = `translateY(${(progress - 0.5) * 80}px)`;
    }
  }
}, { passive: true });

/* ---------- Scroll-triggered animations ---------- */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = el.dataset.animDelay || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      animObserver.unobserve(el);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-anim]').forEach((el, i) => {
  el.dataset.animDelay = i * 80;
  animObserver.observe(el);
});

/* ---------- FAQ accordion ---------- */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq-q').forEach(other => {
      if (other !== btn) {
        other.setAttribute('aria-expanded', 'false');
        other.closest('.faq-item').querySelector('.faq-a').classList.remove('open');
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.classList.toggle('open', !isOpen);
  });
});

/* ---------- Smooth section entrance for FAQ items ---------- */
const faqObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      faqObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.faq-item').forEach(el => faqObserver.observe(el));
