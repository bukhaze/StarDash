"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import { logout } from '@/app/actions/auth';
import type { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Become a Worker', href: '/become-a-worker' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-primary text-on-primary py-2.5 px-4 text-center text-xs md:text-sm font-medium tracking-wide">
        Elevate your home experience. <span className="text-[#62fae3] font-bold">20% off your first booking</span> with code DASH20
      </div>

      {/* 2. Sticky Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-outline-variant/5">
        <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-black tracking-tighter text-slate-900 font-headline">
            StarDash
          </Link>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-slate-600 hover:text-secondary transition-colors font-headline font-semibold text-sm tracking-tight hover:translate-y-[-1px]">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center">
              {user ? (
                <Link href={user.user_metadata?.role === 'admin' ? '/admin' : user.user_metadata?.role === 'worker' ? '/worker' : '/dashboard'} className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all scale-95 active:opacity-80 shadow-premium">
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:opacity-90 transition-all scale-95 active:opacity-80 shadow-premium">
                  Admin Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors active:scale-95 text-slate-700"
            >
              <span className="material-symbols-outlined font-black">menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] animate-in fade-in duration-300" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <aside className={`md:hidden fixed top-0 right-0 h-screen w-72 bg-white z-[60] p-8 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between mb-12">
            <div className="text-2xl font-black text-slate-900 font-headline tracking-tighter">StarDash</div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-bold text-slate-600 hover:text-secondary px-4 py-4 rounded-2xl hover:bg-slate-50 transition-all font-headline"
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-8 border-t border-slate-100 mt-4 space-y-4">
              {user ? (
                <>
                  <Link 
                    href={user.user_metadata?.role === 'admin' ? '/admin' : user.user_metadata?.role === 'worker' ? '/worker' : '/dashboard'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full h-14 bg-secondary text-white rounded-2xl font-bold text-lg shadow-premium"
                  >
                    Go to Dashboard
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="w-full h-14 border-2 border-slate-100 text-slate-600 rounded-2xl font-bold text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link 
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg shadow-premium"
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-auto absolute bottom-8 left-8 right-8 text-center">
            <p className="text-xs text-slate-400 font-medium font-body uppercase tracking-widest">Premium Home Services Nairobi</p>
          </div>
        </aside>
      </nav>
    </>
  );
};

export default Navbar;
