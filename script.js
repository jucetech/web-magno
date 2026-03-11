/* ======================================
   MAGNO BUILDING GROUP — Scripts
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── Mobile menu toggle ──
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const highlightNav = () => {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === `#${id}`) {
            a.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ── Stat counter animation ──
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const animateCounters = () => {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'));
      const duration = 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        num.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        animateCounters();
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ── Scroll reveal animation ──
  const revealElements = document.querySelectorAll(
    '.service-card, .method-step, .highlight-card, .presence-card, ' +
    '.value-item, .feature-item, .contact-card, .team-member, ' +
    '.about-content, .about-visual, .why-us-content, .contact-form-wrapper'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Hero floating particles ──
  const particlesContainer = document.getElementById('heroParticles');
  if (particlesContainer) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(200,164,92,${Math.random() * 0.15 + 0.05});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
      `;
      particlesContainer.appendChild(particle);
    }
  }

  // ── Smooth scroll for all anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Contact form handling ──
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Mensaje Enviado
      `;
      btn.style.background = '#2d8a4e';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }

  // ── Timeline line animation ──
  const timelineLine = document.querySelector('.timeline-line');
  if (timelineLine) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timelineLine.style.background = `linear-gradient(to bottom, var(--color-primary), var(--color-primary-light))`;
          timelineLine.style.transition = 'all 1.5s ease';
        }
      });
    }, { threshold: 0.2 });
    timelineObserver.observe(timelineLine.parentElement);
  }

  // ── Parallax on hero ──
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    if (hero && window.scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      hero.style.opacity = 1 - (window.scrollY / window.innerHeight) * 0.6;
    }
  }, { passive: true });
});
