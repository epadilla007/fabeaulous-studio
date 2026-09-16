/* Fabeaulous Feet · homepage choreography (GSAP + ScrollTrigger) */
(function () {
  var doc = document.documentElement;

  if (!window.gsap || !window.ScrollTrigger || !doc.classList.contains('js')) return;
  gsap.registerPlugin(ScrollTrigger);
  var ease = 'power3.out';
  var mm = gsap.matchMedia();

  // ---- Hero intro ----
  var tl = gsap.timeline({ defaults: { ease: ease } });
  tl.from('.hero-media', { scale: 1.12, duration: 1.8, ease: 'power2.out' }, 0)
    .to('.hero-title .w', { opacity: 1, y: 0, duration: 0.9, stagger: 0.06 }, 0.2)
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 0.6)
    .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8 }, 0.72)
    .to('.hero-note', { opacity: 1, y: 0, duration: 0.8 }, 0.84)
    .from('.hero-disc', { opacity: 0, scale: 0.85, duration: 1.6 }, 0.3);

  // ---- Hero scroll exit (recede) ----
  gsap.to('.hero-img', { yPercent: 10, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  gsap.fromTo('.hero-content', { y: 0, opacity: 1 }, { y: -60, opacity: 0.2, immediateRender: false, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: 1 } });

  // ---- Section labels + fade-ups ----
  gsap.utils.toArray('.section-label:not(.hero-label)').forEach(function (el) {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.6, ease: ease, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  gsap.utils.toArray('.fade-up').forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // ---- Manifesto word reveal (lit by 50% of the section) ----
  var words = gsap.utils.toArray('.manifesto-big .w');
  mm.add('(min-width: 900px)', function () {
    gsap.to(words, { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.manifesto', start: 'top 60%', end: '45% 50%', scrub: 1 } });
    gsap.from('.manifesto-injuries', { opacity: 0, y: 30, ease: 'none', scrollTrigger: { trigger: '.manifesto', start: '35% 50%', end: '55% 50%', scrub: 1 } });
  });
  mm.add('(max-width: 899px)', function () {
    gsap.to(words, { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger: { trigger: '.manifesto-big', start: 'top 80%', end: 'bottom 55%', scrub: 1 } });
  });

  // ---- Steps: enter + stack recede ----
  var cards = gsap.utils.toArray('.step-card');
  cards.forEach(function (card) {
    gsap.to(card.children, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: ease, scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
  });
  mm.add('(min-width: 900px)', function () {
    cards.forEach(function (card, i) {
      var next = cards[i + 1];
      if (!next) return;
      gsap.fromTo(card, { scale: 1, opacity: 1 }, { scale: 0.94, opacity: 0.55, ease: 'none', immediateRender: false, scrollTrigger: { trigger: next, start: 'top 75%', end: 'top 35%', scrub: 1 } });
    });
  });
  gsap.utils.toArray('.draw circle').forEach(function (c, i) {
    gsap.to(c, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', delay: i * 0.12, scrollTrigger: { trigger: c.closest('svg'), start: 'top 85%', once: true } });
  });

  // ---- Tip: clip reveal ----
  gsap.utils.toArray('.clip-reveal').forEach(function (el) {
    var img = el.querySelector('img');
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 80%', once: true } })
      .to(el, { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut' })
      .from(img, { scale: 1.12, duration: 1.4, ease: ease }, 0);
  });
  gsap.from('.tip-card', { x: 40, opacity: 0, duration: 1, ease: ease, scrollTrigger: { trigger: '.tip-card', start: 'top 85%', once: true } });

  // ---- System gallery ----
  var track = document.querySelector('[data-track]');
  var viewport = document.querySelector('.gallery-viewport');
  mm.add('(min-width: 900px)', function () {
    if (!track) return;
    viewport.classList.add('is-pinned');
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    gsap.set('.product-card', { opacity: 1, y: 0 });
    var tween = gsap.to(track, {
      x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: { trigger: '.system', start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    gsap.utils.toArray('.product-card').forEach(function (card) {
      gsap.fromTo(card.querySelector('.product-img img'), { scale: 1.1 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true } });
    });
    return function () { viewport.classList.remove('is-pinned'); };
  });
  mm.add('(max-width: 899px)', function () {
    gsap.to('.product-card', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: ease, scrollTrigger: { trigger: '.gallery-track', start: 'top 85%', once: true } });
  });

  // ---- Specs: counters ----
  gsap.utils.toArray('.spec').forEach(function (spec, i) {
    var num = spec.querySelector('[data-count]');
    var end = parseFloat(num.dataset.count);
    var st = { trigger: '.spec-wall', start: 'top 80%', once: true };
    gsap.to(spec, { opacity: 1, y: 0, duration: 0.8, delay: i * 0.12, ease: ease, scrollTrigger: st });
    var o = { v: 0 };
    gsap.to(o, { v: end, duration: 1.4, delay: i * 0.12, ease: 'power2.out', scrollTrigger: st, onUpdate: function () { num.textContent = Math.round(o.v); } });
  });

  // ---- Paths: parallax offset on the distributor card ----
  mm.add('(min-width: 900px)', function () {
    gsap.fromTo('.path-dist', { y: 60 }, { y: -20, ease: 'none', scrollTrigger: { trigger: '.paths-grid', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.cta-disc', { rotate: 90, ease: 'none', scrollTrigger: { trigger: '.cta-band', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
