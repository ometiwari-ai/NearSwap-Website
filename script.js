console.log("Script loaded");

document.addEventListener('DOMContentLoaded', () => {
    // Track APK downloads (GA4)
    // Fires when a user clicks any link to a .apk file (e.g., "Download APK" / "Install").
    document.addEventListener('click', (event) => {
        const link = event.target && event.target.closest ? event.target.closest('a') : null;
        if (!link) return;

        const hrefAttr = link.getAttribute('href');
        if (!hrefAttr) return;

        // Normalize + detect .apk
        const hrefLower = hrefAttr.toLowerCase();
        if (!hrefLower.includes('.apk')) return;

        let absoluteUrl;
        try {
            absoluteUrl = new URL(hrefAttr, window.location.href).toString();
        } catch {
            absoluteUrl = hrefAttr;
        }

        if (typeof window.gtag === 'function') {
            window.gtag('event', 'apk_download_click', {
                link_url: absoluteUrl,
                link_text: (link.textContent || '').trim().slice(0, 120),
                page_path: window.location.pathname,
                transport_type: 'beacon'
            });
        }
    }, { capture: true });

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function () {
            this.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });
    }

    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const intervalTime = 7000; // 7 seconds
    let slideInterval;

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Dot click events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
            resetInterval();
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.process-card');
    cards.forEach((card, index) => {
        // Stagger delay based on index
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });

    const phoneFrame = document.querySelector('.phone-frame');
    if (phoneFrame) {
        observer.observe(phoneFrame);
    }

    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`; // Stagger effect
        observer.observe(card);
    });

    const aboutHeader = document.querySelector('.about-header');
    if (aboutHeader) {
        observer.observe(aboutHeader);
    }

    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`; // Stagger effect
        observer.observe(card);
    });

    // Animate Download Guidelines
    const guidelines = document.querySelector('.download-guidelines');
    if (guidelines) observer.observe(guidelines);

    // Mobile-only auto-hover for app card
    const appCard = document.querySelector('.app-glass-card');
    if (appCard && window.innerWidth <= 900) {
        const mobileObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-active');
                } else {
                    entry.target.classList.remove('scroll-active');
                }
            });
        }, { threshold: 0.6 }); // Activate when 60% visible
        mobileObserver.observe(appCard);
    }

    // Video Playback Logic
    const playBtn = document.getElementById('playBtn');
    const videoOverlay = document.getElementById('videoOverlay');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const iframeContainer = document.getElementById('iframeContainer');

    if (playBtn && iframeContainer) {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default if any

            // Hide overlay and thumbnail
            videoOverlay.style.opacity = '0';
            setTimeout(() => {
                videoOverlay.style.display = 'none';
                videoThumbnail.style.display = 'none';

                // Show Iframe Container
                iframeContainer.style.display = 'block';

                // Inject Iframe (Autoplay)
                // Using a placeholder video ID. Replace 'M7lc1UVf-VE' with actual ID.
                iframeContainer.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0&modestbranding=1" 
                        title="NearSwap Demo" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            }, 300);
        });
    }
});
