import React, { useState } from 'react';
import { motion } from 'framer-motion';

const RiskLevel = ({ level, color, range, title, desc, isActive, onHover }) => (
    <motion.div
        className={`flex-1 p-8 border hover:flex-[1.5] transition-all duration-500 cursor-default group relative overflow-hidden
        ${isActive ? `bg-${color}/10 border-${color}` : 'bg-transparent border-white/5'}
    `}
        onMouseEnter={onHover}
    >
        <div className={`absolute top-0 left-0 w-1 h-full bg-${color} opacity-50`} />

        <div className="relative z-10">
            <span className={`text-xs font-mono font-bold uppercase tracking-widest text-${color} mb-2 block`}>
                Level {level}
            </span>
            <h3 className="text-3xl font-display font-bold text-white mb-2">{title}</h3>
            <p className="text-white/40 font-mono text-sm mb-6">{range}</p>

            <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isActive ? 1 : 0.5, height: 'auto' }}
                className="text-space-highlight/70 text-sm leading-relaxed"
            >
                {desc}
            </motion.p>
        </div>

        {/* Background Glow */}
        {isActive && (
            <div className={`absolute -right-10 -bottom-10 w-64 h-64 bg-${color}/20 blur-[80px] rounded-full pointer-events-none`} />
        )}
    </motion.div>
);

const RiskScale = () => {
    const [hovered, setHovered] = useState(1);

    return (
        <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-display font-bold text-white mb-2">Torino Impact Hazard Scale</h2>
                        <p className="text-space-highlight/60">Standardized classification for near-Earth object impact events.</p>
                    </div>
                    <div className="hidden md:block text-right">
                        <div className="text-xs font-mono text-space-success">CURRENT GLOBAL THREAT</div>
                        <div className="text-2xl font-bold text-space-success">LEVEL 0 (NO HAZARD)</div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 h-[600px] md:h-[400px]">
                    <RiskLevel
                        level="0-1"
                        title="NO HAZARD"
                        range="0% Impact Probability"
                        color="space-success"
                        desc="The likelihood of a collision is zero, or is so low as to be effectively zero. Also applies to small objects such as meteors and bolides that burn up in the atmosphere."
                        isActive={hovered === 0}
                        onHover={() => setHovered(0)}
                    />
                    <RiskLevel
                        level="2-4"
                        title="MERITING ATTENTION"
                        range="> 1% Probability"
                        color="space-warning"
                        desc="A close pass by a near-Earth object is predicted 10x closer than the moon. While meriting attention by astronomers, there is no cause for public concern."
                        isActive={hovered === 1}
                        onHover={() => setHovered(1)}
                    />
                    <RiskLevel
                        level="5-7"
                        title="THREATENING"
                        range="Sig. Impact Chance"
                        color="orange-600"
                        desc="A close encounter posing a serious, but still uncertain threat of a regional devastation. Critical attention by astronomers is predicted to determine conclusively whether or not a collision will occur."
                        isActive={hovered === 2}
                        onHover={() => setHovered(2)}
                    />
                    <RiskLevel
                        level="8-10"
                        title="CERTAIN COLLISION"
                        range="100% Impact"
                        color="space-danger"
                        desc="A collision is certain, capable of causing localized destruction for a small object or global climatic catastrophe for a large one. Global emergency procedures activated."
                        isActive={hovered === 3}
                        onHover={() => setHovered(3)}
                    />
                </div>
            </div>
        </section>
    );
};

export default RiskScale;
