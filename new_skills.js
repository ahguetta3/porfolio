// Skills Animation
const skillsSection = document.querySelector('.skills');
const skillBars = document.querySelectorAll('.skill-per');

// Animate skill bars when they come into view
const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add('animate');
            skillBars.forEach(skill => {
                const percentage = skill.classList[1];
                skill.style.setProperty('--progress', getComputedStyle(document.documentElement).getPropertyValue(`--${percentage}-progress`));
            });
            observer.unobserve(entry.target);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillsObserver.observe(skillsSection);

// Add hover effect to skill boxes
document.querySelectorAll('.skill-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.querySelector('.tooltip').style.opacity = '1';
        box.querySelector('.tooltip').style.transform = 'translateY(0)';
    });

    box.addEventListener('mouseleave', () => {
        box.querySelector('.tooltip').style.opacity = '0';
        box.querySelector('.tooltip').style.transform = 'translateY(5px)';
    });
});