const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

// Mobile navigation toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Particle system - disabled for professional look
// Remove particle creation code

// Package selection
let selectedPackage = '';
let selectedAddons = [];

function selectPackage(packageType) {
    selectedPackage = packageType;
    const packageSelect = document.getElementById('packageSelect');
    
    switch(packageType) {
        case 'basic':
            packageSelect.value = 'Basic - Starter Presence';
            break;
        case 'growth':
            packageSelect.value = 'Growth - Engage & Convert';
            break;
        case 'elite':
            packageSelect.value = 'Elite - Enterprise Experience';
            break;
    }
    
    scrollToSection('contact');
    showNotification(`${packageType.toUpperCase()} package selected! Fill out the form below to get started.`);
}

function addAddon(addonType) {
    if (!selectedAddons.includes(addonType)) {
        selectedAddons.push(addonType);
        showNotification(`${getAddonName(addonType)} added to your package!`);
    } else {
        showNotification(`${getAddonName(addonType)} is already in your package.`);
    }
}

function getAddonName(addonType) {
    switch(addonType) {
        case 'maintenance': return 'Annual Maintenance';
        case 'design': return 'Design Refresh';
        case 'ai-content': return 'AI Content Studio';
        default: return 'Add-on';
    }
}

// Contact functions
function bookCall() {
    window.open('https://calendly.com/hextech-discovery', '_blank');
}

function callPhone() {
    window.open('tel:+971501234567');
}

function sendEmail() {
    let subject = 'HexTech Web Design Inquiry';
    let body = 'Hi HexTech team,\n\nI\'m interested in your web design services.';
    
    if (selectedPackage) {
        body += `\n\nPackage Interest: ${selectedPackage.toUpperCase()}`;
    }
    
    if (selectedAddons.length > 0) {
        body += `\nAdd-ons: ${selectedAddons.map(getAddonName).join(', ')}`;
    }
    
    body += '\n\nPlease contact me to discuss my project.\n\nBest regards';
    
    window.open(`mailto:hello@hextech.ae?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would normally send the form data to your server
    showNotification('Thank you! We\'ll get back to you within 24 hours.', 'success');
    
    // Reset form
    this.reset();
    selectedPackage = '';
    selectedAddons = [];
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
        color: var(--background);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.package-card, .tech-feature, .contact-card, .addon-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Enhanced hover effects
document.querySelectorAll('.package-card, .contact-card, .tech-feature').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});