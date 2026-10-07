const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    navLinks.classList.remove('is-open');
}

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');

document.querySelectorAll('[data-lightbox]').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const image = trigger.querySelector('img');
        if (!image || !trigger.dataset.lightbox || !image.naturalWidth) return;
        lightboxImage.src = trigger.dataset.lightbox;
        lightboxImage.alt = trigger.dataset.alt || image.alt;
        lightboxCaption.textContent = lightboxImage.alt;
        lightbox.showModal();
    });
});

document.querySelectorAll('.cad-image-frame, .bicycle-project-image').forEach(frame => {
    const image = frame.querySelector('img');
    const placeholder = frame.querySelector('.cad-image-placeholder');
    if (!image || !placeholder) return;

    const showPlaceholder = () => {
        frame.classList.add('is-placeholder');
        placeholder.hidden = false;
        frame.removeAttribute('data-lightbox');
    };

    image.addEventListener('error', showPlaceholder, { once: true });
    if (image.complete && image.naturalWidth === 0) showPlaceholder();
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
});