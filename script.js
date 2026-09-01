/* ============================================
   FESTIVAL DES GROUILLEURS - SCRIPT COMPLET
   Interactions, animations, menu mobile
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
    });
}

// Fermer le menu quand on clique sur un lien
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});

// ============================================
// 2. HEADER QUI DEVIENT PLUS SOMBRE AU SCROLL
// ============================================
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
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
            }, index * 100);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

animatedElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// Ajout des styles d'animation directement en JS
// (pour éviter d'avoir à les mettre dans le CSS)
const style = document.createElement('style');
style.textContent = `
    .hidden {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// ============================================
// 4. COMPTE À REBOURS (optionnel)
//    Affiche le temps restant jusqu'au festival
//    Décommente pour l'activer
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
            el.innerHTML = `${days}j ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();
*/

// ============================================
// 5. TEST DE CONNEXION (à supprimer plus tard)
//    Vérifie que le script est bien chargé
// ============================================
console.log("✅ Festival des Grouilleurs - Script chargé avec succès !");
console.log("🎉 Site prêt à être utilisé !");