import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";

const Dashboard = () => {
    return (
        <div className="min-h-screen w-full bg-[#030014] text-white flex items-center justify-center overflow-hidden relative">
            {/* Background elements similar to AuthLayout but maybe less intense for a dashboard, 
           or reusing AuthLayout if it fits. For a dashboard, a full screen layout is usually better than a centered card.
           Let's make a simple cosmic dashboard view. */}

            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030014] to-[#030014] z-0" />

            <div className="z-10 text-center p-8">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4"
                >
                    Welcome Commander
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.8 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-300"
                >
                    Systems are online. Awaiting instructions.
                </motion.p>
            </div>
        </div>
    );
};

export default Dashboard;
