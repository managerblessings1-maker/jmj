import React, { useState, useMemo } from 'react';
import { Transaction, TransactionType } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ICONS } from '../constants';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface FinanceViewProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ transactions, setTransactions }) => {
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState<TransactionType>('expense');

  const addTransaction = () => {
    if (!amount || !title) return;
    const newTx: Transaction = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      type,
      date: new Date().toISOString(),
      category: 'General'
    };
    setTransactions([newTx, ...transactions]);
    setAmount('');
    setTitle('');
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const totals = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'income') acc.income += curr.amount;
      else acc.expense += curr.amount;
      return acc;
    }, { income: 0, expense: 0 });
  }, [transactions]);

  const balance = totals.income - totals.expense;

  const chartData = [
    { name: 'Income', amount: totals.income, color: '#22c55e' },
    { name: 'Expense', amount: totals.expense, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Finance Tracker</h2>
        <div className="text-sm font-medium text-zinc-400">Total Balance</div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-zinc-900 to-zinc-900 border-zinc-800">
          <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
            <ICONS.Finance size={14} className="text-blue-500"/> Balance
          </div>
          <div className={`text-2xl font-bold ${balance >= 0 ? 'text-white' : 'text-red-500'}`}>
            ${balance.toLocaleString()}
          </div>
        </Card>
        <Card>
          <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
            <ICONS.Income size={14} className="text-green-500"/> Income
          </div>
          <div className="text-2xl font-bold text-green-500">+${totals.income.toLocaleString()}</div>
        </Card>
        <Card>
          <div className="text-zinc-400 text-sm mb-1 flex items-center gap-2">
            <ICONS.Expense size={14} className="text-red-500"/> Expense
          </div>
          <div className="text-2xl font-bold text-red-500">-${totals.expense.toLocaleString()}</div>
        </Card>
      </div>

      {/* Chart */}
      <Card title="Overview" className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" barSize={20}>
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" tick={{fill: '#a1a1aa'}} width={60} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              cursor={{fill: 'transparent'}}
            />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Add Transaction */}
      <Card title="Add Entry">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-1 flex bg-zinc-950 rounded-lg p-1 border border-zinc-800">
            <button 
              className={`flex-1 rounded-md text-sm font-medium transition-colors ${type === 'income' ? 'bg-green-600 text-white' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setType('income')}
            >
              Income
            </button>
            <button 
              className={`flex-1 rounded-md text-sm font-medium transition-colors ${type === 'expense' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:text-white'}`}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
          </div>
          <input 
            placeholder="Title"
            className="md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Amount"
            className="md:col-span-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-orange-500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <Button className="w-full mt-3" onClick={addTransaction}>Add Transaction</Button>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {transactions.map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors">
             <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                  {t.type === 'income' ? <ICONS.Income size={18} /> : <ICONS.Expense size={18} />}
                </div>
                <div>
                  <div className="font-medium text-white">{t.title}</div>
                  <div className="text-xs text-zinc-500">{new Date(t.date).toLocaleDateString()}</div>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <span className={`font-bold ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount}
                </span>
                <button onClick={() => deleteTransaction(t.id)} className="text-zinc-600 hover:text-red-500">
                  <ICONS.Delete size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};