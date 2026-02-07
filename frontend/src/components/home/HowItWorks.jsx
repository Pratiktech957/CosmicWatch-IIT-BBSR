import React from 'react';
import { motion } from 'framer-motion';
import { Satellite, Cpu, Radio } from 'lucide-react';

const Step = ({ icon: Icon, title, desc, stepNum }) => {
    return (
        <div className="relative flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-2xl bg-space-dark border border-space-accent/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,240,255,0.1)]">
                <Icon className="text-space-accent w-10 h-10 group-hover:animate-pulse" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-space-void border border-white/10 flex items-center justify-center text-sm font-mono text-white/50">
                    {stepNum}
                </div>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-3">{title}</h3>
            <p className="text-space-highlight/60 text-sm leading-relaxed max-w-xs">{desc}</p>
        </div>
    );
};

const HowItWorks = () => {
    return (
        <section className="py-32 bg-space-void relative overflow-hidden">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-space-accent/20 to-transparent hidden md:block -translate-y-[80px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
                    >
                        Planetary Defense Grid
                    </motion.h2>
                    <p className="text-space-highlight/60 max-w-2xl mx-auto">
                        Our system aggregates data from global space agencies to provide a unified threat assessment layer for Earth.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <Step
                        stepNum="01"
                        icon={Satellite}
                        title="Data Acquisition"
                        desc="Ingesting real-time telemetry from NASA's JPL, ESA, and independent observatories."
                    />
                    <Step
                        stepNum="02"
                        icon={Cpu}
                        title="Trajectory Analysis"
                        desc="Calculating orbital paths, potential intersections, and impact probabilities using physics engines."
                    />
                    <Step
                        stepNum="03"
                        icon={Radio}
                        title="Public Alert Protocol"
                        desc="Visualizing risks in an accessible format and broadcasting clear, verified tracking data."
                    />
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
