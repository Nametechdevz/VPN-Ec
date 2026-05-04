/* ═══════════════════════════════════════════
   WEBPRO STUDIO – MAIN JS
   ═══════════════════════════════════════════ */

// ── URGENCY BAR HEIGHT ADJUST ──
function adjustNavTop() {
  const bar = document.getElementById('urgencyBar');
  const nav = document.getElementById('navbar');
  if (!bar || !nav) return;
  const h = bar.offsetHeight;
  nav.style.top = bar.style.display === 'none' ? '0' : h + 'px';
}
adjustNavTop();
window.addEventListener('resize', adjustNavTop);

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
const stickyCta = document.getElementById('stickyCta');
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 60);
  stickyCta && stickyCta.classList.toggle('visible', y > 600);
  scrollTopBtn && scrollTopBtn.classList.toggle('visible', y > 400);
});

// ── HAMBURGER ──
const ham = document.getElementById('ham');
const mobMenu = document.getElementById('mobMenu');
ham && ham.addEventListener('click', () => {
  const open = mobMenu.classList.toggle('open');
  const s = ham.querySelectorAll('span');
  s[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  s[1].style.opacity   = open ? '0' : '1';
  s[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
mobMenu && mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobMenu.classList.remove('open');
  ham.querySelectorAll('span').forEach(s => { s.style.transform=''; s.style.opacity='1'; });
}));

// ── SCROLL TOP ──
scrollTopBtn && scrollTopBtn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({top: t.offsetTop - 80, behavior:'smooth'}); }
  });
});

// ── PLAN TABS ──
document.querySelectorAll('.ptab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.plan-pane').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const pane = document.getElementById('pane-' + btn.dataset.tab);
    if (pane) pane.classList.add('active');
  });
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── COUNTDOWN TIMER ──
function countdown(endStr, ids) {
  function update() {
    const diff = new Date(endStr) - new Date();
    if (diff <= 0) { ids.forEach(id => { const el = document.getElementById(id); if(el) el.textContent='00'; }); return; }
    const d = Math.floor(diff/86400000);
    const h = Math.floor((diff%86400000)/3600000);
    const m = Math.floor((diff%3600000)/60000);
    const s = Math.floor((diff%60000)/1000);
    const vals = ids.length === 4 ? [d,h,m,s] : [h,m,s];
    ids.forEach((id,i) => {
      const el = document.getElementById(id);
      if (el) el.textContent = String(vals[i]).padStart(2,'0');
    });
  }
  update();
  setInterval(update, 1000);
}

// Mini countdown (top bar)
countdown('2025-12-31 23:59:59', ['cdH','cdM','cdS']);
// Plans countdown (full)
countdown('2025-12-31 23:59:59', ['pcdD','pcdH','pcdM','pcdS']);

// ── REVEAL ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin:'0px 0px -40px 0px' });

document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
function animCount(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const t = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(t);
  }, 16);
}
const cntObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.counter').forEach(animCount);
      cntObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const strip = document.querySelector('.proof-strip-inner');
if (strip) cntObserver.observe(strip);

// ── HERO CANVAS PARTICLES ──
(function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function rand(a, b) { return Math.random() * (b - a) + a; }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x = rand(0, W);
      this.y = init ? rand(0, H) : H + 10;
      this.size = rand(0.5, 2.5);
      this.speed = rand(0.3, 1.2);
      this.opacity = rand(0.05, 0.4);
      this.red = Math.random() > 0.65;
      this.vx = rand(-0.3, 0.3);
    }
    update() {
      this.y -= this.speed;
      this.x += this.vx;
      if (this.y < -10) this.reset(false);
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.red
        ? `rgba(255,0,0,${this.opacity})`
        : `rgba(255,255,255,${this.opacity * 0.4})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  // Shooting stars
  class Star {
    constructor() { this.reset(); }
    reset() {
      this.x = rand(0, W);
      this.y = rand(0, H * 0.5);
      this.len = rand(60, 140);
      this.speed = rand(4, 10);
      this.opacity = 0;
      this.angle = rand(30, 60) * Math.PI / 180;
      this.life = 0;
      this.maxLife = rand(60, 120);
    }
    update() {
      this.life++;
      this.opacity = this.life < 10 ? this.life/10 : this.life > this.maxLife-10 ? (this.maxLife-this.life)/10 : 0.6;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      if (this.life >= this.maxLife) this.reset();
    }
    draw() {
      const grad = ctx.createLinearGradient(this.x, this.y, this.x - Math.cos(this.angle)*this.len, this.y - Math.sin(this.angle)*this.len);
      grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - Math.cos(this.angle)*this.len, this.y - Math.sin(this.angle)*this.len);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  const stars = [new Star(), new Star()];
  stars[1].life = 60;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    stars.forEach(s => { s.update(); s.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── FINAL CTA PARTICLES ──
(function initFctaParticles() {
  const wrap = document.querySelector('.fcta-particles');
  if (!wrap) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const isRed = Math.random() > 0.6;
    Object.assign(p.style, {
      position: 'absolute',
      width: size + 'px', height: size + 'px',
      background: isRed ? `rgba(255,0,0,${Math.random()*.3+.1})` : `rgba(255,255,255,${Math.random()*.1+.02})`,
      borderRadius: '50%',
      left: Math.random()*100 + '%',
      top: Math.random()*100 + '%',
      animation: `fctaFloat ${Math.random()*15+8}s ease-in-out infinite`,
      animationDelay: `-${Math.random()*15}s`,
    });
    wrap.appendChild(p);
  }
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fctaFloat {
      0%,100%{transform:translateY(0) scale(1)}
      33%{transform:translateY(-20px) scale(1.1)}
      66%{transform:translateY(10px) scale(.9)}
    }
  `;
  document.head.appendChild(style);
})();

// ── TYPING EFFECT on H1 ──
(function typeEffect() {
  const target = document.querySelector('.h1-line2');
  if (!target) return;
  const text = target.textContent;
  target.textContent = '';
  target.style.minWidth = '1px';
  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) { target.textContent += text[i++]; }
    else clearInterval(timer);
  }, 80);
})();

// ── MAGNETIC BUTTONS ──
document.querySelectorAll('.btn-hero-main,.btn-cta-main,.fcta-main').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = e.clientX - r.left - r.width/2;
    const dy = e.clientY - r.top - r.height/2;
    btn.style.transform = `translate(${dx*.15}px,${dy*.15}px) translateY(-4px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ── GLITCH EFFECT on LOGO ──
(function glitch() {
  const logos = document.querySelectorAll('.lw');
  setInterval(() => {
    logos.forEach(l => {
      l.style.textShadow = `${(Math.random()-0.5)*4}px 0 rgba(255,0,0,.8)`;
      setTimeout(() => l.style.textShadow = '', 80);
    });
  }, 4000);
})();

// ── ANIMATE PHONE UI ──
(function animatePhone() {
  const cats = document.querySelectorAll('.pcat');
  let cur = 0;
  setInterval(() => {
    cats.forEach(c => c.classList.remove('active'));
    cur = (cur + 1) % cats.length;
    cats[cur] && cats[cur].classList.add('active');
  }, 2500);
})();

// ── NUMBER TICKER on plan amounts (hover) ──
document.querySelectorAll('.pc-amount').forEach(el => {
  const final = parseInt(el.textContent);
  let animating = false;
  el.parentElement.parentElement.parentElement.addEventListener('mouseenter', () => {
    if (animating) return;
    animating = true;
    let v = 0, step = final / 20;
    const t = setInterval(() => {
      v = Math.min(v + step, final);
      el.textContent = Math.floor(v);
      if (v >= final) { el.textContent = final; clearInterval(t); animating = false; }
    }, 30);
  });
});

// ── SCROLL PROGRESS BAR ──
(function progressBar() {
  const bar = document.createElement('div');
  Object.assign(bar.style, {
    position:'fixed',top:'0',left:'0',height:'3px',
    background:'linear-gradient(90deg,#FF0000,#FF4444)',
    zIndex:'3000',transition:'width .1s ease',width:'0%',
    boxShadow:'0 0 10px rgba(255,0,0,.6)',
  });
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  });
})();
