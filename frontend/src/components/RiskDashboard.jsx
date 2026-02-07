import React from 'react';
import { motion } from 'framer-motion';

const RiskLevelRing = ({ level, score }) => {
    const color = level === 'HIGH' ? '#ff2a2a' : level === 'MODERATE' ? '#ff9e00' : '#00f3ff';

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer rotating ring */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-white/20"
            />
            {/* Risk Circle */}
            <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="50%" cy="50%" r="45%" stroke="#1e293b" strokeWidth="8" fill="none" />
                <motion.circle
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: score / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    cx="50%" cy="50%" r="45%"
                    stroke={color}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 10px ${color})` }}
                />
            </svg>
            {/* Text Info */}
            <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-display font-bold" style={{ color }}>{score}</span>
                <span className="text-xs font-mono text-gray-400 mt-2">RISK SCORE</span>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, unit, trend }) => (
    <div className="bg-space-900/40 border border-white/5 rounded-xl p-4 flex flex-col">
        <span className="text-xs text-gray-500 font-mono mb-1">{label}</span>
        <div className="flex items-end gap-2">
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className="text-sm text-gray-400 mb-1">{unit}</span>
        </div>
        {trend && (
            <div className={`text-xs mt-2 ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last hr
            </div>
        )}
    </div>
);

const RiskDashboard = () => {
    return (
        <section className="relative w-full py-20 bg-space-950 text-white overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cosmic-purple/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cosmic-cyan/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                            GLOBAL RISK <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-cosmic-orange">ANALYSIS</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Aggregated data from 142 observatories. Analyzing potential impact events for the next 100 years.
                        </p>
                    </div>
                    <div className="flex gap-4 mt-6 md:mt-0">
                        <div className="text-right">
                            <div className="text-xs text-gray-500 font-mono">OBJECTS TRACKED</div>
                            <div className="text-2xl font-display font-bold">34,102</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500 font-mono">NEOs DETECTED</div>
                            <div className="text-2xl font-display font-bold text-cosmic-cyan">28</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Primary Risk Indicator */}
                    <div className="glass-panel p-8 rounded-3xl flex flex-col items-center justify-center col-span-1 border-t-4 border-red-500">
                        <h3 className="text-xl font-display font-bold mb-8 tracking-widest text-center">CURRENT MAX THREAT</h3>
                        <RiskLevelRing level="MODERATE" score={65} />
                        <div className="mt-8 text-center space-y-2">
                            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-500 border border-red-500/50 rounded text-xs font-mono font-bold animate-pulse">
                                LEVEL: ELEVATED
                            </div>
                            <p className="text-sm text-gray-400">Closest Approach: <span className="text-white">Oct 28, 2028</span></p>
                        </div>
                    </div>

                    {/* Middle Column: Detailed Metrics */}
                    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h4 className="border-b border-white/10 pb-3 mb-4 font-mono text-sm text-cosmic-cyan">VELOCITY DISTRIBUTION</h4>
                            <div className="space-y-4">
                                <StatCard label="AVG VELOCITY" value="18.5" unit="km/s" trend={1.2} />
                                <StatCard label="MAX VELOCITY" value="42.1" unit="km/s" trend={-0.5} />
                            </div>
                            {/* Fake Graph Bars */}
                            <div className="flex items-end h-24 gap-2 mt-6">
                                {[40, 65, 30, 80, 50, 90, 45, 60, 75, 55].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex-1 bg-white/10 hover:bg-cosmic-cyan/50 rounded-t-sm transition-colors"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl border border-white/10">
                            <h4 className="border-b border-white/10 pb-3 mb-4 font-mono text-sm text-cosmic-orange">IMPACT PROBABILITY</h4>
                            <div className="space-y-4">
                                <div className="bg-space-900/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between mb-2 text-xs">
                                        <span className="text-gray-400">BENNU</span>
                                        <span className="text-white">1 in 2,700</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '45%' }}
                                            className="h-full bg-cosmic-orange"
                                        />
                                    </div>
                                </div>
                                <div className="bg-space-900/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between mb-2 text-xs">
                                        <span className="text-gray-400">2023 DW</span>
                                        <span className="text-white">1 in 560</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '70%' }}
                                            className="h-full bg-red-500"
                                        />
                                    </div>
                                </div>
                                <div className="bg-space-900/40 p-4 rounded-xl border border-white/5">
                                    <div className="flex justify-between mb-2 text-xs">
                                        <span className="text-gray-400">1950 DA</span>
                                        <span className="text-white">1 in 300</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '85%' }}
                                            className="h-full bg-red-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Long Card Bottom */}
                        <div className="glass-panel p-6 rounded-2xl md:col-span-2 border border-white/10 flex items-center justify-between">
                            <div>
                                <h4 className="font-display font-bold text-lg">Download Full Report</h4>
                                <p className="text-xs text-gray-400">CSV, JSON, and PDF formats available</p>
                            </div>
                            <button className="px-6 py-2 bg-white text-space-950 font-bold rounded hover:bg-gray-200 transition-colors">
                                EXPORT DATA
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RiskDashboard;
