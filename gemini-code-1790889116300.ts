import React from 'react';
import { motion } from 'framer-motion';
import { UserState, RANKS_DATA } from '../types/game';
import { CharacterViewer } from './3d/CharacterViewer';

interface Props {
  userState: UserState;
  onStartStudy: () => void;
}

export const Dashboard: React.FC<Props> = ({ userState, onStartStudy }) => {
  const currentRanks = userState.selectedProfile ? RANKS_DATA[userState.selectedProfile] : [];
  const currentRank = currentRanks.find(r => r.level === userState.currentLevel) || currentRanks[0];

  return (
    <div className="min-h-screen bg-[#040d08] text-white p-6 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[800px] h-[800px] bg-emerald-600/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center bg-emerald-950/40 border border-emerald-500/20 rounded-2xl p-4 backdrop-blur-md z-10 gap-4">
        <div>
          <h1 className="text-2xl font-black text-emerald-400">
            Қош келдің, <span className="text-white">{userState.username || 'Оқушы'}</span>!
          </h1>
          <p className="text-sm text-emerald-200/70 font-semibold">
            Профиль: <span className="text-emerald-300 capitalize">{userState.selectedProfile?.replace('_', ' ')}</span>
          </p>
        </div>

        {/* XP Progress Bar */}
        <div className="w-full sm:w-64 flex flex-col gap-1">
          <div className="flex justify-between text-xs font-bold text-emerald-300">
            <span>Level {userState.currentLevel}: {currentRank?.character}</span>
            <span>{userState.xp} / 2000 XP</span>
          </div>
          <div className="w-full bg-emerald-950/80 rounded-full h-3 border border-emerald-500/30 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-green-300 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_#10b981]"
              style={{ width: `${Math.min((userState.xp / 2000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </header>

      {/* Center 3D Model Display */}
      <main className="w-full max-w-4xl flex flex-col items-center my-auto z-10">
        <h2 className="text-3xl font-extrabold text-emerald-300 tracking-wider mb-2 text-center drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
          {currentRank?.character}
        </h2>
        <span className="text-sm font-semibold px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 mb-4">
          Ранг: {currentRank?.title}
        </span>

        {/* 3D Canvas */}
        <CharacterViewer characterName={currentRank?.character || ''} />

        {/* START Button & Stats */}
        <div className="flex flex-col items-center mt-6 gap-3">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0px 0px 35px rgba(16, 185, 129, 0.9)" }}
            whileTap={{ scale: 0.92 }}
            onClick={onStartStudy}
            className="px-16 py-5 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-600 text-black font-black text-3xl rounded-2xl shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-emerald-200 cursor-pointer tracking-widest transition-all"
          >
            БАСТАУ
          </motion.button>

          <div className="flex gap-6 text-sm font-bold text-emerald-200/80 bg-emerald-950/60 px-6 py-2 rounded-xl border border-emerald-500/20 backdrop-blur-md">
            <span>3 МОДУЛЬ</span>
            <span>•</span>
            <span>Барлығы: 260 сұрақ</span>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="text-xs text-emerald-400/50 z-10">
        BIOFORCE © 2026 — Interactive Gamified Biology Platform
      </footer>
    </div>
  );
};