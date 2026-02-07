import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, AlertTriangle, ShieldCheck } from 'lucide-react';

const WatchListCard = ({ name, date, distance, size, hazard, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(0, 243, 255, 0.2)' }}
            className="glass-card p-6 rounded-xl flex flex-col justify-between h-full group cursor-pointer"
        >
            <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="space-y-1">
                        <span className="text-xs font-mono text-gray-400">NEO-ID</span>
                        <h3 className="text-2xl font-display font-bold text-white group-hover:text-cosmic-cyan transition-colors">{name}</h3>
                    </div>
                    {hazard ? (
                        <AlertTriangle className="text-red-500 animate-pulse" size={20} />
                    ) : (
                        <ShieldCheck className="text-green-500" size={20} />
                    )}
                </div>

                <div className="space-y-2 mt-4">
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Close Approach</span>
                        <span className="font-mono text-white">{date}</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-white/5 pb-2">
                        <span className="text-gray-400">Miss Distance</span>
                        <span className="font-mono text-white">{distance} LD</span>
                    </div>
                    <div className="flex justify-between text-sm pb-2">
                        <span className="text-gray-400">Est. Diameter</span>
                        <span className="font-mono text-white">{size} m</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-1 rounded bg-white/5 ${hazard ? 'text-red-400' : 'text-green-400'}`}>
                    {hazard ? 'HAZARDOUS' : 'SAFE'}
                </span>
                <button className="p-2 rounded-full bg-white/5 hover:bg-cosmic-cyan hover:text-black transition-colors">
                    <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    );
};

const WatchlistGrid = () => {
    // Mock Data
    const asteroids = [
        { name: '2023 DZ2', date: 'Mar 25, 2023', distance: '0.45', size: '40-90', hazard: true },
        { name: '4660 Nereus', date: 'Dec 11, 2021', distance: '10.2', size: '330', hazard: false },
        { name: 'Apophis', date: 'Apr 13, 2029', distance: '0.1', size: '370', hazard: true },
        { name: '2024 MK', date: 'Jun 29, 2024', distance: '0.77', size: '150', hazard: true },
        { name: '1994 PC1', date: 'Jan 18, 2022', distance: '5.1', size: '1000', hazard: false },
        { name: '2011 UL21', date: 'Jun 27, 2024', distance: '17.0', size: '2200', hazard: true },
    ];

    return (
        <section className="w-full py-20 bg-space-950 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                            PRIORITY <span className="text-cosmic-purple">WATCHLIST</span>
                        </h2>
                        <p className="text-gray-400 mt-2">Objects requiring immediate attention and continuous tracking.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                        <Eye size={18} className="text-cosmic-purple group-hover:text-white transition-colors" />
                        <span className="font-bold text-sm">VIEW ALL 34k OBJECTS</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {asteroids.map((ast, i) => (
                        <WatchListCard key={i} index={i} {...ast} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WatchlistGrid;
