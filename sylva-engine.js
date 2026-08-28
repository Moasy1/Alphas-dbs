/**
 * ALPHAS DIGITAL x SYLVA LIVING GREEN ENGINE
 * Implements interactive ThreeUI Sylva living particle flow, liquid metal controls,
 * dynamic card cursor spotlights, and 3D depth.
 */

(function () {
    'use strict';

    // --------------------------------------------------------------------------
    // 1. Dynamic Cursor Spotlight on Cards
    // --------------------------------------------------------------------------
    function initSpotlights() {
        const targets = document.querySelectorAll('.glass-card, .sylva-spotlight, .portfolio-item, .approach-grid > div');
        
        targets.forEach(card => {
            if (!card.classList.contains('sylva-spotlight')) {
                card.classList.add('sylva-spotlight');
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', `-500px`);
                card.style.setProperty('--mouse-y', `-500px`);
            });
        });
    }

    // --------------------------------------------------------------------------
    // 2. Sylva Living Organic Canvas Particle & Pollen Simulation
    // --------------------------------------------------------------------------
    function initSylvaCanvas() {
        let canvas = document.getElementById('particle-canvas') || document.getElementById('sylva-hero-canvas');
        if (!canvas) {
            const heroSection = document.querySelector('section') || document.body;
            if (heroSection) {
                canvas = document.createElement('canvas');
                canvas.id = 'sylva-hero-canvas';
                canvas.style.position = 'absolute';
                canvas.style.top = '0';
                canvas.style.left = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.pointerEvents = 'none';
                canvas.style.zIndex = '1';
                heroSection.style.position = heroSection.style.position || 'relative';
                heroSection.insertBefore(canvas, heroSection.firstChild);
            }
        }

        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth || window.innerWidth;
        let height = canvas.height = canvas.offsetHeight || window.innerHeight;

        const resizeHandler = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth || window.innerWidth;
            height = canvas.height = canvas.offsetHeight || window.innerHeight;
        };
        window.addEventListener('resize', resizeHandler);

        // Mouse tracker for particle vortex
        const mouse = { x: -1000, y: -1000, radius: 140 };
        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener('mouseleave', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        // Living Particle System
        const particleCount = Math.min(65, Math.floor((width * height) / 18000));
        const particles = [];

        class SylvaParticle {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = Math.random() * width;
                this.y = initial ? Math.random() * height : height + 10;
                // Bio-organic drift: upward and gentle swaying
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = -(Math.random() * 0.4 + 0.15);
                this.radius = Math.random() * 2.2 + 0.8;
                this.baseAlpha = Math.random() * 0.5 + 0.2;
                this.alpha = this.baseAlpha;
                // Hue alternation: Emerald Green (#10b981) and Sylva Gold (#e59b58)
                this.isGold = Math.random() > 0.4;
                this.color = this.isGold ? '229, 155, 88' : '16, 185, 129';
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulseAngle = Math.random() * Math.PI * 2;
            }

            update() {
                this.pulseAngle += this.pulseSpeed;
                this.alpha = this.baseAlpha + Math.sin(this.pulseAngle) * 0.2;

                // Mouse interactive repulsion/flow
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.hypot(dx, dy);

                if (dist < mouse.radius) {
                    const force = (1 - dist / mouse.radius) * 2.5;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force;
                    this.y += Math.sin(angle) * force;
                }

                this.x += this.vx + Math.sin(this.pulseAngle * 0.5) * 0.2;
                this.y += this.vy;

                if (this.y < -10 || this.x < -10 || this.x > width + 10) {
                    this.reset();
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;
                ctx.shadowBlur = this.radius * 4;
                ctx.shadowColor = `rgba(${this.color}, 0.8)`;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new SylvaParticle());
        }

        let isRunning = true;
        document.addEventListener('visibilitychange', () => {
            isRunning = !document.hidden;
            if (isRunning) requestAnimationFrame(render);
        });

        function render() {
            if (!isRunning) return;
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles with subtle bioluminescent energy lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const lineAlpha = (1 - dist / 110) * 0.12;
                        ctx.strokeStyle = particles[i].isGold ? 
                            `rgba(229, 155, 88, ${lineAlpha})` : 
                            `rgba(16, 185, 129, ${lineAlpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(render);
        }

        render();
    }

    // --------------------------------------------------------------------------
    // 3. 3D Card & Mockup Gyroscope Tilt
    // --------------------------------------------------------------------------
    function initTiltEffects() {
        const tiltCards = document.querySelectorAll('.browser-mockup, .sylva-3d-card');
        
        tiltCards.forEach(card => {
            const wrapper = card.closest('.mockup-perspective-wrapper') || card.parentElement;
            if (!wrapper) return;

            wrapper.addEventListener('mousemove', (e) => {
                const rect = wrapper.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateY = -10 + ((x / rect.width) * 20);
                const rotateX = 8 - ((y / rect.height) * 16);

                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
            });

            wrapper.addEventListener('mouseleave', () => {
                card.style.transform = `rotateY(-10deg) rotateX(6deg) scale(1)`;
            });
        });
    }

    // --------------------------------------------------------------------------
    // 4. Smooth Magnetic Button Interaction
    // --------------------------------------------------------------------------
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.sylva-btn-primary, .sylva-btn-secondary');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // --------------------------------------------------------------------------
    // 5. Initialize Everything on DOM Load
    // --------------------------------------------------------------------------
    function init() {
        initSpotlights();
        initSylvaCanvas();
        initTiltEffects();
        initMagneticButtons();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.SylvaEngine = {
        refresh: () => {
            initSpotlights();
            initTiltEffects();
            initMagneticButtons();
        }
    };
})();
