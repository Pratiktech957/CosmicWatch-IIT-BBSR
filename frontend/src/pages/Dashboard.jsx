import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen w-full bg-[#030014] text-white flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030014] to-[#030014] z-0" />

            <div className="relative z-20">
                <Navbar />
            </div>

            <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-8 text-center">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 font-mono tracking-tighter"
                >
                    WELCOME {user?.name ? user.name.toUpperCase() : "COMMANDER"}
                </motion.h1>
                <div className="h-0.5 w-24 bg-cyan-500/50 mx-auto mb-6"></div>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-cyan-200/60 font-mono tracking-widest"
                >
                    SYSTEMS ONLINE. AWAITING INSTRUCTIONS.
                </motion.p>
            </div>
        </div>
    );
};

export default Dashboard;
