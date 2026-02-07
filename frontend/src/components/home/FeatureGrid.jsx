import React from 'react';
import { motion } from 'framer-motion';
import { User, Activity, ShieldAlert, Bell } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="p-8 rounded-2xl bg-space-dark/40 border border-white/5 backdrop-blur-sm group hover:bg-space-dark/60 hover:border-space-accent/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-space-accent rounded-full animate-ping" />
            </div>

            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-space-void to-space-black border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="text-space-highlight group-hover:text-space-accent transition-colors" size={28} />
            </div>

            <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-space-accent transition-colors">
                {title}
            </h3>
            <p className="text-space-highlight/60 text-sm leading-relaxed">
                {desc}
            </p>
        </motion.div>
    );
};

const FeatureGrid = () => {
    const features = [
        {
            icon: User,
            title: "Mission Profiles",
            desc: "Create a personalized account to track specific objects and save simulation configurations.",
            delay: 0.1
        },
        {
            icon: Activity,
            title: "Real-Time Telemetry",
            desc: "Live data streams providing the latest velocity, distance, and magnitude measurements.",
            delay: 0.2
        },
        {
            icon: ShieldAlert,
            title: "Risk Analysis Engine",
            desc: "Advanced algorithms calculating potential impact probabilities and kinetic energy estimates.",
            delay: 0.3
        },
        {
            icon: Bell,
            title: "Strategic Alerts",
            desc: "Receive instant notifications when an object enters a high-probability impact corridor.",
            delay: 0.4
        }
    ];

    return (
        <section className="py-24 bg-transparent relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Core Capabilities</h2>
                    <div className="w-20 h-1 bg-space-accent rounded-full mx-auto md:mx-0" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
