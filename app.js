// Enhanced Pharmaceutical Portfolio JavaScript

// Initialize Google Analytics tracking
function initAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initTypingAnimation();
    initSmoothScrolling();
    initSkillAnimations();
    initMobileNavigation();
    initContactForm();
    initScrollAnimations();
    initMedicalEffects();
    initParticleEffects();
    
    // Add scroll-based navbar styling
    initNavbarEffects();
    
    // Add skip to content link for accessibility
    addSkipLink();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize analytics
    initAnalytics();
    
    // Track initial page load
    trackEvent('page', 'load', 'portfolio_page');
});

// Add skip to content link for accessibility
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize Back to Top Button
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Track event
            trackEvent('button', 'click', 'back_to_top');
        });
    }
}

// Track events with Google Analytics
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const text = typingElement.getAttribute('data-text');
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingElement.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => {
                index = 0;
                typingElement.textContent = '';
                setTimeout(typeText, 500);
            }, 3000);
        }
    }
    
    // Start typing animation
    setTimeout(typeText, 1000);
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add pill particle effect on navigation
                createPillParticles(e.clientX, e.clientY);
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
                
                // Track navigation event
                trackEvent('navigation', 'click', targetId);
            }
        });
    });
}

// Skill Bar Animations with Medicine Absorption Effect
function initSkillAnimations() {
    const skillPills = document.querySelectorAll('.skill-pill');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillPill = entry.target;
                const absorptionFill = skillPill.querySelector('.absorption-fill');
                const skillLevel = skillPill.getAttribute('data-skill');
                
                // Animate skill absorption
                setTimeout(() => {
                    absorptionFill.style.width = skillLevel + '%';
                    
                    // Add floating pill animation
                    animateSkillPill(skillPill);
                }, 200);
                
                skillObserver.unobserve(skillPill);
                
                // Track skill view event
                const skillName = skillPill.querySelector('span').textContent;
                trackEvent('skill', 'view', skillName);
            }
        });
    }, observerOptions);
    
    skillPills.forEach(pill => {
        skillObserver.observe(pill);
    });
}

// Animate individual skill pills with medicine effects
function animateSkillPill(skillPill) {
    skillPill.style.transform = 'translateY(-10px)';
    skillPill.style.boxShadow = '0 10px 30px rgba(31, 184, 205, 0.3)';
    
    setTimeout(() => {
        skillPill.style.transform = 'translateY(0)';
        skillPill.style.boxShadow = '';
    }, 500);
    
    // Create medicine particles
    createMedicineParticles(skillPill);
}

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Track mobile menu toggle
            trackEvent('navigation', 'toggle', 'mobile_menu');
            
            // Animate toggle bars
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = navToggle.classList.contains('active') 
                    ? `rotate(${index === 0 ? 45 : index === 1 ? 0 : -45}deg)` 
                    : 'rotate(0deg)';
                span.style.opacity = navToggle.classList.contains('active') && index === 1 ? '0' : '1';
            });
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'rotate(0deg)';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// Contact Form with Prescription Validation
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate prescription form
            if (validatePrescriptionForm(data)) {
                // Animate submission
                animatePrescriptionSubmission();
                
                // Track form submission
                trackEvent('form', 'submit', 'contact_form');
                
                // Simulate form submission
                setTimeout(() => {
                    showSubmissionSuccess();
                    contactForm.reset();
                    clearAllErrors();
                }, 2000);
            }
        });
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

// Prescription Form Validation
function validatePrescriptionForm(data) {
    const required = ['name', 'email', 'service', 'message'];
    let isValid = true;
    
    required.forEach(field => {
        const input = document.getElementById(field);
        if (!data[field] || data[field].trim() === '') {
            showFieldError(input, `${getFieldLabel(field)} is required`);
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = document.getElementById('email');
    if (data.email && !emailRegex.test(data.email)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    return isValid;
}

// Get field label for error messages
function getFieldLabel(fieldName) {
    const labels = {
        'name': 'Patient Name',
        'email': 'Email Address',
        'service': 'Service',
        'message': 'Message'
    };
    return labels[fieldName] || fieldName;
}

// Field Validation Helper
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, `${getFieldLabel(fieldName)} is required`);
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

// Show Field Error
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.getElementById(`${field.id}-error`) || 
                     field.parentNode.querySelector('.field-error') ||
                     createErrorElement(field);
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
}

// Clear Field Error
function clearFieldError(field) {
    const errorDiv = document.getElementById(`${field.id}-error`) || 
                     field.parentNode.querySelector('.field-error');
    
    if (errorDiv) {
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';
    }
    
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');
}

// Clear all errors
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.field-error');
    errorElements.forEach(error => {
        error.style.display = 'none';
        error.textContent = '';
    });
    
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
    });
}

// Create error element if it doesn't exist
function createErrorElement(field) {
    const errorDiv = document.createElement('div');
    errorDiv.id = `${field.id}-error`;
    errorDiv.className = 'field-error';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    errorDiv.style.cssText = `
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
        display: none;
    `;
    
    field.parentNode.appendChild(errorDiv);
    return errorDiv;
}

// Animate Prescription Submission
function animatePrescriptionSubmission() {
    const submitBtn = document.querySelector('.prescription-submit');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Prescription...';
    submitBtn.style.background = 'var(--color-warning)';
    submitBtn.disabled = true;
    
    // Create medicine particles
    createSubmissionParticles(submitBtn);
}

// Show Submission Success
function showSubmissionSuccess() {
    const submitBtn = document.querySelector('.prescription-submit');
    
    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Prescription Sent Successfully!';
    submitBtn.style.background = 'var(--color-success)';
    
    // Create success particles
    createSuccessParticles(submitBtn);
    
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Consultation Request';
        submitBtn.style.background = '';
        submitBtn.disabled = false;
    }, 3000);
}

// Initialize Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.stat-card, .project-card, .service-card, .timeline-item, .gallery-item');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for multiple elements
                const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, delay);
                
                scrollObserver.unobserve(entry.target);
                
                // Track element view event
                const elementType = entry.target.className.split(' ')[0];
                trackEvent('element', 'view', elementType);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        scrollObserver.observe(element);
    });
}

// Initialize Medical Effects
function initMedicalEffects() {
    // Heartbeat effect for medical cross
    const medicalCross = document.querySelector('.medical-cross');
    if (medicalCross) {
        setInterval(() => {
            medicalCross.style.transform = 'scale(1.2)';
            setTimeout(() => {
                medicalCross.style.transform = 'scale(1)';
            }, 200);
        }, 2000);
    }
    
    // Floating icons orbital animation
    animateFloatingIcons();
    
    // Medicine bottle timeline markers
    animateTimelineMarkers();
    
    // Add hover effects to gallery items
    initGalleryHoverEffects();
}

// Initialize Gallery Hover Effects
function initGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Track gallery item hover
            const itemName = this.querySelector('h3').textContent;
            trackEvent('gallery', 'hover', itemName);
        });
    });
}

// Animate Floating Icons
function animateFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        const radius = 120;
        const centerX = 150;
        const centerY = 150;
        let angle = (index * 90) - 90; // Start from top
        
        function updatePosition() {
            const radian = (angle * Math.PI) / 180;
            const x = centerX + radius * Math.cos(radian) - 12;
            const y = centerY + radius * Math.sin(radian) - 12;
            
            icon.style.left = x + 'px';
            icon.style.top = y + 'px';
            
            angle += 0.5;
            requestAnimationFrame(updatePosition);
        }
        
        updatePosition();
    });
}

// Animate Timeline Markers
function animateTimelineMarkers() {
    const markers = document.querySelectorAll('.timeline-marker');
    
    markers.forEach((marker, index) => {
        // Add sequential appearance animation
        marker.style.animationDelay = `${index * 0.3}s`;
        
        // Add hover interaction
        marker.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotateY(180deg)';
            this.style.boxShadow = '0 0 30px rgba(31, 184, 205, 0.6)';
            
            // Track timeline marker hover
            const markerYear = this.closest('.timeline-item').querySelector('.timeline-year').textContent;
            trackEvent('timeline', 'hover', markerYear);
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotateY(0deg)';
            this.style.boxShadow = '0 0 20px rgba(31, 184, 205, 0.3)';
        });
    });
}

// Initialize Particle Effects
function initParticleEffects() {
    // Add cursor trail effect
    document.addEventListener('mousemove', function(e) {
        if (Math.random() > 0.85) { // Reduce frequency
            createCursorParticle(e.clientX, e.clientY);
        }
    });
    
    // Add click effects
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
}

// Create Medicine Particles
function createMedicineParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'medicine');
        }, i * 100);
    }
}

// Create Pill Particles for Navigation
function createPillParticles(x, y) {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createParticle(x, y, 'pill');
        }, i * 50);
    }
}

// Create Submission Particles
function createSubmissionParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'prescription');
        }, i * 100);
    }
}

// Create Success Particles
function createSuccessParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            createParticle(centerX, centerY, 'success');
        }, i * 50);
    }
}

// Create Cursor Particle
function createCursorParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    particle.innerHTML = '💊';
    
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.fontSize = '12px';
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.7';
    
    document.body.appendChild(particle);
    
    // Animate particle
    particle.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.7 },
        { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(360deg)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create Click Effect
function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    
    effect.style.position = 'fixed';
    effect.style.left = (x - 25) + 'px';
    effect.style.top = (y - 25) + 'px';
    effect.style.width = '50px';
    effect.style.height = '50px';
    effect.style.borderRadius = '50%';
    effect.style.border = '2px solid var(--color-primary)';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '9999';
    
    document.body.appendChild(effect);
    
    effect.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(2)', opacity: 0 }
    ], {
        duration: 500,
        easing: 'ease-out'
    }).onfinish = () => {
        effect.remove();
    };
}

// Generic Particle Creator
function createParticle(x, y, type) {
    const particle = document.createElement('div');
    particle.className = `particle particle-${type}`;
    
    // Set particle appearance based on type
    const particleConfig = {
        medicine: { symbol: '💊', color: '#2563eb', size: '16px' },
        pill: { symbol: '🟡', color: '#059669', size: '12px' },
        prescription: { symbol: '📋', color: '#ea580c', size: '14px' },
        success: { symbol: '✓', color: '#10b981', size: '16px' }
    };
    
    const config = particleConfig[type] || particleConfig.medicine;
    
    particle.innerHTML = config.symbol;
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = config.size;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.opacity = '0.8';
    particle.style.color = config.color;
    
    document.body.appendChild(particle);
    
    // Random animation direction
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    
    particle.animate([
        { 
            transform: 'translate(0, 0) rotate(0deg) scale(1)', 
            opacity: 0.8 
        },
        { 
            transform: `translate(${randomX}px, ${randomY}px) rotate(360deg) scale(0)`, 
            opacity: 0 
        }
    ], {
        duration: 1500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).onfinish = () => {
        particle.remove();
    };
}

// Initialize Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove scrolled class
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Add CSS for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .navbar.scrolled {
        background: rgba(var(--color-surface-rgb, 255, 255, 253), 0.98);
        box-shadow: var(--shadow-md);
    }
    
    .navbar {
        transition: all var(--duration-normal) var(--ease-standard);
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            flex-direction: column;
            padding: var(--space-16);
            border-top: 1px solid var(--color-border);
            box-shadow: var(--shadow-lg);
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .particle {
        user-select: none;
        will-change: transform, opacity;
    }
    
    .cursor-particle {
        user-select: none;
        will-change: transform, opacity;
    }
    
    .form-control.error {
        border-color: var(--color-error);
        box-shadow: 0 0 0 2px rgba(var(--color-error-rgb), 0.2);
    }
    
    .field-error {
        color: var(--color-error);
        font-size: var(--font-size-sm);
        margin-top: var(--space-4);
        display: none;
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 1000;
        transition: top 0.3s;
    }
    
    .skip-link:focus {
        top: 0;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-xl);
        box-shadow: var(--shadow-lg);
        transition: all var(--duration-normal) var(--ease-standard);
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background: var(--color-primary-hover);
        transform: translateY(-3px);
    }
`;

document.head.appendChild(dynamicStyles);

// Performance optimization for animations
if ('IntersectionObserver' in window) {
    // Use Intersection Observer for better performance
    console.log('Enhanced pharmaceutical portfolio loaded with optimized animations');
} else {
    // Fallback for older browsers
    console.log('Using fallback animations for older browsers');
}