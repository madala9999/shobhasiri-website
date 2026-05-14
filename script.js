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

  btn.textContent = 'Sending...';
  btn.disabled = true;

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
      alert('Something went wrong. Please try again or email us directly.');
    }
  } catch {
    alert('Network error. Please check your connection and try again.');
  }

  btn.textContent = 'Send Message';
  btn.disabled = false;
});

// ── CHAT WIDGET ──
const faqs = [
  { patterns: ['hour', 'open', 'time', 'when', 'close'],
    answer: 'We are open <strong>Monday – Saturday, 9:00 AM – 7:00 PM</strong>. We are closed on Sundays.' },
  { patterns: ['book', 'appointment', 'schedule', 'reserve'],
    answer: 'You can book by calling <strong>022 059 9334</strong>, emailing <strong>dr.siri0108@gmail.com</strong>, or using the contact form at the bottom of this page.' },
  { patterns: ['service', 'offer', 'treat', 'procedure', 'what can', 'do you'],
    answer: 'We offer: <strong>General Dentistry, Teeth Whitening, Root Canal Treatment, Dental Implants, Orthodontics</strong>, and <strong>Pediatric Dentistry</strong>.' },
  { patterns: ['address', 'location', 'where', 'find', 'direction', 'located'],
    answer: 'We are at <strong>87 Glamorgan Drive, Torbay, Auckland 0630</strong>. <a href="https://www.google.com/maps/search/?api=1&query=87+Glamorgan+Drive+Torbay+0630" target="_blank" rel="noopener">View on Google Maps</a>' },
  { patterns: ['phone', 'call', 'number', 'ring'],
    answer: 'Call us at <strong><a href="tel:+6422059334">022 059 9334</a></strong> during opening hours.' },
  { patterns: ['email', 'mail'],
    answer: 'Email us at <strong><a href="mailto:dr.siri0108@gmail.com">dr.siri0108@gmail.com</a></strong>.' },
  { patterns: ['doctor', 'dentist', 'dr', 'siri', 'lanka', 'about'],
    answer: 'Our dentist is <strong>Dr. Siri Lanka, BDS</strong>. She specialises in cosmetic and preventive dentistry and is registered with the New Zealand Dental Council.' },
  { patterns: ['price', 'cost', 'fee', 'charge', 'much', 'afford'],
    answer: 'We offer affordable treatment plans with flexible options. Please <a href="#contact">contact us</a> for specific pricing.' },
  { patterns: ['emergency', 'urgent', 'pain', 'toothache', 'hurt', 'ache'],
    answer: '🚨 For dental emergencies please call <strong><a href="tel:+6422059334">022 059 9334</a></strong> immediately. We will do our best to accommodate you urgently.' },
  { patterns: ['child', 'kid', 'children', 'pediatric', 'baby', 'young'],
    answer: 'Yes! We offer gentle, child-friendly <strong>Pediatric Dentistry</strong> designed to build healthy habits from an early age.' },
  { patterns: ['implant'],
    answer: 'We offer permanent, natural-looking <strong>Dental Implants</strong>. Book a consultation to find out if implants are right for you.' },
  { patterns: ['whiten', 'white', 'brighten', 'bleach'],
    answer: 'We provide professional <strong>Teeth Whitening</strong> to brighten your smile safely and effectively.' },
  { patterns: ['brace', 'aligner', 'orthodontic', 'straight', 'align'],
    answer: 'We offer <strong>Orthodontics</strong> — braces and aligners for children and adults to achieve perfectly aligned teeth.' },
  { patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    answer: 'Hello! 😊 How can I help you today?' },
  { patterns: ['thank', 'thanks', 'cheers', 'awesome', 'great'],
    answer: "You're welcome! Is there anything else I can help you with? 😊" },
  { patterns: ['bye', 'goodbye', 'see you'],
    answer: 'Goodbye! We look forward to seeing you soon. 😊' },
];

const chatFallback = "I'm not sure about that one. Please call us at <strong><a href=\"tel:+6422059334\">022 059 9334</a></strong> or email <strong><a href=\"mailto:dr.siri0108@gmail.com\">dr.siri0108@gmail.com</a></strong> and we'll be happy to help!";

function getBotReply(input) {
  const lower = input.toLowerCase();
  for (const faq of faqs) {
    if (faq.patterns.some(p => lower.includes(p))) return faq.answer;
  }
  return chatFallback;
}

function appendMessage(text, sender) {
  const msgs = document.getElementById('chatMessages');
  const el = document.createElement('div');
  el.className = `chat-msg ${sender}`;
  el.innerHTML = `<p>${text}</p>`;
  msgs.appendChild(el);
  msgs.scrollTop = msgs.scrollHeight;
}

function handleUserInput(text) {
  if (!text.trim()) return;
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();
  appendMessage(text, 'user');
  setTimeout(() => appendMessage(getBotReply(text), 'bot'), 380);
}

const chatWidget = document.getElementById('chatWidget');
const chatToggle = document.getElementById('chatToggle');
const chatInput  = document.getElementById('chatInput');

chatToggle.addEventListener('click', () => {
  chatWidget.classList.toggle('open');
  if (chatWidget.classList.contains('open')) chatInput.focus();
});

document.getElementById('chatCloseBtn').addEventListener('click', () => {
  chatWidget.classList.remove('open');
});

document.getElementById('chatSend').addEventListener('click', () => {
  handleUserInput(chatInput.value);
  chatInput.value = '';
});

chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { handleUserInput(chatInput.value); chatInput.value = ''; }
});

document.querySelectorAll('.quick-reply').forEach(btn => {
  btn.addEventListener('click', () => handleUserInput(btn.dataset.query));
});
