// ============================================
// FESTIVAL DES GROUILLEURS - SCRIPT PRO
// ============================================

// ===== 1. MENU BURGER =====
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== 2. HEADER SCROLL =====
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== 3. ANIMATIONS AU SCROLL =====
const animatedElements = document.querySelectorAll('.card, .media-card, .temoignage, .stat');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            }, index * 60);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

animatedElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(24px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
`;
document.head.appendChild(styleSheet);

// ===== 4. FORMULAIRE =====
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nom = document.getElementById('nom')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        if (!nom || !email || !message) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('Votre message a été envoyé avec succès !');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1200);
    });
}

// ===== 5. CONSOLE =====
console.log('%c Festival des Grouilleurs ', 'background: #D4783C; color: #0D0D0D; font-weight: 800; font-size: 14px; padding: 6px 14px; border-radius: 4px;');
console.log('1ère Édition - Batié - Avril 2026');
