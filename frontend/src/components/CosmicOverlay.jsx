import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CosmicOverlay = () => {
    const { scrollYProgress } = useScroll();

    // Fade in/out and parallax transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.25], [1, 1.5]);

    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.2, 0.4], [-100, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.45, 0.65], [100, 0]);

    return (
        <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-20">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 0% - Main Title */}
                <motion.div
                    style={{ opacity: opacity1, scale: scale1 }}
                    className="absolute text-center px-4"
                >
                    <h1 className="text-5xl md:text-8xl font-display font-black text-white mb-6 drop-shadow-[0_0_30px_rgba(0,243,255,0.5)] tracking-tighter">
                        COSMIC<br />WATCH
                    </h1>
                    <div className="inline-block relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cosmic-cyan to-cosmic-purple blur opacity-30" />
                        <div className="relative border border-white/20 bg-space-950/50 backdrop-blur-sm px-8 py-3 rounded-full">
                            <p className="text-sm md:text-xl font-mono text-cosmic-cyan tracking-[0.2em] font-bold">
                                INTERSTELLAR ASTEROID TRACKER
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* 30% - Left Panel */}
                <motion.div
                    style={{ opacity: opacity2, x: x2 }}
                    className="absolute left-6 md:left-24 top-1/2 -translate-y-1/2 max-w-lg"
                >
                    <div className="glass-panel p-8 md:p-10 rounded-3xl border-l-4 border-cosmic-purple shadow-[0_0_50px_rgba(188,19,254,0.2)]">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-3 h-3 bg-cosmic-purple rounded-full animate-pulse" />
                            <h2 className="text-xl font-mono text-cosmic-purple uppercase tracking-widest">Live Feed</h2>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            Near-Earth Object Tracking
                        </h3>
                        <p className="text-lg text-gray-300 font-sans leading-relaxed mb-8">
                            Processing data from NASA's NeoWs API to detect orbital trajectories and potential impact events in real-time.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-space-950/50 p-4 rounded-xl border border-white/10">
                                <div className="text-2xl font-display text-white mb-1">2,405</div>
                                <div className="text-xs text-gray-400 font-mono">OBJECTS TRACKED</div>
                            </div>
                            <div className="bg-space-950/50 p-4 rounded-xl border border-white/10">
                                <div className="text-2xl font-display text-white mb-1">0.4 AU</div>
                                <div className="text-xs text-gray-400 font-mono">CLOSEST APPROACH</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 60% - Right Panel */}
                <motion.div
                    style={{ opacity: opacity3, x: x3 }}
                    className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 max-w-lg text-right"
                >
                    <div className="glass-panel p-8 md:p-10 rounded-3xl border-r-4 border-cosmic-orange shadow-[0_0_50px_rgba(255,158,0,0.2)]">
                        <div className="flex items-center justify-end gap-3 mb-4">
                            <h2 className="text-xl font-mono text-cosmic-orange uppercase tracking-widest">Risk Assessment</h2>
                            <span className="w-3 h-3 bg-cosmic-orange rounded-full animate-pulse" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                            Planetary Defense Awareness
                        </h3>
                        <p className="text-lg text-gray-300 font-sans leading-relaxed mb-8">
                            Visualizing the unspoken reality of cosmic threats. Converting complex telemetry into actionable human understanding.
                        </p>
                        <button className="px-8 py-3 bg-cosmic-orange/20 text-cosmic-orange border border-cosmic-orange/50 rounded-full font-bold hover:bg-cosmic-orange hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
                            View Risk Dashboard
                        </button>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default CosmicOverlay;
