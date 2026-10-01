export type ProfileUniverse = 'demon_slayer' | 'one_piece' | 'mha' | 'dr_stone' | 'marvel' | 'harry_potter';

export interface Rank {
  level: number;
  title: string;
  character: string;
  unlocked: boolean;
}

export interface UserState {
  username: string;
  selectedProfile: ProfileUniverse | null;
  currentLevel: number;
  xp: number;
  completedTopics: number[];
  completedWeeks: number[];
  wrongAnswers: number[];
}

export const RANKS_DATA: Record<ProfileUniverse, Rank[]> = {
  demon_slayer: [
    { level: 1, title: 'Beginner', character: 'Tanjiro', unlocked: true },
    { level: 2, title: 'Rookie', character: 'Zenitsu', unlocked: false },
    { level: 3, title: 'Fighter', character: 'Inosuke', unlocked: false },
    { level: 4, title: 'Elite', character: 'Rengoku', unlocked: false },
    { level: 5, title: 'Hashira', character: 'Giyu', unlocked: false },
    { level: 6, title: 'Legend', character: 'Yoriichi', unlocked: false },
  ],
  one_piece: [
    { level: 1, title: 'Beginner', character: 'Usopp', unlocked: true },
    { level: 2, title: 'Rookie', character: 'Nami', unlocked: false },
    { level: 3, title: 'Fighter', character: 'Sanji', unlocked: false },
    { level: 4, title: 'Elite', character: 'Zoro', unlocked: false },
    { level: 5, title: 'Captain', character: 'Luffy', unlocked: false },
    { level: 6, title: 'Legend', character: 'Gear 5 Luffy', unlocked: false },
  ],
  mha: [
    { level: 1, title: 'Beginner', character: 'Deku', unlocked: true },
    { level: 2, title: 'Rookie', character: 'Bakugo', unlocked: false },
    { level: 3, title: 'Hero', character: 'Todoroki', unlocked: false },
    { level: 4, title: 'Elite', character: 'Endeavor', unlocked: false },
    { level: 5, title: 'Pro Hero', character: 'All Might', unlocked: false },
    { level: 6, title: 'Legend', character: 'Deku 100%', unlocked: false },
  ],
  dr_stone: [
    { level: 1, title: 'Beginner', character: 'Chrome', unlocked: true },
    { level: 2, title: 'Learner', character: 'Suika', unlocked: false },
    { level: 3, title: 'Scientist', character: 'Senku', unlocked: false },
    { level: 4, title: 'Inventor', character: 'Kaseki', unlocked: false },
    { level: 5, title: 'Genius', character: 'Genius Senku', unlocked: false },
    { level: 6, title: 'Science Master', character: 'Kingdom of Science', unlocked: false },
  ],
  marvel: [
    { level: 1, title: 'Beginner', character: 'Spider-Man 🕷️', unlocked: true },
    { level: 2, title: 'Rookie', character: 'Captain America 🛡️', unlocked: false },
    { level: 3, title: 'Hero', character: 'Iron Man 🤖', unlocked: false },
    { level: 4, title: 'Elite', character: 'Thor ⚡', unlocked: false },
    { level: 5, title: 'Master', character: 'Doctor Strange 🔮', unlocked: false },
    { level: 6, title: 'Legend', character: 'Thanos 💎', unlocked: false },
  ],
  harry_potter: [
    { level: 1, title: 'Level 1', character: 'Hogwarts Student 🪄', unlocked: true },
    { level: 2, title: 'Level 2', character: 'Gryffindor Student', unlocked: false },
    { level: 3, title: 'Level 3', character: 'Young Wizard', unlocked: false },
    { level: 4, title: 'Level 4', character: 'Advanced Wizard', unlocked: false },
    { level: 5, title: 'Level 5', character: 'Auror', unlocked: false },
    { level: 6, title: 'Level 6', character: 'Dumbledore-level Wizard', unlocked: false },
    { level: 7, title: 'Level 7', character: 'Wizard Legend', unlocked: false },
  ]
};