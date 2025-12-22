// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Gallery Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Add animation class when showing items
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    // Hide items with fade out effect
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed navbar
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes when elements come into view
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Initialize gallery items with opacity for smooth filtering
document.addEventListener('DOMContentLoaded', function() {
    // Set initial opacity for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '1';
        item.style.transition = 'opacity 0.3s ease';
    });

    // Add animation delay to gallery items for staggered effect
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Simulate loading progress and hide loading overlay
    simulateLoadingProgress();
    
    // Initialize fullscreen image viewer
    initFullscreenViewer();
});

// Function to simulate loading progress and hide the overlay
function simulateLoadingProgress() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingProgress = document.querySelector('.loading-progress');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15; // Random increment to simulate loading
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Set the final width and hide the overlay after a short delay
            loadingProgress.style.width = '100%';

            setTimeout(() => {
                loadingOverlay.classList.add('hidden');

                // Allow page scrolling after loading is complete
                document.body.style.overflow = 'auto';
            }, 300);
        }
        loadingProgress.style.width = progress + '%';
    }, 100);
}

// Alternative method to hide loading after all content is loaded
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingProgress = document.querySelector('.loading-progress');

    // Ensure progress bar is complete
    loadingProgress.style.width = '100%';

    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 500);
});

// Fullscreen Image Viewer
function initFullscreenViewer() {
    const fullscreenViewer = document.getElementById('fullscreenViewer');
    const fullscreenOverlay = document.getElementById('fullscreenOverlay');
    const fullscreenClose = document.getElementById('fullscreenClose');
    const fullscreenPrev = document.getElementById('fullscreenPrev');
    const fullscreenNext = document.getElementById('fullscreenNext');
    const fullscreenImage = document.getElementById('fullscreenImage');
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-img img');
    const galleryImageArray = Array.from(galleryImages);
    let currentImageIndex = 0;
    
    // Open fullscreen viewer with clicked image
    galleryImages.forEach((img, index) => {
        img.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Set current image index
            currentImageIndex = index;
            
            // Set image source
            fullscreenImage.src = img.src;
            fullscreenImage.alt = img.alt;
            
            // Show fullscreen viewer
            fullscreenViewer.classList.add('active');
            
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close fullscreen viewer
    function closeFullscreen() {
        fullscreenViewer.classList.remove('active');
        // Allow scrolling again
        document.body.style.overflow = 'auto';
    }
    
    // Close on button click
    fullscreenClose.addEventListener('click', closeFullscreen);
    
    // Close on overlay click
    fullscreenOverlay.addEventListener('click', closeFullscreen);
    
    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImageArray.length) % galleryImageArray.length;
        updateFullscreenImage();
    }
    
    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImageArray.length;
        updateFullscreenImage();
    }
    
    // Update fullscreen image
    function updateFullscreenImage() {
        const img = galleryImageArray[currentImageIndex];
        fullscreenImage.src = img.src;
        fullscreenImage.alt = img.alt;
        
        // Re-trigger animation
        fullscreenImage.style.animation = 'none';
        setTimeout(() => {
            fullscreenImage.style.animation = 'scaleIn 0.3s ease forwards';
        }, 10);
    }
    
    // Navigate with buttons
    fullscreenPrev.addEventListener('click', showPrevImage);
    fullscreenNext.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (fullscreenViewer.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeFullscreen();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // Touch swipe navigation for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    fullscreenViewer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    fullscreenViewer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - previous image
                showPrevImage();
            } else {
                // Swipe left - next image
                showNextImage();
            }
        }
    }
}