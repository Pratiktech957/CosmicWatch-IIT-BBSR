import React, { useEffect, useRef } from 'react';

const CosmicScrollyCanvas = () => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        const NUM_STARS = 2000;

        // Preload star data
        const initStars = (width, height) => {
            const starArray = [];
            for (let i = 0; i < NUM_STARS; i++) {
                starArray.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2 + 0.5, // Depth factor
                    radius: Math.random() * 1.2,
                    opacity: Math.random() * 0.8 + 0.2,
                    speed: Math.random() * 0.05 + 0.02
                });
            }
            return starArray;
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            stars = initStars(canvas.width, canvas.height);
        };

        const render = () => {
            // 1. Clear with trail effect for speed sensation
            ctx.fillStyle = 'rgba(7, 10, 19, 0.4)'; // #070a13 with opacity for trails
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 2. Get Scroll Progress
            const scrollY = window.scrollY;
            const maxScroll = document.body.scrollHeight - window.innerHeight;
            const scrollFraction = Math.max(0, Math.min(scrollY / (maxScroll || 1), 1));

            // 3. Animation Parameters based on Scroll
            const speedMultiplier = 1 + (scrollFraction * 50); // Massive speedup
            const brightnessBoost = scrollFraction * 0.5;
            const depthZoom = 1 + (scrollFraction * 2); // Stars move apart

            // 4. Draw Stars
            stars.forEach(star => {
                // Move star
                star.y += star.speed * speedMultiplier;

                // Loop around
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                    // When looping at high speed, give random X to prevent "lines"
                    if (speedMultiplier > 10) star.x = Math.random() * canvas.width;
                }

                // Draw
                ctx.beginPath();
                const currentRadius = star.radius * depthZoom;
                const currentOpacity = Math.min(star.opacity + brightnessBoost, 1);

                ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;

                // Radial star movement effect (warp speed) if scrolling fast
                if (scrollFraction > 0.1) {
                    const warpLength = Math.min(speedMultiplier * 2, 50);
                    ctx.ellipse(star.x, star.y, currentRadius, currentRadius + warpLength, 0, 0, Math.PI * 2);
                } else {
                    ctx.arc(star.x, star.y, currentRadius, 0, Math.PI * 2);
                }

                ctx.fill();

                // Add subtle blue/purple glow to some stars
                if (star.z > 2) {
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe';
                } else {
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Init
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-space-950">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                />
                {/* Gradient Overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-space-950/80 via-transparent to-space-950/80 pointer-events-none" />
            </div>
        </div>
    );
};

export default CosmicScrollyCanvas;
