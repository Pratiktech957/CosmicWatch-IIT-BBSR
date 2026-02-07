import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-transparent">
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

                    <Link to="/signup" className="group flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-display font-bold text-lg tracking-widest uppercase hover:bg-white/5 transition-all">
                        <Globe size={20} className="text-space-accent" />
                        Create Free Account
                    </Link>
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
