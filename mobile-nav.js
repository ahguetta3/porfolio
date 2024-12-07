// Mobile menu toggle with smooth animation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
let isMenuOpen = false;

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    menuToggle.style.transform = isMenuOpen ? 'rotate(90deg)' : 'rotate(0)';
    menuToggle.style.transition = 'transform 0.3s ease';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        isMenuOpen = false;
        navLinks.classList.remove('active');
        menuToggle.style.transform = 'rotate(0)';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            isMenuOpen = false;
            navLinks.classList.remove('active');
            menuToggle.style.transform = 'rotate(0)';
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links on scroll
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
