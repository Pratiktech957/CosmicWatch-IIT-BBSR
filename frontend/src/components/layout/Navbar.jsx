import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, AlertTriangle, Eye, User } from 'lucide-react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Live Feed', path: '/live' },
        { name: '3D View', path: '/orbit' },
        { name: 'Community', path: '/community' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
                scrolled ? 'bg-space-void/80 backdrop-blur-md border-white/10 py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-space-accent to-blue-600 flex items-center justify-center animate-pulse-slow">
                        <span className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span className="font-display font-bold text-2xl tracking-wider text-white group-hover:text-space-accent transition-colors">
                        COSMIC<span className="font-light text-space-highlight">WATCH</span>
                    </span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="relative text-space-highlight hover:text-space-accent font-sans text-sm tracking-wide transition-colors group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-space-accent transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-space-highlight hover:text-space-warning transition-colors" title="Alerts">
                        <AlertTriangle size={20} />
                    </button>
                    <button className="text-space-highlight hover:text-space-success transition-colors" title="Watchlist">
                        <Eye size={20} />
                    </button>
                    <Link to="/login" className="flex items-center gap-2 px-4 py-2 border border-space-accent/50 rounded hover:bg-space-accent/10 transition-all text-space-accent font-display text-sm uppercase tracking-wider">
                        <User size={16} />
                        <span>Login</span>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-space-highlight"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-space-void/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-lg font-display text-space-highlight hover:text-space-accent"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-[1px] bg-white/10 my-2" />
                            <button className="flex items-center gap-2 text-space-warning">
                                <AlertTriangle size={18} /> Alerts
                            </button>
                            <button className="flex items-center gap-2 text-space-highlight">
                                <Eye size={18} /> Watchlist
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
