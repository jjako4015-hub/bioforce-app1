import React from 'react';
import { motion } from 'framer-motion';

interface Topic {
  id: number;
  week: number;
  title: string;
  questionCount: number;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface Props {
  completedTopics: number[];
  onSelectTopic: (topicId: number) => void;
  onBackToDashboard: () => void;
}

const TOPICS_LIST = [
  // 1-АПТА
  { id: 1, week: 1, title: "1. Прокариот және эукариот жасушалары", questionCount: 20 },
  { id: 2, week: 1, title: "2. Ұлпалар, мүшелер және мүшелер жүйесі", questionCount: 20 },
  { id: 3, week: 1, title: "3. Тірі организмдер үшін судың маңызы", questionCount: 20 },
  { id: 4, week: 1, title: "4. Микро және макроэлементтердің рөлі", questionCount: 20 },
  // 2-АПТА
  { id: 5, week: 2, title: "5. Көмірсулар мен липидтер", questionCount: 20 },
  { id: 6, week: 2, title: "6. Нәруыздардың касиеті мен қызметі", questionCount: 20 },
  { id: 7, week: 2, title: "7. ДНҚ молекуласының құрылысы", questionCount: 20 },
  { id: 8, week: 2, title: "8. Минералды тыңайтқыштар (N, P, K)", questionCount: 20 },
];

export const TopicSelection: React.FC<Props> = ({ completedTopics, onSelectTopic, onBackToDashboard }) => {
  const isTopicUnlocked = (topicId: number) => {
    if (topicId === 1) return true; // Бірінші тақырып әрдайым ашық
    return completedTopics.includes(topicId - 1); // Алдыңғы тақырып бітсе ғана ашылады
  };

  return (
    <div className="min-h-screen bg-[#040d08] text-white p-6 flex flex-col items-center relative overflow-hidden">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        <button onClick={onBackToDashboard} className="text-emerald-400 hover:text-white font-bold cursor-pointer">
          ← Dashboard
        </button>
        <h2 className="text-3xl font-black text-emerald-400">ОҚУ БӨЛІМІ</h2>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10">
        {/* 1-АПТА */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl backdrop-blur-md">
          <h3 className="text-2xl font-black text-emerald-300 mb-4 border-b border-emerald-500/30 pb-2">
            1-АПТА (Модуль 1)
          </h3>
          <div className="flex flex-col gap-3">
            {TOPICS_LIST.filter(t => t.week === 1).map(topic => {
              const unlocked = isTopicUnlocked(topic.id);
              const completed = completedTopics.includes(topic.id);

              return (
                <motion.button
                  key={topic.id}
                  disabled={!unlocked}
                  whileHover={unlocked ? { scale: 1.02 } : {}}
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full p-4 rounded-xl border text-left flex justify-between items-center font-bold transition-all ${
                    completed
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : unlocked
                      ? 'bg-emerald-900/30 border-emerald-500/40 text-white cursor-pointer hover:border-emerald-300'
                      : 'bg-emerald-950/60 border-emerald-900/40 text-emerald-600/50 cursor-not-allowed'
                  }`}
                >
                  <span>{topic.title}</span>
                  <span className="text-lg">
                    {completed ? '✅' : unlocked ? '🔓' : '🔒'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* 2-АПТА */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl backdrop-blur-md">
          <h3 className="text-2xl font-black text-emerald-300 mb-4 border-b border-emerald-500/30 pb-2">
            2-АПТА (Модуль 2)
          </h3>
          <div className="flex flex-col gap-3">
            {TOPICS_LIST.filter(t => t.week === 2).map(topic => {
              const unlocked = isTopicUnlocked(topic.id);
              const completed = completedTopics.includes(topic.id);

              return (
                <motion.button
                  key={topic.id}
                  disabled={!unlocked}
                  whileHover={unlocked ? { scale: 1.02 } : {}}
                  onClick={() => onSelectTopic(topic.id)}
                  className={`w-full p-4 rounded-xl border text-left flex justify-between items-center font-bold transition-all ${
                    completed
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                      : unlocked
                      ? 'bg-emerald-900/30 border-emerald-500/40 text-white cursor-pointer hover:border-emerald-300'
                      : 'bg-emerald-950/60 border-emerald-900/40 text-emerald-600/50 cursor-not-allowed'
                  }`}
                >
                  <span>{topic.title}</span>
                  <span className="text-lg">
                    {completed ? '✅' : unlocked ? '🔓' : '🔒'}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};