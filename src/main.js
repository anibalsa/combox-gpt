import './style.css'
import './js/header';
import LocomotiveScroll from 'locomotive-scroll';

// Inicialização da v5 (mais simples)
const scroll = new LocomotiveScroll();

const scrollBtn = document.querySelector('#scrollToTop');

// Na v5, usamos o evento nativo de scroll da janela, 
// pois o Locomotive v5 utiliza o scroll nativo do browser com melhorias.
window.addEventListener('scroll', () => {
  // window.scrollY detecta a posição atual
  if (window.scrollY > 300) {
    scrollBtn.classList.add('active');
  } else {
    scrollBtn.classList.remove('active');
  }
});

// Clique para subir suavemente
scrollBtn.addEventListener('click', () => {
  // Na v5, o método scrollTo é acessado diretamente ou via window
  scroll.scrollTo(0, {
    duration: 1.5, // Na v5, a duração costuma ser em segundos
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) // Easing moderno
  });
});