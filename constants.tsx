import React from 'react';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Wallet, 
  Target, 
  Trophy, 
  Plus, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Circle,
  Menu,
  X
} from 'lucide-react';
import { Task, Transaction, Skill, IncomeTarget } from './types';

export const ICONS = {
  Dashboard: LayoutDashboard,
  Tasks: CheckSquare,
  Finance: Wallet,
  Skills: Trophy,
  Target: Target,
  Plus: Plus,
  Delete: Trash2,
  Income: TrendingUp,
  Expense: TrendingDown,
  Calendar: Calendar,
  ChevronRight: ChevronRight,
  Play: PlayCircle,
  Check: CheckCircle2,
  Uncheck: Circle,
  Menu: Menu,
  Close: X
};

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Morning Workout', time: '06:00 AM', isCompleted: true, priority: 'high' },
  { id: '2', title: 'Read Technical Docs', time: '08:00 AM', isCompleted: false, priority: 'medium' },
  { id: '3', title: 'Client Meeting', time: '02:00 PM', isCompleted: false, priority: 'high' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', title: 'Freelance Project', amount: 1200, type: 'income', date: new Date().toISOString(), category: 'Freelance' },
  { id: '2', title: 'Grocery', amount: 150, type: 'expense', date: new Date().toISOString(), category: 'Food' },
  { id: '3', title: 'Server Costs', amount: 50, type: 'expense', date: new Date().toISOString(), category: 'Business' },
];

export const MOCK_SKILLS: Skill[] = [
  { 
    id: '1', 
    title: 'Android Development', 
    category: 'Programming', 
    progress: 65, 
    stages: [
      { id: 's1', title: 'Java Basics', isCompleted: true },
      { id: 's2', title: 'XML Layouts', isCompleted: true },
      { id: 's3', title: 'Room Database', isCompleted: false },
      { id: 's4', title: 'MVVM Architecture', isCompleted: false },
    ],
    videoUrl: 'https://youtube.com'
  },
  { 
    id: '2', 
    title: 'UI/UX Design', 
    category: 'Design', 
    progress: 30, 
    stages: [
      { id: 'd1', title: 'Color Theory', isCompleted: true },
      { id: 'd2', title: 'Typography', isCompleted: false },
      { id: 'd3', title: 'Figma Prototyping', isCompleted: false },
    ]
  }
];

export const DEFAULT_TARGET: IncomeTarget = {
  monthlyTarget: 5000,
  currentProgress: 1200, // Derived from mock transactions
  breakdown: { daily: 166, weekly: 1250 },
  strategies: ['Increase Freelance Rates', 'Launch Side Project', 'Reduce Subscriptions']
};