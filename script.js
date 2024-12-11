// Typing Animation
const typingText = document.querySelector('.typing');
const words = ['Fullstack Developer', 'Web Designer', 'Mobile Developer', 'UI/UX Designer'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500); // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Pause before next word
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Start typing animation
type();

// Mobile Navigation Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Skills Animation
function animateSkills() {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(progress => {
        const width = progress.getAttribute('data-width');
        progress.style.width = width + '%';
    });
}

// Trigger skills animation when skills section is in view
const skillsSectionElement = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

observer.observe(skillsSectionElement);

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            showLoading();
            const response = await fetch('https://ahmedhaiballa.site/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            hideLoading();

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            hideLoading();
            alert('Error sending message: ' + error.message);
        }
    });
}

// Intersection Observer for Animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            animateOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

// Scroll Animations
const scrollElements = document.querySelectorAll('.scroll-animate');

const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= 
        ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const hideScrollElement = (element) => {
    element.classList.remove('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 90)) {
            displayScrollElement(el);
        } else {
            hideScrollElement(el);
        }
    });
};

// Initialize scroll animations
window.addEventListener('scroll', () => {
    handleScrollAnimation();
});

// Add animation classes to elements
document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('scroll-animate', 'fade-in-bottom');
});

document.querySelectorAll('.project-card').forEach(card => {
    card.classList.add('scroll-animate', 'fade-in-left');
});

document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.add('scroll-animate', 'fade-in-right');
});

// Skills Animation
const skillsSection = document.querySelector('.skills');
const progressBars = document.querySelectorAll('.progress');
let animated = false;

const animateSkills = () => {
    if (!animated) {
        progressBars.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });
        animated = true;
    }
};

const resetSkills = () => {
    progressBars.forEach(progress => {
        progress.style.width = '0';
    });
    animated = false;
};

// Intersection Observer for skills
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        } else {
            resetSkills();
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Add hover effect to skill items
document.querySelectorAll('.skill-item').forEach(item => {
    item.classList.add('scroll-animate', 'fade-in-left');
    
    item.addEventListener('mouseenter', () => {
        const tooltip = item.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const tooltip = item.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
        }
    });
});

// Trigger initial animation check
handleScrollAnimation();

// Image Loading Animation
document.querySelectorAll('img').forEach(img => {
    // Add loading class and blur effect
    img.classList.add('loading');
    img.style.filter = 'blur(5px)';
    
    // Create a new image object to preload
    const newImg = new Image();
    newImg.src = img.src;
    
    // When image is loaded, remove loading animation
    newImg.onload = () => {
        img.classList.remove('loading');
        img.style.filter = 'none';
        img.style.transition = 'filter 0.5s ease';
    };
});

// Smooth hover effect for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', `${x}px`);
        button.style.setProperty('--y', `${y}px`);
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Loading Indicator
const loadingIndicator = document.getElementById('loadingIndicator');

function showLoading() {
    loadingIndicator.classList.add('visible');
}

function hideLoading() {
    loadingIndicator.classList.remove('visible');
}