import React, { useState } from 'react';
import { Question } from '../types/game';

interface Props {
  questions: Question[];
  onAddQuestion: (newQ: Question) => void;
  onDeleteQuestion: (id: number) => void;
  onBackToDashboard: () => void;
}

export const AdminPanel: React.FC<Props> = ({ questions, onAddQuestion, onDeleteQuestion, onBackToDashboard }) => {
  const [topicName, setTopicName] = useState('Жасушалық биология');
  const [week, setWeek] = useState<number>(1);
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

  const handleAnswerChange = (index: number, value: string) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText || answers.some(a => !a.trim()) || !explanation) {
      alert('Барлық өрістерді толтырыңыз!');
      return;
    }

    const newQ: Question = {
      id: Date.now(),
      week,
      topicId: week === 1 ? 1 : 5,
      topicName,
      question: questionText,
      answers,
      correctAnswer,
      explanation,
      difficulty,
    };

    onAddQuestion(newQ);
    setQuestionText('');
    setAnswers(['', '', '', '']);
    setExplanation('');
    alert('Сұрақ сәтті қосылды!');
  };

  return (
    <div className="min-h-screen bg-[#040d08] text-white p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <button onClick={onBackToDashboard} className="text-emerald-400 hover:text-white font-bold cursor-pointer">
          ← Dashboard
        </button>
        <h2 className="text-3xl font-black text-emerald-400">⚙️ БАСҚАРУ ПАНЕЛІ (ADMIN)</h2>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form: Add Question */}
        <form onSubmit={handleSubmit} className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-md flex flex-col gap-4">
          <h3 className="text-xl font-bold text-emerald-300 mb-2">Жаңа сұрақ қосу</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-emerald-400 block mb-1">Апта (Модуль)</label>
              <select
                value={week}
                onChange={e => setWeek(Number(e.target.value))}
                className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
              >
                <option value={1}>1-АПТА</option>
                <option value={2}>2-АПТА</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-emerald-400 block mb-1">Күрделілігі</label>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as any)}
                className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
              >
                <option value="easy">Easy (Оңай)</option>
                <option value="medium">Medium (Орташа)</option>
                <option value="hard">Hard (Күрделі)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400 block mb-1">Тақырып атауы</label>
            <input
              type="text"
              value={topicName}
              onChange={e => setTopicName(e.target.value)}
              className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400 block mb-1">Сұрақ мәтіні</label>

            <textarea
              rows={3}
              value={questionText}
              onChange={e => setQuestionText(e.target.value)}
              className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
              placeholder="Сұрақты жазыңыз..."
            />
          </div>

          {/* Answers */}
          <div>
            <label className="text-xs font-semibold text-emerald-400 block mb-2">Жауап нұсқалары</label>
            {answers.map((ans, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswer === idx}
                  onChange={() => setCorrectAnswer(idx)}
                  className="accent-emerald-400 cursor-pointer"
                />
                <input
                  type="text"
                  value={ans}
                  onChange={e => handleAnswerChange(idx, e.target.value)}
                  placeholder={`Вариант ${String.fromCharCode(65 + idx)}`}
                  className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
                />
              </div>
            ))}
            <span className="text-[10px] text-emerald-400/60">* Переключательмен дұрыс жауапты белгілеңіз</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400 block mb-1">Түсіндірме (Оқулық бойынша)</label>
            <textarea
              rows={2}
              value={explanation}
              onChange={e => setExplanation(e.target.value)}
              className="w-full bg-emerald-900/40 border border-emerald-500/30 p-2 rounded-lg text-white text-sm"
              placeholder="Неліктен бұл жауап дұрыс? Оқулықтан түсіндірме..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl transition-all cursor-pointer mt-2"
          >
            СҰРАҚТЫ САКТАУ 💾
          </button>
        </form>

        {/* Existing Questions List */}
        <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-2xl backdrop-blur-md flex flex-col gap-4 max-h-[700px] overflow-y-auto">
          <h3 className="text-xl font-bold text-emerald-300">Базадағы сұрақтар ({questions.length})</h3>

          {questions.map((q, idx) => (
            <div key={q.id} className="bg-emerald-900/20 border border-emerald-500/20 p-4 rounded-xl flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-emerald-400">
                <span>#{idx + 1} | {q.topicName} ({q.week}-апта)</span>
                <button
                  onClick={() => onDeleteQuestion(q.id)}
                  className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer"
                >
                  Жою 🗑️
                </button>
              </div>
              <p className="text-sm font-bold text-white">{q.question}</p>
              <p className="text-xs text-emerald-300/80">
                Дұрыс жауап: <span className="text-emerald-400 font-bold">{q.answers[q.correctAnswer]}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};