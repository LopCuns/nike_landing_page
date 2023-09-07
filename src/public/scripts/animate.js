"use strict";
const animationClass = 'animated';
const allowedAnimations = ['faderight', 'fadeleft'];
function animateElement(element, delay) {
    setTimeout(() => {
        element.classList.add('animated');
    }, delay || 0);
}
function animationCallback(entries, observer) {
    entries.forEach(entry => {
        try {
            // Check if entry is intersecting
            if (!entry.isIntersecting)
                return;
            // Get the animation  style
            const animationStyle = entry.target.getAttribute('data-animate');
            //If animation does not exist, throw an error
            if (!allowedAnimations.includes(animationStyle))
                throw new Error(`Animation of style ${animationStyle} does not exist`);
            // Get the animation delay
            const animationDelay = Number(entry.target.getAttribute('data-delay'));
            // Execute the animation
            animateElement(entry.target, animationDelay);
        }
        catch (err) {
            console.error(err);
        }
        // Disconnect the observer if all entries have been animated
        if (entries.every(entry => entry.target.classList.contains(animationClass)))
            observer.disconnect();
    });
}
// Create the intersection observer
const animationObserver = new IntersectionObserver(animationCallback, { threshold: .75 });
// Observe all the elements with the attribute 'data-animate'
Array.from(document.querySelectorAll('[data-animate]')).forEach(entry => animationObserver.observe(entry));
