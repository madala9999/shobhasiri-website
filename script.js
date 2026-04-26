// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Contact form — submits to Formspree and shows success message
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = this;
  const btn = form.querySelector('button[type="submit"]');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');

  btn.textContent = 'Sending...';
  btn.disabled = true;
  error.classList.remove('show');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (response.ok) {
      success.classList.add('show');
      form.reset();
      setTimeout(() => success.classList.remove('show'), 6000);
    } else {
      error.classList.add('show');
      setTimeout(() => error.classList.remove('show'), 8000);
    }
  } catch {
    error.textContent = 'Network error. Please check your connection and try again.';
    error.classList.add('show');
    setTimeout(() => error.classList.remove('show'), 8000);
  }

  btn.textContent = 'Send Message';
  btn.disabled = false;
});
