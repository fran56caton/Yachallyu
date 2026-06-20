import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'outline'|'ghost' }) {
  
  const baseStyle = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-[var(--color-yachay-earth)] hover:bg-[var(--color-yachay-earth-dark)] text-white focus:ring-[var(--color-yachay-earth)] px-4 py-2",
    secondary: "bg-[var(--color-yachay-blue)] hover:bg-blue-700 text-white focus:ring-[var(--color-yachay-blue)] px-4 py-2",
    outline: "border-2 border-[var(--color-yachay-earth)] text-[var(--color-yachay-earth)] hover:bg-orange-50 focus:ring-[var(--color-yachay-earth)] px-4 py-2",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ 
  children, 
  className = '',
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function Badge({ 
  children, 
  variant = 'gray',
  className = ''
}: { 
  children: React.ReactNode, 
  variant?: 'gray'|'earth'|'green'|'yellow'|'blue',
  className?: string
}) {
  const variants = {
    gray: "bg-slate-100 text-slate-700 border-slate-200",
    earth: "bg-orange-100 text-orange-800 border-orange-200",
    green: "bg-emerald-100 text-emerald-800 border-emerald-200",
    yellow: "bg-amber-100 text-amber-800 border-amber-200",
    blue: "bg-blue-100 text-blue-800 border-blue-200",
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  title: string; 
  children: React.ReactNode 
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-lg text-slate-900">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-2">&times;</button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
