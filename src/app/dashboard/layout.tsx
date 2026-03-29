import React from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Dashboard Header */}
        <header className="w-full sticky top-0 z-40 bg-white/80 backdrop-blur-xl flex items-center justify-between px-8 h-20 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Customer Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2.5 hover:bg-slate-100 rounded-full transition-colors active:scale-90 group relative">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">notifications</span>
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-secondary border-2 border-white rounded-full"></span>
            </button>
            <button className="p-2.5 hover:bg-slate-100 rounded-full transition-colors active:scale-90 group">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">account_circle</span>
            </button>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>

        {/* Mobile Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-premium border-t border-outline-variant/10 z-50 flex justify-around items-center py-4 px-2">
          <a className="flex flex-col items-center gap-1 text-secondary" href="/dashboard">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
            <span className="text-[10px] font-bold uppercase tracking-widest font-headline">Dashboard</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="/dashboard/bookings">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-[10px] font-bold uppercase tracking-widest font-headline">Bookings</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="/dashboard/messages">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span className="text-[10px] font-bold uppercase tracking-widest font-headline">Messages</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-slate-400" href="/dashboard/profile">
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-bold uppercase tracking-widest font-headline">Profile</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
