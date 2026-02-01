import React, { useState } from 'react';
import { Task } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ICONS } from '../constants';

interface TasksViewProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, setTasks }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  const addTask = () => {
    if (!newTaskTitle) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      time: newTaskTime || 'Anytime',
      isCompleted: false,
      priority: 'medium'
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setNewTaskTime('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white">Daily Tasks</h2>
          <p className="text-zinc-400 text-sm mt-1">Make today count.</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-orange-500">{completedCount}</span>
          <span className="text-zinc-500">/{tasks.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-orange-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Add Task Input */}
      <Card className="bg-zinc-900/50 backdrop-blur-sm border-orange-500/20">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <input
            type="time"
            className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500 transition-colors"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
          />
          <Button onClick={addTask} icon={<ICONS.Plus size={18} />}>
            Add
          </Button>
        </div>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
              task.isCompleted 
                ? 'bg-zinc-900/30 border-zinc-800/50 opacity-60' 
                : 'bg-zinc-900 border-zinc-800 hover:border-orange-500/30 hover:shadow-lg hover:shadow-orange-500/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleTask(task.id)}
                className={`transition-colors duration-200 ${task.isCompleted ? 'text-orange-500' : 'text-zinc-600 hover:text-orange-400'}`}
              >
                {task.isCompleted ? <ICONS.Check size={24} /> : <ICONS.Uncheck size={24} />}
              </button>
              <div>
                <h4 className={`font-medium ${task.isCompleted ? 'line-through text-zinc-500' : 'text-zinc-100'}`}>
                  {task.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1">
                  <ICONS.Calendar size={12} />
                  <span>{task.time}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
            >
              <ICONS.Delete size={18} />
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-12 text-zinc-500">
            <ICONS.Tasks size={48} className="mx-auto mb-4 opacity-20" />
            <p>No tasks yet. Start by adding one!</p>
          </div>
        )}
      </div>
    </div>
  );
};