/**
 * PREMIUM LUXURY WEDDING INVITATION INTERACTION ARCHETYPE
 * FILENAME: main.js
 */


 const music = document.getElementById('bg-music');
const container = document.querySelector('.invitation-container');
const welcomeScreen = document.getElementById('welcome-screen');

function initExperience() {
    // 1. Убираем экран приветствия
    welcomeScreen.style.opacity = '0';
    setTimeout(() => welcomeScreen.style.display = 'none', 500);

    // 2. Включаем музыку
    music.play().catch(e => console.log("Music blocked"));

    // 3. Запускаем автопрокрутку
    setInterval(() => {
        const scrollStep = window.innerHeight;
        if (container.scrollTop + scrollStep < container.scrollHeight) {
            container.scrollBy({ top: scrollStep, behavior: 'smooth' });
        } else {
            container.scrollTo({ top: 0, behavior: 'smooth' }); // Зацикливание
        }
    }, 8000); // Прокрутка каждые 6 секунд
}

// Слушатель одного клика по всему экрану
welcomeScreen.addEventListener('click', initExperience);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Real Estate Layout Fix (100vh viewport adaptation for modern devices)
    const updateViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);

    // 2. High-Performance Lightweight Target Countdown Engine
    const initWeddingCountdown = () => {
        // Target Date Set exactly to July 25, 2026 at 15:30 (Gathering Time)
        const weddingDate = new Date('2026-07-25T15:30:00').getTime();
        
        const countdownGrid = document.getElementById('countdown');
        const expiredMessage = document.getElementById('countdown-message');
        
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };

        if (!countdownGrid || !expiredMessage) return;

        const updateTimer = () => {
            const now = new Date().getTime();
            const timeDifference = weddingDate - now;

            if (timeDifference <= 0) {
                // Target timeline reached
                countdownGrid.classList.add('hidden');
                expiredMessage.classList.remove('hidden');
                clearInterval(timerInterval);
                return;
            }

            // High Precision Time Calculations
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Pad single digit numbers elegantly (e.g., '09' instead of '9')
            elements.days.textContent = String(days).padStart(2, '0');
            elements.hours.textContent = String(hours).padStart(2, '0');
            elements.minutes.textContent = String(minutes).padStart(2, '0');
            elements.seconds.textContent = String(seconds).padStart(2, '0');
        };

        // Immediate initial call to avoid unstyled flickering states
        updateTimer();
        const timerInterval = setInterval(updateTimer, 1000);
    };

    // 3. Native Fluid Scroll Performance Enhancements
    const handleSmoothVibes = () => {
        const slides = document.querySelectorAll('.slide');
        
        // Setup minimal subtle scroll layout changes if necessary
        const container = document.querySelector('.invitation-container');
        if (container) {
            container.addEventListener('scroll', () => {
                // Prevents viewport overscroll bounces from breaking layout cohesion
                if (container.scrollTop < 0) container.scrollTop = 0;
            }, { passive: true });
        }
    };

    // Initialize scripts
    initWeddingCountdown();
    handleSmoothVibes();
});

