/* =============================================
   PORTFOLIO - NIKHIL VASHISTH
   Interactive JavaScript
   ============================================= */

'use strict';

/* ---- Custom Cursor Glow ---- */
const cursorGlow = document.getElementById('cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const speed = 0.08;
  glowX += (mouseX - glowX) * speed;
  glowY += (mouseY - glowY) * speed;
  if (cursorGlow) {
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ---- Navbar scroll effect ---- */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar shadow on scroll
  if (scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Back to top button
  if (scrollY > 500) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }

  // Highlight active nav link
  updateActiveNav();
});

/* ---- Active Nav link on scroll ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

/* ---- Mobile Hamburger Menu ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ---- Smooth scroll for anchors ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 72;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

/* ---- Intersection Observer for reveal animations ---- */
const revealElements = document.querySelectorAll(
  '.skill-card, .stat-card, .timeline-item, .project-card, .contact-item, .about-text, .about-stats, .contact-form'
);

revealElements.forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = ((i % 4) * 0.1) + 's';
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ---- Count-up Animation for Stats ---- */
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        animateCount(num, target);
      });
    }
  },
  { threshold: 0.5 }
);

const aboutSection = document.querySelector('.about');
if (aboutSection) statsObserver.observe(aboutSection);

/* ---- Skill Bar Animation ---- */
const skillFills = document.querySelectorAll('.skill-fill');
let skillsAnimated = false;

const skillsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
      skillsAnimated = true;
      skillFills.forEach(fill => {
        const width = fill.getAttribute('data-width');
        setTimeout(() => {
          fill.style.width = width + '%';
        }, 200);
      });
    }
  },
  { threshold: 0.3 }
);

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillsObserver.observe(skillsSection);

/* ---- Contact Form ---- */
const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('send-btn');
const btnText = document.getElementById('btn-text');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simple validation
    const fields = contactForm.querySelectorAll('[required]');
    let valid = true;
    fields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#ff6b8b';
        valid = false;
      }
    });
    if (!valid) return;

    // Gather form content
    const firstName = contactForm.querySelector('#first-name').value;
    const lastName = contactForm.querySelector('#last-name').value;
    const email = contactForm.querySelector('#email-input').value;
    const subjectField = contactForm.querySelector('#subject').value;
    const message = contactForm.querySelector('#message').value;

    // Construct mailto link
    const mailtoLink = `mailto:nikhilvashisth965@gmail.com?subject=${encodeURIComponent(subjectField)}&body=${encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Optional: Feedback animation
    sendBtn.disabled = true;
    btnText.textContent = 'Opening Email...';
    sendBtn.style.opacity = '0.7';

    setTimeout(() => {
      sendBtn.style.display = 'none';
      formSuccess.classList.add('show');
      contactForm.reset();
    }, 1000);
  });

  // Clear error color on input
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.style.borderColor = '';
    });
  });
}

/* ---- Typed effect for hero subtitle ---- */
const subtitleEl = document.querySelector('.hero-subtitle');
if (subtitleEl) {
  const phrases = [
    'PHP Laravel Backend Developer | Web Developer.',
    'API Architect | MySQL Expert.',
    'Problem Solver | High Energy Level.',
    'Creative Thinker | Team Player.'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeTimeout;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      subtitleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 75;

    if (!isDeleting && charIndex === current.length) {
      speed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 300;
    }

    typeTimeout = setTimeout(type, speed);
  }

  // Start typing after initial animation
  setTimeout(type, 1500);
}

/* ---- Tilt effect on project cards ---- */
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- Parallax subtle on hero ---- */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const heroCode = document.querySelector('.hero-code');
  if (heroContent && scrollY < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrollY * 0.08}px)`;
    if (heroCode) heroCode.style.transform = `translateY(${scrollY * -0.04}px)`;
  }
});
