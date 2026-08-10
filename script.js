// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav__links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav__links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.about__grid, .how__panel, .feature-card, .method__steps li, .team__card, .contact__inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// Sticky nav background intensifies on scroll
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 20px rgba(12,47,94,0.06)';
  } else {
    nav.style.boxShadow = 'none';
  }

  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 420);
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Try to play the intro video when the page loads
window.addEventListener('load', () => {
  const introVideo = document.querySelector('.hero__video');
  if (introVideo) {
    introVideo.play().catch(() => {
      // Autoplay may be blocked if the browser requires user interaction.
    });
  }
});

// Google Translate integration
const gtLanguageSelect = document.getElementById('gt-language-select');
function setGoogleTranslate(lang, attempt = 0) {
  const gtSelect = document.querySelector('#google_translate_element select');
  if (!gtSelect) {
    if (attempt < 10) {
      setTimeout(() => setGoogleTranslate(lang, attempt + 1), 250);
    }
    return;
  }
  gtSelect.value = lang;
  gtSelect.dispatchEvent(new Event('change'));
}
if (gtLanguageSelect) {
  gtLanguageSelect.addEventListener('change', (event) => {
    const value = event.target.value;
    if (value === 'other') {
      const widget = document.getElementById('google_translate_element');
      if (widget) widget.style.display = 'block';
      return;
    }
    setGoogleTranslate(value);
  });
}
