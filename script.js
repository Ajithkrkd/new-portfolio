document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const themeToggle = document.querySelector('#themeToggle');
    const contactForm = document.querySelector('#contactForm');
    const prefersTouch = matchMedia('(hover: none)').matches;

    // Theme (dark/light)
    const root = document.documentElement;
    const THEME_KEY = 'theme';

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (_) {
            // ignore storage failures (private mode, disabled storage, etc.)
        }

        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const isLight = theme === 'light';
            themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
            if (icon) icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    (function initTheme() {
        let theme;
        try {
            theme = localStorage.getItem(THEME_KEY);
        } catch (_) {
            theme = null;
        }

        if (theme !== 'light' && theme !== 'dark') {
            theme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }

        applyTheme(theme);
    })();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            applyTheme(current === 'light' ? 'dark' : 'light');
        });
    }

    // Contact form -> opens mail client (no backend needed)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (document.querySelector('#contactName')?.value || '').trim();
            const email = (document.querySelector('#contactEmail')?.value || '').trim();
            const message = (document.querySelector('#contactMessage')?.value || '').trim();

            const to = 'ajithprakash.work@gmail.com';
            const subject = encodeURIComponent(`Portfolio contact from ${name || 'Someone'}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
            );

            window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
        });
    }

    // Mobile nav toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // Custom cursor only for pointer devices
    if (!prefersTouch && cursorDot && cursorOutline) {
        document.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            cursorDot.style.top = `${y}px`;
            cursorDot.style.left = `${x}px`;
            cursorOutline.style.top = `${y}px`;
            cursorOutline.style.left = `${x}px`;
        });

        document.addEventListener('mousedown', () => {
            cursorOutline.style.width = '30px';
            cursorOutline.style.height = '30px';
            cursorOutline.style.backgroundColor = 'rgba(56, 189, 248, 0.15)';
        });

        document.addEventListener('mouseup', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    } else {
        // Hide custom cursor on touch devices
        cursorDot?.classList.add('hidden');
        cursorOutline?.classList.add('hidden');
    }
});
