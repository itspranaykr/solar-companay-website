// Mobile Menu Toggle with Dropdown Animation
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav');
    const icon = this.querySelector('i');
    
    // Toggle menu visibility with animation
    if (nav.style.maxHeight) {
        nav.style.maxHeight = null;
        nav.style.opacity = '0';
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        nav.style.maxHeight = nav.scrollHeight + 'px';
        nav.style.opacity = '1';
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        const nav = document.querySelector('nav');
        const icon = document.querySelector('.mobile-menu i');
        
        if (window.innerWidth <= 768) { // Only for mobile view
            nav.style.maxHeight = null;
            nav.style.opacity = '0';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature, .promise');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}
// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Update icon based on initial theme
function updateThemeIcon() {
    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    
    if (body.classList.contains('dark-mode')) {
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'rotate(-90deg)';
        sunIcon.style.opacity = '1';
        sunIcon.style.transform = 'rotate(0)';
    } else {
        moonIcon.style.opacity = '1';
        moonIcon.style.transform = 'rotate(0)';
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'rotate(90deg)';
    }
}

// Initialize theme icon
updateThemeIcon();

// Watch for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        updateThemeIcon();
    }
});

// Set initial state for animated elements
document.querySelectorAll('.feature, .promise').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Initialize mobile menu styles
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    nav.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
    nav.style.overflow = 'hidden';
    nav.style.maxHeight = '0';
    nav.style.opacity = '0';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);