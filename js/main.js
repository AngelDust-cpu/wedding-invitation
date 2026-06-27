document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Sticky Navbar & Scroll Progress & Back to Top ---
    const navbar = document.getElementById('navbar');
    const progressBar = document.querySelector('.scroll-progress');
    const backToTop = document.querySelector('.back-to-top');
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.querySelector('.logo').style.color = 'var(--color-text)';
        } else {
            navbar.classList.remove('scrolled');
            // Keep logo white on hero if at top
            navbar.querySelector('.logo').style.color = window.innerWidth > 768 ? 'white' : 'var(--color-text)';
        }

        // Scroll Progress Bar
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = `${scrollPx / winHeightPx * 100}%`;
        progressBar.style.width = scrolled;

        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }

        // Active Navigation Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- 3. Intersection Observer (Scroll Animations) ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Run once
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // --- 4. Countdown Timer ---
    // Set target date (September 24, 2026)
    const countToDate = new Date("Sep 24, 2026 15:00:00").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const difference = countToDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').innerText = days < 10 ? '0'+days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0'+hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0'+minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0'+seconds : seconds;
        }
    };
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call

    // --- 5. Lightbox Gallery ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-img');
    const closeBtn = document.querySelector('.lightbox-close');

    galleryImages.forEach(img => {
        img.addEventListener('click', (e) => {
            lightbox.classList.add('active');
            lightboxImg.src = e.target.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.classList.remove('active');
        }
    });

    // --- 6. Parallax Engine & Floating Particles ---
    const particleContainer = document.getElementById('particles');
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        let particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize properties
        let size = Math.random() * 8 + 4; // 4px to 12px
        let posX = Math.random() * 100; // 0% to 100%
        let delay = Math.random() * 5; // 0s to 5s
        let duration = Math.random() * 10 + 10; // 10s to 20s
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particleContainer.appendChild(particle);
    }

    // Hero Text Mouse Movement Effect
    const heroText = document.querySelector('.parallax-text');
    const heroSection = document.getElementById('hero');

    heroSection.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        heroText.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });
    
    heroSection.addEventListener('mouseleave', () => {
        heroText.style.transform = `translate(0px, 0px)`;
        heroText.style.transition = `transform 0.5s ease`;
    });
    heroSection.addEventListener('mouseenter', () => {
        heroText.style.transition = `none`;
    });

});