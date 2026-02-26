// Hide on Scroll
(function() {
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
(function() {
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
