import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MessageSquare, ArrowRight } from 'lucide-react';

const TeaserCard = ({ title, sub, desc, icon: Icon, image, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 hover:border-space-accent/50 transition-all duration-500"
        >
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-black z-10" />
            <div className="absolute inset-0 bg-space-dark/50 group-hover:bg-space-dark/30 transition-colors duration-500 z-0" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-space-accent">
                        <Icon size={24} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-space-accent text-space-black text-xs font-bold uppercase tracking-wider">
                        Advanced
                    </div>
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-2">{title}</h3>
                <p className="text-space-highlight/70 text-sm mb-6">{desc}</p>

                <button className="flex items-center gap-2 text-white font-medium group-hover:gap-4 transition-all duration-300">
                    Launch Module <ArrowRight size={16} className="text-space-accent" />
                </button>
            </div>
        </motion.div>
    );
}

const BonusTeaser = () => {
    return (
        <section className="py-24 bg-space-black relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-space-accent font-mono text-xs uppercase tracking-widest mb-2 block">Experimental Features</span>
                    <h2 className="text-4xl font-display font-bold text-white">Expanded Access</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <TeaserCard
                        title="3D Orbital Visualization"
                        desc="Interactive WebGL engine rendering real-time asteroid trajectories and planetary positions."
                        icon={Globe}
                        delay={0.2}
                    />
                    <TeaserCard
                        title="Global Comms Channel"
                        desc="Encrypted community frequency for discussing sightings, close approaches, and analysis."
                        icon={MessageSquare}
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
};

export default BonusTeaser;
