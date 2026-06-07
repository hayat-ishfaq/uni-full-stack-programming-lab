// Gallery data with images and captions
const galleryData = [
    {
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        caption: 'Mountain Landscape',
        description: 'Breathtaking view of snow-capped mountains under a clear blue sky.'
    },
    {
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
        caption: 'Tropical Beach',
        description: 'Crystal clear waters and white sandy beaches create a paradise atmosphere.'
    },
    {
        image: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop',
        caption: 'Misty Forest',
        description: 'Dense forest covered in morning mist, creating a mystical atmosphere.'
    },
    {
        image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&h=600&fit=crop',
        caption: 'Desert Sunset',
        description: 'Golden sand dunes glowing in the warm light of the setting sun.'
    },
    {
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
        caption: 'Autumn Lake',
        description: 'Serene lake surrounded by trees displaying vibrant autumn colors.'
    }
];

// Get DOM elements
const galleryImage = document.getElementById('galleryImage');
const imageCaption = document.getElementById('imageCaption');
const imageDescription = document.getElementById('imageDescription');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentImageEl = document.getElementById('currentImage');
const totalImagesEl = document.getElementById('totalImages');
const thumbnailContainer = document.getElementById('thumbnailContainer');

// Current image index
let currentIndex = 0;
let isAnimating = false;

// Initialize gallery
function initGallery() {
    // Set total images count
    totalImagesEl.textContent = galleryData.length;
    
    // Create thumbnails
    createThumbnails();
    
    // Display first image
    displayImage(0, false);
}

// Create thumbnail images
function createThumbnails() {
    galleryData.forEach((item, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        if (index === 0) thumbnail.classList.add('active');
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.caption;
        
        thumbnail.appendChild(img);
        thumbnail.addEventListener('click', () => {
            if (index !== currentIndex) {
                displayImage(index, true);
            }
        });
        
        thumbnailContainer.appendChild(thumbnail);
    });
}

// Display image with fade animation
function displayImage(index, animate = true) {
    if (isAnimating) return;
    
    const imageData = galleryData[index];
    
    if (animate) {
        isAnimating = true;
        
        // Fade out current image and caption (chaining effect)
        galleryImage.classList.add('fade-out');
        imageCaption.classList.add('caption-fade-out');
        imageDescription.classList.add('caption-fade-out');
        
        // Wait for fade out, then change content and fade in
        setTimeout(() => {
            // Update image source
            galleryImage.src = imageData.image;
            
            // Update caption and description
            imageCaption.textContent = imageData.caption;
            imageDescription.textContent = imageData.description;
            
            // Update counter
            currentImageEl.textContent = index + 1;
            
            // Remove fade-out and add fade-in
            galleryImage.classList.remove('fade-out');
            galleryImage.classList.add('fade-in');
            imageCaption.classList.remove('caption-fade-out');
            imageCaption.classList.add('caption-fade-in');
            imageDescription.classList.remove('caption-fade-out');
            imageDescription.classList.add('caption-fade-in');
            
            // Update active thumbnail
            updateActiveThumbnail(index);
            
            // Animation complete
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 500);
    } else {
        // Initial load without animation
        galleryImage.src = imageData.image;
        imageCaption.textContent = imageData.caption;
        imageDescription.textContent = imageData.description;
        currentImageEl.textContent = index + 1;
        galleryImage.classList.add('fade-in');
        imageCaption.classList.add('caption-fade-in');
        imageDescription.classList.add('caption-fade-in');
    }
    
    // Update current index
    currentIndex = index;
    
    // Update button states
    updateButtonStates();
}

// Update active thumbnail
function updateActiveThumbnail(index) {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
        if (i === index) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Update button states (disable at boundaries)
function updateButtonStates() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === galleryData.length - 1;
}

// Navigate to previous image
function previousImage() {
    if (currentIndex > 0 && !isAnimating) {
        displayImage(currentIndex - 1, true);
    }
}

// Navigate to next image
function nextImage() {
    if (currentIndex < galleryData.length - 1 && !isAnimating) {
        displayImage(currentIndex + 1, true);
    }
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', previousImage);
nextBtn.addEventListener('click', nextImage);

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        previousImage();
    } else if (event.key === 'ArrowRight') {
        nextImage();
    }
});

// Swipe support for touch devices
let touchStartX = 0;
let touchEndX = 0;

galleryImage.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

galleryImage.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left - next image
        nextImage();
    }
    if (touchEndX > touchStartX + 50) {
        // Swipe right - previous image
        previousImage();
    }
}

// Initialize gallery on page load
initGallery();
