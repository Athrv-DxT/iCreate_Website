let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
const scrollThreshold = 100;

window.onbeforeunload = function() {
    window.scrollTo(0, 0);
};

// Function to check if an element is in viewport with threshold
function isInViewport(element, threshold = 0.4) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Calculate what percentage of the page element is visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const percentVisible = visibleHeight / element.offsetHeight;
    
    return percentVisible >= threshold;
}

// Function to reset logo and text animations
function resetMainAnimations() {
    // Reset logo animation
    const logo = document.querySelector('.logo');
    logo.style.animation = 'none';
    logo.offsetHeight;
    logo.style.animation = 'popUp 0.5s ease forwards';

    // Reset curved text animation
    const curvedText = document.querySelector('.curved-text');
    curvedText.style.animation = 'none';
    curvedText.offsetHeight;
    curvedText.style.animation = 'rotateOnce 2s ease forwards';
    
    // Reset individual letters
    setupAnimations(); // This will recreate the text with fresh animations
}

// Track scroll position and check main section visibility
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const mainSection = document.querySelector('#main');
    
    // Navbar visibility rule
    if (scrollTop > scrollThreshold) {
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('visible');
        } else {
            navbar.classList.remove('visible');
        }
    } else {
        navbar.classList.remove('visible');
    }
    
    // Check if main section is 40% visible and reset animations if it is true
    if (isInViewport(mainSection, 0.4)) {
        resetMainAnimations();
    }
    
    lastScrollTop = scrollTop;
});

// Modified smooth scrolling with animation reset for main section
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
            
            // If navigating to main section, reset animations after scroll
            if (targetId === '#main') {
                setTimeout(() => {
                    resetMainAnimations();
                }, 1000); 
            }
        }
    });
});

function setupAnimations() {
    const text = "ICREATE • UNLEASH YOUR POTENTIAL • ";
    const textContainer = document.getElementById('curved-text');
    
    textContainer.innerHTML = '';
    
    const angleStep = 360 / text.length;
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.transform = `rotate(${angleStep * i}deg)`;
        span.style.animation = `fadeIn 0.5s ease forwards ${i * 50}ms`;
        textContainer.appendChild(span);
    });
}

window.addEventListener('load', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    setupAnimations();
    resetMainAnimations();
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-section').forEach(section => {
    observer.observe(section);
});

// Typing animation for both headings
function initializeTypingAnimation(containerClass) {
    document.addEventListener('DOMContentLoaded', () => {
        const heading = document.querySelector(`${containerClass} h1`);
        
        function startTypingAnimation() {
            heading.classList.remove('typing-done');
            heading.classList.remove('typing');
            
            void heading.offsetWidth;
            
            heading.classList.add('typing');
            
            setTimeout(() => {
                heading.classList.add('typing-done');
                heading.classList.remove('typing');
            }, 2000);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTypingAnimation();
                }
            });
        }, {
            threshold: 0.1
        });

        observer.observe(heading);

        if (heading.getBoundingClientRect().top < window.innerHeight) {
            startTypingAnimation();
        }
    });
}

// Initialize typing animations for both containers
initializeTypingAnimation('.details-container');
initializeTypingAnimation('.md-container');

// Events page animation sttings
window.addEventListener('load', () => {
    const heading = document.querySelector('h1');
    if (heading) heading.classList.add('animate');

    const paragraph = document.querySelector('.info p');
    if (paragraph) {
        setTimeout(() => {
            paragraph.classList.add('animate');
        }, 500);
    }

    const line = document.querySelector('hr');
    if (line) {
        setTimeout(() => {
            line.classList.add('animate');
        }, 900);
    }
});

// backedn part
document.getElementById('subscribe-btn').addEventListener('click', function() {
    const email = document.getElementById('email').value;
    
    if (email) {
        // Send email to backend
        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid email address.');
    }
});