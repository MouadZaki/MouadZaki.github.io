// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        particle.style.width = (Math.random() * 3 + 2) + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

// Enhanced Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe section contents
    document.querySelectorAll('.section-content').forEach(el => {
        observer.observe(el);
    });

    // Observe skill cards
    document.querySelectorAll('.skill-card').forEach(el => {
        observer.observe(el);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(el => {
        observer.observe(el);
    });

    // Observe education card
    document.querySelectorAll('.education-card').forEach(el => {
        observer.observe(el);
    });

    // Observe language cards
    document.querySelectorAll('.language-card').forEach(el => {
        observer.observe(el);
    });

    // Observe availability card
    document.querySelectorAll('.availability-card').forEach(el => {
        observer.observe(el);
    });
}

// Hide scroll indicator when scrolling
function setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    let hasScrolled = false;

    window.addEventListener('scroll', () => {
        if (!hasScrolled && window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transition = 'opacity 0.5s ease';
            hasScrolled = true;
        }
    });
}

// Enhanced 3D parallax effect on hero card with smooth damping
function setupParallax() {
    const heroCard = document.querySelector('.hero-card');
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const damping = 0.08;

    document.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 40;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 40;
        targetX = xAxis;
        targetY = yAxis;
    });

    function animate() {
        currentX += (targetX - currentX) * damping;
        currentY += (targetY - currentY) * damping;
        
        heroCard.style.transform = `rotateY(${currentX}deg) rotateX(${currentY}deg)`;
        requestAnimationFrame(animate);
    }

    animate();

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        targetX = 0;
        targetY = 0;
    });
}

// Add subtle tilt effect to all cards on mouse move
function setupCardTilt() {
    const cards = document.querySelectorAll('.skill-card, .project-card, .education-card, .language-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02) translateZ(30px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1) translateZ(0)';
        });
    });
}

// Add smooth reveal animation for elements as they come into view
function setupSmoothReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .education-card, .language-card');

    revealElements.forEach(el => {
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });
}

// Add scroll progress indicator
function setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
        z-index: 1000;
        transition: width 0.1s ease;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add magnetic effect to contact items
function setupMagneticEffect() {
    const contactItems = document.querySelectorAll('.contact-item');

    contactItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) translateY(-5px) translateZ(20px)`;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0) translateY(0) translateZ(0)';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupScrollAnimations();
    setupScrollIndicator();
    setupParallax();
    setupCardTilt();
    setupSmoothReveal();
    setupScrollProgress();
    setupMagneticEffect();
});
