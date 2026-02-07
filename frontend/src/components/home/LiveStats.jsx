import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ArrowUpRight, Globe } from 'lucide-react';

const StatCard = ({ label, value, unit, icon: Icon, color, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`relative p-6 rounded-xl bg-space-void/40 border border-white/5 backdrop-blur-sm group hover:border-${color}/50 transition-all duration-300`}
        >
            <div className={`absolute inset-0 bg-${color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg bg-${color}/10 text-${color}`}>
                    <Icon size={24} />
                </div>
                <span className={`text-xs font-mono uppercase tracking-widest text-${color} bg-${color}/10 px-2 py-1 rounded`}>
                    Live
                </span>
            </div>

            <h3 className="text-3xl font-display font-bold text-white mb-1 group-hover:text-glow transition-all">
                {value}<span className="text-lg text-white/50 font-sans ml-1">{unit}</span>
            </h3>
            <p className="text-sm text-space-highlight/70 uppercase tracking-wider font-medium">
                {label}
            </p>
        </motion.div>
    );
};

const LiveStats = () => {
    const stats = [
        { label: "NEOs Today", value: "12", unit: "Objects", icon: Globe, color: "space-accent", delay: 0.1 },
        { label: "Hazardous", value: "2", unit: "Detected", icon: AlertTriangle, color: "space-danger", delay: 0.2 },
        { label: "Closest Approach", value: "1.2", unit: "LD", icon: ArrowUpRight, color: "space-warning", delay: 0.3 },
        { label: "Max Velocity", value: "45k", unit: "km/h", icon: Activity, color: "purple-500", delay: 0.4 },
    ];

    return (
        <section className="py-20 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-sm font-mono text-space-accent tracking-widest uppercase mb-2">System Status</h2>
                    <p className="text-2xl font-display text-white">Daily Orbital Scan</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LiveStats;
