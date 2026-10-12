const projects = document.querySelector('.projects');


// SCROLL HORIZONTAL À LA SOURIS
if (window.matchMedia('(min-width: 769px)').matches) {

    projects.addEventListener('wheel', (event) => {

        if (event.deltaY !== 0) {
            event.preventDefault();
            projects.scrollLeft += event.deltaY;
        }

    }, { passive: false });

}


// LIGHTBOX

const images = document.querySelectorAll('.project-image');

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');

const previousButton = document.querySelector('#lightbox-prev');
const nextButton = document.querySelector('#lightbox-next');

const counter = document.querySelector('#lightbox-counter');

let currentImages = [];
let currentIndex = 0;


// OUVRIR LA LIGHTBOX

images.forEach(image => {

    image.addEventListener('click', () => {

        // Récupère les images associées au projet
        currentImages = image.dataset.images
            .split(',')
            .map(src => src.trim());

        // Commence par la première image
        currentIndex = 0;

        updateLightbox();

        lightbox.classList.add('active');

    });

});


// METTRE À JOUR L'IMAGE

function updateLightbox() {

    lightboxImage.src = currentImages[currentIndex];

    lightboxImage.alt = '';

    counter.textContent =
        `${currentIndex + 1} / ${currentImages.length}`;

}


// IMAGE PRÉCÉDENTE

previousButton.addEventListener('click', (event) => {

    event.stopPropagation();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    updateLightbox();

});


// IMAGE SUIVANTE

nextButton.addEventListener('click', (event) => {

    event.stopPropagation();

    currentIndex++;

    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    updateLightbox();

});


// FERMER EN CLIQUANT SUR LE FOND

lightbox.addEventListener('click', (event) => {

    // Clic sur l'image ou son conteneur : fermer
    if (event.target.closest('.lightbox-content')) {
        lightbox.classList.remove('active');
        return;
    }

    // Clic à gauche : image précédente
    if (event.clientX < window.innerWidth / 2) {
        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }
    }

    // Clic à droite : image suivante
    else {
        currentIndex++;

        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }
    }

    updateLightbox();
});


// TOUCHES DU CLAVIER

document.addEventListener('keydown', (event) => {

    if (!lightbox.classList.contains('active')) {
        return;
    }

    // Échap
    if (event.key === 'Escape') {
        lightbox.classList.remove('active');
    }

    // Flèche gauche
    if (event.key === 'ArrowLeft') {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = currentImages.length - 1;
        }

        updateLightbox();
    }

    // Flèche droite
    if (event.key === 'ArrowRight') {

        currentIndex++;

        if (currentIndex >= currentImages.length) {
            currentIndex = 0;
        }

        updateLightbox();
    }

});

// CURSEUR TYPOGRAPHIQUE

const customCursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (event) => {
    if (!customCursor) return;

    // Position du curseur
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;

    // Élément situé sous la souris
    const target = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    // Valeur par défaut
    let cursorText = '*';

    if (lightbox.classList.contains('active')) {

        // Sur l'image : fermer
        if (target.closest('.lightbox-content')) {
            cursorText = 'Exit';
        }

        // Sur la moitié gauche : image précédente
        else if (event.clientX < window.innerWidth / 2) {
            cursorText = 'Left';
        }

        // Sur la moitié droite : image suivante
        else {
            cursorText = 'Right';
        }

    } else if (target.closest('.project-image')) {

        // Sur une image de projet
        cursorText = 'View';
    }

    customCursor.textContent = cursorText;
});