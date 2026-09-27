// ---- Typing effect for the hero prompt ----
const TYPED_TEXT = "whoami";
const typedEl = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeText(el, text, speed = 90) {
  if (!el) return;
  if (reduceMotion) { el.textContent = text; return; }
  let i = 0;
  el.textContent = '';
  (function step() {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    }
  })();
}
typeText(typedEl, TYPED_TEXT);

// ---- Scroll-spy: highlight the nav link for the section in view ----
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('nav a');

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach((section) => spy.observe(section));

// ---- Theme toggle (persists across visits) ----
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light' || theme === 'dark') {
    root.setAttribute('data-theme', theme);
  } else {
    root.removeAttribute('data-theme'); // follow system preference
  }
  if (toggleBtn) toggleBtn.textContent = theme === 'dark' ? '●' : '◐';
}

try {
  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);
} catch (e) {
  // localStorage unavailable (private browsing, etc.) — fall back to system theme
}

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
  });
}