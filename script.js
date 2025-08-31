// DOM Elements
const notifyBtn = document.querySelector('.notify-btn');
const emailInput = document.querySelector('.email-input');

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle email notification signup
function handleNotifySignup() {
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter your email address', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate API call
    notifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing up...';
    notifyBtn.disabled = true;
    
    setTimeout(() => {
        showMessage('Thank you! We\'ll notify you when Mathforce launches!', 'success');
        emailInput.value = '';
        notifyBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        
        setTimeout(() => {
            notifyBtn.innerHTML = '<i class="fas fa-bell"></i> Notify Me';
            notifyBtn.disabled = false;
        }, 2000);
    }, 1500);
}

// Show message function
function showMessage(text, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    
    // Style the message
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(45deg, #4CAF50, #45a049);' : 'background: linear-gradient(45deg, #f44336, #d32f2f);'}
    `;
    
    document.body.appendChild(message);
    
    // Animate in
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 300);
    }, 4000);
}

// Event listeners
notifyBtn.addEventListener('click', handleNotifySignup);

emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleNotifySignup();
    }
});

// Smooth scrolling for any internal links (if added later)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactive animations on scroll
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    
    // Add a subtle parallax effect to math symbols
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const mathSymbols = document.querySelectorAll('.math-symbol');
        
        mathSymbols.forEach((symbol, index) => {
            const speed = 0.5 + (index * 0.1);
            symbol.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
});

// Add some easter eggs for math enthusiasts
const mathFacts = [
    "Did you know? The symbol π was first used by William Jones in 1706!",
    "Fun fact: The number 0 was invented by ancient Indian mathematicians!",
    "Amazing: There are more possible chess games than atoms in the observable universe!",
    "Cool fact: The word 'algebra' comes from the Arabic word 'al-jabr'!",
    "Interesting: A group of mathematicians is called a 'set'!"
];

// Show random math fact when logo is clicked
document.querySelector('.logo').addEventListener('click', () => {
    const randomFact = mathFacts[Math.floor(Math.random() * mathFacts.length)];
    showMessage(randomFact, 'success');
});