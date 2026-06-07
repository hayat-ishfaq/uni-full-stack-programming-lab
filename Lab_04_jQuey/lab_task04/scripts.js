// Get all tab buttons and content sections
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Track previous tab for animation direction
let previousTabIndex = 0;

// Function to switch tabs
function switchTab(targetTab, buttonIndex) {
    // Get the target tab content
    const targetContent = document.getElementById(targetTab);
    
    if (!targetContent) return;
    
    // Add loading effect to button
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    activeButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        activeButton.style.transform = '';
    }, 150);
    
    // Determine animation direction
    const animationDirection = buttonIndex > previousTabIndex ? 'slideInRight' : 'slideInLeft';
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
    
    // Remove active class from all content sections
    tabContents.forEach(content => {
        content.classList.remove('active');
        // Remove any previous animation classes
        content.style.animation = 'none';
    });
    
    // Add active class to clicked button with haptic feedback simulation
    activeButton.classList.add('active');
    
    // Small delay to reset animation
    setTimeout(() => {
        // Add active class to target content
        targetContent.classList.add('active');
        
        // Apply animation based on direction
        targetContent.style.animation = `${animationDirection} 0.5s ease`;
        
        // Smooth scroll to the content
        smoothScrollToContent(targetContent);
    }, 50);
    
    // Update previous tab index
    previousTabIndex = buttonIndex;
    
    // Animate content children
    animateContentChildren(targetContent);
    
    // Add ripple effect to button
    createRippleEffect(activeButton);
}

// Create ripple effect on tab click
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.animation = 'rippleEffect 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '1';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Function to smooth scroll to content
function smoothScrollToContent(element) {
    // Calculate offset (accounting for sticky nav)
    const navHeight = document.querySelector('.tab-navigation').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - navHeight - 20;
    
    // Smooth scroll
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// Function to animate content children (cards, sections, etc.)
function animateContentChildren(content) {
    // Get all animatable elements
    const cards = content.querySelectorAll('.feature-card, .instructor-card, .review-card, .curriculum-section, .schedule-card');
    
    // Remove existing animations
    cards.forEach(card => {
        card.style.animation = 'none';
    });
    
    // Trigger reflow
    void content.offsetWidth;
    
    // Apply staggered animations
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'scaleIn 0.4s ease forwards';
        }, index * 100); // 100ms delay between each card
    });
}

// Add click event listeners to all tab buttons
tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchTab(targetTab, index);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    const currentActiveButton = document.querySelector('.tab-btn.active');
    const currentIndex = Array.from(tabButtons).indexOf(currentActiveButton);
    
    if (event.key === 'ArrowRight') {
        // Move to next tab
        const nextIndex = (currentIndex + 1) % tabButtons.length;
        const nextButton = tabButtons[nextIndex];
        const nextTab = nextButton.getAttribute('data-tab');
        switchTab(nextTab, nextIndex);
    } else if (event.key === 'ArrowLeft') {
        // Move to previous tab
        const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        const prevButton = tabButtons[prevIndex];
        const prevTab = prevButton.getAttribute('data-tab');
        switchTab(prevTab, prevIndex);
    }
});

// Optional: Auto-scroll to content when page loads
window.addEventListener('load', () => {
    // Animate initial content
    const activeContent = document.querySelector('.tab-content.active');
    if (activeContent) {
        animateContentChildren(activeContent);
    }
});

// Optional: Hash-based navigation (URL with #tab-name)
function handleHashChange() {
    const hash = window.location.hash.substring(1); // Remove #
    if (hash) {
        const button = document.querySelector(`[data-tab="${hash}"]`);
        if (button) {
            const buttonIndex = Array.from(tabButtons).indexOf(button);
            switchTab(hash, buttonIndex);
        }
    }
}

// Listen for hash changes
window.addEventListener('hashchange', handleHashChange);

// Check hash on load
handleHashChange();

// Add intersection observer for scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all tab content sections
tabContents.forEach(content => {
    observer.observe(content);
});

// Add hover effect sound/visual feedback (optional enhancement)
tabButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        // Add subtle scale effect on hover
        button.style.transition = 'all 0.3s ease';
    });
});

// Track active tab in session storage (persist on page reload)
function saveActiveTab(tabName) {
    sessionStorage.setItem('activeTab', tabName);
}

function loadActiveTab() {
    const savedTab = sessionStorage.getItem('activeTab');
    if (savedTab) {
        const button = document.querySelector(`[data-tab="${savedTab}"]`);
        if (button) {
            const buttonIndex = Array.from(tabButtons).indexOf(button);
            // Don't animate on initial load
            setTimeout(() => {
                switchTab(savedTab, buttonIndex);
            }, 100);
        }
    }
}

// Save active tab on switch
tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        saveActiveTab(targetTab);
    });
});

// Load saved tab on page load (optional - comment out if not needed)
// loadActiveTab();

// Add touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    const swipeThreshold = 50;
    const currentActiveButton = document.querySelector('.tab-btn.active');
    const currentIndex = Array.from(tabButtons).indexOf(currentActiveButton);
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left - next tab
        const nextIndex = (currentIndex + 1) % tabButtons.length;
        const nextButton = tabButtons[nextIndex];
        const nextTab = nextButton.getAttribute('data-tab');
        switchTab(nextTab, nextIndex);
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right - previous tab
        const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        const prevButton = tabButtons[prevIndex];
        const prevTab = prevButton.getAttribute('data-tab');
        switchTab(prevTab, prevIndex);
    }
}

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Add progress indicator for long content
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar element and update it here
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

console.log('Tabbed Content Initialized: ' + tabButtons.length + ' tabs loaded');
