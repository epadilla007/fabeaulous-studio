/* Fabeaulous Feet · content pages: four light patterns only
   1 fade-up · 2 staggered cards · 3 image scale-in · 4 section label slide */
(function () {
  if (!window.gsap || !window.ScrollTrigger || !document.documentElement.classList.contains('js')) return;
  gsap.registerPlugin(ScrollTrigger);
  var ease = 'power3.out';

  // 1. Fade-up
  gsap.utils.toArray('.fade-up').forEach(function (el) {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: ease, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });

  // 2. Staggered cards
  gsap.utils.toArray('.stagger').forEach(function (group) {
    gsap.to(group.children, { opacity: 1, y: 0, duration: 0.8, ease: ease, stagger: 0.12, scrollTrigger: { trigger: group, start: 'top 85%', once: true } });
  });

  // 3. Image scale-in (inside overflow-hidden wrappers)
  gsap.utils.toArray('.img-scale img, .page-hero-media img').forEach(function (img) {
    gsap.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: ease, scrollTrigger: { trigger: img, start: 'top 90%', once: true } });
  });

  // 4. Section label slide
  gsap.utils.toArray('.section-label').forEach(function (el) {
    gsap.to(el, { opacity: 1, x: 0, duration: 0.6, delay: 0.1, ease: ease, scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });

  // Safety: reveal anything still hidden once the page is fully scrolled or after load settles
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
