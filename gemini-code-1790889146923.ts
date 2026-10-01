import React, { useState, useEffect } from 'react';
import { UserState, ProfileUniverse, questionsDatabase, Question } from './types/game';
import { SplashScreen } from './components/SplashScreen';
import { ProfileSelector } from './components/ProfileSelector';
import { Dashboard } from './components/Dashboard';
import { TopicSelection } from './components/TopicSelection';
import { QuizEngine } from './components/QuizEngine';
import { WrongAnswersReview } from './components/WrongAnswersReview';
import { AdminPanel } from './components/AdminPanel';

type ScreenState = 'splash' | 'profile_select' | 'dashboard' | 'topics' | 'quiz' | 'wrong_review' | 'admin';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenState>('splash');
  const [questions, setQuestions] = useState<Question[]>(questionsDatabase);
  const [activeTopicQuestions, setActiveTopicQuestions] = useState<Question[]>([]);

  // State Persistence via LocalStorage
  const [userState, setUserState] = useState<UserState>(() => {
    const saved = localStorage.getItem('bioforce_user_state');
    return saved ? JSON.parse(saved) : {
      username: 'Оқушы',
      selectedProfile: null,
      currentLevel: 1,
      xp: 0,
      completedTopics: [],
      completedWeeks: [],
      wrongAnswers: [],
    };
  });

  useEffect(() => {
    localStorage.setItem('bioforce_user_state', JSON.stringify(userState));
  }, [userState]);

  const handleSelectProfile = (profile: ProfileUniverse) => {
    setUserState(prev => ({ ...prev, selectedProfile: profile }));
    setScreen('dashboard');
  };

  const handleStartTopic = (topicId: number) => {
    const topicQs = questions.filter(q => q.topicId === topicId);
    setActiveTopicQuestions(topicQs.length > 0 ? topicQs : questions.slice(0, 5));
    setScreen('quiz');
  };

  const handleCompleteTopic = (score: number, wrongQuestionIds: number[]) => {
    const xpGained = score * 10 + 50; // +10 XP per correct answer + 50 bonus
    setUserState(prev => {
      const newWrong = Array.from(new Set([...prev.wrongAnswers, ...wrongQuestionIds]));
      const newXP = prev.xp + xpGained;
      const newLevel = Math.min(Math.floor(newXP / 300) + 1, 7);

      return {
        ...prev,
        xp: newXP,
        currentLevel: newLevel,
        wrongAnswers: newWrong,
        completedTopics: Array.from(new Set([...prev.completedTopics, 1])),
      };
    });

    alert(`Тақырып аяқталды! 🏆\nДұрыс жауап: ${score}\nАлынған XP: +${xpGained}`);
    setScreen('dashboard');
  };

  return (
    <div className="bg-[#040d08] min-h-screen font-sans">
      {screen === 'splash' && <SplashScreen onStart={() => setScreen(userState.selectedProfile ? 'dashboard' : 'profile_select')} />}
      {screen === 'profile_select' && <ProfileSelector onSelectProfile={handleSelectProfile} />}
      {screen === 'dashboard' && (
        <div className="relative">
          <Dashboard userState={userState} onStartStudy={() => setScreen('topics')} />
          {/* Quick Nav for Admin & Wrong Answers */}
          <div className="fixed bottom-4 right-4 z-50 flex gap-2">
            <button
              onClick={() => setScreen('wrong_review')}
              className="px-4 py-2 bg-rose-500/20 border border-rose-500/40 text-rose-300 rounded-xl text-xs font-bold backdrop-blur-md cursor-pointer"
            >
              ❌ Қатемен жұмыс ({userState.wrongAnswers.length})
            </button>
            <button
              onClick={() => setScreen('admin')}
              className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold backdrop-blur-md cursor-pointer"
            >
              ⚙️ Admin
            </button>
          </div>
        </div>
      )}
      {screen === 'topics' && (
        <TopicSelection
          completedTopics={userState.completedTopics}
          onSelectTopic={handleStartTopic}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}
      {screen === 'quiz' && (
        <QuizEngine
          questions={activeTopicQuestions}
          onCompleteTopic={handleCompleteTopic}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}
      {screen === 'wrong_review' && (
        <WrongAnswersReview
          wrongQuestions={questions.filter(q => userState.wrongAnswers.includes(q.id))}
          onRetryQuestion={qId => {
            setActiveTopicQuestions(questions.filter(q => q.id === qId));
            setScreen('quiz');
          }}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}
      {screen === 'admin' && (
        <AdminPanel
          questions={questions}
          onAddQuestion={newQ => setQuestions(prev => [...prev, newQ])}
          onDeleteQuestion={id => setQuestions(prev => prev.filter(q => q.id !== id))}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}
    </div>
  );
};
export default App;