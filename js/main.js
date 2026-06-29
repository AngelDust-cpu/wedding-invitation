/**
 * ==========================================================================
 * LUXURY WEDDING INVITATION | MAIN JAVASCRIPT
 * ==========================================================================
 * Priority: Performance, Smoothness, Mobile Optimization
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. MOBILE VIEWPORT HEIGHT FIX
       Fixes the 100vh issue on mobile browsers (Safari/Chrome) where 
       the address bar changes the actual viewport height.
       ---------------------------------------------------------------------- */
    const setDynamicViewportHeight = () => {
        // We use dvh in CSS, but this is a fallback/enhancement for precise calculations if needed
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial set and recalculate on resize/orientation change
    setDynamicViewportHeight();
    window.addEventListener('resize', setDynamicViewportHeight);
    window.addEventListener('orientationchange', setDynamicViewportHeight);

    /* ----------------------------------------------------------------------
       2. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
       Triggers CSS transitions when elements enter the viewport.
       ---------------------------------------------------------------------- */
    // Select all elements that need to be animated
    const animatedElements = document.querySelectorAll(
        '.reveal-text, .reveal-names, .slide-up, .fade-in, .reveal-card'
    );

    // Set up observer options
    const observerOptions = {
        root: null, // use the browser viewport
        rootMargin: '0px 0px -5% 0px', // Trigger slightly before the element is fully in view
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Callback function when intersection occurs
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition
                entry.target.classList.add('is-visible');
                
                // Stop observing once animated to save mobile battery/performance
                observer.unobserve(entry.target);
            }
        });
    };

    // Initialize the Intersection Observer
    const animationObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each element
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    /* ----------------------------------------------------------------------
       3. FIRST LOAD ANIMATION TRIGGER
       Ensures the first slide animates immediately upon load, 
       even if the observer takes a millisecond to fire.
       ---------------------------------------------------------------------- */
    setTimeout(() => {
        const heroElements = document.querySelectorAll('#slide-1 .reveal-text, #slide-1 .reveal-names, #slide-1 .fade-in');
        heroElements.forEach(el => el.classList.add('is-visible'));
    }, 100); // Slight delay for cinematic effect after blank screen

    /* ----------------------------------------------------------------------
       4. PREVENT OVERSCROLL BOUNCE (iOS)
       Keeps the scroll-snap feeling solid and app-like.
       ---------------------------------------------------------------------- */
    document.body.addEventListener('touchmove', function(e) {
        // Prevent default scrolling behavior on the body if it reaches the absolute top/bottom
        // Note: The main scrollable container is .invitation-app
        if (e.target === document.body) {
            e.preventDefault();
        }
    }, { passive: false });

});