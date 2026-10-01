import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '../types/game';

interface Props {
  questions: Question[];
  onCompleteTopic: (score: number, wrongQuestionIds: number[]) => void;
  onBackToDashboard: () => void;
}

const MOTIVATIONS = [
  "🔥 Керемет! Сен бір қадам алға жылжыдың!",
  "⚡ Жарайсың! Білімің күшейіп келеді!",
  "🧬 BIOFORCE сенімен бірге дамып жатыр!",
  "🚀 Биология шебері болып барасың!",
  "🧠 Миың өте белсенді жұмыс істеп тұр!"
];

export const QuizEngine: React.FC<Props> = ({ questions, onCompleteTopic, onBackToDashboard }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestionIds, setWrongQuestionIds] = useState<number[]>([]);
  const [motivation, setMotivation] = useState('');

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (index: number) => {
    if (isSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isSubmitted) return;
    setIsSubmitted(true);

    if (selectedAnswer === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
      const randomMotiv = MOTIVATIONS[Math.floor(Math.random() * MOTIVATIONS.length)];
      setMotivation(randomMotiv);
    } else {
      setWrongQuestionIds(prev => [...prev, currentQ.id]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsSubmitted(false);
      setMotivation('');
    } else {
      onCompleteTopic(score, wrongQuestionIds);
    }
  };

  return (
    <div className="min-h-screen bg-[#040d08] text-white p-4 md:p-8 flex flex-col items-center justify-between relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header & Progress */}
      <div className="w-full max-w-3xl flex justify-between items-center bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/20 backdrop-blur-md z-10">
        <button
          onClick={onBackToDashboard}
          className="text-emerald-400 hover:text-white font-bold text-sm transition-colors cursor-pointer"
        >
          ← Dashboard
        </button>
        <span className="font-extrabold text-emerald-300">
          Сұрақ: {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-3xl my-auto bg-emerald-950/30 border border-emerald-500/30 p-6 md:p-8 rounded-2xl backdrop-blur-xl z-10 shadow-[0_0_30px_rgba(16,185,129,0.15)]"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full">
            {currentQ.topicName}
          </span>
          <span className="text-xs text-emerald-400/60 font-semibold uppercase">
            Деңгей: {currentQ.difficulty}
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-6 text-white leading-relaxed">
          {currentQ.question}
        </h3>

        {/* Answers List */}
        <div className="grid grid-cols-1 gap-3 mb-6">
          {currentQ.answers.map((ans, idx) => {
            let btnStyle = "bg-emerald-900/20 border-emerald-500/30 hover:border-emerald-400/60 text-emerald-100";
            if (selectedAnswer === idx) {
              btnStyle = "bg-emerald-500/30 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]";
            }
            if (isSubmitted) {
              if (idx === currentQ.correctAnswer) {
                btnStyle = "bg-emerald-500/40 border-emerald-300 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)]";
              } else if (selectedAnswer === idx) {
                btnStyle = "bg-rose-500/30 border-rose-500 text-rose-200";
              }
            }

            return (
              <button
                key={idx}
                disabled={isSubmitted}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-xl border font-semibold transition-all cursor-pointer ${btnStyle}`}
              >
                <span className="inline-block w-8 text-emerald-400/80 font-bold">{String.fromCharCode(65 + idx)}.</span>
                {ans}
              </button>
            );
          })}
        </div>

        {/* Instant Feedback & Motivation */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-xl border backdrop-blur-md"
            >
              {selectedAnswer === currentQ.correctAnswer ? (
                <div className="text-emerald-300 font-extrabold text-lg flex items-center gap-2">
                  <span>🟢 Дұрыс!</span>
                  <span className="text-sm font-medium text-emerald-200">{motivation}</span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-rose-400 font-extrabold text-lg">🔴 Қате</span>
                  <div className="bg-emerald-950/80 p-3 rounded-lg border border-emerald-500/20 text-xs text-emerald-200/90 leading-relaxed">
                    <strong className="text-emerald-400 block mb-1">📘 Түсіндірме (Оқулық бойынша):</strong>
                    {currentQ.explanation}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button */}
        {!isSubmitted ? (
          <button
            disabled={selectedAnswer === null}
            onClick={handleSubmit}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
          >
            ЖАУАПТЫ ТЕКСЕРУ
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-black font-extrabold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer"
          >
            КЕЛЕСІ СҰРАҚ →
          </button>
        )}
      </motion.div>

      {/* Footer info */}
      <div className="text-xs text-emerald-400/40 z-10">BIOFORCE Quiz Engine • 2026</div>
    </div>
  );
};