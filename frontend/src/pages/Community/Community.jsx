import Navbar from "../../components/layout/Navbar";

const Community = () => {
    return (
        <div className="min-h-screen bg-[#030014] text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030014] to-[#030014] z-0" />
            <div className="relative z-10">
                <Navbar />
                <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 mb-4 font-mono tracking-tighter">
                        GALACTIC COMMUNITY
                    </h1>
                    <p className="text-xl text-cyan-200/60 font-mono tracking-widest">
                        JOIN THE DISCUSSION COMMANDER
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Community;
