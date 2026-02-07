import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'three/examples/jsm/utils/BufferGeometryUtils.js'; // Note: BufferGeometryUtils might not have the correct random function export.
// Actually, standard practice for random points:
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';

const StarField = (props) => {
    const ref = useRef();

    // Generating random points properly
    const sphere = useMemo(() => {
        const temp = new Float32Array(5000 * 3);
        for (let i = 0; i < 5000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.2 + Math.random() * 0.8; // Radius between 1.2 and 2.0 to be outside a potential "earth" if we add one, or just general sphere
            // Actually for a simple starfield fill:
            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            // Normalize and scale
            const d = Math.sqrt(x * x + y * y + z * z);
            temp[i * 3] = (x / d) * (10 + Math.random() * 20); // Spread out
            temp[i * 3 + 1] = (y / d) * (10 + Math.random() * 20);
            temp[i * 3 + 2] = (z / d) * (10 + Math.random() * 20);

            // Let's just use a simple random box distribution for performance and look
            // temp[i*3] = (Math.random() - 0.5) * 30;
            // temp[i*3+1] = (Math.random() - 0.5) * 30;
            // temp[i*3+2] = (Math.random() - 0.5) * 30;
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 30;
        ref.current.rotation.y -= delta / 40;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-space-black">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 opacity-60">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <StarField />
                </Canvas>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-space-black/20 to-space-black pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-space-accent/10 border border-space-accent/20 text-space-accent text-xs font-mono uppercase tracking-widest mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-space-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-space-accent"></span>
                        </span>
                        System Online: Tracking 34,000+ Objects
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-space-highlight to-space-accent/50 mb-6 drop-shadow-2xl"
                >
                    COSMIC WATCH
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-lg md:text-2xl text-space-highlight/80 max-w-2xl mx-auto mb-10 font-light"
                >
                    Real-time <span className="text-space-accent">Near-Earth Object</span> monitoring and risk analysis.
                    Visualizing the threat from above in cinematic detail.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >
                    <button className="group relative px-8 py-4 bg-space-accent text-space-black font-display font-bold text-lg tracking-widest uppercase hover:bg-white transition-all clip-path-slant overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                            View Live Asteroids <ArrowRight size={20} />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <button className="group flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-display font-bold text-lg tracking-widest uppercase hover:bg-white/5 transition-all">
                        <Globe size={20} className="text-space-accent" />
                        Create Free Account
                    </button>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-10 hidden md:block">
                <div className="text-xs font-mono text-space-highlight/40">
                    Coordinates: 34.0522° N, 118.2437° W<br />
                    Sector: Milky Way / Orion Arm
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
