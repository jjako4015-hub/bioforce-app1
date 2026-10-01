import React from 'react';
import { Question } from '../types/game';

interface Props {
  wrongQuestions: Question[];
  onRetryQuestion: (questionId: number) => void;
  onBackToDashboard: () => void;
}

export const WrongAnswersReview: React.FC<Props> = ({ wrongQuestions, onRetryQuestion, onBackToDashboard }) => {
  return (
    <div className="min-h-screen bg-[#040d08] text-white p-6 flex flex-col items-center relative">
      <div className="w-full max-w-4xl flex justify-between items-center mb-8 z-10">
        <button onClick={onBackToDashboard} className="text-emerald-400 hover:text-white font-bold cursor-pointer">
          ← Dashboard
        </button>
        <h2 className="text-3xl font-black text-rose-500">❌ ҚАТЕМЕН ЖҰМЫС</h2>
      </div>

      {wrongQuestions.length === 0 ? (
        <div className="my-auto text-center p-8 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl backdrop-blur-md">
          <span className="text-6xl block mb-4">🎉</span>
          <h3 className="text-2xl font-bold text-emerald-300 mb-2">Қате сұрақтар жоқ!</h3>
          <p className="text-emerald-200/70">Сіз барлық тест сұрақтарын дұрыс орындадыңыз. Айлық тестке рұқсат ашылды!</p>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-4 z-10">
          {wrongQuestions.map((q) => (
            <div key={q.id} className="bg-emerald-950/30 border border-rose-500/30 p-6 rounded-2xl backdrop-blur-md">
              <div className="flex justify-between text-xs text-emerald-400 mb-2 font-semibold">
                <span>{q.topicName}</span>
                <span className="text-rose-400">Қате жіберілген сұрақ</span>
              </div>
              <h4 className="text-lg font-bold text-white mb-4">{q.question}</h4>
              <div className="bg-emerald-950/80 p-3 rounded-lg text-xs text-emerald-200/90 mb-4 border border-emerald-500/20">
                <strong className="text-emerald-400 block mb-1">📘 Түсіндірме:</strong>
                {q.explanation}
              </div>
              <button
                onClick={() => onRetryQuestion(q.id)}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-sm transition-all cursor-pointer"
              >
                Қайта тапсыру 🔄
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};