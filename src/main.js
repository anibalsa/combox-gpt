import './style.css'
import './js/header';
import LocomotiveScroll from 'locomotive-scroll';

// Inicialização da v5 (mais simples)
const scroll = new LocomotiveScroll();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = [
  '#hero .content',
  '.grid header',
  '.grid .content',
  '.video-wrapper',
  '.timing .content-card',
  '.referencia'
];

function setupRevealAnimations() {
  if (prefersReducedMotion) {
    return;
  }

  const elements = document.querySelectorAll(revealTargets.join(', '));

  elements.forEach((element, index) => {
    element.classList.add('reveal-on-scroll');
    element.style.setProperty('--reveal-delay', `${Math.min(index * 35, 240)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

setupRevealAnimations();

const scrollBtn = document.querySelector('#scrollToTop');

// Na v5, usamos o evento nativo de scroll da janela, 
// pois o Locomotive v5 utiliza o scroll nativo do browser com melhorias.
window.addEventListener('scroll', () => {
  if (!scrollBtn) {
    return;
  }

  // window.scrollY detecta a posição atual
  if (window.scrollY > 300) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
});

// Clique para subir suavemente
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    // Na v5, o método scrollTo é acessado diretamente ou via window
    scroll.scrollTo(0, {
      duration: 1.5, // Na v5, a duração costuma ser em segundos
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing moderno
    });
  });
}
