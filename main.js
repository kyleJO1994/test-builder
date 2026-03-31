/**
 * main.js - Spring Cherry Blossom Interactive Effects
 */

class CherryBlossomEffect {
    constructor() {
        this.container = document.body;
        this.petals = ['🌸', '✨', '🍃'];
        this.init();
    }

    init() {
        // Create petals periodically
        setInterval(() => {
            this.createPetal();
        }, 1000);
    }

    createPetal() {
        const petal = document.createElement('div');
        const type = this.petals[Math.floor(Math.random() * this.petals.length)];
        
        petal.innerHTML = type;
        petal.style.position = 'fixed';
        petal.style.top = '-20px';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 10 + 10) + 'px';
        petal.style.zIndex = '999';
        petal.style.pointerEvents = 'none';
        petal.style.userSelect = 'none';
        petal.style.opacity = Math.random();
        
        // Animation properties
        const duration = Math.random() * 5 + 5; // 5-10 seconds
        const drift = Math.random() * 200 - 100; // -100 to 100px horizontal drift
        
        this.container.appendChild(petal);

        // Web Animations API for smooth performance
        const animation = petal.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: petal.style.opacity },
            { transform: `translate(${drift}px, 110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        });

        animation.onfinish = () => petal.remove();
    }
}

// Initialize effect when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new CherryBlossomEffect();
    
    // Add a subtle log for the preview console as requested in GEMINI.md
    console.log("🌸 Spring Cherry Blossom Theme Activated!");
});
