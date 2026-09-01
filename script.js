/* ============================================
   FESTIVAL DES GROUILLEURS - SCRIPT COMPLET
   Interactions, animations, menu mobile
   Version : 1.0
   ============================================ */

// ============================================
// 1. MENU BURGER (pour mobile)
// ============================================
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Fermer le menu en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// 2. HEADER QUI DEVIENT PLUS SOMBRE AU SCROLL
// ============================================
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 3. ANIMATIONS AU SCROLL 
//    (cartes, médias, témoignages qui apparaissent)
// ============================================
const animatedElements = document.querySelectorAll('.card, .media-card, .temoignage, .stat');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');
            }, index * 80);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
});

animatedElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Ajout des styles d'animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(40px) scale(0.98);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .visible {
        opacity: 1;
        transform: translateY(0) scale(1);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Animation d'entrée pour le hero */
    .hero h1, .hero .sous-titre, .hero p, .hero .btn {
        opacity: 0;
        transform: translateY(20px);
        animation: heroFadeIn 1s ease forwards;
    }
    
    .hero .sous-titre { animation-delay: 0.1s; }
    .hero h1 { animation-delay: 0.2s; }
    .hero p { animation-delay: 0.4s; }
    .hero .btn { animation-delay: 0.6s; }
    
    @keyframes heroFadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

// ============================================
// 4. COMPTE À REBOURS (optionnel)
//    Affiche le temps restant jusqu'au festival
//    Ajoute un élément avec id="countdown" dans ta page
// ============================================
/*
function updateCountdown() {
    const target = new Date('2026-02-01T00:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const el = document.getElementById('countdown');
        if (el) {
            el.innerHTML = `
                <span class="countdown-item">${days}<small>Jours</small></span>
                <span class="countdown-sep">:</span>
                <span class="countdown-item">${String(hours).padStart(2, '0')}<small>Heures</small></span>
                <span class="countdown-sep">:</span>
                <span class="countdown-item">${String(minutes).padStart(2, '0')}<small>Minutes</small></span>
                <span class="countdown-sep">:</span>
                <span class="countdown-item">${String(seconds).padStart(2, '0')}<small>Secondes</small></span>
            `;
        }
    } else {
        const el = document.getElementById('countdown');
        if (el) {
            el.innerHTML = '🎉 Le festival a commencé !';
        }
    }
}

// Styles pour le compte à rebours
const countdownStyles = document.createElement('style');
countdownStyles.textContent = `
    #countdown {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        font-size: 2rem;
        font-weight: 700;
        color: var(--orange-terreux-clair);
        padding: 20px;
        background: rgba(255,255,255,0.05);
        border-radius: 16px;
        margin: 20px 0;
    }
    .countdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: rgba(0,0,0,0.3);
        padding: 12px 20px;
        border-radius: 12px;
        min-width: 70px;
    }
    .countdown-item small {
        font-size: 0.6rem;
        font-weight: 400;
        opacity: 0.6;
        margin-top: 4px;
    }
    .countdown-sep {
        font-size: 1.5rem;
        opacity: 0.4;
    }
    @media (max-width: 600px) {
        #countdown {
            font-size: 1.2rem;
            gap: 8px;
            flex-wrap: wrap;
        }
        .countdown-item {
            min-width: 50px;
            padding: 8px 12px;
        }
        .countdown-sep {
            display: none;
        }
    }
`;
document.head.appendChild(countdownStyles);

setInterval(updateCountdown, 1000);
updateCountdown();
*/

// ============================================
// 5. EFFET DE SURVOL SUR LES CARTES (animation fluide)
// ============================================
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// 6. GESTION DU FORMULAIRE (contact)
// ============================================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des champs
        const nom = document.getElementById('nom')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const message = document.getElementById('message')?.value || '';
        
        // Validation simple
        if (!nom || !email || !message) {
            alert('⚠️ Veuillez remplir tous les champs.');
            return;
        }
        
        // Simulation d'envoi
        const btn = form.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Envoi en cours...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('✅ Votre message a été envoyé avec succès !\nNous vous répondrons dans les plus brefs délais.');
            form.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

// ============================================
// 7. LIGHTBOX POUR LES IMAGES (optionnel)
//    Clique sur une image pour l'agrandir
// ============================================
/*
const images = document.querySelectorAll('.media-card img');
images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            cursor: pointer;
            padding: 40px;
        `;
        
        const imgClone = this.cloneNode();
        imgClone.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.8);
        `;
        
        overlay.appendChild(imgClone);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        
        overlay.addEventListener('click', function() {
            this.remove();
            document.body.style.overflow = '';
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                overlay.remove();
                document.body.style.overflow = '';
            }
        });
    });
});
*/

// ============================================
// 8. DÉTECTION DE LA CONNEXION INTERNET
// ============================================
window.addEventListener('online', () => {
    console.log('✅ Connexion Internet rétablie');
});

window.addEventListener('offline', () => {
    console.warn('⚠️ Connexion Internet perdue');
});

// ============================================
// 9. MESSAGE DE BIENVENUE DANS LA CONSOLE
// ============================================
console.log('%c🎉 Festival des Grouilleurs', 'font-size: 24px; font-weight: bold; color: #B87333;');
console.log('%cSite officiel du festival culturel du Djôrô', 'font-size: 14px; color: #F5F0EB;');
console.log('%c📅 Édition 2026 - Gaoua & Batié', 'font-size: 14px; color: #D4944A;');
console.log('%c👑 Promoteur : PRINCE M7', 'font-size: 14px; color: #F5F0EB;');
console.log('%c🤝 Président CO : Ali HEMA', 'font-size: 14px; color: #F5F0EB;');
console.log('%c✅ Site chargé avec succès !', 'font-size: 16px; color: #4CAF50; font-weight: bold;');

// ============================================
// 10. EFFET DE TEXTE TAPÉ (pour le hero)
//    Optionnel : décommente pour activer
// ============================================
/*
const heroText = document.querySelector('.hero h1');
if (heroText) {
    const originalText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeText() {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeText, 50);
        }
    }
    
    // Déclencher au chargement
    setTimeout(typeText, 500);
}
*/
