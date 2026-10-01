import React from 'react';
import { motion } from 'framer-motion';
import { ProfileUniverse } from '../types/game';

interface Props {
  onSelectProfile: (universe: ProfileUniverse) => void;
}

const UNIVERSES: { id: ProfileUniverse; title: string; icon: string; desc: string; special?: boolean }[] = [
  { id: 'demon_slayer', title: 'Demon Slayer', icon: '🗡️', desc: 'Tanjiro → Yoriichi' },
  { id: 'one_piece', title: 'One Piece', icon: '🏴‍☠️', desc: 'Usopp → Gear 5 Luffy' },
  { id: 'mha', title: 'My Hero Academia', icon: '👊', desc: 'Deku → Deku 100%' },
  { id: 'dr_stone', title: 'Dr. Stone', icon: '🧪', desc: 'Chrome → Kingdom of Science', special: true },
  { id: 'marvel', title: 'Marvel', icon: '🦸', desc: 'Spider-Man → Thanos' },
  { id: 'harry_potter', title: 'Harry Potter', icon: '🧙', desc: 'Hogwarts Student → Wizard Legend' },
];

export const ProfileSelector: React.FC<Props> = ({ onSelectProfile }) => {
  return (
    <div className="min-h-screen bg-[#040d08] text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-extrabold text-emerald-400 mb-8 text-center drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"
      >
        Өз профиліңді таңда
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full z-10">
        {UNIVERSES.map((universe, idx) => (
          <motion.div
            key={universe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            onClick={() => onSelectProfile(universe.id)}
            className={`cursor-pointer p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 relative overflow-hidden ${
              universe.special
                ? 'bg-emerald-950/40 border-emerald-400/80 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                : 'bg-emerald-900/10 border-emerald-500/20 hover:border-emerald-400/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
            }`}
          >
            {universe.special && (
              <span className="absolute top-3 right-3 text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-full font-bold">
                BIOFORCE Match 🧬
              </span>
            )}
            <div className="text-5xl mb-4">{universe.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{universe.title}</h3>
            <p className="text-emerald-300/70 text-sm font-medium">{universe.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};