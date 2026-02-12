// Envolvemos tudo para garantir que o DOM exista
document.addEventListener('DOMContentLoaded', () => {
  
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "ComBox Pro", href: "#pro-care" },
    { label: "ComBox Care", href: "#pro-care" },
    { label: "ComBox Discovery", href: "#discovery" }
  ];

  const ctas = [
    { label: "Pro Plan", href: "/pro", type: "pro" },
    { label: "Care", href: "/care", type: "care" }
  ];

  // Seletores (Agora garantidos)
  const header = document.getElementById('main-header');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close'); // Novo seletor
  const drawer = document.getElementById('drawer');
  const drawerLinksContainer = document.getElementById('drawer-links');
  const drawerCtasContainer = document.getElementById('drawer-ctas');

  // Funções Auxiliares
const toggleMenu = (forceClose = false) => {
  console.log("Tentando alternar menu..."); // Veja se isso aparece no F12
  if (!drawer) {
    console.error("Erro: Elemento #drawer não encontrado no DOM!");
    return;
  }
  
  if (forceClose) {
    drawer.classList.remove('is-open');
  } else {
    drawer.classList.toggle('is-open');
  }
  
  console.log("Classe 'is-open' presente?", drawer.classList.contains('is-open'));
};

  // 1. Efeito de Scroll
  window.addEventListener('scroll', () => {
    if (header) { // Check de segurança
      header.classList.toggle('scrolled', window.scrollY > 8);
    }
  }, { passive: true });

  // 2. Toggle do Menu (Deslizar suave via classe)
  menuToggle.addEventListener('click', () => toggleMenu());

  // Fechar pelo botão X
  if (menuClose) {
    menuClose.addEventListener('click', () => toggleMenu(true));
  }

  // 3. Renderização e Smooth Scroll
  function renderNav() {
    navItems.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      
      a.addEventListener('click', (e) => {
        toggleMenu(true); // Fecha suavemente
        
        if (item.href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(item.href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
      drawerLinksContainer.appendChild(a);
    });

    /* ctas.forEach(cta => {
      const a = document.createElement('a');
      a.href = cta.href;
      a.textContent = cta.label;
      a.className = cta.type === 'pro' ? 'ctaPro' : 'ctaCare';
      a.addEventListener('click', () => toggleMenu(true));
      drawerCtasContainer.appendChild(a);
    }); */
  }

  // 4. Intersection Observer
  function initObserver() {
    const hashes = navItems.filter(n => n.href.startsWith('#')).map(n => n.href);
    const elements = hashes.map(h => document.querySelector(h)).filter(el => !!el);

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible[0]) {
        updateActiveLink(`#${visible[0].target.id}`);
      }
    }, { threshold: 0.6 });

    elements.forEach(el => observer.observe(el));
  }

  function updateActiveLink(activeId) {
    drawerLinksContainer.querySelectorAll('a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === activeId);
    });
  }

  // Inicialização
  renderNav();
  initObserver();
});