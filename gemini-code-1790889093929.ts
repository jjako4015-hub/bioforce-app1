import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onStart: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#040d08] text-white overflow-hidden">
      {/* Background Neon Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-green-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Title Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-600 drop-shadow-[0_0_35px_rgba(16,185,129,0.7)]">
          BIOFORCE
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light text-emerald-200/80 tracking-widest uppercase">
          Interactive Biology Learning Platform
        </p>
      </motion.div>

      {/* Start Button */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(16, 185, 129, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="mt-12 z-10 px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-black font-extrabold text-xl rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-300/40 backdrop-blur-md cursor-pointer transition-all"
      >
        КІРУ / START
      </motion.button>
    </div>
  );
};