"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const customerItems = [
    { icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
    { icon: 'calendar_month', label: 'My Bookings', href: '/dashboard/bookings' },
    { icon: 'chat_bubble', label: 'Messages', href: '/dashboard/messages' },
    { icon: 'location_on', label: 'Addresses', href: '/dashboard/addresses' },
    { icon: 'payments', label: 'Payments', href: '/dashboard/payments' },
    { icon: 'settings', label: 'Settings', href: '/dashboard/settings' },
  ];

  const adminItems = [
    { icon: 'dashboard', label: 'Admin Center', href: '/admin' },
    { icon: 'engineering', label: 'Worker Roster', href: '/admin/workers' },
    { icon: 'work_history', label: 'All Bookings', href: '/admin/bookings' },
    { icon: 'payments', label: 'Revenue', href: '/admin/revenue' },
    { icon: 'settings', label: 'Settings', href: '/admin/settings' },
  ];

  const menuItems = isAdmin ? adminItems : customerItems;

  return (
    <>
      <div className="md:hidden sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-outline-variant/10 px-6 h-16 flex items-center justify-between">
        <div className="text-xl font-black text-slate-900 font-headline tracking-tighter">StarDash</div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors active:scale-95"
        >
          <span className="material-symbols-outlined text-slate-700 font-bold">menu</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] animate-in fade-in duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`h-screen w-72 fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col gap-1 p-6 z-[60] border-r border-slate-200 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:translate-x-0 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between mb-8">
          <div className="text-2xl font-black text-slate-900 font-headline tracking-tighter">StarDash</div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 overflow-hidden shadow-inner">
              <span className="material-symbols-outlined font-bold text-xl">{isAdmin ? 'shield_person' : 'person'}</span>
            </div>
            <div>
              <p className="font-headline text-sm font-semibold text-slate-900 leading-tight">Welcome back,</p>
              <p className="text-xs text-slate-500 font-medium font-body">{isAdmin ? 'Administrator' : 'Premium Member'}</p>
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
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-headline text-sm font-medium transition-all duration-300 ${
                  active 
                    ? 'bg-white text-secondary shadow-[0_2px_12px_-4px_rgba(0,0,0,0.1)] ring-1 ring-slate-100' 
                    : 'text-slate-500 hover:text-slate-900 hover:translate-x-1 hover:bg-slate-100/50'
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: active ? "'FILL' 1" : undefined }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {!isAdmin && (
          <div className="mt-auto pt-6">
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="w-full h-12 flex items-center justify-center gap-2 bg-primary text-white rounded-xl font-headline font-bold text-sm shadow-premium hover:opacity-90 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Book New Service
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardSidebar;
