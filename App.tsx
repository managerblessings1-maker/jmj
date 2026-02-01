import React, { useState, useEffect } from 'react';
import { ViewState, Task, Transaction, Skill, IncomeTarget } from './types';
import { MOCK_TASKS, MOCK_TRANSACTIONS, MOCK_SKILLS, DEFAULT_TARGET, ICONS } from './constants';
import { TasksView } from './views/TasksView';
import { FinanceView } from './views/FinanceView';
import { SkillsView } from './views/SkillsView';
import { TargetView } from './views/TargetView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('tasks');
  
  // App State - In a real app, this would be in a Context or Redux
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [target, setTarget] = useState<IncomeTarget>(DEFAULT_TARGET);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Update target progress when transactions change
  useEffect(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    setTarget(prev => ({ ...prev, currentProgress: income }));
  }, [transactions]);

  const renderView = () => {
    switch (currentView) {
      case 'tasks': return <TasksView tasks={tasks} setTasks={setTasks} />;
      case 'finance': return <FinanceView transactions={transactions} setTransactions={setTransactions} />;
      case 'skills': return <SkillsView skills={skills} setSkills={setSkills} />;
      case 'target': return <TargetView target={target} />;
      default: return <TasksView tasks={tasks} setTasks={setTasks} />;
    }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        currentView === view 
          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
          : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 p-4 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ICONS.Target className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">IGNITE</h1>
              <p className="text-xs text-zinc-500">Personal Growth</p>
            </div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-zinc-400">
            <ICONS.Close />
          </button>
        </div>

        <nav className="space-y-2">
          <NavItem view="tasks" icon={ICONS.Tasks} label="Daily Tasks" />
          <NavItem view="finance" icon={ICONS.Finance} label="Finance" />
          <NavItem view="skills" icon={ICONS.Skills} label="Skills" />
          <NavItem view="target" icon={ICONS.Target} label="Income Target" />
        </nav>

        <div className="absolute bottom-4 left-4 right-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
              U
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-white truncate">User Profile</div>
              <div className="text-xs text-zinc-500 truncate">Pro Member</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <ICONS.Target className="text-white" size={16} />
            </div>
            <span className="font-bold text-lg">IGNITE</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-300">
            <ICONS.Menu />
          </button>
        </header>

        {/* Scrollable View Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth">
          <div className="max-w-5xl mx-auto pb-20 lg:pb-0">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;