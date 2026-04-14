const TOTAL_SHOTS = 15;
const BATCH_SIZE = 12;

const galleryGrid = document.getElementById('gallery-grid');
const shotCount = document.getElementById('shot-count');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeButton = document.getElementById('lightbox-close');
const prevButton = document.getElementById('lightbox-prev');
const nextButton = document.getElementById('lightbox-next');

const images = Array.from({ length: TOTAL_SHOTS }, (_, index) => {
  const id = index + 1;
  return {
    id,
    avif: `./${id}.avif`,
  };
});

let activeIndex = 0;
let renderedCount = 0;

function buildCard(image, index) {
  const card = document.createElement('figure');
  card.className = 'gallery-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open shot ${image.id}`);

  const img = document.createElement('img');
  img.src = image.avif;
  img.alt = `Photography shot ${image.id}`;
  img.loading = 'lazy';
  img.decoding = 'async';

  const caption = document.createElement('figcaption');
  caption.textContent = `Shot // ${String(image.id).padStart(2, '0')}`;

  const open = () => openLightbox(index);
  card.addEventListener('click', open);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });

  card.append(img, caption);
  return card;
}

function renderGallery() {
  if (!galleryGrid) return;

  const renderNextBatch = () => {
    const fragment = document.createDocumentFragment();
    const limit = Math.min(renderedCount + BATCH_SIZE, images.length);

    for (let index = renderedCount; index < limit; index += 1) {
      fragment.appendChild(buildCard(images[index], index));
    }

    galleryGrid.appendChild(fragment);
    renderedCount = limit;

    if (renderedCount < images.length) {
      window.requestAnimationFrame(renderNextBatch);
    }
  };

  renderNextBatch();

  if (shotCount) {
    shotCount.textContent = String(images.length);
  }
}

function setLightboxImage(index) {
  if (!lightboxImage || !lightboxCaption) return;

  activeIndex = (index + images.length) % images.length;
  const image = images[activeIndex];

  lightboxImage.src = image.avif;
  lightboxImage.alt = `Photography shot ${image.id}`;
  lightboxCaption.textContent = `Shot // ${String(image.id).padStart(2, '0')}`;
}

function openLightbox(index) {
  if (!lightbox) return;

  setLightboxImage(index);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrev() {
  setLightboxImage(activeIndex - 1);
}

function showNext() {
  setLightboxImage(activeIndex + 1);
}

closeButton?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', showPrev);
nextButton?.addEventListener('click', showNext);

lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (!lightbox?.classList.contains('open')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  }

  if (event.key === 'ArrowLeft') {
    showPrev();
  }

  if (event.key === 'ArrowRight') {
    showNext();
  }
});

renderGallery();
