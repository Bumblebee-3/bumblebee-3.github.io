// --- Loading Screen and Initialization ---
const loadingScreen = document.getElementById('loading-screen');

async function initializePage() {


  // Ensure loading screen is visible at the very start
  loadingScreen.style.opacity = '1';
  loadingScreen.style.pointerEvents = 'auto';
  loadingScreen.style.display = 'flex';  // Ensure it is displayed

  try {
    const res = await fetch('/persev/config.json');
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const config = await res.json();
    const website = config.website || {};
    const navbar = website.navbar || {};
    const events = website.events || [];

    // Preload images using Promise-based approach (prevents duplicate requests)
    const imagePromises = [];
    website.events.forEach(event => {
      if (event.eventHeadPhoto) {
        imagePromises.push(new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load ${event.eventHeadPhoto}`));
          img.src = event.eventHeadPhoto;
        }));
      }
      if (event.logo) {
        imagePromises.push(new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load ${event.logo}`));
          img.src = event.logo;
        }));
      }
    });

    // Wait for all images to preload (optional - don't block UI)
    Promise.allSettled(imagePromises).then(results => {
      console.log(`Preloaded ${results.filter(r => r.status === 'fulfilled').length}/${results.length} images`);
    });

    // Populate Navbar Links
    const desktopNav = document.getElementById('desktop-nav');
    const mobileMenu = document.getElementById('mobile-menu');
    desktopNav.innerHTML = '';  // Clear existing content if any
    mobileMenu.innerHTML = '';  // Clear existing content if any
    const homeDesktop = document.createElement('a');
    homeDesktop.href = '/persev/';
    homeDesktop.textContent = 'Home';
    homeDesktop.className = 'hover:text-blue-200';
    desktopNav.appendChild(homeDesktop);

    const homeMobile = document.createElement('a');
    homeMobile.href = '/persev/';
    homeMobile.textContent = 'Home';
    homeMobile.className = 'block py-2 text-lg hover:text-blue-200';
    mobileMenu.appendChild(homeMobile);

    (navbar.links || []).forEach(link => {
      // Desktop Nav
      const desktopLink = document.createElement('a');
      desktopLink.href = link.linkto;
      desktopLink.textContent = link.name;
      desktopLink.className =
          'hover:text-blue-200';  // Existing class from main page
      desktopNav.appendChild(desktopLink);

      // Mobile Nav
      const mobileLink = document.createElement('a');
      mobileLink.href = link.linkto;
      mobileLink.textContent = link.name;
      mobileLink.className =
          'block py-2 text-lg hover:text-blue-200';  // Existing class from main
                                                     // page
      mobileMenu.appendChild(mobileLink);
    });

    // Populate Navbar Title
    document.getElementById('nav-title').textContent =
        navbar.title || 'Perseverantia';

    // Events Grid Population with enhanced card structure
    const grid = document.getElementById('eventsGrid');
    grid.innerHTML = '';  // Clear existing content before populating
    events.forEach((event, index) => {
      const card = document.createElement('div');
      // Use event-card class to match organizing-committee.html style
      card.className = 'event-card w-full p-6 fade-in-up cursor-pointer';
      card.style.animationDelay = `${(index * 0.1) + 0.1}s`;
      card.innerHTML = `
            <img src="${event.logo}" alt="${
          event
              .name} Logo" class="w-28 h-36 object-contain mx-auto mb-4 transition-all duration-400" />
            <h2 class="text-xl event-name text-center">${event.name}</h2>
            <p class="text-sm italic text-gray-300 text-center mt-1">${
          event.shortDesc}</p>
          `;
      card.onclick = () => openModal(event);
      grid.appendChild(card);
    });

    // Once config is loaded and elements are populated, fade out loading screen
    // after 2 seconds.
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(
          () => loadingScreen.remove(), 600);  // Remove after CSS transition

      // Initialize enhanced animations after loading screen is removed
      initializeEnhancedAnimations();
    }, 1000);  // Show loading screen for 2 seconds (2000ms)

  } catch (err) {
    console.error('Failed to load /config.json or populate content:', err);

    // Fallback: Set basic navigation if config fails
    const desktopNav = document.getElementById('desktop-nav');
    const mobileMenu = document.getElementById('mobile-menu');

    // Clear and set fallback navigation
    desktopNav.innerHTML = '';
    mobileMenu.innerHTML = '';

    // Add Home link
    const homeDesktop = document.createElement('a');
    homeDesktop.href = '/persev/';
    homeDesktop.textContent = 'Home';
    homeDesktop.className = 'hover:text-blue-200';
    desktopNav.appendChild(homeDesktop);

    const homeMobile = document.createElement('a');
    homeMobile.href = '/persev/';
    homeMobile.textContent = 'Home';
    homeMobile.className = 'block py-2 text-lg hover:text-blue-200';
    mobileMenu.appendChild(homeMobile);

    // Add other essential links
    const eventsDesktop = document.createElement('a');
    eventsDesktop.href = '/persev/events.html';
    eventsDesktop.textContent = 'Events';
    eventsDesktop.className = 'hover:text-blue-200';
    desktopNav.appendChild(eventsDesktop);

    const eventsMobile = document.createElement('a');
    eventsMobile.href = '/persev/events.html';
    eventsMobile.textContent = 'Events';
    eventsMobile.className = 'block py-2 text-lg hover:text-blue-200';
    mobileMenu.appendChild(eventsMobile);

    const ocDesktop = document.createElement('a');
    ocDesktop.href = '/persev/organizing-committee.html';
    ocDesktop.textContent = 'Organizing Committee';
    ocDesktop.className = 'hover:text-blue-200';
    desktopNav.appendChild(ocDesktop);

    const ocMobile = document.createElement('a');
    ocMobile.href = '/persev/organizing-committee.html';
    ocMobile.textContent = 'Organizing Committee';
    ocMobile.className = 'block py-2 text-lg hover:text-blue-200';
    mobileMenu.appendChild(ocMobile);

    // If config fails, still hide the loading screen after a shorter delay
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => loadingScreen.remove(), 600);
    }, 1000);  // Shorter delay if there's an error
  }
}

// Run the initialization function when the DOM is ready
document.addEventListener('DOMContentLoaded', initializePage);

// --- Mobile Menu Toggle Script (Fixed to work with original structure) ---
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    let menuOpen = false;
    toggleBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      console.log('Menu toggle clicked, menuOpen:', menuOpen);  // Debug log
      if (menuOpen) {
        mobileMenu.classList.remove('hidden');
        void mobileMenu.offsetWidth;
        mobileMenu.classList.remove(
            'opacity-0', 'scale-y-90', '-translate-y-4');
        mobileMenu.classList.add('opacity-100', 'scale-y-100', 'translate-y-0');
      } else {
        mobileMenu.classList.remove(
            'opacity-100', 'scale-y-100', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', 'scale-y-90', '-translate-y-4');
        setTimeout(() => {
          if (!menuOpen) {
            mobileMenu.classList.add('hidden');
          }
        }, 500);
      }
    });
  } else {
    console.error('Menu toggle elements not found:', {toggleBtn, mobileMenu});
  }
});

// Initialize mobile menu after DOM is loaded
document.addEventListener(
    'DOMContentLoaded',
    () => {
        // Mobile menu is already set up above, no additional initialization
        // needed
    });
// --- Modal Logic (Kept as is, functional) ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const ropLinkBtn = document.getElementById('ropLinkBtn');
const modalImage = document.getElementById('modalImage');
const eventHeadName = document.getElementById('eventHeadName');
const closeModal = document.getElementById('closeModal');
function isObject(variable) {
  return typeof variable === 'object' && variable !== null &&
      !Array.isArray(variable);
}

function openModal(event) {
  if (!isObject(event)) {
    console.log(event)
    // event = JSON.parse(event)
  }
  modalTitle.textContent = event.name;
  modalDesc.textContent = event.longDesc || '';

  if (event.eventHeadPhoto) {
    modalImage.src = event.eventHeadPhoto;
    modalImage.classList.remove('hidden');
  } else {
    modalImage.classList.add('hidden');
  }

  eventHeadName.textContent = event.eventHeadName || '';

  if (event.ropLink && event.ropLink.trim() !== '') {
    ropLinkBtn.href = event.ropLink;
    ropLinkBtn.classList.remove('hidden');
  } else {
    ropLinkBtn.classList.add('hidden');
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

closeModal.onclick = () => {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
};

modal.addEventListener('click', e => {
  if (e.target === modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// --- Enhanced Animations and Interactions (matching organizing-committee.html)
// ---
function initializeEnhancedAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {threshold: 0.1, rootMargin: '0px 0px -50px 0px'};

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
  });

  // Add click ripple effect to event cards
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('div');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(190, 142, 48, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
          `;

      this.appendChild(ripple);

      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation keyframes if not already present
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
    document.head.appendChild(style);
  }

  // Parallax effect for background decorations
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-decoration');
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

// --- Link Interception for Loading Screen (Optional but good for consistency)
// ---
document.body.addEventListener('click', function(e) {
  let targetLink = e.target.closest('a[href]');

  if (targetLink && targetLink.href) {
    const isInternal = targetLink.origin === window.location.origin;
    const isFile = targetLink.href.includes('/persev/assets/');
    const isMailto = targetLink.protocol === 'mailto:';
    const isAnchor =
        targetLink.hash && targetLink.pathname === window.location.pathname;

    if (isInternal && !isFile && !isMailto && !isAnchor) {
      e.preventDefault();

      let currentLoadingScreen = document.getElementById('loading-screen');

      // If loading screen doesn't exist, create it
      if (!currentLoadingScreen) {
        currentLoadingScreen = document.createElement('div');
        currentLoadingScreen.id = 'loading-screen';
        currentLoadingScreen.style.cssText = `
              position: fixed;
              inset: 0;
              background: radial-gradient(circle at center, #1a2949 0%, #0a0f2c 100%);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 1;
              pointer-events: auto;
              transition: opacity 0.6s ease;
            `;

        currentLoadingScreen.innerHTML = `
              <video autoplay muted loop playsinline style="width: 150px; height: 150px; object-fit: contain; filter: drop-shadow(0 0 20px rgba(190, 142, 48, 0.7)); border-radius: 12px; animation: pulse 2s ease-in-out infinite;">
                <source src="/persev/assets/load.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            `;

        document.body.appendChild(currentLoadingScreen);
      } else {
        // If it exists, show it
        currentLoadingScreen.classList.remove('fade-out');
        currentLoadingScreen.style.opacity = '1';
        currentLoadingScreen.style.pointerEvents = 'auto';
        currentLoadingScreen.style.display = 'flex';
      }

      setTimeout(() => {
        window.location.href = targetLink.href;
      }, 1000);
    }
  }
});