import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {(title || action) && (
        <div className="px-4 py-3 border-b border-zinc-800 flex justify-between items-center">
          {title && <h3 className="text-zinc-100 font-semibold tracking-wide">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};