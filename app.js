// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');
const links = document.querySelectorAll('a, button');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('grow');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
    });
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll('.mobile-nav a');

function animateMenuLinks(show = true) {
    mobileMenuLinks.forEach((link, index) => {
        gsap.to(link, {
            opacity: show ? 1 : 0,
            y: show ? 0 : 20,
            duration: 0.5,
            delay: show ? 0.3 + (index * 0.1) : 0,
            ease: 'power4.out'
        });
    });
}

mobileMenuBtn.addEventListener('click', () => {
    const isOpening = !mobileMenu.classList.contains('active');
    
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    if (isOpening) {
        document.body.style.overflow = 'hidden';
        // Animate menu links when opening
        animateMenuLinks(true);
    } else {
        document.body.style.overflow = '';
        // Animate menu links when closing
        animateMenuLinks(false);
    }
});

// Close mobile menu when clicking a link
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        
        // Animate links out
        animateMenuLinks(false);
        
        // Delay the menu closing slightly
        setTimeout(() => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    });
});

// Add resize handler to fix menu state on screen size change
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        mobileMenuLinks.forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
});

// Only initialize cursor on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('grow');
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('grow');
        });
    });
}

// Loading and Welcome Screen Logic
window.addEventListener('load', () => {
    // Show loading screen for 1.5 seconds
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.welcome-screen').classList.add('active');
        document.querySelector('.welcome-text').classList.add('active');
        
        // Show welcome screen for 1.5 seconds
        setTimeout(() => {
            document.querySelector('.welcome-screen').classList.remove('active');
            document.querySelector('.main-content').classList.add('active');
        }, 1500); // Welcome screen duration
    }, 1500); // Loading screen duration
});

// Wrap your existing initialization code in a function
function initializeMainContent() {
    // Your existing initialization code here
    gsap.set(['.intro', 'h1', '.subtitle', '.cta-button', '.nav-links a', 'nav'], {
        opacity: 1
    });

    // Navbar animation
    gsap.from('nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });

    // Stagger the nav links
    gsap.from('.nav-links a', {
        y: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
    });

    // Hero section animations
    const heroTimeline = gsap.timeline({
        defaults: { duration: 1, ease: 'power4.out' }
    });

    heroTimeline
        .from('.intro', {
            y: 30,
            opacity: 0
        })
        .from('h1', {
            y: 30,
            opacity: 0
        }, '-=0.5')
        .from('.subtitle', {
            y: 30,
            opacity: 0
        }, '-=0.5')
        .from('.cta-button', {
            y: 30,
            opacity: 0
        }, '-=0.3');

    // Text animation for accent text
    animateAccentText();

    gsap.from('.about', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    });

    gsap.from('.projects', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out'
    });

    gsap.from('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
    });

    gsap.from('.skills', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power4.out'
    });

    // Animate skill bars when they come into view
    animateSkillBars();
}

// Scroll animations
gsap.utils.toArray('.reveal-text').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
    });
}); 

// Add this to your initializeMainContent() function
// Quote section animations
gsap.from('.quotes-section .section-title', {
    scrollTrigger: {
        trigger: '.quotes-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power4.out'
});

gsap.from('.quote', {
    scrollTrigger: {
        trigger: '.quote',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power4.out'
});

// Footer animations
gsap.from('footer .social .logo', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power4.out'
});

gsap.from('footer p', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 20,
    duration: 0.8,
    delay: 0.4,
    ease: 'power4.out'
});

// Animate skill bars when they come into view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.setProperty('--progress', `${progress}%`);
        observer.observe(bar);
    });
}

// Call this function after the page loads
window.addEventListener('load', () => {
    animateSkillBars();
});

// Text split animation for the accent text
function animateAccentText() {
    const accentText = document.querySelector('.accent');
    const text = accentText.textContent;
    accentText.innerHTML = '';
    
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        accentText.appendChild(span);

        gsap.from(span, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            delay: 1 + (i * 0.1),
            ease: 'power4.out'
        });
    });
}

// Call the function when the page loads
window.addEventListener('load', animateAccentText);