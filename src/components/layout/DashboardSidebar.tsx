"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';

const DashboardSidebar = () => {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');
  const isWorker = pathname.startsWith('/worker');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customerItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { icon: 'calendar_month', label: 'My Bookings', href: '/dashboard/bookings' },
    { icon: 'chat_bubble', label: 'Messages', href: '/dashboard/messages' },
    { icon: 'location_on', label: 'My Addresses', href: '/dashboard/addresses' },
    { icon: 'payments', label: 'Payments', href: '/dashboard/payments' },
    { icon: 'person', label: 'Profile Settings', href: '/dashboard/settings' },
  ];

  const adminItems = [
    { icon: 'grid_view', label: 'Operations', href: '/admin' },
    { icon: 'engineering', label: 'Specialists', href: '/admin/workers' },
    { icon: 'assignment', label: 'Dispatch Queue', href: '/admin/bookings' },
    { icon: 'payments', label: 'Revenue Hub', href: '/admin/revenue' },
    { icon: 'settings', label: 'Platform Settings', href: '/admin/settings' },
  ];

  const workerItems = [
    { icon: 'task_alt', label: 'My Tasks', href: '/worker' },
    { icon: 'account_balance_wallet', label: 'Earnings', href: '/worker/earnings' },
    { icon: 'manage_accounts', label: 'Account Settings', href: '/worker/settings' },
  ];

  const menuItems = isAdmin ? adminItems : isWorker ? workerItems : customerItems;

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 h-16 flex items-center justify-between">
        <Logo className="scale-[0.85] origin-left" />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors active:scale-95 border border-slate-100"
        >
          <span className="material-symbols-outlined text-slate-900 font-bold">menu</span>
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] animate-in fade-in duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-white flex flex-col gap-1 p-8 z-[60] border-r border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between mb-12">
          <Logo className="scale-90 origin-left" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        {/* User Persona Card */}
        <div className="mb-10 p-5 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${isAdmin ? 'bg-slate-900' : 'bg-blue-600'} text-white flex items-center justify-center shadow-lg`}>
              <span className="material-symbols-outlined text-xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isAdmin ? 'shield_person' : isWorker ? 'engineering' : 'account_circle'}
              </span>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-headline leading-none">Access Level</p>
              <p className="font-headline text-sm font-black text-slate-900 mt-2 leading-none">
                {isAdmin ? 'Operation Admin' : isWorker ? 'Verified Partner' : 'Premium Member'}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl font-headline text-[11px] font-black uppercase tracking-widest transition-all duration-300 group ${
                  active 
                    ? 'bg-slate-900 text-white shadow-xl' 
                    : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50/50'
                }`}
              >
                <span className="material-symbols-outlined text-lg opacity-70 group-hover:opacity-100" style={{ fontVariationSettings: active ? "'FILL' 1" : undefined }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-4">
           <div className="px-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Hub Status: <span className="text-green-500 italic">Online</span></p>
           </div>
           
           <form action="/api/auth/signout" method="post">
             <button className="w-full flex items-center gap-4 px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-400 hover:bg-red-50 transition-all">
                <span className="material-symbols-outlined text-lg">logout</span>
                Sign Out
             </button>
           </form>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
