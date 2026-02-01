export type ViewState = 'dashboard' | 'tasks' | 'finance' | 'skills' | 'target';

// Task Manager Types
export interface Task {
  id: string;
  title: string;
  time: string;
  isCompleted: boolean;
  priority: 'low' | 'medium' | 'high';
}

// Finance Tracker Types
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  date: string; // ISO string
  category: string;
}

// Skill Development Types
export interface SkillStage {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Skill {
  id: string;
  title: string;
  category: string;
  progress: number; // 0-100
  stages: SkillStage[];
  videoUrl?: string;
}

// Monthly Target Types
export interface IncomeTarget {
  monthlyTarget: number;
  currentProgress: number;
  breakdown: {
    daily: number;
    weekly: number;
  };
  strategies: string[];
}
