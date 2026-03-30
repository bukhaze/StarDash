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


  const adminItems = [
    { icon: 'dashboard', label: 'Dashboard Overview', href: '/admin' },
    { icon: 'group', label: 'Staff Management', href: '/admin/workers' },
    { icon: 'receipt_long', label: 'Service Bookings', href: '/admin/bookings' },
    { icon: 'account_balance', label: 'Finance & Revenue', href: '/admin/revenue' },
    { icon: 'settings', label: 'Admin Settings', href: '/admin/settings' },
  ];

  const workerItems = [
    { icon: 'task_alt', label: 'My Tasks', href: '/worker' },
    { icon: 'account_balance_wallet', label: 'Earnings', href: '/worker/earnings' },
    { icon: 'manage_accounts', label: 'Settings', href: '/worker/settings' },
  ];

  const menuItems = isAdmin ? adminItems : workerItems;

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-100 px-6 h-16 flex items-center justify-between">
        <Logo className="scale-[0.85] origin-left" />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-50 rounded-xl transition-colors active:scale-95 border border-slate-100 shadow-sm"
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
      <aside className={`h-screen w-80 fixed left-0 top-0 overflow-y-auto bg-white flex flex-col gap-0 p-0 z-[60] border-r border-slate-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 font-body ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div className="p-10 pb-12 flex items-center justify-between">
          <Logo className="scale-100 origin-left" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all shadow-inner">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        {/* User Persona Card */}
        <div className="px-8 mb-12">
          <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 group hover:shadow-md transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${isAdmin ? 'bg-slate-900' : 'bg-blue-600'} text-white flex items-center justify-center shadow-lg transition-transform duration-500`}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {isAdmin ? 'admin_panel_settings' : 'engineering'}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account Access</p>
                <p className="text-[13px] font-bold text-slate-900 leading-none">
                  {isAdmin ? 'Administrator' : 'Specialist'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-6 space-y-2">
           <div className="px-4 mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Management</p>
           </div>
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link 
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 group relative ${
                  active 
                    ? 'bg-slate-900 text-white shadow-xl' 
                    : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-lg opacity-70 group-hover:opacity-100 transition-all" style={{ fontVariationSettings: active ? "'FILL' 1" : undefined }}>{item.icon}</span>
                <span className="mt-0.5">{item.label}</span>
                
                {active && (
                   <div className="absolute right-6 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="mt-auto px-6 py-10 space-y-8">
           <div className="px-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">StarDash Headquarters</p>
              <p className="text-[9px] font-medium text-slate-300 uppercase tracking-widest">Nairobi, Kenya</p>
           </div>
           
           <form action="/api/auth/signout" method="post">
             <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-red-500 bg-red-50 hover:bg-red-100 border border-red-100 transition-all duration-300">
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
