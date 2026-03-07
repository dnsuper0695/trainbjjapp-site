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

                // Add class that overrides :hover with !important
                // On mobile, tap creates a sticky :hover state that inline styles can't beat
                dropdown.classList.add('dropdown-closed');

                // Remove the class once user scrolls or touches elsewhere
                function reopen() {
                    dropdown.classList.remove('dropdown-closed');
                    window.removeEventListener('scroll', reopen);
                    document.removeEventListener('touchstart', reopen);
                }

                window.addEventListener('scroll', reopen, { once: true });
                document.addEventListener('touchstart', reopen, { once: true });

                // Fallback: remove after 1s for desktop (mouse leaves hover zone)
                setTimeout(function () {
                    dropdown.classList.remove('dropdown-closed');
                }, 1000);
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
