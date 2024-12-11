document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // Toggle menu with animation
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navLinks.style.display = isMenuOpen ? 'flex' : 'none';
        
        // Add animation
        if (isMenuOpen) {
            setTimeout(() => {
                navLinks.classList.add('active');
            }, 10);
        } else {
            navLinks.classList.remove('active');
        }
        
        // Update aria attributes for accessibility
        menuToggle.setAttribute('aria-expanded', isMenuOpen);
    }

    // Handle menu toggle click
    menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isMenuOpen) {
                toggleMenu();
            }
        }, 250);
    });

    // Prevent scroll when menu is open
    function toggleScroll() {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Initialize
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
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
});
