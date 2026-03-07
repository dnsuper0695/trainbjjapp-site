/* Train BJJ — trainbjjapp.com */
/* Accordion toggle, scroll animations, progress bar */

(function () {
    'use strict';

    // ================================
    // 1. ACCORDION TOGGLE
    // ================================

    function initAccordions() {
        var triggers = document.querySelectorAll('.accordion-trigger');

        triggers.forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                var item = trigger.closest('.accordion-item');
                var isExpanded = item.getAttribute('data-expanded') === 'true';

                if (isExpanded) {
                    item.setAttribute('data-expanded', 'false');
                    trigger.setAttribute('aria-expanded', 'false');
                } else {
                    item.setAttribute('data-expanded', 'true');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });

        // Auto-expand accordion if URL hash targets an element inside one
        if (window.location.hash) {
            try {
                var target = document.querySelector(window.location.hash);
                if (target) {
                    var accordion = target.closest('.accordion-item');
                    if (accordion) {
                        accordion.setAttribute('data-expanded', 'true');
                        var btn = accordion.querySelector('.accordion-trigger');
                        if (btn) btn.setAttribute('aria-expanded', 'true');
                    }
                }
            } catch (e) {
                // Invalid selector — ignore
            }
        }
    }

    // ================================
    // 2. SCROLL-TRIGGERED ANIMATIONS
    // ================================

    function initScrollAnimations() {
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.querySelectorAll('.fade-in-section').forEach(function (el) {
                el.classList.add('is-visible');
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        document.querySelectorAll('.fade-in-section').forEach(function (el) {
            observer.observe(el);
        });
    }

    // ================================
    // 3. SCROLL PROGRESS BAR
    // ================================

    function initScrollProgress() {
        var progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                window.requestAnimationFrame(function () {
                    var scrollTop = window.scrollY;
                    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    var scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    progressBar.style.width = scrollPercent + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ================================
    // 4. DROPDOWN CLOSE ON CLICK
    // ================================

    function initDropdownClose() {
        var dropdownLinks = document.querySelectorAll('.nav-dropdown-menu a');

        dropdownLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                var dropdown = link.closest('.nav-dropdown');
                if (!dropdown) return;

                dropdown.classList.add('dropdown-closed');

                // Desktop: clear when mouse leaves the dropdown
                function onMouseLeave() {
                    dropdown.classList.remove('dropdown-closed');
                    dropdown.removeEventListener('mouseleave', onMouseLeave);
                }
                dropdown.addEventListener('mouseleave', onMouseLeave);

                // Mobile: clear on next touch (delayed so we skip the current tap).
                // By then the new touch also clears the sticky :hover state.
                setTimeout(function () {
                    document.addEventListener('touchstart', function () {
                        dropdown.classList.remove('dropdown-closed');
                    }, { once: true });
                }, 300);
            });
        });
    }

    // ================================
    // INIT
    // ================================

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initAccordions();
            initScrollAnimations();
            initScrollProgress();
            initDropdownClose();
        });
    } else {
        initAccordions();
        initScrollAnimations();
        initScrollProgress();
        initDropdownClose();
    }

})();
