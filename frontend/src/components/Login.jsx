import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, Globe } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLogin(); // Call parent handler
        }, 1500);
    };

    return (
        <div className="flex min-h-screen w-full bg-space-950 overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cosmic-purple/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cosmic-cyan/20 blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,3,10,0.8)_100%)] z-10" />
            </div>

            <div className="relative z-20 flex w-full max-w-7xl mx-auto p-6 items-center justify-center lg:justify-between gap-12">
                {/* Left Side: Text/Hero - Hidden on mobile, visible on lg */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:flex flex-col gap-6 max-w-xl"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-mono text-gray-300 tracking-wider">SYSTEM STATUS: ONLINE</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 leading-tight">
                        Cosmic <br /> Watch
                    </h1>

                    <p className="text-lg text-gray-400 font-light leading-relaxed">
                        Advanced Near-Earth Object surveillance and risk assessment dashboard.
                        Monitor potential cosmic hazards in real-time with NASA-powered data streams.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-2xl font-display font-bold text-cosmic-cyan">25k+</h3>
                            <p className="text-sm text-gray-400 font-mono">NEOs TRACKED</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                            <h3 className="text-2xl font-display font-bold text-cosmic-purple">99.9%</h3>
                            <p className="text-sm text-gray-400 font-mono">UPTIME</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="w-full max-w-md"
                >
                    <div className="bg-space-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden group">
                        {/* Border Gradient Animation */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cosmic-cyan/20 to-cosmic-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8 text-center">
                                <div className="mx-auto w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 border border-white/10 rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                    <Globe className="w-6 h-6 text-cosmic-cyan" />
                                </div>
                                <h2 className="text-2xl font-display font-bold text-white mb-2">Welcome Back</h2>
                                <p className="text-gray-500 text-sm">Enter your credentials to access the bridge.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                    <div className="relative group/input">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-cosmic-cyan transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-cosmic-cyan/50 focus:ring-1 focus:ring-cosmic-cyan/50 transition-all"
                                            placeholder="commander@cosmicwatch.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest ml-1">Code</label>
                                    <div className="relative group/input">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-cosmic-purple transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-12 text-white placeholder-gray-600 focus:outline-none focus:border-cosmic-purple/50 focus:ring-1 focus:ring-cosmic-purple/50 transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-xs">
                                    <label className="flex items-center gap-2 cursor-pointer group/check">
                                        <input type="checkbox" className="round border-white/20 bg-transparent checked:bg-cosmic-cyan rounded-sm accent-cosmic-cyan" />
                                        <span className="text-gray-400 group-hover/check:text-gray-300 transition-colors">Remember me</span>
                                    </label>
                                    <a href="#" className="text-cosmic-cyan hover:text-cosmic-cyan/80 transition-colors">Forgot password?</a>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-cosmic-cyan to-cosmic-purple hover:from-cosmic-cyan/80 hover:to-cosmic-purple/80 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cosmic-purple/20"
                                >
                                    {isLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <span>Initiate Sequence</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-8 text-center text-sm text-gray-500">
                                <span>New to the program? </span>
                                <a href="#" className="text-white hover:text-cosmic-cyan transition-colors font-medium">Request Access</a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
