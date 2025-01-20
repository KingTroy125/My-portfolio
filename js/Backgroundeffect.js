const canvas = document.getElementById('backgroundCanvas');
        const ctx = canvas.getContext('2d');

        // Detect mobile device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        // Adjust particle count based on device
        const particleCount = isMobile ? 50 : 100;

        // Set canvas size with pixel ratio consideration
        function setCanvasSize() {
            const pixelRatio = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;
            canvas.style.width = window.innerWidth + 'px';
            canvas.style.height = window.innerHeight + 'px';
            ctx.scale(pixelRatio, pixelRatio);
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5; // Smaller particles for better performance
                this.baseSpeed = Math.random() * 0.5 + 0.2; // Base speed for movement
                this.angle = Math.random() * Math.PI * 2; // Random direction
                this.speedX = Math.cos(this.angle) * this.baseSpeed;
                this.speedY = Math.sin(this.angle) * this.baseSpeed;
                this.opacity = Math.random() * 0.4 + 0.1;
                this.directionChangeTimer = 0;
                this.directionChangeInterval = Math.random() * 200 + 100;
            }

            update() {
                // Smooth direction change
                this.directionChangeTimer++;
                if (this.directionChangeTimer >= this.directionChangeInterval) {
                    this.angle += (Math.random() - 0.5) * 0.5; // Slight direction adjustment
                    this.speedX = Math.cos(this.angle) * this.baseSpeed;
                    this.speedY = Math.sin(this.angle) * this.baseSpeed;
                    this.directionChangeTimer = 0;
                }

                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges with smooth transition
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(100, 149, 237, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const particles = Array.from({ length: particleCount }, () => new Particle());

        // Performance optimization variables
        let lastTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        // Animation loop with timing control
        function animate(currentTime) {
            requestAnimationFrame(animate);

            // Control frame rate
            const deltaTime = currentTime - lastTime;
            if (deltaTime < frameInterval) return;
            lastTime = currentTime - (deltaTime % frameInterval);

            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections with distance optimization
            const maxDistance = isMobile ? 80 : 100;
            particles.forEach((p1, i) => {
                // Only check nearby particles for better performance
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = dx * dx + dy * dy; // Squared distance for performance
                    const maxDistanceSquared = maxDistance * maxDistance;

                    if (distance < maxDistanceSquared) {
                        const alpha = 0.1 * (1 - Math.sqrt(distance) / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(100, 149, 237, ${alpha})`;
                        ctx.stroke();
                    }
                }
            });
        }

        // Disable touch events on canvas
        canvas.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
        canvas.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

        // Start animation
        requestAnimationFrame(animate);