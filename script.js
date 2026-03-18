// Hide on Scroll
(function () {
    const header = document.querySelector('.container-header');
    if (!header) return;

    let lastScroll = window.pageYOffset || document.documentElement.scrollTop;
    let lastKnownScroll = lastScroll;
    let ticking = false;
    const delta = 2; // sensibilidade: 2px para detectar movimentos lentos

    header.style.transition = 'transform 220ms ease';
    header.style.willChange = 'transform';

    function onScroll() {
        lastKnownScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
        }
    }

    const showThreshold = 100;
    let lastHidePosition = null;
    let isHidden = false;

    function update() {
        const current = lastKnownScroll;
        const diff = current - lastScroll;
        const headerHeight = header.offsetHeight || 90;

        if (Math.abs(diff) > delta) {
            if (diff > 0 && current > 50) {
                // rolando para baixo -> esconder imediatamente
                header.style.transform = `translateY(-${headerHeight + 10}px)`;
                isHidden = true;
                lastHidePosition = current;
            } else if (diff < 0) {
                // rolando para cima -> só mostrar se rolou bastante desde o hide
                if (isHidden && lastHidePosition !== null && (lastHidePosition - current) >= showThreshold) {
                    header.style.transform = 'translateY(0)';
                    isHidden = false;
                    lastHidePosition = null;
                }
            }

            lastScroll = current <= 0 ? 0 : current;
        }

        ticking = false;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', () => { header.style.transform = 'translateY(0)'; });
})();

// Mostrar certificados
(function () {
    const groups = document.querySelectorAll('.certificado-group');
    if (!groups.length) return;

    groups.forEach(group => {
        const icon = group.querySelector('.certificado-icon');
        if (!icon) return;
        icon.addEventListener('click', () => {
            group.classList.toggle('active');
        });
    });
})();

(function () {
    const projectFields = document.querySelectorAll('.projetos-field');
    const allModals = document.querySelectorAll('.projeto-modal');
    if (!projectFields.length) return;

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    allModals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target.closest('[data-close-modal]')) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;
        allModals.forEach(closeModal);
    });

    projectFields.forEach(field => {
        const modalTarget = field.getAttribute('data-modal-target');
        const modal = modalTarget ? document.getElementById(modalTarget) : null;
        const video = field.querySelector('.video');
        const capa = field.querySelector('.video-capa');

        if (modal) {
            field.addEventListener('click', (event) => {
                if (event.target.closest('a')) return;
                openModal(modal);
            });
        }

        if (video && capa) {
            field.addEventListener('mouseenter', () => {
                video.play();
                video.style.opacity = '1';
                capa.style.opacity = '0';
            });

            field.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
                video.style.opacity = '0';
                capa.style.opacity = '1';
            });
        }
    });
})();

// GSAP ScrollTrigger - revelar conteúdo ao rolar
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const homeTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    homeTl
        .from('.container-home .header', {
            opacity: 0,
            y: -24,
            duration: 0.7,
            clearProps: 'all'
        })
        .from('.container-home .titulo-desc h1', {
            opacity: 0,
            y: 40,
            duration: 0.8,
            clearProps: 'all'
        }, '-=0.2')
        .from('.container-home .titulo-desc p', {
            opacity: 0,
            y: 28,
            duration: 0.7,
            clearProps: 'all'
        }, '-=0.45')
        .from('.container-home .btn-curriculo', {
            opacity: 0,
            y: 22,
            duration: 0.65,
            clearProps: 'all'
        }, '-=0.35')
        .from('.container-home .perfil svg', {
            opacity: 0,
            x: 40,
            scale: 0.96,
            duration: 0.9,
            clearProps: 'all'
        }, '-=0.7');

    gsap.from('.container-sobre .titulo-sobre', {
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.container-sobre',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.container-sobre .conteudo-sobre p', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.container-sobre .conteudo-sobre',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.titulo-certificado, .certificado-group', {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.container-certificado',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.title-projetos, .projetos-field', {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.container-projeto',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from('.titulo-contato, .grid-left, .grid-right, .direitos', {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.container-contato',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });
})();