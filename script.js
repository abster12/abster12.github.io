// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== Terminal Typing Effect =====
const terminalLines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'output', text: '> engineer who builds things to understand them' },
  { type: 'prompt', text: '$ cat focus.txt' },
  { type: 'output', text: '> distributed systems · AI platforms · multi-agent orchestration' },
  { type: 'prompt', text: '$ ls experiments/' },
  { type: 'output', text: '> stepwise/  tripvault/  hermes-agent/  advisor-executor/' },
  { type: 'prompt', text: '$ _' }
];

function typeTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  let lineIdx = 0;
  let charIdx = 0;
  let currentLine = null;
  let currentSpan = null;

  function typeNext() {
    if (lineIdx >= terminalLines.length) {
      // Add blinking cursor to the last line
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      body.appendChild(cursor);
      return;
    }

    const line = terminalLines[lineIdx];

    if (charIdx === 0) {
      currentLine = document.createElement('div');
      currentLine.className = 'terminal-line';
      currentSpan = document.createElement('span');
      currentSpan.className = line.type === 'prompt' ? 'terminal-prompt' : 'terminal-output';
      currentLine.appendChild(currentSpan);
      body.appendChild(currentLine);
    }

    if (charIdx <= line.text.length) {
      currentSpan.textContent = line.text.substring(0, charIdx);
      charIdx++;
      const delay = line.type === 'prompt' ? 45 : 25;
      setTimeout(typeNext, delay);
    } else {
      // Line done — move to next line
      lineIdx++;
      charIdx = 0;
      setTimeout(typeNext, 300);
    }
  }

  // Start typing after the terminal fades in
  setTimeout(typeNext, 800);
}

// Start terminal effect after page load
window.addEventListener('load', () => {
  setTimeout(typeTerminal, 1000);
});

// ===== Staggered Scroll Animations =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

function setupStaggeredAnimations() {
  // Group elements by their parent container for staggered effect
  const groups = [
    '.skills-grid .skill-card',
    '.timeline .timeline-item',
    '.projects-grid .project-card',
    '.side-projects-grid .side-project-card',
    '.about-info .info-card',
    '.exploring-tags .explore-tag'
  ];

  groups.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s`;
    });
  });

  // Section titles animate without stagger
  document.querySelectorAll('.section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements
  groups.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  });
  document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
}

// Add visible class style
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// Run after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupStaggeredAnimations);
} else {
  setupStaggeredAnimations();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});
