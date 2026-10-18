/* =============================================
   CONSTRUYE FIRME — Interactive Script
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // ---- PRELOADER ----
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback in case load already fired
    if (document.readyState === 'complete') {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    }

    // ---- HEADER SCROLL EFFECT ----
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    function handleScroll() {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 60);
        backToTop.classList.toggle('visible', scrollY > 500);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ---- BACK TO TOP ----
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---- MOBILE NAV ----
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // ---- ACTIVE NAV LINK ON SCROLL ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ---- HERO CAROUSEL ----
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselDots = document.querySelectorAll('#carouselDots .dot');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let carouselInterval;

    function goToSlide(index) {
        carouselSlides[currentSlide].classList.remove('active');
        carouselDots[currentSlide].classList.remove('active');
        currentSlide = (index + carouselSlides.length) % carouselSlides.length;
        carouselSlides[currentSlide].classList.add('active');
        carouselDots[currentSlide].classList.add('active');
    }

    function startCarousel() {
        carouselInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
    }

    function resetCarousel() {
        clearInterval(carouselInterval);
        startCarousel();
    }

    prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetCarousel(); });
    nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetCarousel(); });
    carouselDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetCarousel();
        });
    });

    startCarousel();

    // ---- STATS COUNTER ANIMATION ----
    const statItems = document.querySelectorAll('.stat-item');
    let statsCounted = false;

    function animateCounters() {
        if (statsCounted) return;
        const statsSection = document.querySelector('.stats-bar');
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
            statsCounted = true;
            statItems.forEach(item => {
                const target = parseInt(item.dataset.count);
                const numberEl = item.querySelector('.stat-number');
                const duration = 2000;
                const startTime = Date.now();

                function updateCounter() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // easeOutQuart
                    const eased = 1 - Math.pow(1 - progress, 4);
                    const current = Math.round(target * eased);
                    numberEl.textContent = current + (target === 98 ? '%' : '+');
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters, { passive: true });
    animateCounters();

    // ---- SCROLL ANIMATIONS ----
    const animatedElements = document.querySelectorAll('[data-animate]');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, index * 80);
                animateObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => animateObserver.observe(el));

    // ---- PROJECTS FILTER ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- TESTIMONIALS SLIDER ----
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('#testimonialDots .dot');
    const testPrevBtn = document.getElementById('testPrev');
    const testNextBtn = document.getElementById('testNext');
    let currentTestimonial = 0;
    let testimonialInterval;

    function goToTestimonial(index) {
        testimonialCards[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
        testimonialCards[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    function startTestimonials() {
        testimonialInterval = setInterval(() => goToTestimonial(currentTestimonial + 1), 7000);
    }

    function resetTestimonials() {
        clearInterval(testimonialInterval);
        startTestimonials();
    }

    testPrevBtn.addEventListener('click', () => { goToTestimonial(currentTestimonial - 1); resetTestimonials(); });
    testNextBtn.addEventListener('click', () => { goToTestimonial(currentTestimonial + 1); resetTestimonials(); });
    testimonialDots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToTestimonial(parseInt(dot.dataset.index));
            resetTestimonials();
        });
    });

    startTestimonials();

    // ---- CONTACT TABS ----
    const contactTabs = document.querySelectorAll('.contact-tab');
    const formCliente = document.getElementById('formCliente');
    const formJornalero = document.getElementById('formJornalero');

    contactTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            contactTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tab.dataset.tab === 'cliente') {
                formCliente.classList.add('active');
                formJornalero.classList.remove('active');
            } else {
                formJornalero.classList.add('active');
                formCliente.classList.remove('active');
            }
        });
    });

    // ---- FORM SUBMISSION ----
    function handleFormSubmit(form, type) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let valid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = 'hsl(0, 65%, 55%)';
                    valid = false;
                } else {
                    field.style.borderColor = '';
                }
            });

            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.style.borderColor = 'hsl(0, 65%, 55%)';
                valid = false;
            }

            if (!valid) return;

            // Simulate submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const successMessage = type === 'cliente'
                    ? '¡Gracias por tu interés! Nos comunicaremos contigo en un máximo de 24 horas con una cotización personalizada.'
                    : '¡Gracias por postularte! Revisaremos tu información y te contactaremos cuando tengamos obra disponible.';

                form.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>¡${type === 'cliente' ? 'Solicitud' : 'Postulación'} Enviada!</h3>
                        <p>${successMessage}</p>
                    </div>
                `;
            }, 1500);
        });
    }

    handleFormSubmit(formCliente, 'cliente');
    handleFormSubmit(formJornalero, 'jornalero');

    // ---- INPUT FOCUS ANIMATIONS ----
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('label')?.style.setProperty('color', 'var(--primary)');
        });
        input.addEventListener('blur', () => {
            input.parentElement.querySelector('label')?.style.setProperty('color', '');
        });
    });

    // ---- SMOOTH SCROLL for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
