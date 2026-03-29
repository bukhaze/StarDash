"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import { logout } from '@/app/actions/auth';
import type { User } from '@supabase/supabase-js';

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <div className="bg-primary text-on-primary py-2.5 px-4 text-center text-sm font-medium tracking-wide">
        Elevate your home experience. <span className="text-secondary-fixed font-bold text-[#62fae3]">20% off your first booking</span> with code DASH20
      </div>

      {/* 2. Sticky Navbar */}
      <nav className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-slate-900 font-headline">
            StarDash
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-secondary font-semibold border-b-2 border-secondary font-headline tracking-tight">
              Home
            </Link>
            <Link href="/services" className="text-slate-600 hover:text-secondary transition-colors font-headline tracking-tight">
              Services
            </Link>
            <Link href="/become-a-worker" className="text-slate-600 hover:text-secondary transition-colors font-headline tracking-tight">
              Become a Worker
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-secondary transition-colors font-headline tracking-tight">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-secondary transition-colors font-headline tracking-tight">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link href={user.user_metadata?.role === 'admin' ? '/admin' : user.user_metadata?.role === 'worker' ? '/worker' : '/dashboard'} className="text-slate-600 hover:text-secondary transition-colors font-semibold">
                  Dashboard
                </Link>
                <button onClick={() => logout()} className="bg-surface-container-highest text-on-surface px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all scale-95 active:opacity-80">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-600 hover:text-secondary transition-colors font-semibold">
                  Login
                </Link>
                <Link href="/signup" className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:opacity-90 transition-all scale-95 active:opacity-80">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
