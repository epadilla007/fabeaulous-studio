/* Fabeaulous Feet · shared behaviors (all pages) */
(function () {
  var doc = document.documentElement;
  var header = document.querySelector('[data-header]');
  var bar = document.querySelector('.progress span');

  // Header state + scroll progress
  var ticking = false;
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle('is-solid', y > 40);
    if (bar) {
      var max = doc.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  // Mobile menu
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var label = toggle.querySelector('.sr-only');
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      header.classList.toggle('menu-open', open);
      if (label) label.textContent = open ? label.dataset.labelClose : label.dataset.labelOpen;
      if (open && window.gsap && doc.classList.contains('js')) {
        gsap.fromTo(menu.querySelectorAll('li, .mobile-menu-actions > *'), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' });
      }
    }
    toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // Active nav link
  var key = (document.body.className.match(/page-([a-z0-9]+)/) || [])[1];
  document.querySelectorAll('.main-nav a[data-key]').forEach(function (a) {
    if (a.dataset.key === key) a.setAttribute('aria-current', 'page');
  });

  // Copyright year
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // WhatsApp placeholder guard (number not confirmed yet)
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    if (a.href.indexOf('WHATSAPP_NUMBER') > -1) a.setAttribute('data-placeholder', 'true');
  });

  // Product color picker
  document.querySelectorAll('[data-colors]').forEach(function (wrap) {
    var stage = wrap.querySelector('[data-color-stage]');
    var btns = wrap.querySelectorAll('.swatch');
    btns.forEach(function (b) {
      var pre = new Image(); pre.src = b.dataset.src;
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        stage.classList.add('is-swapping');
        setTimeout(function () {
          stage.src = b.dataset.src; stage.alt = b.dataset.alt;
          stage.classList.remove('is-swapping');
        }, 180);
      });
    });
  });

  // Jump nav active state
  var jumps = document.querySelectorAll('.jump-inner a');
  if (jumps.length && 'IntersectionObserver' in window) {
    var map = {};
    jumps.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          jumps.forEach(function (a) { a.classList.remove('is-active'); });
          var a = map[en.target.id]; if (a) a.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) io.observe(s); });
  }

  // Pricing form (Web3Forms)
  var form = document.querySelector('[data-form]');
  if (form) {
    var status = form.querySelector('[data-status]');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var fd = new FormData(form);
      var data = {};
      fd.forEach(function (v, k) {
        if (k === 'interest') { data[k] = data[k] ? data[k] + ', ' + v : v; }
        else data[k] = v;
      });
      if (data.botcheck) return;
      status.classList.remove('is-error');
      if (!data.access_key || data.access_key.indexOf('YOUR_WEB3FORMS') === 0) {
        status.textContent = form.dataset.error;
        status.classList.add('is-error');
        return;
      }
      status.textContent = form.dataset.sending;
      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res.success) { form.reset(); status.textContent = form.dataset.success; }
        else throw new Error(res.message || 'error');
      }).catch(function () {
        status.textContent = form.dataset.error; status.classList.add('is-error');
      });
    });
  }

  // Magnetic buttons (desktop, fine pointer, motion allowed)
  function magnetic() {
    if (!window.gsap || !doc.classList.contains('js') || !matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.magnetic').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.18);
        yTo((e.clientY - r.top - r.height / 2) * 0.28);
      });
      el.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }
  if (document.readyState === 'complete') magnetic(); else window.addEventListener('load', magnetic);
})();
