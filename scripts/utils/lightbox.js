export const displayLightbox = medias => {

    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    const btnClose = document.querySelector('.btn_close_lightbox');
    const btnPrevious = document.querySelector('.btn_previous');
    const btnNext = document.querySelector('.btn_next');
    const lightboxMedia = document.querySelector('.lightbox_media');
    const mediaProvider = Array.from(document.querySelectorAll('.gallery_card a'));

    const photographer = medias.photographer;
    const mediasList = medias.medias;
    let currentIndex = 0;
    const lightbox = document.querySelector('.lightbox');

    mediaProvider.forEach(media => {
        media.addEventListener('click', () => {
            const mediaId = media.dataset.media;
            const mediaIndex = mediasList.findIndex(media => media.id == mediaId);
            currentIndex = mediaIndex;
            lightboxWrapper.style.display = 'flex';
            btnClose.focus();
            lightboxTemplate();
        });
    });

const lightboxTemplate = () => {
    const currentMedia = mediasList[currentIndex];

    // Create the image or video element based on the media type
    const mediaElement = currentMedia.image
        ? createImageElement(currentMedia)
        : createVideoElement(currentMedia);

    // Clear existing content in lightboxMedia
    lightboxMedia.innerHTML = '';

    // Append the mediaElement and figcaption to lightboxMedia
    lightboxMedia.appendChild(mediaElement);
    lightboxMedia.appendChild(createFigcaptionElement(currentMedia.title));
};

// Function to create an image element
const createImageElement = (media) => {
    const imageElement = document.createElement('img');
    imageElement.src = `./assets/photographers/portofolio/${photographer.name}/${media.image}`;
    imageElement.alt = media.alt;
    return imageElement;
};

// Function to create a video element
const createVideoElement = (media) => {
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.setAttribute('aria-label', media.alt);

    const sourceElement = document.createElement('source');
    sourceElement.src = `./assets/photographers/portofolio/${photographer.name}/${media.video}`;
    sourceElement.type = 'video/mp4';

    videoElement.appendChild(sourceElement);
    return videoElement;
};

// Function to create a figcaption element
const createFigcaptionElement = (title) => {
    const figcaptionElement = document.createElement('figcaption');
    figcaptionElement.textContent = title;
    return figcaptionElement;
};


    /////////////

    const closeLightbox = () => {
        lightboxWrapper.style.display = 'none';
        lightboxMedia.innerHTML = '';
    };

    const nextMedia = () => {
        currentIndex++;
        if (currentIndex > mediasList.length - 1) currentIndex = 0;
        lightboxTemplate();
        showActiveBtn(btnNext);
    };

    const previousMedia = () => {
        currentIndex--;
        if (currentIndex < 0) currentIndex = mediasList.length - 1;
        lightboxTemplate();
        showActiveBtn(btnPrevious);
    };

    const showActiveBtn = btn => {
        btn.classList.add('active');
        setTimeout(() => btn.classList.remove('active'), 100);
    };

    document.addEventListener('keyup', e => {
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousMedia();
                break;
            case 'ArrowRight':
                nextMedia();
                break;
        }
    });

    btnPrevious.addEventListener('click', () => previousMedia());
    btnNext.addEventListener('click', () => nextMedia());
    btnClose.addEventListener('click', () => closeLightbox());
};