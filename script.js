 // Theme Management
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        let currentTheme = localStorage.getItem('theme') || 'light';

        // Initialize theme
        body.setAttribute('data-theme', currentTheme);
        updateThemeIcon();

        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            body.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon();
        });

        function updateThemeIcon() {
            const icon = themeToggle.querySelector('i');
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Mobile Navigation
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.className = navMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Typing effect
        function initializeTypingEffect() {
            const typingElement = document.getElementById('typing-text');
            const phrases = [
                'Transforming Lives Through Better Vision',
                'Expert Eye Care & Vision Solutions',
                'Community Health & Wellness Advocate',
                'Research-Driven Optometry Practice',
                'Comprehensive Eye Health Services'
            ];
            
            let currentPhrase = 0;
            let currentChar = 0;
            let isDeleting = false;

            function typeEffect() {
                const phrase = phrases[currentPhrase];
                
                if (isDeleting) {
                    typingElement.textContent = phrase.substring(0, currentChar - 1);
                    currentChar--;
                } else {
                    typingElement.textContent = phrase.substring(0, currentChar + 1);
                    currentChar++;
                }

                let typeSpeed = isDeleting ? 50 : 100;

                if (!isDeleting && currentChar === phrase.length) {
                    typeSpeed = 3000;
                    isDeleting = true;
                } else if (isDeleting && currentChar === 0) {
                    isDeleting = false;
                    currentPhrase = (currentPhrase + 1) % phrases.length;
                    typeSpeed = 500;
                }

                setTimeout(typeEffect, typeSpeed);
            }

            typeEffect();
        }

        // Enhanced Scroll Effects with Progress Bar
        const navbar = document.getElementById('navbar');
        const backToTopBtn = document.getElementById('back-to-top');
        const progressBar = document.getElementById('progress-bar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            // Update progress bar
            progressBar.style.width = scrollPercent + '%';

            // Navbar scroll effect
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Back to top button
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters
                    if (entry.target.querySelector('.stat-number[data-count]')) {
                        animateCounters(entry.target);
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Counter Animation
        function animateCounters(container) {
            const counters = container.querySelectorAll('.stat-number[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 3000;
                const step = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }

        // Form Handling
        const contactForm = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const successMessage = document.getElementById('success-message');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Simulate form submission
                setTimeout(() => {
                    successMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
                    successMessage.style.display = 'block';
                    
                    contactForm.reset();
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;

                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        // Active Navigation Link
        function updateActiveNavLink() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (window.pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink);

        // Initialize typing effect when page loads
        document.addEventListener('DOMContentLoaded', () => {
            initializeTypingEffect();
        });