import React from 'react';
import { IncomeTarget } from '../types';
import { Card } from '../components/Card';
import { ICONS } from '../constants';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface TargetViewProps {
  target: IncomeTarget;
}

export const TargetView: React.FC<TargetViewProps> = ({ target }) => {
  
  const percentage = Math.min(100, Math.round((target.currentProgress / target.monthlyTarget) * 100));
  const remaining = Math.max(0, target.monthlyTarget - target.currentProgress);
  
  const pieData = [
    { name: 'Achieved', value: target.currentProgress, color: '#f97316' }, // Orange-500
    { name: 'Remaining', value: remaining, color: '#27272a' }, // Zinc-800
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-white">Monthly Income Target</h2>
      
      {/* Main Target Circle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-zinc-900 to-black">
           <div className="relative w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">{percentage}%</span>
                <span className="text-xs text-zinc-500 uppercase tracking-widest">Achieved</span>
              </div>
           </div>
           
           <div className="mt-6 text-center space-y-2">
             <div className="text-zinc-400 text-sm">Target Goal</div>
             <div className="text-3xl font-bold text-orange-500">${target.monthlyTarget.toLocaleString()}</div>
             <div className="text-sm text-zinc-500">
               Current: <span className="text-white">${target.currentProgress.toLocaleString()}</span>
             </div>
           </div>
        </Card>

        {/* Breakdown & Stats */}
        <div className="space-y-4">
           <Card title="Required Run Rate" className="bg-zinc-900/50">
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><ICONS.Calendar size={18}/></div>
                    <span className="text-zinc-300">Daily Goal</span>
                  </div>
                  <span className="font-bold text-white">${target.breakdown.daily}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><ICONS.Calendar size={18}/></div>
                    <span className="text-zinc-300">Weekly Goal</span>
                  </div>
                  <span className="font-bold text-white">${target.breakdown.weekly}</span>
                </div>
             </div>
           </Card>

           <Card title="Action Plan" className="flex-1">
             <ul className="space-y-3">
               {target.strategies.map((strategy, i) => (
                 <li key={i} className="flex items-start gap-3 text-sm text-zinc-400">
                   <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                   {strategy}
                 </li>
               ))}
             </ul>
           </Card>
        </div>
      </div>
    </div>
  );
};