// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  navbar.classList.toggle('scrolled', cur > 50);
  lastScroll = cur;
});

// ========== MOBILE MENU ==========
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ========== COUNTER ANIMATION ==========
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseInt(entry.target.getAttribute('data-count'));
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

function animateCounter(el, target) {
  let cur = 0;
  const steps = Math.min(target, 60);
  const step = target / steps;
  const timer = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(cur) + '+';
  }, 25);
}

statNums.forEach(num => counterObserver.observe(num));

// ========== 3D TILT EFFECT ==========
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

// ========== PORTFOLIO VIDEO HOVER ==========
document.querySelectorAll('.portfolio-video-wrap').forEach(wrap => {
  const video = wrap.querySelector('video');
  wrap.addEventListener('mouseenter', () => video.play());
  wrap.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});

// welcome text letter animation → tagline
const heroWelcome = document.getElementById('heroWelcome');
const heroTagline = document.getElementById('heroTagline');
const wlLetters = document.querySelectorAll('.wl');

// gradient animation on letters
wlLetters.forEach(l => {
  l.style.animation = 'letterSlam 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards, gradientFlow 6s ease infinite';
});

// settle + shake
setTimeout(() => {
  heroWelcome.classList.add('settled');
  setTimeout(() => heroWelcome.classList.remove('settled'), 300);
}, 900);

// glow pulse
setTimeout(() => {
  heroWelcome.classList.add('glow-pulse');
}, 1400);

// light sweep via CSS at 1.5s

// fade welcome out, show tagline
setTimeout(() => {
  heroWelcome.classList.add('hide');
  heroTagline.classList.add('show');
}, 3200);

// ========== SMOOTH SECTION HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let curSection = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      curSection = section.getAttribute('id');
    }
  });

  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + curSection);
  });
});
