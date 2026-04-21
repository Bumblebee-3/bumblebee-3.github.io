// --- Loading Screen ---
const loadingScreen = document.getElementById('loading-screen');

// Initialize page
function initializePage() {
  // Ensure loading screen is visible initially
  loadingScreen.style.opacity = '1';
  loadingScreen.style.pointerEvents = 'auto';
  loadingScreen.style.display = 'flex';

  // Fade out loading screen after a delay
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.remove();
      }
    }, 600); // Remove after CSS transition
  }, 1000);
}

// Run initialization when DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);

// --- Mobile Menu Toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    let menuOpen = false;
    
    toggleBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      
      if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        // Force reflow
        void mobileMenu.offsetWidth;
        mobileMenu.classList.remove('opacity-0', 'scale-y-90', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'scale-y-100', 'translate-y-0');
      } else {
        mobileMenu.classList.remove('opacity-100', 'scale-y-100', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'scale-y-90', '-translate-y-4');
        setTimeout(() => {
          if (!menuOpen) {
            mobileMenu.classList.add('hidden');
          }
        }, 500);
      }
    });
  }
});

// --- Card Hover Animations ---
document.addEventListener('DOMContentLoaded', () => {
  const menuCards = document.querySelectorAll('.menu-card');
  
  menuCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// --- Scroll Animations ---
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all vendor sections
  const vendorSections = document.querySelectorAll('.vendor-section');
  vendorSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    section.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(section);
  });
});

// --- Add smooth scroll behavior ---
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.scrollBehavior = 'smooth';
});

// --- Optional: Console log for debugging ---
console.log('Food Menu page loaded successfully!');
