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